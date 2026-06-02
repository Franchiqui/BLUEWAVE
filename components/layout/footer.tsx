'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  className?: string;
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Legal',
    links: [
      { name: 'Términos de Servicio', href: '/terminos' },
      { name: 'Política de Privacidad', href: '/privacidad' },
      { name: 'Política de Cookies', href: '/cookies' },
      { name: 'Aviso Legal', href: '/aviso-legal' },
      { name: 'Contáctanos', href: '/contacto' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
      { name: 'Carreras', href: '/carreras' },
      { name: 'Blog', href: '/blog' },
      { name: 'Prensa', href: '/prensa' },
      { name: 'Socios', href: '/socios' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { name: 'Centro de Ayuda', href: '/ayuda' },
      { name: 'Foro de la Comunidad', href: '/foro' },
      { name: 'Guías de Estudio', href: '/guias' },
      { name: 'Certificaciones', href: '/certificaciones' },
      { name: 'Eventos', href: '/eventos' },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
];

const Footer = React.memo<FooterProps>(({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={'bg-gray-900 text-gray-300 mt-auto ' + className} aria-label="Pie de página">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center space-x-2">
                <div className="relative w-40 h-24">
                  <Image
                    src="https://zeus-basedatos.fly.dev/api/files/pbc_1998862360/4ou6mzfabp7anmr/nuevo_logo_ql55z232q1.png"
                    alt="Logo"
                    fill
                    className="object-contain rounded-lg"
                    sizes="160px"
                  />
                </div>
              </div>
            </Link>
            <p className="mb-6 max-w-md">
              Plataforma líder para el desarrollo de aplicaciones y sitios web. Te ofrecemos la posibilidad de crear aplicaciones de alta calidad gracias al avance de la inteligencia artificial.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={'Síguenos en ' + social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    {social.icon === 'facebook' && 'f'}
                    {social.icon === 'twitter' && 't'}
                    {social.icon === 'instagram' && 'i'}
                    {social.icon === 'linkedin' && 'in'}
                    {social.icon === 'youtube' && 'yt'}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4 text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            © 2026. Todos los derechos reservados. Aplicación creada con www.zeus-ia.com
          </p>

        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
  
  