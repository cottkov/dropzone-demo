 "use client";
import { useMemo, useState } from "react";
import { ArrowDownUp, ArrowRight, Boxes, ChevronDown, Coins, Flame, Menu, Package, Plus, Shield, Sparkles, UserRound, X } from "lucide-react";

type Skin = { name:string; weapon:string; value:number; icon:string; color:string };
type CaseItem = { name:string; price:number; theme:string; icon:string; tag?:string; drops:Skin[] };
const skins:Skin[]=[
{name:"Asiimov",weapon:"AWP",value:42.5,icon:"🎯",color:"#f28b38"},
{name:"Neo-Noir",weapon:"M4A4",value:31.8,icon:"🌌",color:"#d36bc9"},
{name:"Printstream",weapon:"USP-S",value:18.2,icon:"⚪",color:"#e8e8e8"},
{name:"Vulcan",weapon:"AK-47",value:56.4,icon:"🐺",color:"#54a9e8"},
{name:"Mecha Industries",weapon:"M4A1-S",value:14.7,icon:"🤖",color:"#e4d9bc"},
{name:"Doppler",weapon:"★ Karambit",value:245,icon:"💎",color:"#b27aff"},
{name:"Redline",weapon:"AK-47",value:8.9,icon:"🔻",color:"#e85d62"},
{name:"Water Elemental",weapon:"Glock-18",value:6.4,icon:"🌊",color:"#52c7d8"}];
const rotate=(n:number)=>[...skins.slice(n),...skins.slice(0,n)];
const cases:CaseItem[]=[
{name:"Neon Dreams",price:29,theme:"purple",icon:"🌌",tag:"ХИТ",drops:rotate(0)},
{name:"Dragon Lore",price:79,theme:"gold",icon:"🐉",tag:"ТОП",drops:rotate(2)},
{name:"Cyber Strike",price:49,theme:"blue",icon:"⚡",drops:rotate(4)},
{name:"Redline",price:19,theme:"red",icon:"🔥",drops:rotate(6)},
{name:"Glacier",price:99,theme:"ice",icon:"❄️",drops:rotate(1)},
{name:"Lucky Seven",price:7,theme:"green",icon:"🍀",drops:rotate(3)}];

