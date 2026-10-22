import { useEffect, useRef } from 'react';

const points = [
  [78, 222], [157, 102], [195, 321], [294, 202], [355, 66],
  [403, 372], [487, 220], [530, 110], [620, 317], [665, 168],
  [734, 65], [796, 267], [866, 154], [900, 389], [724, 454],
  [274, 463], [94, 445], [510, 497],
];
const edges = [
  [0,1],[0,2],[0,3],[1,3],[1,4],[2,3],[2,15],[3,4],
  [3,5],[3,6],[4,7],[5,6],[5,15],[5,17],[6,7],
  [6,8],[6,9],[7,9],[7,10],[8,9],[8,14],[8,17],
  [9,10],[9,11],[10,12],[11,12],[11,13],[11,14],
  [12,13],[13,14],[15,16],[15,17],[2,16],
];

export function NeuralConstellation() {
  return <div className="constellation-wrap" aria-hidden="true">
    <svg viewBox="0 0 960 550" preserveAspectRatio="xMidYMid slice" className="constellation-svg">
      <defs>
        <radialGradient id="neural-halo">
          <stop offset="0%" stopColor="#ec526b" stopOpacity=".31"/>
          <stop offset="100%" stopColor="#ec526b" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="487" cy="258" r="295" fill="url(#neural-halo)"/>
      {edges.map(([a,b],i)=><line key={i} className="neural-edge" x1={points[a][0]} y1={points[a][1]} x2={points[b][0]} y2={points[b][1]} style={{animationDelay:`-${i*.27}s`}}/>)}
      {points.map(([x,y],i)=><g key={i}>
        <circle className="neural-ring" cx={x} cy={y} r={i%4===0?9:5} style={{animationDelay:`-${i*.42}s`}}/>
        <circle className="neural-node" cx={x} cy={y} r={i%5===0?3:2} style={{animationDelay:`-${i*.35}s`}}/>
      </g>)}
    </svg>
    <span className="constellation-label label-a">01 / INTELLIGENCE</span>
    <span className="constellation-label label-b">02 / CREATIVITY</span>
    <span className="constellation-label label-c">03 / EXPLORATION</span>
  </div>;
}

export default function AmbientMagic() {
  const progressRef = useRef(null);
  useEffect(() => {
    let frame = 0;
    const root = document.documentElement;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if(progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY/max) : 0})`;
    };
    const onScroll = () => { if(!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if(reduced || coarse) return () => {
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onScroll);
      if(frame) window.cancelAnimationFrame(frame);
    };
    let pointerFrame = 0;
    const onPointer = e => {
      if(pointerFrame) return;
      const x=e.clientX,y=e.clientY;
      pointerFrame=window.requestAnimationFrame(()=>{
        root.style.setProperty('--pointer-x',x+'px');
        root.style.setProperty('--pointer-y',y+'px');
        pointerFrame=0;
      });
    };
    document.addEventListener('pointermove',onPointer,{passive:true});
    const magnets = document.querySelectorAll('[data-magnetic]');
    const cleanups=[];
    magnets.forEach(el=>{
      const move=e=>{
        const b=el.getBoundingClientRect();
        const x=(e.clientX-b.left-b.width/2)*.13;
        const y=(e.clientY-b.top-b.height/2)*.18;
        el.style.setProperty('--magnet-x',x+'px');
        el.style.setProperty('--magnet-y',y+'px');
      };
      const reset=()=>{
        el.style.setProperty('--magnet-x','0px');
        el.style.setProperty('--magnet-y','0px');
      };
      el.addEventListener('pointermove',move);
      el.addEventListener('pointerleave',reset);
      cleanups.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);});
    });
    return ()=>{
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onScroll);
      document.removeEventListener('pointermove',onPointer);
      if(frame) window.cancelAnimationFrame(frame);
      if(pointerFrame) window.cancelAnimationFrame(pointerFrame);
      cleanups.forEach(fn=>fn());
    };
  },[]);
  return <>
    <div className="scroll-progress" aria-hidden="true"><span ref={progressRef}/></div>
    <div className="pointer-glow" aria-hidden="true"/>
  </>;
}
