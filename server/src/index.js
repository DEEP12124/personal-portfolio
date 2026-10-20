import 'dotenv/config';
import mongoose from 'mongoose';
import Message from './models/Message.js';
import { createApp } from './app.js';
mongoose.set('bufferCommands',false);
const port=Number(process.env.PORT)||5000;
const origins=(process.env.CLIENT_ORIGIN||'http://localhost:5173,http://localhost:4173').split(',').map(x=>x.trim()).filter(Boolean);
const app=createApp({messageStore:Message,isDatabaseReady:()=>mongoose.connection.readyState===1,origins,production:process.env.NODE_ENV==='production',trustProxy:Number(process.env.TRUST_PROXY_HOPS||1)});
const server=app.listen(port,()=>console.log(`Portfolio API listening on port ${port}.`));
let reconnectTimer;
async function connect(){
 if(!process.env.MONGODB_URI){console.warn('MONGODB_URI is missing. CV downloads work; contact requests return 503 until configured.');return}
 try{await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:10000});console.log('MongoDB connected.');}
 catch{console.error('MongoDB connection failed. Check server environment and database network access. Retrying in 30 seconds.');reconnectTimer=setTimeout(connect,30000)}
}
connect();
async function shutdown(){clearTimeout(reconnectTimer);server.close(async()=>{await mongoose.disconnect();process.exit(0)});setTimeout(()=>process.exit(1),10000).unref()}
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
