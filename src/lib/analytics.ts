/**
 * Google Analytics 4 Event Tracking
 * Solo envía eventos si el usuario ha aceptado cookies analíticas
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Verificar si GA4 está disponible y el usuario aceptó cookies
function isAnalyticsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.gtag) return false;

  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

// Evento genérico
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag('event', eventName, params);
  console.log('[GA4] Event:', eventName, params);
}

// === EVENTOS PREDEFINIDOS ===

// Click en botón de reservas
export function trackReservationClick(location: string): void {
  trackEvent('reservation_click', {
    event_category: 'engagement',
    event_label: location,
    value: 1
  });
}

// Ver página de carta
export function trackMenuView(): void {
  trackEvent('menu_view', {
    event_category: 'content',
    event_label: 'carta'
  });
}

// Click en categoría de carta
export function trackCategoryClick(category: string): void {
  trackEvent('category_click', {
    event_category: 'navigation',
    event_label: category
  });
}

// Click en plato específico
export function trackDishClick(dishName: string, category: string): void {
  trackEvent('dish_click', {
    event_category: 'content',
    event_label: dishName,
    dish_category: category
  });
}

// Envío de formulario de contacto
export function trackContactSubmit(subject: string): void {
  trackEvent('contact_form_submit', {
    event_category: 'conversion',
    event_label: subject
  });
}

// Click en teléfono
export function trackPhoneClick(): void {
  trackEvent('phone_click', {
    event_category: 'contact',
    event_label: 'phone'
  });
}

// Click en email
export function trackEmailClick(): void {
  trackEvent('email_click', {
    event_category: 'contact',
    event_label: 'email'
  });
}

// Click en redes sociales
export function trackSocialClick(network: string): void {
  trackEvent('social_click', {
    event_category: 'social',
    event_label: network
  });
}

// Scroll a sección específica
export function trackSectionView(sectionName: string): void {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: sectionName
  });
}

// Descarga de PDF (menú, etc.)
export function trackDownload(fileName: string): void {
  trackEvent('file_download', {
    event_category: 'download',
    event_label: fileName
  });
}
