import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/portfolioData";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="min-h-svh overflow-x-hidden bg-[#090A0F] text-slate-100" data-testid="case-study-page">
      <header className="border-b border-white/[0.07] bg-[#090A0F]/90">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 hover:text-emerald-400" to="/"><ArrowLeft size={14}/> Back to portfolio</Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">case study / {project.number}</span>
        </div>
      </header>
      <main>
        <section className="border-b border-white/[0.07]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400"><span>{project.type}</span><span className="text-slate-600">/</span><span className="text-slate-500">{project.architecture}</span></div>
            <h1 className="mt-8 max-w-5xl font-heading text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.88] tracking-[-0.07em]">{project.name}</h1>
            <p className="mt-9 max-w-2xl font-body text-xl leading-relaxed text-slate-400">{project.context}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a className="inline-flex h-12 items-center gap-2 bg-emerald-400 px-5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#07110d] hover:bg-emerald-300" href={project.repository} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={15}/></a>
              <Link className="inline-flex h-12 items-center gap-2 border border-slate-700 px-5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-300 hover:border-slate-400 hover:text-white" to="/#contact">Discuss a similar system <ExternalLink size={14}/></Link>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">01 / system brief</p><h2 className="mt-6 max-w-sm font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.05em]">Built to be useful after the demo.</h2></div>
            <div><p className="max-w-2xl font-body text-lg leading-relaxed text-slate-300">{project.architectureNote}</p>
              <div className="mt-10 grid gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
                {project.metrics.map((metric) => <div className="bg-[#12151E] p-5" key={metric.label}><p className={`font-mono text-3xl ${project.accent==="sky"?"text-sky-400":"text-emerald-400"}`}>{metric.value}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">{metric.label}</p></div>)}
              </div>
            </div>
          </div>
        </section>
        <section className="border-y border-white/[0.07] bg-[#0d1017]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">02 / architecture walkthrough</p>
            <h2 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">A clear path from request to reliable state.</h2>
            <div className="mt-14 grid gap-px border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
              {project.layers.map(layer => <article className="bg-[#0d1017] p-7" key={layer.label}><p className="font-mono text-[10px] uppercase tracking-[0.17em] text-slate-500">{layer.label}</p><h3 className="mt-16 font-heading text-2xl font-semibold">{layer.title}</h3><p className="mt-4 font-body leading-relaxed text-slate-400">{layer.description}</p></article>)}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">03 / implementation notes</p><h2 className="mt-6 max-w-sm font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.05em]">Decisions that keep the system legible.</h2></div>
            <div><ul className="grid gap-5">{project.decisions.map(decision => <li className="flex gap-4 border-b border-white/[0.08] pb-5 font-body text-lg leading-relaxed text-slate-300" key={decision}><Check className="mt-1 shrink-0 text-emerald-400" size={17}/><span>{decision}</span></li>)}</ul>
            <div className="mt-10 flex flex-wrap gap-2">{project.tags.map(tag => <Badge className="rounded-none border border-slate-700 bg-transparent font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-slate-400" key={tag} variant="outline">{tag}</Badge>)}</div></div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/[0.07]"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-7 sm:px-8 lg:px-10"><Link className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 hover:text-emerald-400" to="/"><ArrowLeft size={13}/> All work</Link><a className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300 hover:text-white" href={project.repository} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a></div></footer>
    </div>
  );
}
