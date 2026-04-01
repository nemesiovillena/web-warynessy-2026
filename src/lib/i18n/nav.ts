// Navigation links (Spanish only - no locale prefix)
export function getNavLinks(_locale?: string): { name: string; href: string }[] {
  const nav = navTranslations.es
  return [
    { name: nav.carta,        href: '/carta' },
    { name: nav.menus,        href: '/menus' },
    { name: nav.reservas,     href: '/reservas' },
    { name: nav.contacto,     href: '/contacto' },
    { name: nav.experiencias, href: '/experiencias' },
  ]
}

// reservaNow: used in Header mobile CTA button
export const navReserveNow: Record<string, string> = {
  es: 'Reserva Ahora',
  ca: 'Reserva Ara',
  en: 'Book Now',
  fr: 'Réservez',
  de: 'Jetzt Buchen',
}

const navTranslations = {
  es: { carta: 'Carta',       menus: 'Menús',        reservas: 'Reservas',      contacto: 'Contacto', experiencias: 'Experiencias' },
  ca: { carta: 'Carta',       menus: 'Menús',        reservas: 'Reserves',      contacto: 'Contacte', experiencias: 'Experiències' },
  en: { carta: 'Menu',        menus: 'Group Menus',  reservas: 'Reservations',  contacto: 'Contact',  experiencias: 'Experiences'  },
  fr: { carta: 'Carte',       menus: 'Menus',        reservas: 'Réservations',  contacto: 'Contact',  experiencias: 'Expériences'  },
  de: { carta: 'Speisekarte', menus: 'Menüs',        reservas: 'Reservierungen',contacto: 'Kontakt',  experiencias: 'Erlebnisse'   },
}
