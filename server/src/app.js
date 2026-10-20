import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
export function createApp({messageStore, isDatabaseReady, origins=[], production=false, trustProxy=1}) {
  const app=express();
  app.disable('x-powered-by');
  // Render and Railway terminate TLS behind one trusted reverse proxy.
  app.set('trust proxy',trustProxy);
  app.use(helmet());
  app.use(cors({origin(origin,done){
    if(!origin||origins.includes(origin))return done(null,true);
    const error=new Error('Origin is not allowed.'); error.status=403;done(error);
  },methods:['GET','POST','OPTIONS'],allowedHeaders:['Content-Type']}));
  app.use(express.json({limit:'20kb'}));
  app.get('/api/health',(_req,res)=>res.status(isDatabaseReady()?200:503).json({status:isDatabaseReady()?'ok':'degraded',database:isDatabaseReady()?'connected':'unavailable'}));
  const limiter=rateLimit({windowMs:15*60*1000,limit:5,standardHeaders:'draft-7',legacyHeaders:false,message:{error:'Too many messages. Please try again in 15 minutes.'}});
  app.post('/api/contact',limiter,async(req,res,next)=>{
    try{
      if(!req.body||typeof req.body!=='object'||Array.isArray(req.body))return res.status(400).json({error:'Please provide a name, email and message.'});
      if(typeof req.body.website==='string'&&req.body.website.trim())return res.status(400).json({error:'Message rejected.'});
      const {name,email,message}=req.body;
      if([name,email,message].some(x=>typeof x!=='string'))return res.status(400).json({error:'Name, email and message must be text.'});
      const clean={name:name.trim(),email:email.trim().toLowerCase(),message:message.trim()};
      if(clean.name.length<2||clean.name.length>80)return res.status(400).json({error:'Name must contain 2–80 characters.'});
      if(clean.email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email))return res.status(400).json({error:'Please enter a valid email address.'});
      if(clean.message.length<10||clean.message.length>5000)return res.status(400).json({error:'Message must contain 10–5000 characters.'});
      if(!isDatabaseReady())return res.status(503).json({error:'The message service is temporarily unavailable. Please email sg169947@gmail.com.'});
      const saved=await messageStore.create(clean);
      // A success response is emitted only after the MongoDB write completes.
      return res.status(201).json({message:'Message received.',id:String(saved._id)});
    }catch(error){next(error)}
  });
  const resumes=fileURLToPath(new URL('../resumes/',import.meta.url));
  app.get('/api/resume/:format',(req,res,next)=>{
    const format=req.params.format;
    if(!['pdf','docx'].includes(format))return res.status(404).json({error:'Choose PDF or DOCX.'});
    const filename=`Dipanshu_Bansal_Resume.${format}`;
    const file=path.join(resumes,filename);
    if(!fs.existsSync(file))return res.status(404).json({error:'Resume file is not available.'});
    res.setHeader('Cache-Control','public, max-age=3600');
    res.type(format==='pdf'?'application/pdf':'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.download(file,filename,error=>{if(error&&!res.headersSent)next(error)});
  });
  app.use('/api',(_req,res)=>res.status(404).json({error:'Route not found.'}));
  // Optional single-service hosting. The assignment's split deployment is documented in README.
  const dist=fileURLToPath(new URL('../../dist/',import.meta.url));
  if(production&&fs.existsSync(path.join(dist,'index.html'))){
    app.use(express.static(dist));
    app.get('*',(_req,res)=>res.sendFile(path.join(dist,'index.html')));
  }
  app.use((error,_req,res,_next)=>{
    if(res.headersSent)return;
    const status=error.type==='entity.too.large'?413:error.type==='entity.parse.failed'?400:error.status||500;
    res.status(status).json({error:status===500?'The service could not process your request. Please try again.':status===413?'Message payload is too large.':status===400?'Invalid JSON body.':error.message});
  });
  return app;
}
