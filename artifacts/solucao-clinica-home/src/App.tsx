import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, Clock3, Instagram, Menu, MessageCircle, Minus, Plus, Quote, Sparkles, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const whatsappHref = 'https://wa.me/5511999999999?text=Olá%2C%20gostaria%20de%20agendar%20uma%20avaliação%20na%20Solução.';

const services = [
  { title: 'Fisioterapia', text: 'Movimento, autonomia e confiança para cada nova conquista.', tag: 'Corpo em movimento', tone: 'aqua' },
  { title: 'Fonoaudiologia', text: 'Comunicação que encontra caminhos para florescer.', tag: 'Voz e linguagem', tone: 'peach' },
  { title: 'Psicologia', text: 'Escuta sensível para a criança e para quem cuida dela.', tag: 'Emoções e vínculos', tone: 'lavender' },
  { title: 'Psicopedagogia', text: 'Aprender com sentido, respeitando o tempo de cada pessoa.', tag: 'Aprendizagem', tone: 'yellow' },
];

const faqs = [
  ['Como funciona a primeira avaliação?', 'Começamos com uma conversa cuidadosa com a família para entender a história, as necessidades e os objetivos da criança. A partir daí, indicamos o melhor caminho de avaliação e acompanhamento.'],
  ['A Solução atende escolas?', 'Sim. Nossos Projetos Escolares aproximam saúde e educação com ações feitas sob medida para cada instituição, turma e equipe pedagógica.'],
  ['Atendem adolescentes e adultos?', 'Nosso foco principal é o desenvolvimento infantil e o apoio às famílias, mas avaliamos cada caso com carinho. Fale com nossa equipe para entender as possibilidades.'],
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" data-testid="link-logo">
      <span className={`relative grid h-10 w-10 place-items-center rounded-[14px] ${light ? 'bg-[#38c1b0] text-[#103f40]' : 'bg-[#103f40] text-[#eef8ef]'}`}>
        <span className="font-display text-[26px] leading-none">S</span>
        <span className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 ${light ? 'border-[#103f40] bg-[#f1b978]' : 'border-[#f9f5ed] bg-[#38c1b0]'}`} />
      </span>
      <span className={`font-display text-[26px] tracking-[-0.04em] ${light ? 'text-[#f7f2e8]' : 'text-[#103f40]'}`}>Solução</span>
    </a>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="rounded-full px-3 py-2 text-sm font-medium text-[#396263] transition-colors hover:bg-[#e2f2ee] hover:text-[#103f40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38c1b0]" data-testid={`link-nav-${href.replace('#', '')}`}>{children}</a>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const closeMenu = () => setMenuOpen(false);
  return (
    <main className="grain overflow-hidden">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#dce9e3]/70 bg-[#fbfaf6]/90 backdrop-blur-xl">
        <div className="container-shell flex h-[76px] items-center justify-between">
          <BrandMark />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
            <NavLink href="#sobre">A Solução</NavLink>
            <NavLink href="#servicos">Especialidades</NavLink>
            <NavLink href="#frentes">Frentes de atuação</NavLink>
            <NavLink href="#duvidas">Dúvidas</NavLink>
          </nav>
          <div className="hidden md:block">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-[#103f40] px-5 py-3 text-sm font-semibold text-[#f7f2e8] transition-all hover:-translate-y-0.5 hover:bg-[#236464] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38c1b0]" data-testid="link-header-whatsapp">
              Fale com a equipe <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-[#e4f1ed] text-[#103f40] md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="border-t border-[#dce9e3] bg-[#fbfaf6] px-5 py-5 md:hidden" aria-label="Navegação mobile">
            <div className="container-shell flex flex-col items-start gap-1">
              <a href="#sobre" onClick={closeMenu} className="w-full rounded-xl px-3 py-3 text-base text-[#396263] hover:bg-[#e2f2ee]" data-testid="link-mobile-sobre">A Solução</a>
              <a href="#servicos" onClick={closeMenu} className="w-full rounded-xl px-3 py-3 text-base text-[#396263] hover:bg-[#e2f2ee]" data-testid="link-mobile-servicos">Especialidades</a>
              <a href="#frentes" onClick={closeMenu} className="w-full rounded-xl px-3 py-3 text-base text-[#396263] hover:bg-[#e2f2ee]" data-testid="link-mobile-frentes">Frentes de atuação</a>
              <a href="#duvidas" onClick={closeMenu} className="w-full rounded-xl px-3 py-3 text-base text-[#396263] hover:bg-[#e2f2ee]" data-testid="link-mobile-duvidas">Dúvidas</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#103f40] px-5 py-3 text-sm font-semibold text-[#f7f2e8]" data-testid="link-mobile-whatsapp">Fale com a equipe <ArrowRight size={16} /></a>
            </div>
          </nav>
        )}
      </header>

      <section id="inicio" className="relative bg-[#f6f2e9] pt-[76px]">
        <div className="container-shell grid min-h-[680px] items-center gap-10 py-16 lg:grid-cols-[.95fr_1.05fr] lg:gap-4 lg:py-20">
          <div className="relative z-10 max-w-[580px]">
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-[#b7ddd4] bg-[#e7f4ef] px-3.5 py-2 text-xs font-bold uppercase tracking-[.13em] text-[#22746e]" data-testid="text-hero-eyebrow">
              <Sparkles size={13} /> Desenvolvimento que acolhe
            </div>
            <h1 className="reveal reveal-delay-1 mt-7 max-w-[650px] font-display text-[clamp(3.45rem,7vw,6.8rem)] leading-[.92] tracking-[-.06em] text-[#103f40]">
              Atendimento clínico e escolar <em className="font-display not-italic text-[#169f94]">multidisciplinar.</em>
            </h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-[480px] text-lg leading-8 text-[#4b6b69]">
              Atendimento clínico e escolar multidisciplinar para crianças e famílias, com escuta, técnica e caminhos possíveis.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-full bg-[#f0ae6e] px-6 py-4 text-sm font-bold text-[#103f40] shadow-[0_12px_28px_rgba(202,130,66,.2)] transition-all hover:-translate-y-1 hover:bg-[#f5bd83] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103f40]" data-testid="link-hero-whatsapp">
                Agendar uma avaliação <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#servicos" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-[#216a68] transition-colors hover:text-[#103f40]" data-testid="link-hero-services">
                Conheça nosso cuidado <ArrowDown size={16} />
              </a>
            </div>
            <div className="mt-12 flex items-center gap-4 border-t border-[#d8dfd6] pt-5 text-xs text-[#64807b]">
              <div className="flex -space-x-2" aria-hidden="true">
                {['M', 'R', 'A'].map((letter, index) => <span key={letter} className={`grid h-8 w-8 place-items-center rounded-full border-2 border-[#f6f2e9] text-xs font-bold text-[#103f40] ${['bg-[#b8e0d6]', 'bg-[#f6c897]', 'bg-[#d4c9e7]'][index]}`}>{letter}</span>)}
              </div>
              <span>Uma equipe inteira olhando<br />para cada pequena conquista.</span>
            </div>
          </div>
          <div className="relative lg:ml-8">
            <div className="absolute -right-5 -top-10 h-40 w-40 rounded-full bg-[#efc687]/35 blur-3xl" />
            <div className="absolute -bottom-8 -left-5 h-48 w-48 rounded-full bg-[#8ed5c8]/35 blur-3xl" />
            <div className="float-slow relative overflow-hidden rounded-[36px] rounded-bl-[110px] border-[10px] border-[#fbfaf6] bg-[#dcece5] shadow-[0_24px_55px_rgba(30,83,78,.18)]">
              <img src="/hero-cuidado.png" alt="Criança brincando em uma atividade de desenvolvimento com uma terapeuta" className="aspect-[1.08] w-full object-cover" data-testid="img-hero-care" />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-[#fbfaf6]/95 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#2b8c83]">Nosso jeito</p>
                <p className="mt-1 font-display text-lg text-[#103f40]">Técnica com ternura.</p>
              </div>
            </div>
            <div className="absolute -right-2 top-8 hidden rounded-2xl bg-[#103f40] p-4 text-[#f7f2e8] shadow-xl sm:block">
              <p className="font-display text-3xl leading-none">4</p>
              <p className="mt-1 max-w-[90px] text-[11px] leading-4 text-[#c3dfd5]">especialidades conectadas</p>
            </div>
          </div>
        </div>
        <div className="container-shell flex items-center justify-between border-t border-[#d9e1d9] py-5 text-xs font-semibold uppercase tracking-[.12em] text-[#6b8982]">
          <span>Clínica · Escola · Família</span>
          <span className="hidden sm:block">São Paulo, SP</span>
        </div>
      </section>

      <section id="sobre" className="bg-[#fbfaf6] py-24 lg:py-32">
        <div className="container-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow text-[#2b8c83]">A Solução</p>
            <h2 className="mt-5 max-w-[420px] font-display text-4xl leading-[1.02] tracking-[-.04em] text-[#103f40] sm:text-5xl">Um cuidado que enxerga a criança por inteiro.</h2>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#1d8179] underline decoration-[#a9d8ce] decoration-2 underline-offset-8 transition-colors hover:text-[#103f40]" data-testid="link-about-whatsapp">Converse com quem entende <ArrowRight size={16} /></a>
          </div>
          <div className="grid gap-8 text-lg leading-8 text-[#55716d] sm:grid-cols-2">
            <div>
              <p>Na Solução, cada atendimento começa com uma escuta. Acolhemos histórias, respeitamos ritmos e construímos junto com a família um plano que faça sentido na vida real.</p>
            </div>
            <div className="border-l border-[#cddfd8] pl-7">
              <p>Clínica, escola e casa não são mundos separados. Quando se conectam, a criança ganha mais segurança para experimentar, aprender e se relacionar.</p>
            </div>
            <div className="sm:col-span-2">
              <div className="mt-3 grid gap-3 border-t border-[#dce8e1] pt-7 sm:grid-cols-3">
                {['Escuta antes da pressa', 'Plano feito em parceria', 'Conquistas que cabem no cotidiano'].map((item, index) => <div key={item} className="flex items-start gap-3 text-sm font-semibold leading-5 text-[#265d5d]"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#dff1eb] text-[#218e84]">{index + 1}</span>{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="bg-[#eaf4ef] py-24 lg:py-32">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[#2b8c83]">Especialidades</p>
              <h2 className="mt-4 max-w-[600px] font-display text-4xl leading-[1.02] tracking-[-.04em] text-[#103f40] sm:text-5xl">Quatro olhares.<br /><span className="text-[#2b8c83]">Um só cuidado.</span></h2>
            </div>
            <p className="max-w-[285px] text-sm leading-6 text-[#55716d]">Profissionais que trabalham em conversa, para que cada avanço encontre apoio nos lugares onde a criança vive.</p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <article key={service.title} className={`group relative flex min-h-[294px] flex-col justify-between overflow-hidden rounded-[26px] border border-[#cfe2da] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(30,83,78,.13)] ${service.tone === 'aqua' ? 'bg-[#c4e9df]' : service.tone === 'peach' ? 'bg-[#f7d6bc]' : service.tone === 'lavender' ? 'bg-[#ded8ee]' : 'bg-[#f5df9e]'}`} data-testid={`card-service-${index}`}>
                <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#fbfaf6]/70 text-sm font-bold text-[#103f40]">0{index + 1}</span><ArrowRight size={20} className="text-[#286b68] transition-transform group-hover:translate-x-1" /></div>
                <div><p className="text-xs font-bold uppercase tracking-[.11em] text-[#40716d]">{service.tag}</p><h3 className="mt-2 font-display text-3xl tracking-[-.03em] text-[#103f40]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#4a6b67]">{service.text}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-[#c8dfd6] pt-6 sm:flex-row sm:items-center">
            <p className="text-sm text-[#55716d]">Também conectamos nossa equipe a neurologistas, terapeutas ocupacionais e escolas.</p>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#1d8179] transition-colors hover:text-[#103f40]" data-testid="link-services-whatsapp">Encontrar o melhor caminho <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <section id="frentes" className="bg-[#103f40] py-24 text-[#f7f2e8] lg:py-32">
        <div className="container-shell">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="eyebrow text-[#64d0bf]">Como atuamos</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.04] tracking-[-.04em] sm:text-5xl">A solução muda de forma. O cuidado permanece.</h2>
              <p className="mt-6 max-w-[340px] text-base leading-7 text-[#bed9cf]">Da sala de atendimento à sala de aula, criamos pontes que tornam o desenvolvimento mais possível.</p>
            </div>
            <div className="divide-y divide-[#376866]">
              {[
                ['01', 'Clínica', 'Atendimentos individuais e integrados para apoiar desenvolvimento motor, comunicação, emoções e aprendizagem.', 'Ver especialidades'],
                ['02', 'Projetos Escolares', 'Parcerias com escolas para observar necessidades, orientar equipes e criar estratégias que incluem de verdade.', 'Conversar sobre um projeto'],
                ['03', 'Cursos & Palestras', 'Conteúdo prático para famílias, educadores e profissionais que querem ampliar o olhar sobre a infância.', 'Conhecer a agenda'],
              ].map(([number, title, text, link]) => <div key={title} className="group grid gap-5 py-8 sm:grid-cols-[52px_1fr_auto] sm:items-start"><span className="font-mono text-xs text-[#64d0bf]">{number}</span><div><h3 className="font-display text-3xl text-[#f7f2e8]">{title}</h3><p className="mt-2 max-w-[450px] text-sm leading-6 text-[#bed9cf]">{text}</p></div><a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#64d0bf] transition-colors hover:text-[#f7f2e8] sm:mt-2" data-testid={`link-front-${number}`}>{link}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></a></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5df9e] py-20 lg:py-28">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <Quote size={34} className="text-[#2b8c83]" />
            <blockquote className="mt-6 max-w-[720px] font-display text-3xl leading-[1.12] tracking-[-.03em] text-[#103f40] sm:text-5xl">“Quando a gente entende o que está por trás de um comportamento, fica muito mais fácil encontrar como ajudar.”</blockquote>
            <p className="mt-7 text-sm font-bold text-[#53746e]">— Uma conversa que muda caminhos</p>
          </div>
          <div className="rounded-[24px] bg-[#fbfaf6]/55 p-7 sm:p-9">
            <p className="eyebrow text-[#2b8c83]">Para começar</p>
            <h3 className="mt-4 font-display text-3xl leading-tight text-[#103f40]">Não precisa chegar com todas as respostas.</h3>
            <p className="mt-4 text-sm leading-6 text-[#55716d]">Nossa equipe ajuda você a organizar as perguntas e decidir o próximo passo com tranquilidade.</p>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#103f40] px-5 py-3 text-sm font-bold text-[#f7f2e8] transition-all hover:-translate-y-0.5 hover:bg-[#236464]" data-testid="link-quote-whatsapp">Falar com a Solução <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <section id="duvidas" className="bg-[#fbfaf6] py-24 lg:py-32">
        <div className="container-shell grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="eyebrow text-[#2b8c83]">Dúvidas comuns</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.04] tracking-[-.04em] text-[#103f40] sm:text-5xl">Pode perguntar.</h2>
            <p className="mt-5 max-w-[290px] text-base leading-7 text-[#55716d]">Cada família tem uma história. Se a sua pergunta não está aqui, nossa equipe está a uma mensagem de distância.</p>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#1d8179] underline decoration-[#a9d8ce] decoration-2 underline-offset-8" data-testid="link-faq-whatsapp">Enviar uma pergunta <ArrowRight size={16} /></a>
          </div>
          <div className="border-t border-[#d6e3dd]">
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return <div key={question} className="border-b border-[#d6e3dd]"><button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-[#194e4d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38c1b0]" aria-expanded={isOpen} data-testid={`button-faq-${index}`}><span>{question}</span><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? 'bg-[#103f40] text-[#f7f2e8]' : 'bg-[#e4f1ed] text-[#267b75]'}`}>{isOpen ? <Minus size={16} /> : <Plus size={16} />}</span></button>{isOpen && <p className="max-w-[680px] pb-7 pr-10 text-base leading-7 text-[#607b76]">{answer}</p>}</div>;
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#d9eee7] py-20 lg:py-28">
        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full border-[36px] border-[#b9ded3]" />
        <div className="absolute -bottom-28 left-[12%] h-64 w-64 rounded-full border-[42px] border-[#c5e6dc]" />
        <div className="container-shell relative text-center">
          <p className="eyebrow text-[#2b8c83]">O próximo passo pode ser simples</p>
          <h2 className="mx-auto mt-5 max-w-[720px] font-display text-4xl leading-[1.02] tracking-[-.04em] text-[#103f40] sm:text-6xl">Vamos conversar sobre o que sua família precisa?</h2>
          <p className="mx-auto mt-6 max-w-[480px] text-base leading-7 text-[#55716d]">Conte um pouco sobre você. A nossa equipe retorna com calma para orientar o melhor caminho.</p>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f0ae6e] px-7 py-4 text-sm font-bold text-[#103f40] shadow-[0_12px_28px_rgba(202,130,66,.18)] transition-all hover:-translate-y-1 hover:bg-[#f5bd83]" data-testid="link-final-whatsapp"><MessageCircle size={18} /> Chamar no WhatsApp <ArrowRight size={17} /></a>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-[#5d8178]"><span className="inline-flex items-center gap-1.5"><Clock3 size={14} /> Retorno em horário comercial</span><span>Atendimento humano, sem formulários longos</span></div>
        </div>
      </section>

      <footer className="bg-[#103f40] py-12 text-[#f7f2e8]">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-10 border-b border-[#376866] pb-10 md:flex-row md:items-start">
            <div><BrandMark light /><p className="mt-5 max-w-[250px] text-sm leading-6 text-[#bed9cf]">Cuidado clínico e escolar para acompanhar cada fase do desenvolvimento.</p></div>
            <div className="grid grid-cols-2 gap-x-14 gap-y-4 text-sm text-[#bed9cf]"><a href="#sobre" className="transition-colors hover:text-white" data-testid="link-footer-sobre">A Solução</a><a href="#servicos" className="transition-colors hover:text-white" data-testid="link-footer-servicos">Especialidades</a><a href="#frentes" className="transition-colors hover:text-white" data-testid="link-footer-frentes">Frentes de atuação</a><a href="#duvidas" className="transition-colors hover:text-white" data-testid="link-footer-duvidas">Dúvidas</a></div>
            <div className="md:text-right"><p className="text-xs uppercase tracking-[.13em] text-[#64d0bf]">Fale com a gente</p><a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-[#f7f2e8] hover:text-[#64d0bf]" data-testid="link-footer-whatsapp">(11) 99999-9999 <ArrowRight size={16} /></a><a href="#" className="mt-3 flex items-center gap-2 text-sm text-[#bed9cf] hover:text-white md:justify-end" data-testid="link-footer-instagram"><Instagram size={15} /> Instagram</a></div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-xs text-[#87aaa0] sm:flex-row"><span>© 2024 Solução. Cuidar também é construir junto.</span><span>Feito para acolher.</span></div>
        </div>
      </footer>
      <a href={whatsappHref} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#27b89f] text-[#103f40] shadow-[0_8px_24px_rgba(24,110,96,.28)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103f40]" aria-label="Falar com a Solução pelo WhatsApp" data-testid="link-floating-whatsapp"><MessageCircle size={24} /></a>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;