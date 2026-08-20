'use client';
import Link from 'next/link';
import { CalendarDays, MoreHorizontal } from 'lucide-react';
import { Task } from '../lib/types';
import { Avatar } from './Avatar';
const priority:Record<string,string>={urgent:'p-urgent',high:'p-high',medium:'p-medium',low:'p-low',none:'p-none'};
export function TaskCard({task}:{task:Task}){return <Link href={`/tasks/${task.id}`} className="task-card block"><div className="flex items-start gap-2"><div className="task-title flex-1">{task.title}</div><MoreHorizontal size={13} className="muted"/></div><div className="flex items-center mt-2"><span className={`priority ${priority[task.priority]}`}>▴ {task.priority==='none'?'No Priority':task.priority}</span><div className="ml-auto flex items-center gap-1"><Avatar size="xs" name={task.team||'Dexter'}/></div></div><div className="mt-3 flex flex-wrap gap-1">{task.labels.split(',').filter(Boolean).slice(0,2).map(x=><span className="chip" key={x}>◇ {x}</span>)}{task.dueDate&&<span className="chip due"><CalendarDays size={9}/>{new Date(task.dueDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short'})}</span>}</div></Link>}
