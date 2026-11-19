import { useState } from "react";
import { Check, Mail, MapPin, Phone, Send, X } from "lucide-react";

import PrintPricing from "@/components/PrintPricing";

type PackageCard = {
  name: string;
  subtitle: string;
  price?: string;
  items: string[];
  footer: string;
  featured?: boolean;
};

const packages: PackageCard[] = [
  {
    name: "ESSENCIAL",
    subtitle: "AUTOR INDEPENDENTE",
    price: "120.000 KZ",
    items: [
      "2 Livros de Oferta (Papel Offset/150 pág.)",
      "ISBN",
      "Registo Legal",
      "Paginação",
      "Criação de Capa Profissional",
      "Diagramação",
    ],
    footer: "IDEAL PARA QUEM DESEJA DAR O PRIMEIRO PASSO COM SUPORTE PROFISSIONAL ESSENCIAL",
  },
  {
    name: "PROFISSIONAL",
    subtitle: "DESTAQUE NO MERCADO",
    price: "495.000 KZ",
    featured: true,
    items: [
      "Revisão Linguística",
      "1 Spot Publicitário (Áudio e Vídeo)",
      "25 Livros de Oferta (Papel Offset/150 pág.)",
      "ISBN",
      "Registo Legal",
      "Paginação",
      "Criação de Capa Profissional",
      "Projecto gráfico avançado e diagramação personalizada",
    ],
    footer: "UM PACOTE COMPLETO PARA GARANTIR QUALIDADE EDITORIAL DE NÍVEL COMERCIAL",
  },
  {
    name: "PREMIUM",
    subtitle: "EDIÇÃO DE LUXO",
    price: "895.000 KZ",
    items: [
      "Suporte estratégico para o lançamento e campanha de divulgação",
      "2 Entrevistas nas Rádios",
      "1 Entrevista na TV",
      "Direito a Postagem e Anúncio na Página da Editora",
      "Revisão Linguística",
      "Projecto gráfico avançado e diagramação personalizada",
      "50 Livros de Oferta (Papel Pólen/200 pág.)",
      "ISBN",
      "Registo Legal",
      "Paginação",
      "Criação de Capa Profissional",
    ],
    footer: "A EXPERIÊNCIA COMPLETA DE EDITORA, DO MANUSCRITO AO LANÇAMENTO",
  },
  {
    name: "COMUNICAÇÃO E IMAGEM",
    subtitle: "DIVULGAÇÃO DO SEU LIVRO",
    items: [
      "Spot Publicitário (áudio e Vídeo) — 100.000 Kz",
      "Entrevistas (2 na Rádio e 1 na TV) — 150.000 Kz",
      "Cartaz de Lançamento + Brevemente — 30.000 Kz",
    ],
    footer: "DÊ VISIBILIDADE AO SEU LIVRO E FAÇA O LANÇAMENTO CHEGAR MAIS LONGE",
  },
];

const whatsappUrl = "https://wa.me/244948595707?text=Olá%2C%20Criartes!%20Tenho%20interesse%20nos%20pacotes%20de%20publicidade%20para%20o%20meu%20livro.";

const packageQuestions = [
  { question: "Qual é o seu objetivo principal?", options: ["Lançar o meu livro", "Divulgar para mais pessoas", "Fortalecer a minha imagem"] },
  { question: "Em que fase está o seu projecto?", options: ["Ainda estou a preparar", "O livro está pronto", "Já tenho data de lançamento"] },
  { question: "Como prefere avançar?", options: ["Quero receber informações", "Quero pedir orçamento", "Quero falar com um consultor"] },
];

