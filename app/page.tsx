"use client";

import React, { useState, useEffect } from "react";
// Removido next/image para compatibilidade com o preview
import { Github, Linkedin, Mail, Menu, X, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

// --- DADOS DO PORTFÓLIO ---
const socialLinks = [
  {
    name: "Github",
    url: "https://github.com/PedroHQO",
    icon: Github,
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/pedro-henrique-a07564207/",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:pedro39henrique.q.o@gmail.com",
    icon: Mail,
  },
];

const projects = [
  {
    id: 1,
    title: "Thunder Mind - Plataforma SaaS",
    description: "Plataforma SaaS focada em automatizar o atendimento e agendamento para prestadores de serviços autônomos. Integra WhatsApp, controle de estoque e gestão financeira.",
    tech: ["Next.js 14", "Nest.JS", "Prisma/PostgreSQL", "Docker/Vercel"],
    repoLink: "https://www.gestapservicos.com.br/",
    image: "/thundermind-platform.png" 
  },
  {
    id: 2,
    title: "API de Controle de Acesso",
    description: "Sistema que controla o acesso de usuários com chaves únicas. Administradores têm acesso completo, enquanto colaboradores têm permissões limitadas.",
    tech: ["Java", "Spring Security", "PostgreSQL"],
    repoLink: "https://github.com/PedroHQO/Api-Digital-Security.git",
    image: "/controle de acesso.jpg" 
  },
  {
    id: 3,
    title: "Bot de Agendamentos",
    description: "Um bot automatizado para o Telegram que responde a comandos e interage com os usuários. Desenvolvido com Java e a API do Telegram.",
    tech: ["Java", "Telegram API", "MySQL"],
    repoLink: "https://github.com/PedroHQO/bot-agendamentos-telegram.git",
    image: "/chatbot_UX_testing_block.png"
  },
  {
    id: 4,
    title: "Consultando Tabela FIPE",
    description: "Aplicação Java para consulta de preços e informações de veículos usando a API pública da FIPE. Permite filtrar por marca, modelo e ano.",
    tech: ["Java", "API Rest", "JSON"],
    repoLink: "https://github.com/PedroHQO/Consultando_TabelaFipe_ConsumoAPI.git",
    image: "/FIPE.png"
  },
];

// --- COMPONENTES AUXILIARES ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Sobre Mim", href: "#sobre" },
    { name: "Projetos", href: "#projetos" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0a192f]/95 shadow-lg py-3" : "bg-transparent py-5"}`}>
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-6">
        {/* Logo */}
        <a href="#home" className="text-[#64ffda] font-display text-2xl tracking-widest hover:text-[#e6f1ff] transition-colors font-bold">
          PH<span className="text-[#e6f1ff]">.DEV</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href}
              className="text-sm font-medium text-[#ccd6f6] hover:text-[#64ffda] transition-colors font-sans"
            >
              <span className="text-[#64ffda] mr-1 font-mono">0{index + 1}.</span> {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#64ffda]">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#112240] border-b border-[#64ffda]/20 p-6 flex flex-col items-center gap-6 shadow-2xl">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className="text-lg text-[#e6f1ff] hover:text-[#64ffda] font-sans"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState("idle"); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    setTimeout(() => {
      setStatus("success");
      e.currentTarget.reset();
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1 text-left">
        <label className="text-[#64ffda] text-sm font-mono">Nome</label>
        <input type="text" name="name" required className="p-3 bg-[#112240] rounded border border-[#8892b0]/20 focus:border-[#64ffda] outline-none text-[#e6f1ff] transition-all" />
      </div>
      <div className="flex flex-col gap-1 text-left">
        <label className="text-[#64ffda] text-sm font-mono">E-mail</label>
        <input type="email" name="email" required className="p-3 bg-[#112240] rounded border border-[#8892b0]/20 focus:border-[#64ffda] outline-none text-[#e6f1ff] transition-all" />
      </div>
      <div className="flex flex-col gap-1 text-left">
        <label className="text-[#64ffda] text-sm font-mono">Mensagem</label>
        <textarea name="message" rows={5} required className="p-3 bg-[#112240] rounded border border-[#8892b0]/20 focus:border-[#64ffda] outline-none text-[#e6f1ff] resize-none transition-all"></textarea>
      </div>
      
      <button 
        type="submit" 
        disabled={status === "loading"}
        className="mt-4 p-4 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-all font-bold font-mono disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {status === "loading" && <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#64ffda]"></span>}
        {status === "success" ? "Enviado com Sucesso!" : status === "loading" ? "Enviando..." : "Enviar Mensagem"}
      </button>

      {status === "success" && (
        <div className="flex items-center gap-2 text-green-400 text-sm justify-center mt-2">
          <CheckCircle size={16} /> Mensagem recebida! Entrarei em contato em breve.
        </div>
      )}
    </form>
  );
};

// --- COMPONENTE PRINCIPAL (APP) ---