export default function Home(){
 const [balance,setBalance]=useState(100000),[inventory,setInventory]=useState<Skin[]>([]),[active,setActive]=useState<CaseItem|null>(null);
 const [result,setResult]=useState<Skin|null>(null),[rolling,setRolling]=useState(false),[tab,setTab]=useState("cases");
 const [target,setTarget]=useState<Skin|null>(null),[notice,setNotice]=useState("");
 const total=useMemo(()=>inventory.reduce((a,s)=>a+s.value,0),[inventory]);
 function openCase(c:CaseItem){
  if(rolling)return;if(balance<c.price){setNotice("Недостаточно демо-баланса.");return;}
  setBalance(v=>+(v-c.price).toFixed(2));setActive(c);setResult(null);setRolling(true);setNotice("");
  window.setTimeout(()=>{const drop=c.drops[Math.floor(Math.random()*c.drops.length)];setResult(drop);setInventory(v=>[drop,...v]);setRolling(false);},1700);
 }
 function sell(s:Skin){setInventory(v=>{const i=v.indexOf(s);return i<0?v:v.filter((_,n)=>n!==i)});setBalance(v=>+(v+s.value).toFixed(2));}
 function upgrade(){
  if(!target){setNotice("Сначала выбери предмет из инвентаря.");return;}
  if(balance<10){setNotice("Для апгрейда нужно минимум 10 ₽.");return;}
  setBalance(v=>+(v-10).toFixed(2));const win=Math.random()<.32;
  if(win){const prize=skins.filter(s=>s.value>target.value).sort((a,b)=>a.value-b.value)[0]||skins[5];setInventory(v=>[prize,...v.filter(x=>x!==target)]);setNotice(`Успех! Получен ${prize.weapon} ${prize.name}.`);}
  else{setInventory(v=>v.filter(x=>x!==target));setNotice("Не повезло — предмет потерян в демо-режиме.");}
  setTarget(null);
 }
 return <main>
 <header className="topbar"><a className="brand" href="#"><span className="brand-mark">D</span><span>DROP<span className="brand-accent">ZONE</span><small>CS2 CASES</small></span></a>
 <nav className="nav"><button className={tab==="cases"?"selected":""} onClick={()=>setTab("cases")}><Boxes size={16}/> Кейсы</button><button className={tab==="upgrade"?"selected":""} onClick={()=>setTab("upgrade")}><ArrowDownUp size={16}/> Апгрейд</button><button className={tab==="contracts"?"selected":""} onClick={()=>setTab("contracts")}><Sparkles size={16}/> Контракты</button></nav>
 <div className="top-actions"><span className="online"><i/> 2 481 онлайн</span><button className="balance"><Coins size={16}/>{balance.toLocaleString('ru-RU')} ₽ <Plus size={15}/></button><button className="avatar"><UserRound size={18}/></button></div><button className="mobile-menu"><Menu/></button></header>
 <section className="hero"><div className="hero-copy"><div className="eyebrow"><span/> НОВАЯ КОЛЛЕКЦИЯ УЖЕ ЗДЕСЬ</div><h1>ТВОЙ ДРОП.<br/><em>ТВОЯ ИСТОРИЯ.</em></h1><p>Открывай кейсы, лови редкие скины и собирай инвентарь мечты.</p><button className="primary" onClick={()=>document.getElementById("case-list")?.scrollIntoView({behavior:"smooth"})}>Выбрать кейс <ArrowRight size={17}/></button></div>
 <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-glow"/><div className="hero-gem">💎</div><div className="floating-card card-a"><span>★</span><b>KNIFE DROP</b><small>RARE ITEM</small></div><div className="floating-card card-b"><span>✦</span><b>NEW SKINS</b><small>COLLECTION</small></div><div className="hero-label">DROP <strong>01</strong></div></div></section>
 <div className="ticker"><span><Flame size={15}/> LIVE DROPS</span><div>★ Karambit Doppler <b>245 ₽</b>　 ·　 AWP Asiimov <b>42,50 ₽</b>　 ·　 AK-47 Vulcan <b>56,40 ₽</b>　 ·　 M4A4 Neo-Noir <b>31,80 ₽</b></div></div>
 <section className="content" id="case-list">
 {tab==="cases"&&<><div className="section-head"><div><div className="eyebrow">ВЫБИРАЙ СВОЙ ШАНС</div><h2>Популярные кейсы</h2><p>Каждый кейс — новые возможности для твоего инвентаря.</p></div><div className="sort-pill">Все кейсы <ChevronDown size={15}/></div></div>
 <div className="case-grid">{cases.map((c,i)=><article className={`case-card ${c.theme}`} key={c.name}><div className="case-top">{c.tag&&<span className="case-tag">{c.tag}</span>}<span className="case-number">CASE / 0{i+1}</span></div><div className="case-art"><div className="case-halo"/><div className="case-icon">{c.icon}</div><div className="case-cube"/></div><div className="case-info"><div><h3>{c.name}</h3><span>{c.drops.length} возможных предметов</span></div><button className="open-btn" onClick={()=>openCase(c)}>Открыть <b>{c.price.toLocaleString('ru-RU')} ₽</b></button></div></article>)}</div></>}
 {tab==="upgrade"&&<><div className="section-head"><div><div className="eyebrow">ПОВЫШАЙ СТАВКИ</div><h2>Апгрейд скинов</h2><p>Попробуй получить предмет дороже. Это симуляция.</p></div></div><div className="upgrade-panel"><div className="upgrade-side"><span className="mini-label">ТВОЙ ПРЕДМЕТ</span><div className="upgrade-item">{target?<><b>{target.icon}</b><strong>{target.weapon} {target.name}</strong><small>{target.value.toLocaleString('ru-RU')} ₽</small></>:<><Package size={34}/><strong>Выбери предмет ниже</strong></>}</div></div><div className="upgrade-center"><div className="upgrade-arrow"><ArrowDownUp size={28}/></div><strong>32%</strong><small>ШАНС УСПЕХА</small><button className="primary" onClick={upgrade}>Прокачать за 10 ₽</button></div><div className="upgrade-side"><span className="mini-label">ЦЕЛЬ АПГРЕЙДА</span><div className="upgrade-item target"><b>💎</b><strong>Редкий предмет</strong><small>Стоимость выше</small></div></div></div><h3 className="subhead">Выбери предмет из инвентаря</h3><div className="skin-grid">{inventory.map((s,i)=><button className={`skin-card ${target===s?"chosen":""}`} key={i} onClick={()=>setTarget(s)}><b>{s.icon}</b><strong>{s.weapon} {s.name}</strong><small>{s.value.toLocaleString('ru-RU')} ₽</small></button>)}</div></>}
 {tab==="contracts"&&<><div className="section-head"><div><div className="eyebrow">ОБЪЕДИНИ ПРЕДМЕТЫ</div><h2>Контракты</h2><p>Обменивай несколько скинов на один новый — скоро.</p></div></div><div className="empty-state"><Sparkles size={34}/><h3>Контракты скоро появятся</h3><p>Собирай предметы в кейсах — они пригодятся для обмена.</p><button className="primary" onClick={()=>setTab("cases")}>К кейсам <ArrowRight size={16}/></button></div></>}
 </section>
 <section className="inventory-section"><div className="section-head"><div><div className="eyebrow">ТВОЯ КОЛЛЕКЦИЯ</div><h2>Инвентарь <span className="count">{inventory.length}</span></h2></div><div className="inventory-total"><span>Общая стоимость</span><strong>{total.toLocaleString('ru-RU')} ₽</strong></div></div>
 {inventory.length===0?<div className="empty-inventory"><Package size={24}/><span>Здесь появятся твои первые дропы. Открой кейс, чтобы начать!</span></div>:<div className="skin-grid">{inventory.map((s,i)=><article className="skin-card" key={`${s.name}-${i}`}><b>{s.icon}</b><strong>{s.weapon} {s.name}</strong><small>{s.value.toLocaleString('ru-RU')} ₽</small><button onClick={()=>sell(s)}>Продать</button></article>)}</div>}</section>
 <footer><a className="brand" href="#"><span className="brand-mark">D</span><span>DROP<span className="brand-accent">ZONE</span><small>CS2 CASES</small></span></a><span>Демо-проект · Все балансы и предметы виртуальные</span><div><Shield size={15}/> Безопасная демо-среда</div></footer>
 {notice&&<button className="toast" onClick={()=>setNotice("")}>{notice}<X size={15}/></button>}
 {active&&<div className="modal-backdrop" onClick={()=>!rolling&&setActive(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>!rolling&&setActive(null)}><X/></button><div className="eyebrow">DROPZONE / CASE OPENING</div><h2>{result?"ТВОЙ ДРОП!":rolling?"ОТКРЫВАЕМ КЕЙС...":"ОТКРЫТИЕ КЕЙСА"}</h2><div className={`roulette ${rolling?"spinning":""}`}>{result?<div className="result-item"><b>{result.icon}</b><strong>{result.weapon} | {result.name}</strong><span style={{color:result.color}}>{result.value.toLocaleString('ru-RU')} ₽</span></div>:<div className="roulette-strip">{[...active.drops,...active.drops,...active.drops].map((s,i)=><div className="roulette-item" key={i}><b>{s.icon}</b><span>{s.weapon}</span></div>)}</div>}</div>{result?<><p className="modal-caption">Предмет добавлен в твой инвентарь</p><button className="primary wide" onClick={()=>setActive(null)}>Отлично!</button></>:<p className="modal-caption">Удачи! Пусть выпадет что-то редкое.</p>}</div></div>}
 </main>;
}
