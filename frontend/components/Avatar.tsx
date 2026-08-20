import { UserCircle2 } from 'lucide-react';
export function Avatar({name='Dexter', size='sm'}:{name?:string;size?:'xs'|'sm'|'md'}){
 const cls=size==='xs'?'h-5 w-5 text-[7px]':size==='md'?'h-8 w-8 text-[10px]':'h-6 w-6 text-[8px]';
 return <div title={name} className={`${cls} shrink-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white flex items-center justify-center font-semibold shadow-sm`}>{name.slice(0,2).toUpperCase()}</div>
}
