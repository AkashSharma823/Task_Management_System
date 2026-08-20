'use client';
import Link from 'next/link';
import { ChevronDown, ChevronRight, LayoutGrid, FolderKanban, Palette, Settings, Sun, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useApp } from './AppProvider';
import { Avatar } from './Avatar';

const accents=[['amber','#d97706'],['blue','#2563eb'],['pink','#db2777'],['rose','#e11d48'],['emerald','#059669'],['black','#111111']] as const;

export function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){
 const path=usePathname();
 const {user,theme,setTheme,accent,setAccent,logout}=useApp();
 const [menu,setMenu]=useState(false);
 const [submenu,setSubmenu]=useState<'theme'|'color'|null>(null);

 const toggleMenu=()=>{
   setMenu(v=>!v);
   setSubmenu(null);
 };

 return <>
  <aside className={`sidebar ${open?'open':''} fixed md:static z-50 h-screen w-[145px] md:w-[145px] lg:w-[155px] shrink-0`}>
   <div className="h-full flex flex-col">
    {/* Account controls are intentionally at the top, matching the reference UI. */}
    <div className="sidebar-account relative px-2 pt-2 pb-3 border-b border-[var(--border)]">
      <button
        onClick={toggleMenu}
        aria-expanded={menu}
        aria-haspopup="menu"
        className="w-full rounded-lg p-2 flex items-center gap-2 hover:bg-[var(--muted-surface)] text-left"
      >
        <Avatar size="sm" name={user?.name||'Dexter'}/>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold truncate">{user?.name||'Dexter'}</div>
          <div className="text-[8px] muted truncate">{user?.email||'guest@dexter.local'}</div>
        </div>
        <ChevronDown className={`ml-auto shrink-0 transition-transform ${menu?'rotate-180':''}`} size={11}/>
      </button>

      {menu && <div className="account-pop card shadow-xl" role="menu">
        <div className="account-head">
          <Avatar size="md" name={user?.name||'Dexter'}/>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold truncate">{user?.name||'Dexter'}</div>
            <div className="text-[8px] muted truncate">{user?.email||'guest@dexter.local'}</div>
          </div>
        </div>
        <Link href="/settings/profile" className="menu-row" onClick={onClose}>
          <Settings size={12}/>Settings
        </Link>
        <button className="menu-row" onClick={()=>setSubmenu(submenu==='theme'?null:'theme')}>
          <span className="flex items-center gap-2"><Sun size={12}/>Change Theme</span>
          <ChevronRight size={11}/>
        </button>
        {submenu==='theme'&&<div className="submenu">
          <button className="menu-row" onClick={()=>setTheme('light')}>
            <span className="flex items-center gap-2"><Sun size={11}/>Light</span>
            {theme==='light'&&<span>✓</span>}
          </button>
          <button className="menu-row" onClick={()=>setTheme('dark')}>
            <span className="flex items-center gap-2">☾ Dark</span>
            {theme==='dark'&&<span>✓</span>}
          </button>
        </div>}
        <button className="menu-row" onClick={()=>setSubmenu(submenu==='color'?null:'color')}>
          <span className="flex items-center gap-2"><Palette size={12}/>Color Mode</span>
          <ChevronRight size={11}/>
        </button>
        {submenu==='color'&&<div className="submenu">
          {accents.map(([name,val])=><button key={name} className="menu-row" onClick={()=>setAccent(name)}>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{background:val}}/>{name[0].toUpperCase()+name.slice(1)}</span>
            {accent===name&&<span>✓</span>}
          </button>)}
        </div>}
        <button className="menu-row text-rose-500" onClick={logout}>
          <span className="flex items-center gap-2"><LogOut size={12}/>Log out</span>
        </button>
      </div>}
    </div>

    <div className="px-2 pt-4">
      <div className="px-2 mb-2 text-[9px] muted flex items-center justify-between">Workspace <ChevronDown size={11}/></div>
      <Link href="/" className={`nav-item ${path==='/'?'active':''}`} onClick={onClose}><LayoutGrid size={13}/>Tasks</Link>
      <Link href="/projects" className={`nav-item ${path.startsWith('/projects')?'active':''}`} onClick={onClose}><FolderKanban size={13}/>Projects</Link>
    </div>
   </div>
  </aside>
  {open&&<div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={onClose}/>} 
 </>
}