export default function App() {
  return (
    <div className="bg-[#0a192f] text-[#8892b0] min-h-screen font-sans selection:bg-[#64ffda] selection:text-[#0a192f]">
      {/* Estilos Globais Injetados */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;600;700&display=swap');
        
        .font-display { font-family: 'Bebas Neue', cursive; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-mono { font-family: monospace; }
        
        html { scroll-behavior: smooth; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a192f; }
        ::-webkit-scrollbar-thumb { background: #233554; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #64ffda; }
      `}</style>

      <Header />

      {/* Social Fixed Left */}
      <div className="hidden lg:flex fixed left-10 bottom-0 flex-col gap-6 items-center after:content-[''] after:w-[1px] after:h-24 after:bg-[#8892b0] after:mt-4 z-10">
        {socialLinks.map((link) => (
          <a key={link.name} href={link.url} target="_blank" className="text-[#8892b0] hover:text-[#64ffda] hover:-translate-y-1 transition-all">
            <link.icon size={20} />
          </a>
        ))}
      </div>

      {/* Email Fixed Right */}
      <div className="hidden lg:flex fixed right-10 bottom-0 flex-col gap-6 items-center after:content-[''] after:w-[1px] after:h-24 after:bg-[#8892b0] after:mt-4 z-10">
        <a href="mailto:pedro39henrique.q.o@gmail.com" className="text-[#8892b0] hover:text-[#64ffda] text-xs font-mono tracking-widest rotate-90 mb-24 hover:-translate-y-1 transition-all">
          pedro39henrique.q.o@gmail.com
        </a>
      </div>

      <main className="px-6 md:px-24 lg:px-36 max-w-[1600px] mx-auto">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex flex-col justify-center pt-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <p className="text-[#64ffda] font-mono mb-5 text-lg">Olá, meu nome é</p>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-[#e6f1ff] mb-4">
                Pedro Henrique.
              </h1>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-[#8892b0] mb-8">
                Eu construo soluções para a web.
              </h2>
              <p className="max-w-xl text-[#8892b0] text-lg leading-relaxed mb-12">
                Sou um desenvolvedor Full Stack com expertise em backend especializado em <strong className="text-[#64ffda]">Java, Spring-Boot, NestJs e React/Next.js</strong>. 
                Meu foco é implementar soluções tecnológicas que aumentam a eficiência, visibilidade e reduzem custos.
              </p>
              <a href="#contato" className="px-8 py-4 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-all font-mono">
                Vamos conversar?
              </a>
            </div>
            
            {/* Imagem de Perfil no Home (Corrigida para aparecer no Mobile) */}
            <div className="relative w-64 h-64 mx-auto group mt-8 md:mt-0">
                 {/* Borda decorativa */}
                 <div className="absolute inset-0 border-2 border-[#64ffda] rounded-lg translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                 {/* Container da Imagem */}
                 <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#0a192f]">
                    <img 
                      src="/Pedro Henrique Fundo lara.png" 
                      alt="Pedro Henrique"
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                 </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="sobre" className="py-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[#64ffda] font-mono text-xl">01.</span>
            <h2 className="text-3xl md:text-4xl text-[#e6f1ff] font-bold font-display">Sobre Mim</h2>
            <div className="h-[1px] bg-[#233554] flex-grow max-w-xs ml-4"></div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <div className="text-[#8892b0] text-lg space-y-4">
              <p>
                Olá! Sou Pedro Henrique, um desenvolvedor apaixonado por inovação desde 2019. Tenho me dedicado a criar projetos que impactam positivamente pessoas e negócios.
              </p>
              <p>
                Minha expertise técnica inclui:
              </p>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm mt-4 max-w-lg">
                {['Java (Spring Boot)', 'Node (Nest/Express)','Next.js (TypeScript)', 'PostgreSQL', 'Tailwind CSS', 'React', 'Git/Github', 'Docker'].map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <span className="text-[#64ffda]">▹</span> {tech}
                  </li>
                ))}
              </ul>
              <p>
                Fora do código, sou baterista, pratico atletismo e sou um leitor ávido. Acredito que a constância e a disciplina são as chaves para o sucesso.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projetos" className="py-24">
           <div className="flex items-center gap-4 mb-12">
            <span className="text-[#64ffda] font-mono text-xl">02.</span>
            <h2 className="text-3xl md:text-4xl text-[#e6f1ff] font-bold font-display">Meus Projetos</h2>
            <div className="h-[1px] bg-[#233554] flex-grow max-w-xs ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-[#112240] p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300 shadow-xl group flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-[#64ffda]">
                    <Github size={40} />
                  </div>
                  <a href={project.repoLink} target="_blank" className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors">
                    <ExternalLink size={24} />
                  </a>
                </div>
                
                <h3 className="text-xl font-bold text-[#e6f1ff] mb-2 group-hover:text-[#64ffda] transition-colors font-display tracking-wide">
                  {project.title}
                </h3>

                {/* IMAGEM DO PROJETO */}
                <div className="w-full h-40 mb-4 overflow-hidden rounded border border-[#233554] bg-[#0a192f] relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                
                <p className="text-[#8892b0] mb-6 text-sm flex-grow leading-relaxed">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-3 text-xs font-mono text-[#8892b0] mt-auto">
                  {project.tech.map(t => (
                    <li key={t} className="text-[#64ffda]/90">{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contato" className="py-24 mb-20 text-center max-w-2xl mx-auto">
          <p className="text-[#64ffda] font-mono mb-4">03. O que vem a seguir?</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#e6f1ff] mb-6">Entre em Contato</h2>
          <p className="text-[#8892b0] text-lg mb-12">
            Estou sempre aberto a novos desafios e oportunidades de colaboração. 
            Se você tem uma ideia ou apenas quer dar um oi, minha caixa de entrada está sempre aberta!
          </p>

          <ContactForm />
          
          <div className="mt-12 md:hidden flex justify-center gap-8">
             {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" className="text-[#8892b0] hover:text-[#64ffda]">
                <link.icon size={24} />
              </a>
            ))}
          </div>
        </section>

      </main>

      <footer className="text-center py-6 text-[#8892b0] text-sm font-mono hover:text-[#64ffda] transition-colors bg-[#0a192f]">
        <a href="https://github.com/PedroHQO" target="_blank">
          Desenvolvido por Pedro_HQO &copy; 2025
        </a>
      </footer>
    </div>
  );
}