export default function Home() {
  const [activePackage, setActivePackage] = useState<string | null>(null);
  const [questionStep, setQuestionStep] = useState(0);
  const [questionAnswers, setQuestionAnswers] = useState<string[]>([]);

  const openPackageQuestions = (packageName: string) => {
    setActivePackage(packageName);
    setQuestionStep(0);
    setQuestionAnswers([]);
  };

  const closePackageQuestions = () => setActivePackage(null);

  const chooseQuestionAnswer = (answer: string) => {
    const nextAnswers = [...questionAnswers, answer];
    setQuestionAnswers(nextAnswers);
    setQuestionStep((previous) => Math.min(previous + 1, packageQuestions.length));
  };

  const modalWhatsappUrl = activePackage
    ? `https://wa.me/244948595707?text=${encodeURIComponent(`Olá, Criartes! Tenho interesse no Pacote ${activePackage}. As minhas respostas são: ${questionAnswers.join("; ")}.`)}`
    : whatsappUrl;

  return (
    <div className="package-page">
      <header className="package-header">
        <a className="package-brand" href="#inicio" aria-label="Criartes Gráfica e Editora">
          <img className="package-real-logo" src={`${import.meta.env.BASE_URL}images/criartes-logo.webp`} alt="Criartes Gráfica e Editora" decoding="async" />
        </a>
        <a className="package-header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Falar com a equipa <Send size={15} /></a>
      </header>

      <main id="inicio">
        <section className="package-intro">
          <p className="package-eyebrow">CRIARTES · EDIÇÃO E DIVULGAÇÃO</p>
          <h1>Dê visibilidade ao seu livro</h1>
          <p className="package-lead">Escolha o nível de apoio que o seu livro precisa para ganhar qualidade, presença e visibilidade.</p>
        </section>

        <section className="package-grid" aria-label="Pacotes de publicidade">
          {packages.map((item) => (
            <article className={`package-card ${item.featured ? "package-card-featured" : ""}`} key={item.name}>
              <div className="package-card-title"><span>PACOTE</span><h2>{item.name}</h2><small>({item.subtitle})</small></div>
              {item.price && <div className="package-price">{item.price}</div>}
              {!item.price && <div className="package-price package-price-empty">À MEDIDA</div>}
              <div className="package-book-art" aria-hidden="true"><img className="package-book-image" src={`${import.meta.env.BASE_URL}images/livro-criartes.webp`} alt="Livro Criartes" decoding="async" /></div>
              <ul className="package-items">{item.items.map((benefit) => <li key={benefit}><Check size={14} /> <span>{benefit}</span></li>)}</ul>
              <div className="package-note">Os livros com mais de 150 páginas têm um custo adicional de 1.000 KZ por cada página.</div>
              <div className="package-card-question">Quer avançar com este pacote?</div>
              <button className="package-card-button" onClick={() => openPackageQuestions(item.name)}>Quero saber mais sobre este pacote <Send size={14} /></button>
              <div className="package-footer">{item.footer}</div>
            </article>
          ))}
        </section>

        <PrintPricing onSelectPackage={openPackageQuestions} />

        <section className="package-contact" id="contacto">
          <div><p className="package-eyebrow">DÊ O PRÓXIMO PASSO</p><h2>O seu livro merece ser visto.</h2><p>Fale com a nossa equipa para escolher o pacote mais adequado ao seu projecto e receber orientação para avançar.</p></div>
          <div className="package-contact-actions"><a className="package-button package-button-gold" href={whatsappUrl} target="_blank" rel="noreferrer">Pedir informações <Send size={17} /></a><a className="package-button package-button-outline" href="mailto:geral@editoracriartes.com?subject=Interesse nos pacotes de publicidade">Enviar email <Mail size={17} /></a></div>
        </section>

        <section className="quality-section" aria-label="Testemunhos sobre a qualidade de impressão">
          <div className="quality-copy"><p className="package-eyebrow">QUALIDADE QUE SE NOTA</p><h2>Aumente a qualidade do seu livro.</h2><p>Uma boa impressão valoriza a sua obra, respeita as cores do seu design e transmite profissionalismo em cada página.</p><blockquote>“A qualidade da sua impressão conseguiu reflectir a cor real que estava no design. Meus parabéns e obrigado pelo profissionalismo.”<cite>— Testemunho de cliente Criartes</cite></blockquote></div>
          <div className="quality-proof"><img src={`${import.meta.env.BASE_URL}images/testemunho-qualidade-1.webp`} alt="Testemunho de cliente sobre a qualidade de impressão" loading="lazy" decoding="async" /><img src={`${import.meta.env.BASE_URL}images/testemunho-qualidade-2.webp`} alt="Testemunho de cliente sobre a fidelidade das cores na impressão" loading="lazy" decoding="async" /></div>
        </section>
      </main>

      {activePackage && <div className="package-modal-backdrop" role="presentation" onClick={closePackageQuestions}><div className="package-modal" role="dialog" aria-modal="true" aria-label={`Perguntas sobre o Pacote ${activePackage}`} onClick={(event) => event.stopPropagation()}><button className="package-modal-close" onClick={closePackageQuestions} aria-label="Fechar"><X size={20} /></button><p className="package-eyebrow">PACOTE {activePackage}</p>{questionStep < packageQuestions.length ? <><div className="package-modal-progress"><span><i style={{ width: `${((questionStep + 1) / packageQuestions.length) * 100}%` }} /></span></div><h2>{packageQuestions[questionStep].question}</h2><div className="package-modal-options">{packageQuestions[questionStep].options.map((option) => <button key={option} onClick={() => chooseQuestionAnswer(option)}>{option}<Send size={14} /></button>)}</div></> : <><div className="package-modal-success"><Check size={22} /></div><h2>Obrigado pelas respostas.</h2><p>Agora fale directamente com a Criartes para receber a orientação sobre o seu pacote.</p><a className="package-button package-button-gold" href={modalWhatsappUrl} target="_blank" rel="noreferrer">Enviar para o WhatsApp <Send size={17} /></a></>}</div></div>}

      <footer className="package-footer-main"><div><a className="package-brand" href="#inicio"><img className="package-real-logo" src={`${import.meta.env.BASE_URL}images/criartes-logo.webp`} alt="Criartes Gráfica e Editora" decoding="async" /></a><p>O próximo livro pode ser o seu.</p></div><div className="package-footer-info"><span><MapPin size={15} /> Bairro Prenda, lado oposto da Samba, defronte o Suave</span><a href="tel:+244948595707"><Phone size={15} /> 948 595 707</a><a href="https://www.criartes.lol" target="_blank" rel="noreferrer">www.criartes.lol</a><a href="mailto:geral@editoracriartes.com"><Mail size={15} /> geral@editoracriartes.com</a></div><div className="package-footer-bottom">CRIARTES, GRÁFICA E EDITORA <span>© 2026</span></div></footer>
    </div>
  );
}
