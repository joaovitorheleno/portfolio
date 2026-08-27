import React, { useState, useEffect } from 'react';
import { Sun, Moon, Mail, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_zgefz9b';
const EMAILJS_TEMPLATE_ID = 'template_icqnzzx';
const EMAILJS_PUBLIC_KEY = 'xvMS_ZzKnMRxebX0I';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt');

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt');

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setFormError(content[language].formEmptyError);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      setFormError(content[language].formEmailError);
      return;
    }

    setFormStatus('sending');
    setFormError('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: 'Mensagem do Portfólio',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: 'joaoheleno971@gmail.com'
        },
        EMAILJS_PUBLIC_KEY
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch (err) {
      console.error('Erro ao enviar e-mail:', err);
      setFormStatus('error');
      setFormError(content[language].formSendError);
    }
  };

  const content = {
    pt: {
      nav: { about: 'Sobre Mim', projects: 'Projetos', exp: 'Experiências', contact: 'Contato' },
      hero: {
        title: 'João Vitor Heleno Marinho',
        subtitle: 'Engenheiro de Software & Estagiário de TI',
        desc: 'Estudante de Engenharia de Software na PUC Minas. Desenvolvo APIs robustas e sistemas escaláveis, aplicando boas práticas de arquitetura no dia a dia — hoje na Sankhya e como fundador da Solvantech.',
        btnProjects: '+ Ver Projetos',
        btnContact: 'Entrar em Contato'
      },
      projects: {
        title: 'Projetos',
        desc: 'Lista dos meus projetos.',
        items: [
          { name: 'Servin', desc: 'Projeto de prática full-stack focado no desenvolvimento de um sistema de credenciamento, treinando a integração do backend com o frontend.' },
          { name: 'Simulador de Drone', desc: 'Simulador desenvolvido principalmente com Typescript para simular uma entrega de drone.' },
          { name: 'Sistema de Compra', desc: 'Sistema simples desenvolvido com Node.js e React para praticar boas práticas de programação na linguagem utilizada.' }
        ]
      },
      exp: {
        title: 'Experiências',
        desc: 'Minha trajetória acadêmica e profissional atual.',
        items: [
          {
            title: 'Desenvolvedor Backend Java (Sankhya)',
            date: 'Ago 2025 - Atual',
            desc: 'Atuação focada no ecossistema do ERP Sankhya, desenvolvendo event handlers em Java, triggers e procedures em PL/SQL, consultas complexas, layouts em JasperReports/iReport e fluxos automatizados de processos de negócios.'
          },
          {
            title: 'Desenvolvedor FullStack Node.js e React (Betruck)',
            date: '2024 - Ago 2025',
            desc: 'Apoio ao desenvolvimento de aplicações web, participando da construção de interfaces de usuário e integrações de rotas e APIs no backend.'
          },
          {
            title: 'Fundador e Desenvolvedor da Solvantech',
            date: 'Dez 2025 - Atual',
            desc: 'Iniciativa voltada ao desenvolvimento de soluções de software para empresas, com foco em automação de processos e integração de sistemas.'
          },
          {
            title: 'Engenharia de Software - PUC Minas',
            date: 'Jan 2025 - Atual',
            desc: 'Estudante da Pontifícia Universidade Católica de Minas Gerais (PUC-Minas).'
          }
        ]
      },
      contact: {
        title: 'Contato',
        desc: 'Buscando novas parcerias ou apenas trocar ideias? Fale Comigo!',
        nameLabel: 'Nome',
        emailLabel: 'E-mail',
        msgLabel: 'Mensagem',
        btnSend: 'Enviar Mensagem',
        btnSending: 'Enviando...',
        formEmptyError: 'Por favor, preencha todos os campos.',
        formEmailError: 'Por favor, insira um e-mail válido.',
        formSendError: 'Não foi possível enviar. Tente novamente ou use o e-mail direto.',
        formSuccess: 'Mensagem enviada com sucesso!'
      }
    },
    en: {
      nav: { about: 'About Me', projects: 'Projects', exp: 'Experiences', contact: 'Contact' },
      hero: {
        title: 'João Vitor Heleno Marinho',
        subtitle: 'Software Engineer & IT Intern',
        desc: 'Software Engineering student at PUC Minas. I develop robust APIs and scalable systems, applying good architecture practices daily — currently at Sankhya and as the founder of Solvantech.',
        btnProjects: '+ View Projects',
        btnContact: 'Get in Touch'
      },
      projects: {
        title: 'Projects',
        desc: 'List of my recently projects.',
        items: [
          { name: 'Servin', desc: 'Full-stack practice project focused on developing an accreditation system, training the integration of the backend with the frontend.' },
          { name: 'Drone Simulator', desc: 'Simulator mainly developed with Typescript to simulate a drone delivery.' },
          { name: 'Order System', desc: 'Simple system developed with Node.js and React to practice good programming practices in the language used.' }
        ]
      },
      exp: {
        title: 'Experiences',
        desc: 'My academic and current professional background.',
        items: [
          {
            title: 'Backend Java Developer (Sankhya)',
            date: 'Ago 2025 - Present',
            desc: "Focused work on the ERP Sankhya ecosystem, developing event handlers in Java, triggers and procedures in PL/SQL, complex queries, layouts in JasperReports/iReport, and automated business process flows."
          },
          {
            title: 'Node.js and React FullStack Developer (Betruck)',
            date: '2024 - Ago 2025',
            desc: 'Support for the development of web applications, participating in building user interfaces and integrating routes and APIs in the backend.'
          },
          {
            title: 'Founder and Developer at Solvantech',
            date: 'Dez 2025 - Present',
            desc: 'Initiative aimed at developing software solutions for companies, focusing on process automation and system integration.'
          },
          {
            title: 'Software Engineer - PUC Minas',
            date: 'Jan 2025 - Present',
            desc: 'Student at Pontifical Catholic University of Minas Gerais (PUC-Minas).'
          }
        ]
      },
      contact: {
        title: 'Contact',
        desc: 'Looking for new partnerships or just want to chat? Get in touch!',
        nameLabel: 'Name',
        emailLabel: 'Email',
        msgLabel: 'Message',
        btnSend: 'Send Message',
        btnSending: 'Sending...',
        formEmptyError: 'Please fill in all fields.',
        formEmailError: 'Please enter a valid email address.',
        formSendError: 'Could not send. Please try again or use the direct email.',
        formSuccess: 'Message sent successfully!'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300">

      <header className="flex justify-between items-center p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm dark:shadow-gray-950 fixed w-full top-0 z-10 transition-colors duration-300">
        <div className="text-xl font-bold">João Vitor Heleno Marinho</div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#sobre" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">{t.nav.about}</a>
          <a href="#projetos" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">{t.nav.projects}</a>
          <a href="#experiencias" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">{t.nav.exp}</a>
          <a href="#contato" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">{t.nav.contact}</a>

          <div className="flex items-center gap-2 border-l border-gray-300 dark:border-gray-700 pl-4">
            <button onClick={toggleLanguage} className="font-bold text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              {language === 'pt' ? 'EN' : 'PT'}
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-28 px-6 md:px-8 max-w-5xl mx-auto space-y-32">

        <section id="sobre" className="text-center py-12 md:py-20 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">{t.hero.title}</h1>
          <h2 className="text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6">{t.hero.subtitle}</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#projetos" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all">
              {t.hero.btnProjects}
            </a>
            <a href="#contato" className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold rounded-xl shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700">
              {t.hero.btnContact}
            </a>
          </div>
        </section>

        <section id="projetos">
          <h3 className="text-3xl font-bold mb-2">{t.projects.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-10">{t.projects.desc}</p>

          <div className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-3 md:ml-6 space-y-12">
            {t.projects.items.map((proj, index) => (
              <div key={index} className="relative pl-8 md:pl-10">
                <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full -left-[9px] top-1.5 shadow-sm"></div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2">{proj.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="experiencias">
          <h3 className="text-3xl font-bold mb-2">{t.exp.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-10">{t.exp.desc}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.exp.items.map((exp, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{exp.title}</h4>
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold rounded-full mb-4">
                  {exp.date}
                </span>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contato" className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t.contact.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">{t.contact.desc}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                  <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-full text-blue-600 dark:text-blue-400"><Mail size={24} /></div>
                  <span className="font-medium">joaoheleno971@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                  <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-full text-blue-600 dark:text-blue-400"><Phone size={24} /></div>
                  <span className="font-medium">+55 (31) 9 9279-3141</span>
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://github.com/joaovitorheleno" target="_blank" rel="noreferrer" className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/joaovitorhelenomarinho/" target="_blank" rel="noreferrer" className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 rounded-2xl">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.contact.nameLabel}</label>
                <input type="text" name="name" value={formData.name} onChange={handleFormChange} disabled={formStatus === 'sending'} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.contact.emailLabel}</label>
                <input type="email" name="email" value={formData.email} onChange={handleFormChange} disabled={formStatus === 'sending'} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.contact.msgLabel}</label>
                <textarea rows="4" name="message" value={formData.message} onChange={handleFormChange} disabled={formStatus === 'sending'} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none disabled:opacity-60"></textarea>
              </div>

              {formStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium">
                  <AlertCircle size={16} /> {formError}
                </div>
              )}
              {formStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
                  <CheckCircle size={16} /> {t.contact.formSuccess}
                </div>
              )}

              <button type="submit" disabled={formStatus === 'sending'} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                {formStatus === 'sending' && <Loader2 size={18} className="animate-spin" />}
                {formStatus === 'sending' ? t.contact.btnSending : t.contact.btnSend}
              </button>
            </form>
          </div>
        </section>

      </main>

      <footer className="text-center py-8 mt-20 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p className="font-medium">© 2026 João Vitor Heleno Marinho. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}