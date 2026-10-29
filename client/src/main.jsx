import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import App from './App';
import Demos from './Demos';
import './styles.css';
import './magic.css';
function ScrollReset(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo({top:0,behavior:'instant'})},[pathname]);return null}
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><ScrollReset/><Routes><Route path="/" element={<App/>}/><Route path="/lab/:id" element={<Demos/>}/><Route path="*" element={<div className="not-found"><p className="eyebrow">404 / A LITTLE OFF TRACK</p><h1>This idea hasn't<br/>been built yet.</h1><a className="button primary" href="/">Back to the portfolio ↗</a></div>}/></Routes></BrowserRouter></React.StrictMode>);
