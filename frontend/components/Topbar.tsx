'use client';
import { useState } from 'react';
import { Menu, Search, Filter, Plus, MoreHorizontal, Rows3 } from 'lucide-react';
import { FieldsMenu, FilterMenu } from './TaskFilters';

export function Topbar({
  onMenu,onAdd,onSearch,fieldsOpen,onFields,filtersOpen,onFilter,fieldsState,setFieldsState,filter,setFilter,view,setView
}:{
  onMenu:()=>void;
  onAdd:()=>void;
  onSearch:(v:string)=>void;
  fieldsOpen:boolean;
  onFields:()=>void;
  filtersOpen:boolean;
  onFilter:()=>void;
  fieldsState:string[];
  setFieldsState:(v:string[])=>void;
  filter:{field:string;value:string}|null;
  setFilter:(v:{field:string;value:string}|null)=>void;
  view:'board'|'list';
  setView:(v:'board'|'list')=>void;
}){
  const [searchOpen,setSearchOpen]=useState(false);
  return <div className="topbar">
    <button className="icon-btn md:hidden" onClick={onMenu} aria-label="Open menu"><Menu size={15}/></button>
    <div className="ml-auto flex items-center gap-1.5 relative">
      <div className="toolbar-pop-anchor">
        <button className={`toolbar-btn ${searchOpen?'selected':''}`} onClick={()=>setSearchOpen(v=>!v)} aria-label="Search" title="Search"><Search size={14}/></button>
        {searchOpen&&<div className="search-pop popover"><Search size={13}/><input autoFocus onChange={e=>onSearch(e.target.value)} placeholder="Search tasks"/></div>}
      </div>

      <div className="toolbar-pop-anchor">
        <button className={`toolbar-btn fields-trigger ${fieldsOpen?'selected':''}`} onClick={onFields} aria-label="Fields" title="Fields"><Rows3 size={13}/><span>Fields</span></button>
        {fieldsOpen&&<FieldsMenu selected={fieldsState} onChange={setFieldsState} view={view} setView={setView}/>} 
      </div>

      <div className="toolbar-pop-anchor">
        <button className={`toolbar-btn ${filtersOpen?'selected':''}`} onClick={onFilter} aria-label="Filter" title="Filter"><Filter size={14}/></button>
        {filtersOpen&&<FilterMenu filters={filter} onChange={setFilter}/>} 
      </div>

      <button className="primary-btn flex items-center gap-1" onClick={onAdd}><Plus size={12}/>Add Task</button>
      <button className="toolbar-btn" aria-label="More actions" title="More actions"><MoreHorizontal size={15}/></button>
    </div>
  </div>
}
