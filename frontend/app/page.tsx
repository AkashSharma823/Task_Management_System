'use client';
import { useApp } from '../components/AppProvider';
import { Login } from '../components/Login';
import { Workspace } from '../components/Workspace';

export default function Home(){const {user,loading}=useApp(); if(loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>; return user?<Workspace/>:<Login/>}
