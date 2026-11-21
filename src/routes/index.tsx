import { useEffect, useRef, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
  type ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";

import eshopPrototype from "@/assets/prototipo-eshop.png.asset.json";
import marksPrototype from "@/assets/prototipo-marks.png.asset.json";
import karinaPhoto from "@/assets/karina.png.asset.json";
import retroSlide01 from "@/assets/retro-slide-01.jpg.asset.json";
import retroSlide02 from "@/assets/retro-slide-02.jpg.asset.json";
import retroSlide03 from "@/assets/retro-slide-03.jpg.asset.json";
import retroSlide04 from "@/assets/retro-slide-04.jpg.asset.json";
import retroSlide05 from "@/assets/retro-slide-05.jpg.asset.json";
import retroSlide06 from "@/assets/retro-slide-06.jpg.asset.json";
import retroSlide07 from "@/assets/retro-slide-07.jpg.asset.json";
import retroSlide08 from "@/assets/retro-slide-08.jpg.asset.json";
import retroSlide09 from "@/assets/retro-slide-09.jpg.asset.json";
import retroSlide10 from "@/assets/retro-slide-10.jpg.asset.json";
import retroSlide11 from "@/assets/retro-slide-11.jpg.asset.json";

const retroSlides = [
  retroSlide01,
  retroSlide02,
  retroSlide03,
  retroSlide04,
  retroSlide05,
  retroSlide06,
  retroSlide07,
  retroSlide08,
  retroSlide09,
  retroSlide10,
  retroSlide11,
].map((slide, i) => ({
  src: slide.url,
  alt: `Slide ${i + 1} de 11 da apresentação Retrospectiva dos Representantes.`,
}));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karina Lima — Portfólio de produto" },
      {
        name: "description",
        content:
          "Estudos de caso de gestão de produto: decisões, trade-offs e impacto em marketplaces e plataformas internas de larga escala.",
      },
      { property: "og:title", content: "Karina Lima — Portfólio de produto" },
      {
        property: "og:description",
        content:
          "Estudos de caso de gestão de produto: decisões, trade-offs e impacto em marketplaces e plataformas internas de larga escala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const toolkit = [
  {
    dot: "bg-mintdeep",
    title: "Priorização de escopo",
    text: "Decidir o que resolver primeiro e o que não vale o esforço.",
    wide: false,
  },
  {
    dot: "bg-skydeep",
    title: "Discovery técnico",
    text: "Transformar pedido vago em requisitos concretos, com protótipo e validação.",
    wide: false,
  },
  {
    dot: "bg-butterdeep",
    title: "Modelagem de métricas de negócio",
    text: "Definir e interpretar métricas que realmente importam, mesmo sem dado real disponível.",
    wide: false,
  },
  {
    dot: "bg-mintdeep",
    title: "Gestão de stakeholders multi-nível",
    text: "Apresentar e validar ideias com liderança direta até head de esportes.",
    wide: false,
  },
  {
    dot: "bg-skydeep",
    title: "Design sensível a efeitos colaterais",
    text: "Antecipar como uma solução pode desmotivar ou prejudicar quem ela deveria ajudar.",
    wide: false,
  },
  {
    dot: "bg-butterdeep",
    title: "Diagnóstico orientado a dados",
    text: "Ir atrás de dado real de uso e custo pra dimensionar um problema antes de propor solução.",
    wide: false,
  },
];

function ExpandIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.2 2.2H2.2v4M9.8 13.8h4v-4M2.2 2.2l4.3 4.3M13.8 13.8 9.5 9.5" />
    </svg>
  );
}

type LightboxImage = { src: string; alt: string };

function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const buttonClass =
    "grid h-11 w-11 place-items-center rounded-full bg-surface text-ink text-lg shadow-[0_14px_24px_-12px_rgba(0,0,0,0.6)] transition hover:bg-cream";
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => zoomOut()}
        aria-label="Afastar (zoom -)"
        className={buttonClass}
      >
        <span aria-hidden="true">−</span>
      </button>
      <button
        type="button"
        onClick={() => resetTransform()}
        aria-label="Restaurar zoom"
        className={`${buttonClass} text-sm font-semibold`}
      >
        <span aria-hidden="true">1:1</span>
      </button>
      <button
        type="button"
        onClick={() => zoomIn()}
        aria-label="Aproximar (zoom +)"
        className={buttonClass}
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

