'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Check, ChevronRight, FileSearch, Landmark, Scale, ShieldCheck, Sparkles } from 'lucide-react'

const features = [
  { icon: BookOpen, title: 'Source grounded', text: 'Explore a small, cited demo corpus. Every legal reference shows where it came from.' },
  { icon: Sparkles, title: 'Explainable by design', text: 'Open PROVE IT to inspect the claim, legal basis, missing facts and uncertainty.' },
  { icon: ShieldCheck, title: 'Human escalation', text: 'Risk signals encourage professional support when a matter may need it.' },
]

export default function Home() {
  return <main className="landing">
    <header className="landing-nav"><Link href="/" className="brand"><span className="brand-mark"><Scale size={19}/></span><span>NYAYA <b>AI</b></span></Link><nav><a href="#approach">How it works</a><a href="#principles">Our principles</a></nav><Link className="button button-primary" href="/dashboard">Open demo <ArrowRight size={16}/></Link></header>
    <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> A CIVIC LEGAL INFORMATION PROTOTYPE</div><h1>Understand the law.<br/><em>Know your options.</em></h1><p className="hero-lede">A thoughtful starting point for navigating legal questions in India — with clear sources, visible uncertainty, and room to question the answer.</p><div className="hero-actions"><Link className="button button-primary button-large" href="/dashboard">Explore the demo <ArrowRight size={17}/></Link><a className="button button-quiet button-large" href="#approach">See how it works <ChevronRight size={16}/></a></div><div className="trust-line"><ShieldCheck size={15}/> Built around transparency, not legal certainty</div></div>
    <div className="hero-art" aria-label="Illustration of a balanced legal scale"><div className="art-grid"/><div className="art-card"><div className="art-top"><span className="art-icon"><Landmark size={18}/></span><span className="art-status"><span/> DEMO MODE</span></div><div className="art-rule"/><p className="art-label">A better first step</p><h2>Start with the facts.<br/>Follow the sources.</h2><div className="art-source"><span className="source-check"><Check size={13}/></span><span><b>Source-linked guidance</b><small>Every claim deserves a reason</small></span><ArrowRight size={16}/></div></div><span className="art-stamp">INDIA<br/>LEGAL<br/>CONTEXT</span></div></section>
    <div className="proof-strip"><span>DESIGNED FOR PEOPLE, NOT JUST PROMPTS</span><span><i/> Information, not legal advice</span><span><i/> Small, labelled demo corpus</span><span><i/> You can challenge the reasoning</span></div>
    <section className="feature-section" id="principles"><div className="section-heading"><div><div className="eyebrow">THE NYAYA APPROACH</div><h2>Helpful should also mean <em>honest.</em></h2></div><p>Legal questions rarely have one-click answers. NYAYA AI helps you see what is known, what is missing, and where the information came from.</p></div><div className="feature-grid">{features.map(({icon:Icon,title,text},i)=><article className="feature-card" key={title}><span className="feature-icon"><Icon size={19}/></span><span className="feature-index">0{i+1}</span><h3>{title}</h3><p>{text}</p><Link href="/dashboard">Explore <ArrowRight size={14}/></Link></article>)}</div></section>
    <section className="approach" id="approach"><div><div className="eyebrow">A CLEARER PATH FORWARD</div><h2>From a question to<br/><em>a better-informed next step.</em></h2></div><div className="steps"><div><span>01</span><b>Describe your situation</b><small>Share only what is relevant.</small></div><div><span>02</span><b>See what may matter</b><small>Identify missing facts and context.</small></div><div><span>03</span><b>Inspect the reasoning</b><small>Trace claims to a cited demo source.</small></div></div></section>
    <footer className="landing-footer"><Link href="/" className="brand"><span className="brand-mark"><Scale size={16}/></span><span>NYAYA <b>AI</b></span></Link><p>Academic decision-support prototype. Not legal advice.</p><Link href="/privacy">Privacy &amp; limitations <ArrowRight size={14}/></Link></footer>
  </main>
}
