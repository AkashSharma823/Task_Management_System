'use client';
import { useEffect, useRef, useState } from 'react';
import { LoaderCircle, Sparkles } from 'lucide-react';
import { useApp } from './AppProvider';

export function Login(){
  const {login, loginWithGoogle} = useApp();
  const [busy,setBusy]=useState(false);
  const [googleBusy,setGoogleBusy]=useState(false);
  const [error,setError]=useState('');
  const googleRef=useRef<HTMLDivElement>(null);
  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const go=async()=>{
    setBusy(true); setError('');
    try{await login()}
    catch{setError('Backend is unavailable. Start NestJS on port 4000.')}
    finally{setBusy(false)}
  };

  useEffect(()=>{
    if(!clientId || !googleRef.current) return;
    let mounted=true;
    const render=()=>{
      if(!mounted || !googleRef.current || !window.google) return;
      googleRef.current.innerHTML='';
      window.google.accounts.id.initialize({
        client_id:clientId,
        ux_mode:'popup',
        callback:async response=>{
          setGoogleBusy(true); setError('');
          try{await loginWithGoogle(response.credential)}
          catch(error){setError(error instanceof Error ? error.message : 'Google login failed. Please try again.')}
          finally{setGoogleBusy(false)}
        },
      });
      window.google.accounts.id.renderButton(googleRef.current,{
        type:'standard', theme:'outline', size:'medium', text:'signin_with', shape:'pill', logo_alignment:'left', width:260,
      });
    };

    if(window.google){render();return ()=>{mounted=false;};}
    const existing=document.querySelector('script[data-google-identity]') as HTMLScriptElement|null;
    if(existing){existing.addEventListener('load',render);return ()=>{mounted=false;existing.removeEventListener('load',render);};}
    const script=document.createElement('script');
    script.src='https://accounts.google.com/gsi/client';
    script.async=true; script.defer=true; script.dataset.googleIdentity='true';
    script.onload=render;
    document.head.appendChild(script);
    return ()=>{mounted=false;};
  },[clientId,loginWithGoogle]);

  return <main className="login-page">
    <div className="login-box">
      <div className="brand"><div className="brand-icon"><Sparkles size={13}/></div><span>Pyramid</span></div>
      <div className="login-card">
        <div className="login-title">Let&apos;s get back on track</div>
        <div className="muted login-subtitle">Enter your email below to login to your account.</div>
        <button onClick={go} disabled={busy || googleBusy} className="login-primary">{busy&&<LoaderCircle size={12} className="animate-spin"/>}Continue as Guest</button>
        {clientId ? <div className={`google-login-wrap ${googleBusy?'is-busy':''}`} ref={googleRef} aria-label="Login with Google"/> :
          <button type="button" className="login-google" disabled={googleBusy} onClick={()=>setError('Google login is not configured. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to frontend/.env.local.') }>
            <GoogleIcon /> Login with Google
          </button>}
        {googleBusy&&<div className="google-loading"><LoaderCircle size={11} className="animate-spin"/> Signing in with Google…</div>}
        {error&&<div className="login-error">{error}</div>}
      </div>
      <div className="login-terms">By clicking continue, you agree to<br/>our <u>Terms of Service</u> and <u>Privacy<br/>Policy</u></div>
    </div>
  </main>
}

function GoogleIcon(){
  return <svg className="google-icon" viewBox="0 0 18 18" aria-hidden="true">
    <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.796 2.714v2.258h2.908c1.702-1.567 2.684-3.879 2.684-6.613Z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.182l-2.908-2.258c-.806.54-1.834.86-3.048.86-2.344 0-4.327-1.584-5.036-3.712H.958v2.332A9 9 0 0 0 9 18Z"/>
    <path fill="#FBBC05" d="M3.964 10.708A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.708V4.96H.958A9 9 0 0 0 0 9c0 1.452.348 2.825.958 4.04l3.006-2.332Z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.507.455 3.44 1.347l2.581-2.581C13.463.891 11.426 0 9 0A9 9 0 0 0 .958 4.96l3.006 2.332C4.673 5.164 6.656 3.58 9 3.58Z"/>
  </svg>
}
