'use client'

import { useEffect, useMemo, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Menu, X, Star, ChevronRight } from 'lucide-react'
import technologiesData from '@/data/technologies.json'
import 'react-toastify/dist/ReactToastify.css'

type Technology = (typeof technologiesData)[number]

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-text-xFRJ0fOqpJjWAxQHFAAwjwLpmAOYXg.png'
const heroImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-stack-FhOoHZnE3qTyHvIptrbKqs1pYPzFu6.png'

function Logo({ footer = false }: { footer?: boolean }) {
  return <img src={logo} alt="Dev Stack" className={footer ? 'mx-auto h-6 w-auto sm:mx-0 sm:h-9' : 'h-5 w-auto sm:h-9'} />
}

function TechnologyCard({ technology, selected, onAdd }: { technology: Technology; selected: boolean; onAdd: () => void }) {
  return (
    <article className={`flex min-h-[148px] flex-col rounded-xl border bg-white p-3 transition hover:-translate-y-0.5 sm:min-h-[238px] sm:rounded-2xl sm:p-5 ${selected ? 'border-[#e3a1bd] shadow-[0_3px_12px_rgba(209,94,143,0.12)] hover:shadow-[0_8px_24px_rgba(209,94,143,0.18)]' : 'border-slate-200 shadow-[0_3px_12px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)]'}`}>
      <div className="flex items-start justify-between gap-3">
        <img src={technology.icon} alt="" className="h-5 w-5 object-contain sm:h-7 sm:w-7" />
        <span className="rounded-full bg-[#fff1f7] px-2.5 py-1 text-[9px] font-semibold text-[#d14d87]">{technology.badge}</span>
      </div>
      <h3 className="mt-3 text-[15px] font-bold text-slate-900 sm:mt-4 sm:text-base">{technology.name}</h3>
      <p className="mt-2 flex-1 text-[11px] leading-[17px] text-slate-400 sm:mt-2 sm:text-xs sm:leading-5">{technology.description}</p>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-400">
        <span className="rounded bg-slate-50 px-2 py-1">{technology.category}</span>
        <span>{technology.difficulty}</span>
        <span className="flex items-center gap-1 text-slate-500"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{technology.rating}</span>
      </div>
      <button disabled={selected} onClick={onAdd} className="mt-3 h-8 rounded-md bg-slate-950 text-[10px] font-semibold text-white transition hover:bg-slate-800 disabled:cursor-default disabled:bg-[#fff0f6] disabled:text-[#d14d87]">
        {selected ? '✓ Added to Stack' : 'Add to Stack'}
      </button>
    </article>
  )
}

