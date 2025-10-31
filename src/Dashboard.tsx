import React, { useMemo, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const RAW = [
  { id:'SAL', name:'Sudarshan AI Labs', type:'Service+Automation', effectiveMonthlyINR:1399, noCode:7.5, automation:9.0, msmefriendly:9.5, pros:['Low pricing','Hindi support','AI automations'], cons:['Brand awareness','Scaling ops'] },
  { id:'DUKAAN', name:'Dukaan', type:'Store SaaS', effectiveMonthlyINR:1200, noCode:8.5, automation:7.0, msmefriendly:8.0, pros:['Easy setup','ONDC'], cons:['Customization limits'] },
  { id:'DOTPE', name:'DotPe', type:'Omnichannel/POS', effectiveMonthlyINR:2000, noCode:7.5, automation:8.0, msmefriendly:7.5, pros:['POS strong'], cons:['Opaque pricing'] },
  { id:'ONDC', name:'ONDC (Network)', type:'Open Network', effectiveMonthlyINR:0, noCode:6.0, automation:8.0, msmefriendly:9.0, pros:['Govt-backed'], cons:['Learning curve'] },
]

const currency=(n:number)=>`₹${n.toLocaleString('en-IN')}`
const ACCENT='#22d3ee'

export default function Dashboard(){
  const [query,setQuery]=useState('')
  const data=useMemo(()=> RAW.filter(r=> r.name.toLowerCase().includes(query.toLowerCase())),[query])
  const bar=useMemo(()=> data.map(d=>({ name:d.name, value:d.effectiveMonthlyINR })),[data])
  return (<div style={{minHeight:'100vh',background:'#0b1220',color:'#e2e8f0',padding:'24px'}}>
    <h1 style={{fontSize:28,fontWeight:800,backgroundImage:'linear-gradient(90deg,#22d3ee,#a78bfa,#fbbf24)',WebkitBackgroundClip:'text',color:'transparent'}}>MSME Competitor Intelligence (Neon)</h1>
    <p style={{color:'#7dd3fc'}}>If your Netlify build showed a starter, this replaces it with the dashboard.</p>
    <div style={{marginTop:12}}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search platform...' style={{padding:'8px 12px',borderRadius:12,border:'1px solid #1f2a44',background:'rgba(255,255,255,0.05)',color:'#e2e8f0'}}/></div>
    <section style={{marginTop:24,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:16,padding:16}}><h2 style={{marginBottom:8}}>Effective Monthly Cost (₹)</h2><div style={{height:300}}><ResponsiveContainer><BarChart data={bar}><CartesianGrid strokeDasharray='3 3' stroke='#1f2a44'/><XAxis dataKey='name' interval={0} tick={{fontSize:12,fill:'#a5b4fc'}}/><YAxis tick={{fill:'#a5b4fc'}}/><Tooltip contentStyle={{background:'#0b1220',border:'1px solid rgba(255,255,255,0.2)',color:'#e2e8f0'}} formatter={(v)=>currency(v as number)}/><Bar dataKey='value' fill={ACCENT} radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></div></section>
    <section style={{marginTop:24,display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>
      {data.map(d=>(<div key={d.id} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:16,padding:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontWeight:700}}>{d.name}</div><div style={{fontSize:12,color:'#93c5fd'}}>{d.type}</div></div><div style={{textAlign:'right'}}><div style={{fontSize:12,color:'#7dd3fc'}}>Effective Monthly</div><div style={{fontWeight:800,color:'#fff'}}>{currency(d.effectiveMonthlyINR)}</div></div></div>
        <div style={{marginTop:8,fontSize:12,color:'#bae6fd'}}>No-code: {d.noCode} • Automation: {d.automation} • MSME: {d.msmefriendly}</div>
        <div style={{marginTop:8,fontSize:13}}><b>Pros:</b> {d.pros.join(', ')}</div>
        <div style={{fontSize:13}}><b>Cons:</b> {d.cons.join(', ')}</div>
      </div>))}
    </section>
  </div>)
}
