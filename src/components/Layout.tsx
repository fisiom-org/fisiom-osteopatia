import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { ArrowRight, Phone, Heart, Menu, X } from 'lucide-react'
import FisiomLogo from './FisiomLogo'
import { getGenericWhatsAppLink } from '../hooks/useWhatsApp'

const navItems = [
  { path: '/', label: 'Início' },
  { path: '/osteopatia', label: 'Osteopatia' },
  { path: '/alinhamento-ativo', label: 'Alinhamento Ativo' },
  { path: '/agendamentos', label: 'Agendamentos' },
]

function Header() {
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const whatsappLink = getGenericWhatsAppLink()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF9F6]/95 border-b border-[#799797]/10 premium-transition">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <FisiomLogo className="w-36 h-auto transition-transform group-hover:scale-105 premium-transition" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm tracking-widest uppercase premium-transition relative py-2 ${
                pathname === path
                  ? 'text-[#2C4242] font-medium'
                  : 'text-[#423F2C]/60 hover:text-[#2C4242]'
              }`}
            >
              {label}
              {pathname === path && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2B67A]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2C4242] text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-[#C2B67A] hover:text-[#2C4242] premium-transition shadow-sm flex items-center gap-2 font-semibold"
          >
            <span>Marcar Consulta</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          className="md:hidden text-[#2C4242] focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-[#799797]/10 px-6 py-8 flex flex-col gap-6 animate-fadeIn">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left text-lg font-editorial tracking-wider ${
                pathname === path ? 'text-[#2C4242] font-semibold' : 'text-[#423F2C]/70'
              }`}
            >
              {label}
            </Link>
          ))}
          <hr className="border-[#799797]/20" />
          <div className="flex flex-col gap-4">
            <span className="text-xs text-[#799797] uppercase tracking-widest">Segunda a Sexta — 07h às 18h</span>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#2C4242] text-white py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-[#C2B67A] hover:text-[#2C4242] transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Telemóvel: (48) 99114-6017</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#2C4242] text-white pt-16 pb-8 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <FisiomLogo className="w-28 h-auto" mainColor="#FFFFFF" subColor="#C2B67A" />
          <p className="text-xs text-white/60 font-light leading-relaxed">
            Tratamentos integrativos de osteopatia e fisioterapia manual para alívio de tensões, equilíbrio postural e restauração de bem-estar integral.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-[#C2B67A] font-bold">Mapa do Site</h4>
          <ul className="text-xs space-y-2.5 font-light text-white/70">
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <Link to={path} className="hover:text-[#C2B67A] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-[#C2B67A] font-bold">Responsabilidade Técnica</h4>
          <div className="text-xs text-white/70 space-y-1.5 font-light">
            <p className="text-white font-medium">Cleo Scherer</p>
            <p>Fisioterapeuta Osteopata</p>
            <p className="text-[#799797] font-medium">CREFITO 82530-F</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-[#C2B67A] font-bold">Contatos Rápidos</h4>
          <div className="text-xs text-white/70 space-y-1.5 font-light">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#C2B67A]" />
              <span>(48) 99114-6017</span>
            </p>
            <p className="text-[#799797]">Atendimento das 07h às 18h</p>
            <p className="text-white/40 mt-2">Florianópolis — SC</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 tracking-wider">
        <p>© {new Date().getFullYear()} fisiom Osteopatia. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          <span>Desenvolvido com carinho e precisão</span>
          <Heart className="w-3 h-3 text-[#C2B67A]" fill="#C2B67A" />
        </p>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen font-sans-clean text-[#423F2C] bg-[#FAF9F6] selection:bg-[#799797]/30 flex flex-col justify-between">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