function StackPanel({ stack, onRemove, onClear }: { stack: Technology[]; onRemove: (id: string) => void; onClear: () => void }) {
  return <aside className="h-fit rounded-xl border border-slate-100 bg-white p-3 shadow-[0_3px_14px_rgba(24,39,75,0.04)] sm:rounded-2xl sm:p-5 lg:sticky lg:top-24">
    <h2 className="text-sm font-bold text-slate-900">Your Stack</h2>
    <p className="mt-1 text-xs text-slate-400">{stack.length} Technology{stack.length === 1 ? '' : 'ies'} Selected</p>
    {stack.length === 0 ? <div className="mt-4 flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-200 text-xs text-slate-400">Your stack is empty.</div> : <div className="mt-4 space-y-2">{stack.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2"><img src={item.icon} alt="" className="h-5 w-5 object-contain sm:h-7 sm:w-7" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-800">{item.name}</p><p className="text-[9px] text-slate-400">{item.category}</p></div><button aria-label={`Remove ${item.name}`} onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-rose-500"><X className="h-4 w-4" /></button></div>)}</div>}
    <button onClick={onClear} disabled={stack.length === 0} className="mt-5 h-9 w-full rounded-md border border-rose-200 text-xs font-semibold text-rose-500 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50">Remove All</button>
  </aside>
}

export default function Home() {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [stack, setStack] = useState<Technology[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => { setTechnologies(technologiesData); setLoading(false) }, 180)
    return () => window.clearTimeout(timer)
  }, [])

  const stackIds = useMemo(() => new Set(stack.map((item) => item.id)), [stack])
  const addToStack = (technology: Technology) => {
    if (stackIds.has(technology.id)) { toast.warn(`${technology.name} is already in your stack.`); return }
    setStack((current) => [...current, technology]); toast.success(`${technology.name} added to your stack.`)
  }
  const removeFromStack = (id: string) => { const item = stack.find((technology) => technology.id === id); setStack((current) => current.filter((technology) => technology.id !== id)); if (item) toast.info(`${item.name} removed from your stack.`) }
  const clearStack = () => { if (stack.length) { setStack([]); toast.info('Your stack has been cleared.') } }

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center" aria-busy="true" aria-live="polite">
      <div className="flex flex-col items-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-theme shadow-[0_12px_35px_rgba(209,94,143,0.2)]">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-white/35 border-t-white" />
        </div>
        <h1 className="mt-6 text-xl font-extrabold tracking-tight text-slate-950">Dev Stack</h1>
        <p className="mt-2 text-sm text-slate-400">Preparing your development stack...</p>
        <div className="mt-6 h-1.5 w-36 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-theme" /></div>
      </div>
    </main>
  }

  return <div className="min-h-screen bg-white text-slate-900">
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur"><div className="relative mx-auto flex h-[44px] max-w-[1175px] items-center justify-between px-3 sm:h-[68px] sm:px-5 lg:px-0">
      <button className="md:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(!mobileOpen)}><Menu className="h-7 w-7 text-slate-500" strokeWidth={1.5} /></button><a href="#home" className="absolute left-1/2 -translate-x-1/2 md:static md:mr-auto"><Logo /></a>
      <nav className={`${mobileOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-[52px] flex-col gap-5 border-b border-slate-100 bg-white p-6 text-sm md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:ml-auto md:mr-8 sm:top-[68px]`}><a className="font-semibold text-pink-600" href="#home">Home</a><a href="#technologies">Technologies</a><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      <div className="flex items-center gap-3 text-xs font-medium sm:gap-5"><a href="#signin">Sign In</a><a href="#signup" className="rounded-full bg-gradient-theme px-4 py-2 text-white shadow-sm sm:px-5 sm:py-2.5">Sign Up</a></div>
    </div></header>
    <main>
      <section id="home" className="mx-auto flex max-w-[1175px] flex-col items-center gap-3 px-3 pb-8 pt-10 text-center sm:gap-7 sm:px-5 sm:pb-16 sm:pt-20 lg:flex-row lg:justify-between lg:gap-8 lg:px-0 lg:pb-20 lg:pt-28 lg:text-left"><div className="max-w-[540px]"><h1 className="text-[30px] font-extrabold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-5xl md:text-[54px]">Build Your Ideal<br /><span className="whitespace-nowrap bg-gradient-theme bg-clip-text text-transparent">Development Stack</span></h1><p className="mx-auto mt-4 max-w-[390px] text-[13px] leading-[21px] text-slate-500 sm:mt-6 sm:max-w-[490px] sm:text-[19px] sm:leading-8 lg:mx-0 lg:text-base lg:leading-6">Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.</p><div className="mt-6 grid w-full max-w-[330px] grid-cols-2 gap-3 sm:mt-8 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center lg:mt-10 lg:justify-start"><a href="#technologies" className="rounded-lg bg-gradient-theme px-2 py-3 text-[11px] font-semibold text-white sm:rounded-xl sm:px-4 sm:py-3 sm:text-xs">Explore Technologies</a><a href="#about" className="rounded-lg border border-slate-200 px-2 py-3 text-[11px] font-medium text-slate-600 sm:rounded-xl sm:px-7 sm:py-3 sm:text-xs">Learn More</a></div></div><img src={heroImage} alt="Abstract development stack illustration" className="-translate-y-5 block w-[230px] max-w-[calc(100vw-2rem)] scale-[1.4] object-contain sm:translate-y-0 sm:scale-100 sm:w-[360px] lg:w-[330px]" /></section>
      <section id="technologies" className="mx-auto max-w-[1175px] scroll-mt-24 px-3 pb-16 sm:px-5 sm:pb-28 lg:px-0"><div className="mb-8"><h2 className="text-[23px] font-extrabold tracking-tight text-slate-900 sm:text-3xl">Explore the <span className="bg-gradient-theme bg-clip-text text-transparent">Technologies</span></h2><p className="mt-2 text-[11px] text-slate-500 sm:mt-2 sm:text-sm">Pick one technology per category to build your ideal stack.</p></div>{loading ? <div className="flex min-h-80 items-center justify-center text-sm text-slate-400"><div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-pink-500" />Loading technologies...</div> : <div className="grid items-start gap-7 lg:grid-cols-[1fr_238px]"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{technologies.map((technology) => <TechnologyCard key={technology.id} technology={technology} selected={stackIds.has(technology.id)} onAdd={() => addToStack(technology)} />)}</div><StackPanel stack={stack} onRemove={removeFromStack} onClear={clearStack} /></div>}</section>
    </main>
    <footer id="contact" className="border-t border-slate-100 bg-white"><div className="mx-auto max-w-[1175px] px-3 py-7 sm:px-5 sm:py-12 lg:px-0"><div><div className="text-center md:text-left"><Logo footer /><p className="mx-auto mt-3 max-w-xs text-[9px] leading-[15px] text-slate-400 sm:mt-4 sm:text-xs sm:leading-5 md:mx-0">Curated tools, technologies, and resources for developers building modern software.</p><div className="mt-3 flex justify-center gap-4 text-[9px] font-medium text-slate-500 sm:mt-5 sm:gap-5 sm:text-xs md:justify-start"><a href="#github">GitHub</a><a href="#twitter">Twitter</a><a href="#linkedin">LinkedIn</a></div></div></div><div className="mt-7 flex flex-col justify-between gap-3 border-t border-slate-100 pt-5 text-[9px] text-slate-400 sm:mt-12 sm:pt-6 sm:text-[11px] sm:flex-row"><span>© 2026 Dev Stack. All rights reserved.</span><span className="flex gap-6"><a href="#privacy">Privacy</a><a href="#terms">Terms</a></span></div></div></footer>
    <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar theme="light" />
  </div>
}
