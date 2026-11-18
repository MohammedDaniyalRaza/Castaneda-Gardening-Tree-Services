import { useEffect } from 'react';
import { BUSINESS } from '../data/business';
import { SERVICE_CITIES } from '../data/areas';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

function setMetaTag(selector: string, attr: string, attrValue: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    description:
      'Gardening, hardscape, concrete, pavers, sod & mulch, irrigation & fences, lawn aeration, artificial lawn, and tree trimming & removal in Silicon Valley, centered on San Jose.',
    telephone: [BUSINESS.phones.primary.raw, BUSINESS.phones.secondary.raw],
    areaServed: SERVICE_CITIES.map((city) => ({
      '@type': 'City',
      name: `${city.name}, CA`,
    })),
    priceRange: 'Free Estimates',
    url: typeof window !== 'undefined' ? window.location.origin : '',
  };
}

export function usePageSeo({ title, description, path, schema }: SeoConfig) {
  useEffect(() => {
    const fullTitle = title.includes(BUSINESS.shortName)
      ? title
      : `${title} | ${BUSINESS.name}`;
    document.title = fullTitle;

    const canonicalUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${path}`
        : path;

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const existingScript = document.getElementById('castaneda-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const baseSchema = buildLocalBusinessSchema();
    const graphItems = schema
      ? Array.isArray(schema)
        ? [baseSchema, ...schema]
        : [baseSchema, schema]
      : [baseSchema];

    const script = document.createElement('script');
    script.id = 'castaneda-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graphItems,
    });
    document.head.appendChild(script);
  }, [title, description, path, schema]);
}
