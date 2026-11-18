export interface NavItem {
  label: string;
  to: string;
  hasMegaMenu?: boolean;
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services', hasMegaMenu: true },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Service Area', to: '/service-area' },
  { label: 'Garden Tips', to: '/garden-tips' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'FAQ', to: '/faq' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'All Services', to: '/services' },
  { label: 'Project Gallery', to: '/gallery' },
  { label: 'Garden Tips', to: '/garden-tips' },
  { label: 'Service Area', to: '/service-area' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'FAQ', to: '/faq' },
  { label: 'About Us', to: '/about' },
  { label: 'Get a Free Estimate', to: '/contact' },
];
