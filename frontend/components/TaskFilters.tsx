'use client';
import { useState } from 'react';
import { Check, ChevronRight, Columns3, List, Circle, BarChart3, UsersRound, CalendarDays, Users, Tag, UserRound } from 'lucide-react';
const fields=['Priority','Members','Due Date','Labels','Status','Reporter'];
export function FieldsMenu({selected,onChange,view,setView}:{selected:string[];onChange:(v:string[])=>void;view:'board'|'list';setView:(v:'board'|'list')=>void}){
 return <div className="popover fields-pop">
  <div className="fields-view-toggle">
   <button onClick={()=>setView('list')} className={`field-view-btn ${view==='list'?'active':''}`}><List size={12}/>List</button>
   <button onClick={()=>setView('board')} className={`field-view-btn ${view==='board'?'active':''}`}><Columns3 size={12}/>Board</button>
  </div>
  <div className="fields-options">{fields.map(f=>{const on=selected.includes(f);return <button key={f} onClick={()=>onChange(on?selected.filter(x=>x!==f):[...selected,f])} className="menu-row"><span>{f}</span>{on?<Check size={12}/>:<span className="field-check"/>}</button>})}</div>
 </div>
}

const filterIcons:Record<string, any>={
 Status:Circle,
 Priority:BarChart3,
 Members:UsersRound,
 'Due Date':CalendarDays,
 Teams:Users,
 Labels:Tag,
 Reporter:UserRound,
};

export function FilterMenu({filters,onChange}:{filters:{field:string;value:string}|null;onChange:(v:{field:string;value:string}|null)=>void}){
 const [active,setActive]=useState(filters?.field||'Priority');
 const options:Record<string,string[]>={Status:['Backlog','To Do','Doing','Completed','On Hold'],Priority:['No Priority','Urgent','High','Medium','Low'],Members:['Dexter','CN','Unassigned'],'Due Date':['Today','This week','Next week','No due date'],Teams:['Development','Design','QA Team','Security','Product'],Labels:['Research','Design','Development','Testing','Deployment'],Reporter:['Admin','Designer','Dexter']};
 const ActiveIcon=filterIcons[active]||Circle;
 return <div className="filter-pop popover">
  <div className="filter-categories">
   {Object.keys(options).map(x=>{const Icon=filterIcons[x]||Circle; return <button key={x} className={`menu-row filter-category ${active===x?'active':''}`} onClick={()=>setActive(x)}>
    <span className="filter-category-label"><Icon size={12}/><span>{x}</span></span><ChevronRight size={11}/>
   </button>})}
  </div>
  <div className="filter-values">
   <div className="filter-value-title"><ActiveIcon size={11}/><span>{active}</span></div>
   {options[active].map(x=><button key={x} className={`menu-row filter-value ${filters?.field===active&&filters.value===x?'active':''}`} onClick={()=>onChange(filters?.field===active&&filters.value===x?null:{field:active,value:x})}><span>{x}</span>{filters?.field===active&&filters.value===x?<Check size={12}/>:null}</button>)}
  </div>
 </div>
}
