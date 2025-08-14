export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Insurance Box',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + '/the-insurance-box-logo.png',
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function productBreadcrumbJsonLd(name: string, slug: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'Products', item: base + '/products' },
      { '@type': 'ListItem', position: 3, name: name, item: base + `/products/${slug}` },
    ],
  };
}




