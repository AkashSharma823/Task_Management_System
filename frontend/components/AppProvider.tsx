'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { guestLogin, googleLogin, tokenKey, userKey } from '../lib/api';
import { User } from '../lib/types';

type Theme = 'light'|'dark';
type Accent = 'amber'|'blue'|'pink'|'rose'|'emerald'|'black';
const accents:Record<Accent,string> = { amber:'#d97706', blue:'#2563eb', pink:'#db2777', rose:'#e11d48', emerald:'#059669', black:'#111111' };

type Ctx = {
  user:User|null; setUser:(u:User|null)=>void; theme:Theme; accent:Accent;
  setTheme:(t:Theme)=>void; setAccent:(a:Accent)=>void; loading:boolean;
  login:()=>Promise<void>; loginWithGoogle:(credential:string)=>Promise<void>; logout:()=>void;
};
const AppCtx = createContext<Ctx | null>(null);
export const useApp = () => { const c=useContext(AppCtx); if(!c) throw new Error('useApp outside provider'); return c; };

export function AppProvider({children}:{children:React.ReactNode}) {
  const [user,setUser] = useState<User|null>(null);
  const [theme,setThemeState]=useState<Theme>('light');
  const [accent,setAccentState]=useState<Accent>('blue');
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    try {
      const savedUser=localStorage.getItem(userKey);
      const savedTheme=localStorage.getItem('dexter_theme') as Theme|null;
      const savedAccent=localStorage.getItem('dexter_accent') as Accent|null;
      if(savedUser) setUser(JSON.parse(savedUser));
      if(savedTheme) setThemeState(savedTheme);
      if(savedAccent) setAccentState(savedAccent);
    } finally { setLoading(false); }
  },[]);

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme==='dark');
    document.documentElement.style.setProperty('--accent', accents[accent]);
    document.documentElement.style.setProperty('--accent-strong', accents[accent]);
  },[theme,accent]);

  const login=useCallback(async()=>{
    const result=await guestLogin();
    localStorage.setItem(tokenKey,result.accessToken);
    localStorage.setItem(userKey,JSON.stringify(result.user));
    setUser(result.user);
  },[]);

  const loginWithGoogle=useCallback(async(credential:string)=>{
    const result=await googleLogin(credential);
    localStorage.setItem(tokenKey,result.accessToken);
    localStorage.setItem(userKey,JSON.stringify(result.user));
    setUser(result.user);
  },[]);

  const logout=useCallback(()=>{
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
    setUser(null);
  },[]);

  const setTheme=useCallback((t:Theme)=>{ setThemeState(t); localStorage.setItem('dexter_theme',t); },[]);
  const setAccent=useCallback((a:Accent)=>{ setAccentState(a); localStorage.setItem('dexter_accent',a); },[]);
  const value=useMemo(()=>({user,setUser,theme,accent,setTheme,setAccent,loading,login,loginWithGoogle,logout}),[user,theme,accent,loading,login,loginWithGoogle,logout,setTheme,setAccent]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