function PrototypeLightbox({
  open,
  onClose,
  images,
  label,
  fit = "scroll",
}: {
  open: boolean;
  onClose: () => void;
  images: LightboxImage[];
  label: string;
  fit?: "scroll" | "contain";
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const zoomRef = useRef<ReactZoomPanPinchContentRef>(null);
  const scaleRef = useRef(1);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const total = images.length;

  useEffect(() => {
    if (open) {
      setIndex(0);
      scaleRef.current = 1;
    }
  }, [open]);

  useEffect(() => {
    zoomRef.current?.resetTransform(0);
    scaleRef.current = 1;
  }, [index]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (total > 1 && event.key === "ArrowRight")
        setIndex((i) => Math.min(i + 1, total - 1));
      if (total > 1 && event.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, total]);

  if (!open) return null;

  const current = images[Math.min(index, total - 1)];
  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-ink/85 backdrop-blur-sm p-3 pb-20 sm:p-6 sm:pb-20 md:p-10 md:pb-24"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-surface text-ink text-xl leading-none shadow-[0_14px_24px_-12px_rgba(0,0,0,0.6)] hover:bg-cream transition"
      >
        <span aria-hidden="true">×</span>
      </button>
      <div
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          touchX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (total < 2 || touchX.current === null || scaleRef.current > 1.05) {
            touchX.current = null;
            return;
          }
          const delta = (event.changedTouches[0]?.clientX ?? 0) - touchX.current;
          if (delta < -50) setIndex((i) => Math.min(i + 1, total - 1));
          if (delta > 50) setIndex((i) => Math.max(i - 1, 0));
          touchX.current = null;
        }}
        className={
          fit === "contain"
            ? "mx-auto h-full w-full max-w-5xl"
            : "mx-auto h-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-surface outline-1 -outline-offset-1 outline-black/10"
        }
      >
        <TransformWrapper
          ref={zoomRef}
          minScale={1}
          maxScale={5}
          doubleClick={{ mode: "toggle" }}
          onTransform={(ref) => {
            scaleRef.current = ref.state.scale;
          }}
        >
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={
              fit === "contain"
                ? {
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                  }
                : { width: "100%" }
            }
          >
            <img
              src={current.src}
              alt={current.alt}
              draggable={false}
              className={
                fit === "contain"
                  ? "max-h-full w-full select-none rounded-2xl object-contain shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)]"
                  : "block w-full select-none"
              }
            />
          </TransformComponent>
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-x-0 bottom-4 flex flex-wrap items-center justify-center gap-3"
          >
            {total > 1 ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                  disabled={index === 0}
                  aria-label="Slide anterior"
                  className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink text-lg shadow-[0_14px_24px_-12px_rgba(0,0,0,0.6)] transition hover:bg-cream disabled:opacity-40"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <span className="rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink/80 tabular-nums">
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.min(i + 1, total - 1))}
                  disabled={index === total - 1}
                  aria-label="Próximo slide"
                  className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink text-lg shadow-[0_14px_24px_-12px_rgba(0,0,0,0.6)] transition hover:bg-cream disabled:opacity-40"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </div>
            ) : null}
            <ZoomControls />
          </div>
        </TransformWrapper>
      </div>
    </div>
  );
}

