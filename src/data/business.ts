export interface PhoneLine {
  label: string;
  raw: string;
  display: string;
  tel: string;
  sms: string;
}

export const BUSINESS = {
  name: 'Castaneda Gardening & Tree Services',
  shortName: 'Castaneda',
  tagline: 'Your Yard, Fully Grown',
  region: 'Silicon Valley, centered on San Jose',
  logoPath: '/logo.png',
  offer: 'Free Estimate',
  phones: {
    primary: {
      label: 'Primary Line',
      raw: '408-914-8265',
      display: '(408) 914-8265',
      tel: 'tel:+14089148265',
      sms: 'sms:+14089148265',
    } as PhoneLine,
    secondary: {
      label: 'Secondary Line',
      raw: '408-284-9558',
      display: '(408) 284-9558',
      tel: 'tel:+14082849558',
      sms: 'sms:+14082849558',
    } as PhoneLine,
  },
  // TODO: client to provide
  email: '',
  // TODO: client to provide
  streetAddress: '',
  // TODO: client to provide
  hours: '',
  // TODO: client to provide
  contractorLicense: '',
  // TODO: client to provide
  treeServiceLicense: '',
  // TODO: client to provide
  socialLinks: {
    instagram: '',
    facebook: '',
    yelp: '',
    nextdoor: '',
  },
};
