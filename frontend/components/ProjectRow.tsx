import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { Project } from '../lib/types';
export function ProjectRow({project}:{project:Project}){return <div className="grid grid-cols-[minmax(190px,1fr)_120px_100px_120px_40px] items-center border-t border-[var(--border)] px-3 py-3 text-[10px]"><Link href={`/projects/${project.id}`} className="hover:underline">{project.name}</Link><span className="capitalize">▴ {project.priority}</span><span><div className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500"/></span><span>{project.dueDate?new Date(project.dueDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'—'}</span><MoreHorizontal size={14} className="muted"/></div>}