function Index() {
  const [prototypeOpen, setPrototypeOpen] = useState(false);
  const [marksOpen, setMarksOpen] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased">
      <header className="sticky top-0 z-20 bg-cream/85 backdrop-blur border-b border-ink/5">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight">
            Karina Lima
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-ink">
            <a href="#sobre" className="hover:text-ink transition-colors">
              Sobre
            </a>
            <a href="#cases" className="hover:text-ink transition-colors">
              Estudos de caso
            </a>
            <a href="#toolkit" className="hover:text-ink transition-colors">
              Toolkit
            </a>
            <a href="#contato" className="hover:text-ink transition-colors">
              Contato
            </a>
          </nav>
          <a
            href="#contato"
            className="text-sm font-semibold bg-ink text-cream px-4 py-2 rounded-2xl shadow-[0_10px_18px_-8px_rgba(43,46,56,0.55)] hover:brightness-110 transition"
          >
            Fale comigo
          </a>
        </div>
      </header>

      <main id="top" className="relative mx-auto max-w-5xl px-6">
        <section className="pt-16 pb-20 md:pt-24 md:pb-28 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-mintdeep bg-mint/25 px-3 py-1.5 rounded-full">
            Portfólio de produto
          </span>
          <h1 className="mt-6 font-display text-6xl md:text-7xl font-semibold leading-[0.95] tracking-tight">
            Karina Lima
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-muted-ink leading-relaxed">
            Decisões de produto na intersecção entre tecnologia, dados e negócio.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#cases"
              className="inline-flex items-center gap-2 bg-ink text-cream font-semibold px-6 py-3.5 rounded-2xl shadow-[0_14px_24px_-10px_rgba(43,46,56,0.55)] hover:brightness-110 transition"
            >
              Ver estudos de caso
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-surface text-ink font-semibold px-6 py-3.5 rounded-2xl border border-ink/10 shadow-[0_12px_22px_-12px_rgba(43,46,56,0.4)] hover:bg-cream transition"
            >
              Contato
            </a>
          </div>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-6 -bottom-6 h-28 w-28 rounded-[1.75rem] bg-butter/60 -rotate-6"
            />
            <img
              src={karinaPhoto.url}
              alt="Retrato de Karina Lima"
              className="relative w-full max-w-sm rounded-[2.25rem] object-cover aspect-[4/5] shadow-[0_30px_60px_-40px_rgba(43,46,56,0.6)]"
            />
          </div>
        </section>

        <section id="sobre" className="relative mb-20 md:mb-28">
          <div
            aria-hidden="true"
            className="absolute left-8 -top-6 h-24 w-24 rounded-[1.5rem] bg-sky/60 -rotate-6 shadow-[0_18px_30px_-20px_rgba(94,134,179,0.7)]"
          />
          <div className="relative bg-surface rounded-[2.25rem] p-8 md:p-12 shadow-[0_30px_60px_-40px_rgba(43,46,56,0.5)]">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-ink">
              Sobre
            </span>
            <p className="mt-5 max-w-3xl font-display text-2xl md:text-[2rem] leading-[1.35] text-ink">
              “Venho do lado técnico, mas toda decisão de código nasce de uma decisão de produto — o
              que priorizar, que trade-off aceitar, que regra de negócio traduzir. Este portfólio é
              a ponte entre essas duas coisas.”
            </p>
          </div>
        </section>

        <section id="cases" className="mb-20 md:mb-28">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Estudos de caso
            </h2>
          </div>

          <article className="relative rounded-[2.5rem] bg-mint/25 p-7 md:p-10 overflow-hidden shadow-[0_30px_60px_-45px_rgba(92,160,140,0.8)]">
            <div
              aria-hidden="true"
              className="absolute -right-14 -bottom-14 h-48 w-48 rounded-[2.25rem] bg-sky/45 -rotate-6"
            />
            <div className="relative flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3 sm:items-center">
                <span className="h-11 w-11 rounded-2xl bg-ink grid place-items-center text-cream font-display font-semibold text-lg shadow-[0_10px_18px_-10px_rgba(43,46,56,0.6)]">
                  1
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-mintdeep">
                    Case em destaque
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                    Assistente de Investigação de Fraude
                  </h3>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-ink max-[360px]:text-[9px] max-[360px]:tracking-[0.01em] sm:text-xs sm:tracking-[0.15em]">
                    <span className="block sm:inline">fraud-forensics-frontend/api</span>
                    <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
                    <span className="block sm:inline">fraud-dossie-mcp</span>
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] bg-butter/35 text-butterdeep px-3 py-1.5 rounded-full border border-butterdeep/25 ml-auto sm:ml-0">
                <span className="h-1.5 w-1.5 rounded-full bg-butterdeep animate-pulse" />
                Em evolução
              </span>
            </div>

            <div className="relative mt-6 space-y-5 text-sm leading-relaxed text-ink/85">
              <p>
                <strong className="text-ink">Problema</strong> — Hoje os representantes investigam
                fraude usando Claude Code/Codex diretamente, com um plugin instalado que expõe
                ferramentas via MCP. Em duas semanas, 412 reps usaram essas ferramentas — entre 100 e
                140 por dia útil —, somando mais de 210 mil consultas só nas 4 análises mais
                frequentes (busca de pagamentos, cruzamento de usuários, restrições ativas,
                denúncias, entre outras). Isso acontece sem autenticação própria, sem histórico
                consolidado de investigação e sem visibilidade centralizada de custo ou uso. O setup
                técnico inicial (licença de GitHub, SSH, VPN, grupo de acesso) também é pesado o
                suficiente para que um diretor não tenha conseguido concluí-lo sozinho.
              </p>
              <p>
                <strong className="text-ink">Contexto e restrições</strong> — As capacidades de
                investigação (busca de usuário, análise de pagamentos, dispositivos, denúncias, itens)
                já existem e funcionam via MCP — não é um problema de “o que a IA sabe fazer”, é um
                problema de como isso chega ao rep no dia a dia.
              </p>
              <p>
                <strong className="text-ink">Decisões e trade-offs</strong> — Em vez de manter a
                investigação de fraude dependente de reps configurarem ferramentas de desenvolvedor,
                estamos construindo um assistente próprio, com autenticação e autorização adequadas ao
                contexto de dado sensível de investigação, histórico persistente de casos e suporte a
                múltiplos usuários.
              </p>
              <p>
                <strong className="text-ink">Impacto</strong> — A adoção foi rápida e já mostra escala.
                O acesso agora é por um único login corporativo, e cada consulta respeita o perfil do
                analista e fica rastreada. O próximo passo é medir o custo por investigação, para dar
                previsibilidade de gasto à operação.
              </p>
            </div>

            <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="bg-surface rounded-2xl p-4 flex items-baseline gap-3 sm:block shadow-[0_12px_20px_-14px_rgba(43,46,56,0.4)]">
                <div className="font-display text-2xl font-semibold text-mintdeep shrink-0">412</div>
                <div className="text-xs text-muted-ink sm:mt-1">
                  analistas usando IA para investigar, em 2 semanas
                </div>
              </div>
              <div className="bg-surface rounded-2xl p-4 flex items-baseline gap-3 sm:block shadow-[0_12px_20px_-14px_rgba(43,46,56,0.4)]">
                <div className="font-display text-2xl font-semibold text-skydeep shrink-0">
                  100–140
                </div>
                <div className="text-xs text-muted-ink sm:mt-1">analistas por dia útil</div>
              </div>
              <div className="bg-surface rounded-2xl p-4 flex items-baseline gap-3 sm:block shadow-[0_12px_20px_-14px_rgba(43,46,56,0.4)]">
                <div className="font-display text-2xl font-semibold text-butterdeep shrink-0">
                  210 mil+
                </div>
                <div className="text-xs text-muted-ink sm:mt-1">
                  consultas só nas 4 análises mais frequentes
                </div>
              </div>
            </div>

            <div className="relative mt-6 flex flex-wrap gap-3">
              <a
                href="https://fraud-forensics.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-5 py-3 rounded-2xl shadow-[0_14px_24px_-14px_rgba(43,46,56,0.6)] hover:brightness-110 transition"
              >
                Ver protótipo
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article className="mt-6 bg-surface rounded-[2rem] p-6 md:p-9 outline-1 -outline-offset-1 outline-ink/5 shadow-[0_24px_44px_-34px_rgba(43,46,56,0.5)]">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-2xl bg-mint grid place-items-center text-mintdeep font-display font-semibold text-lg shadow-[0_10px_18px_-10px_rgba(92,160,140,0.9)]">
                  2
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                  MeliRun
                </h3>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://youtu.be/l2gt7Qr1hpw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-4 py-2.5 rounded-xl shadow-[0_10px_18px_-10px_rgba(43,46,56,0.6)] hover:brightness-110 transition"
                >
                  Assistir ao vídeo
                </a>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-ink">
              Marketplace de inscrição e entrega de kits de corrida.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="aspect-video overflow-hidden rounded-3xl bg-ink/5 outline-1 -outline-offset-1 outline-black/5">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/l2gt7Qr1hpw"
                  title="Apresentação MeliRun"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-ink/85">
                <div>
                  <h4 className="font-semibold text-ink">Problema</h4>
                  <p className="mt-1">
                    Corredores enfrentam fricção para se inscrever em corridas e retirar kits
                    presencialmente; organizadores não têm uma plataforma unificada para gerir
                    inscrições e logística de entrega. A oportunidade: “sua corrida começa em casa”
                    — entrega do kit direto na casa do corredor.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink">Contexto e restrições</h4>
                  <p className="mt-1">
                    A ideia era minha antes mesmo da pós-graduação — decidi cursar Digital Product
                    Management justamente para amadurecer o conceito antes de apresentar formalmente
                    ao Mercado Livre. Sem base de usuários real (projeto de MVP), precisava
                    demonstrar rigor analítico mesmo com dados simulados.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="text-sm leading-relaxed text-ink/85">
                <h4 className="font-semibold text-ink">Decisões e trade-offs</h4>
                <p className="mt-1">
                  Construí o ciclo completo de gestão de produto: métricas de negócio (GMV, churn,
                  conversão, ticket médio, NPS), funil de aquisição→fidelização, OKRs trimestrais,
                  roadmap estratégico, plano de Continuous Discovery (árvore de oportunidades,
                  priorização Impact/Effort e MoSCoW), estratégia de liderança e stakeholders, e
                  modelo financeiro (ROI, CAC, LTV, ARPU). Como o MVP não tinha base de dados real,
                  simulei os dados quantitativos históricos (métricas de negócio e funil) via IA,
                  documentando isso de forma transparente com nota e fonte — mantendo o rigor
                  analítico sobre o que interpretar, mesmo sem dado de produção.
                </p>
              </div>
              <div className="text-sm leading-relaxed text-ink/85">
                <h4 className="font-semibold text-ink">Impacto</h4>
                <p className="mt-1">
                  Levei a ideia amadurecida para dentro do Mercado Livre: apresentei para minha
                  líder, meu gestor e, subindo mais um nível, para a head de esportes — que validou
                  a proposta o suficiente para me direcionar a apresentar para o time de VIS.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="bg-surface rounded-2xl p-4 shadow-[0_12px_20px_-14px_rgba(43,46,56,0.4)]">
                    <div className="font-display text-2xl font-semibold text-mintdeep">+3</div>
                    <div className="text-xs text-muted-ink mt-1">níveis de liderança</div>
                  </div>
                  <div className="bg-surface rounded-2xl p-4 shadow-[0_12px_20px_-14px_rgba(43,46,56,0.4)]">
                    <div className="font-display text-2xl font-semibold text-skydeep">MVP</div>
                    <div className="text-xs text-muted-ink mt-1">ciclo completo</div>
                  </div>
                  <div className="bg-surface rounded-2xl p-4 shadow-[0_12px_20px_-14px_rgba(43,46,56,0.4)]">
                    <div className="font-display text-2xl font-semibold text-butterdeep">→ VIS</div>
                    <div className="text-xs text-muted-ink mt-1">próximo passo</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://krun-corredor.glide.page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-5 py-3 rounded-2xl shadow-[0_14px_24px_-14px_rgba(43,46,56,0.6)] hover:brightness-110 transition"
              >
                Ver protótipo — Corredor
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://krun-organizador.glide.page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-5 py-3 rounded-2xl shadow-[0_14px_24px_-14px_rgba(43,46,56,0.6)] hover:brightness-110 transition"
              >
                Ver protótipo — Organizador
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article className="mt-6 bg-surface rounded-[2rem] p-7 md:p-8 shadow-[0_24px_44px_-34px_rgba(43,46,56,0.5)]">

            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-2xl bg-sky grid place-items-center text-skydeep font-display font-semibold shadow-[0_10px_18px_-10px_rgba(94,134,179,0.9)]">
                3
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Capability de Marcas
              </h3>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink/85">
              <p>
                <strong className="text-ink">Problema</strong> — Toda vez que um usuário de negócio
                queria destacar registros de um módulo com uma marca visual, a solicitação virava um
                pedido de código que entrava na fila de prioridades de desenvolvimento — em um caso
                registrado, uma marca de fraude levou 45 dias entre o commit inicial e o merge, por
                concorrer com o resto do backlog do time.
              </p>
              <p>
                <strong className="text-ink">Contexto e restrições</strong> — Múltiplos módulos
                diferentes precisavam poder receber marcas; precisava funcionar sem alteração de
                código nem deploy; precisava ser genérico o bastante pra cobrir pedidos futuros ainda
                não previstos.
              </p>
              <p>
                <strong className="text-ink">Decisões e trade-offs</strong> — Investi em construir uma
                capability configurável (nome, cor, módulos de aplicação, tudo via no-code) em vez de
                resolver caso a caso — mais esforço de design upfront em troca de eliminar o
                retrabalho de engenharia para essa classe inteira de pedido.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 bg-sky/20 rounded-2xl p-5">
                <span className="font-display text-3xl font-semibold leading-none text-skydeep">
                  45
                </span>
                <span className="text-sm text-ink/80">
                  dias que uma marca levou entre o commit inicial e o merge, no modelo antigo, por
                  concorrer com o resto do backlog do time.
                </span>
              </div>
              <div className="flex items-start gap-3 bg-sky/20 rounded-2xl p-5">
                <span className="font-display text-3xl font-semibold leading-none text-skydeep">
                  19
                </span>
                <span className="text-sm text-ink/80">
                  marcas cadastradas pelos próprios usuários de negócio — 19 pedidos que, no modelo
                  antigo, teriam virado 19 entradas de backlog e 19 deploys. Zero foi para o backlog.
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setMarksOpen(true)}
                aria-label="Ampliar o protótipo das telas de marcas"
                className="relative block w-full overflow-hidden rounded-2xl bg-cream outline-1 -outline-offset-1 outline-ink/10 transition hover:outline-ink/30"
              >
                <img
                  src={marksPrototype.url}
                  alt="Protótipo de baixa fidelidade da capability de marcas: tela de criação de marca com cor, nome e descrições, tela de configuração da casuística por módulo e os fluxos de aplicar e remover marca."
                  className="h-44 w-full object-cover object-top sm:h-56 md:h-64"
                  loading="lazy"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent"
                />
                <span className="pointer-events-none absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink/75 shadow-[0_10px_18px_-12px_rgba(43,46,56,0.6)]">
                  <ExpandIcon />
                  Ampliar
                </span>
              </button>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setMarksOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 bg-ink text-cream text-sm font-semibold px-5 py-3 rounded-2xl shadow-[0_14px_24px_-14px_rgba(43,46,56,0.6)] hover:brightness-110 transition sm:w-auto"
                >
                  Ver protótipo — telas de marcas
                  <ExpandIcon />
                </button>
              </div>

              <PrototypeLightbox
                open={marksOpen}
                onClose={() => setMarksOpen(false)}
                label="Protótipo das telas de marcas em tamanho grande"
                images={[
                  {
                    src: marksPrototype.url,
                    alt: "Protótipo de baixa fidelidade da capability de marcas: tela de criação de marca com cor, nome e descrições, tela de configuração da casuística por módulo e os fluxos de aplicar e remover marca.",
                  },
                ]}
              />
            </div>
          </article>

          <article className="mt-6 bg-surface rounded-[2rem] p-7 md:p-8 shadow-[0_24px_44px_-34px_rgba(43,46,56,0.5)]">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-2xl bg-butter grid place-items-center text-butterdeep font-display font-semibold shadow-[0_10px_18px_-10px_rgba(199,154,82,0.9)]">
                4
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Moderação de eShop
              </h3>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink/85">
              <p>
                <strong className="text-ink">Problema</strong> — Demanda chegou em alto nível e
                incompleta: “poder moderar as páginas de loja oficial para aplicar tags de supostas
                infrações”, sem definição de partes da página, tags ou APIs.
              </p>
              <p>
                <strong className="text-ink">Contexto e restrições</strong> — Página composta por
                vários componentes distintos (header, título, cards, banner secundário, footer);
                discovery inteiro estava em aberto.
              </p>
              <p>
                <strong className="text-ink">Decisões e trade-offs</strong> — Assumi o discovery
                completo: levantei partes a moderar, tags aplicáveis, protótipos e validação com
                usuário antes de codar — trade-off de tempo extra em descoberta para reduzir risco de
                retrabalho.
              </p>
              <p>
                <strong className="text-ink">Impacto</strong> — O trabalho de discovery e prototipagem
                foi citado como ponto positivo na minha avaliação anual — reconhecimento formal de
                que estender o escopo além do código agregou valor real. O projeto não chegou a ir
                para produção: dependia da entrega de um serviço de moderação de outro time, cujo
                contrato de API ainda estava em desenvolvimento e sujeito a mudanças, e, com o
                passar do tempo, a iniciativa foi despriorizada.
              </p>
            </div>
            <div className="mt-6 flex items-start gap-3 bg-butter/25 rounded-2xl p-5">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-butterdeep" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-ink/80">
                <strong className="font-semibold text-butterdeep">O discovery que assumi foi citado como
                ponto positivo na avaliação anual</strong> — mesmo sem o projeto ter chegado à produção.
              </span>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setPrototypeOpen(true)}
                aria-label="Ampliar o protótipo da tela de moderação de eShop"
                className="relative block w-full overflow-hidden rounded-2xl bg-cream outline-1 -outline-offset-1 outline-ink/10 transition hover:outline-ink/30"
              >
                <img
                  src={eshopPrototype.url}
                  alt="Protótipo de baixa fidelidade da tela de caso de moderação: cabeçalho com o identificador do caso e os dados da loja, seguido das seções da página de loja a moderar — cabeçalho de perfil, subdomínio, logo e banner principal — cada uma com as tags de suposta infração aplicadas."
                  className="h-52 w-full object-cover object-top md:h-64"
                  loading="lazy"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent"
                />
                <span className="pointer-events-none absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink/75 shadow-[0_10px_18px_-12px_rgba(43,46,56,0.6)]">
                  <ExpandIcon />
                  Ampliar
                </span>
              </button>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setPrototypeOpen(true)}
                  className="inline-flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-5 py-3 rounded-2xl shadow-[0_14px_24px_-14px_rgba(43,46,56,0.6)] hover:brightness-110 transition"
                >
                  Ver protótipo — tela de moderação
                  <ExpandIcon />
                </button>
              </div>

              <PrototypeLightbox
                open={prototypeOpen}
                onClose={() => setPrototypeOpen(false)}
                label="Protótipo da tela de moderação de eShop em tamanho grande"
                images={[
                  {
                    src: eshopPrototype.url,
                    alt: "Protótipo de baixa fidelidade da tela de caso de moderação: cabeçalho com o identificador do caso e os dados da loja, seguido das seções da página de loja a moderar — cabeçalho de perfil, subdomínio, logo e banner principal — cada uma com as tags de suposta infração aplicadas.",
                  },
                ]}
              />
            </div>
          </article>

          <article className="mt-6 bg-pink/25 rounded-[2rem] p-7 md:p-8 shadow-[0_24px_44px_-36px_rgba(231,182,196,0.9)]">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-2xl bg-pink grid place-items-center text-muted-ink font-display font-semibold shadow-[0_10px_18px_-10px_rgba(231,182,196,0.9)]">
                5
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-ink">
                  Nota de visão
                </span>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Retrospectiva do Representante
                </h3>
              </div>
            </div>
            <div className="mt-5 grid md:grid-cols-3 gap-5 text-sm leading-relaxed text-ink/85">
              <div>
                <strong className="text-ink">Problema</strong> — Representantes de fraude fazem um
                trabalho invisível — sem reconhecimento tangível do próprio impacto, numa área já
                reconhecida internamente como de alta rotatividade.{" "}
                <span>
                  Contexto: inspirado no formato de retrospectiva anual do Spotify, usando apenas
                  métricas já existentes e sem estigmatizar baixo desempenho.
                </span>
              </div>
              <div>
                <strong className="text-ink">Decisões e trade-offs</strong> — Métricas de
                contribuição, insígnias, ranking e prêmios físicos; para baixo desempenho, mensagem
                de “início de jornada” em vez de exposição — priorizando engajamento de longo prazo
                sobre competição pura.
              </div>
              <div>
                <strong className="text-ink">Impacto</strong> — Aceite conceitual de todas as
                lideranças; virou item de backlog.
              </div>
            </div>
            <div className="mt-6 flex items-start gap-3 bg-surface rounded-2xl p-5">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-pinkdeep" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-ink/80">
                <strong className="font-semibold text-pinkdeep">Validada por todas as lideranças do
                time</strong>, principalmente por ser direcionada a uma área já reconhecida
                internamente como de alta rotatividade.
              </span>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setDeckOpen(true)}
                aria-label="Abrir a apresentação da Retrospectiva dos Representantes"
                className="relative block w-full overflow-hidden rounded-2xl bg-surface outline-1 -outline-offset-1 outline-ink/10 transition hover:outline-ink/30"
              >
                <img
                  src={retroSlides[0]!.src}
                  alt={retroSlides[0]!.alt}
                  className="h-44 w-full object-cover sm:h-56 md:h-64"
                  loading="lazy"
                />
                <span className="pointer-events-none absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink/75 shadow-[0_10px_18px_-12px_rgba(43,46,56,0.6)]">
                  <ExpandIcon />
                  Ver apresentação · 11 slides
                </span>
              </button>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setDeckOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 bg-ink text-cream text-sm font-semibold px-5 py-3 rounded-2xl shadow-[0_14px_24px_-14px_rgba(43,46,56,0.6)] hover:brightness-110 transition sm:w-auto"
                >
                  Ver apresentação (11 slides)
                  <ExpandIcon />
                </button>
              </div>

              <PrototypeLightbox
                open={deckOpen}
                onClose={() => setDeckOpen(false)}
                label="Apresentação Retrospectiva dos Representantes"
                images={retroSlides}
                fit="contain"
              />
            </div>
          </article>
        </section>

        <section id="toolkit" className="mb-20 md:mb-28">
          <div className="rounded-[2.5rem] bg-surface p-8 md:p-12 shadow-[0_30px_60px_-45px_rgba(43,46,56,0.5)]">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Toolkit de produto
            </h2>
            <p className="mt-2 text-muted-ink">Seis hábitos que atravessam todos os casos.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-7">
              {toolkit.map((item) => (
                <div
                  key={item.title}
                  className={`flex gap-4${item.wide ? " sm:col-span-2" : ""}`}
                >
                  <span className={`h-3 w-3 rounded-full mt-1.5 shrink-0 ${item.dot}`} />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-ink mt-1">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="mb-20">
          <div className="relative rounded-[2.5rem] bg-mint/25 p-8 md:p-14 overflow-hidden shadow-[0_30px_60px_-45px_rgba(92,160,140,0.8)]">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-40 w-40 rounded-[2rem] bg-sky/50 rotate-12"
            />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
                Vamos conversar sobre produto.
              </h2>
              <p className="mt-4 text-muted-ink text-lg">
                Se o raciocínio acima faz sentido para o seu problema, adoro trocar ideias.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://linkedin.com/in/kdikarina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink text-cream font-semibold px-6 py-3.5 rounded-2xl shadow-[0_14px_24px_-10px_rgba(43,46,56,0.55)] hover:brightness-110 transition"
                >
                  LinkedIn — kdikarina
                </a>
                <a
                  href="mailto:karinacomk.lima@gmail.com"
                  className="inline-flex items-center gap-2 bg-surface text-ink font-semibold px-6 py-3.5 rounded-2xl border border-ink/10 shadow-[0_12px_22px_-12px_rgba(43,46,56,0.4)] hover:bg-cream transition"
                >
                  karinacomk.lima@gmail.com
                </a>
                <a
                  href="https://wa.me/5511988086122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-surface text-ink font-semibold px-6 py-3.5 rounded-2xl border border-ink/10 shadow-[0_12px_22px_-12px_rgba(43,46,56,0.4)] hover:bg-cream transition"
                >
                  WhatsApp (11) 98808-6122
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/5">
        <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-ink">
          <span className="font-display">Karina Lima</span>
          <span>Portfólio de produto · sistemas complexos</span>
        </div>
      </footer>
    </div>
  );
}
