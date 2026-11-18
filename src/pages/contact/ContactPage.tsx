import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { BUSINESS } from '../../data/business';
import { SERVICES } from '../../data/services';
import { SERVICE_CITIES, AREA_FALLBACK_NOTE } from '../../data/areas';
import { FAQS } from '../../data/faqs';
import { submitQuoteRequest } from '../../services/quote';
import { PageHero } from '../../components/sections/PageHero';
import { Input, Textarea } from '../../components/ui/Input';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { CustomDatePicker } from '../../components/ui/CustomDatePicker';
import { Chip } from '../../components/ui/Chip';
import { Button, LinkButton } from '../../components/ui/Button';
import { Accordion } from '../../components/ui/Accordion';
import { usePageSeo } from '../../lib/seo';

const YARD_SIZE_OPTIONS = ['Small / Compact', 'Medium', 'Large / Estate', 'Not Sure'];
const TIMELINE_OPTIONS = ['As Soon As Possible', 'Next 2–4 Weeks', 'Planning Ahead', 'Recurring Care'];

interface PrefillState {
  prefillServices?: string[];
  prefillYardSize?: string;
  prefillMessage?: string;
}

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const state = (location.state as PrefillState | null) || null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('San Jose');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [yardSize, setYardSize] = useState('Medium');
  const [timeline, setTimeline] = useState('Next 2–4 Weeks');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  usePageSeo({
    title: 'Get a Free Estimate | Castaneda Gardening & Tree Services',
    description:
      'Request a Free Estimate or call (408) 914-8265 or (408) 284-9558 for concrete, pavers, sod, irrigation, fences, lawn maintenance, and tree services in Silicon Valley.',
    path: '/contact',
  });

  useEffect(() => {
    if (!state) return;
    if (state.prefillServices?.length) setSelectedServices(state.prefillServices);
    if (state.prefillYardSize) setYardSize(state.prefillYardSize);
    if (state.prefillMessage) setMessage(state.prefillMessage);
  }, [state]);

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const cityOptions = [
    ...SERVICE_CITIES.map((c) => ({ value: c.name, label: c.name })),
    { value: 'Other Nearby Silicon Valley City', label: 'Other Nearby Silicon Valley City' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Please enter a phone number so we can call or text you back.';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please check the email format or leave it blank.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await submitQuoteRequest({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city,
        services: selectedServices,
        yardSize,
        timeline,
        preferredDate,
        message: message.trim(),
      });
      if (res.ok) {
        setSubmittedRef(res.referenceId);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        imageKey="concrete"
        title="Get a Free"
        accentWord="Estimate."
        subtitle="Tell us about your yard or call/text us directly. No obligation, no pushy sales pitch—just an honest on-site walkthrough."
        ribbonText="FREE ON-SITE ESTIMATES"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        bottomFill="var(--paper)"
      />

      <section className="surface-paper section-pad">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
            {/* Estimate Form */}
            <div
              style={{
                backgroundColor: 'var(--white)',
                border: '1px solid var(--border-light-strong)',
                borderRadius: '22px',
                padding: 'clamp(22px, 4vw, 38px)',
              }}
            >
              {submittedRef ? (
                <div
                  role="status"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    paddingBlock: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--deep-forest)',
                      color: 'var(--yellow)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircle2 size={30} />
                  </div>
                  <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                    Estimate Request Prepared · Ref {submittedRef}
                  </span>
                  <h2 className="display-md" style={{ margin: 0, color: 'var(--black)' }}>
                    Thank you, {name}!
                  </h2>
                  <p className="body-copy" style={{ margin: 0, color: 'var(--gray-dark)' }}>
                    Your project summary for <strong>{city}</strong> is ready. For the quickest
                    scheduling on your Free Estimate, feel free to call or text either line directly
                    and mention reference <strong>{submittedRef}</strong>.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingTop: '8px' }}>
                    <LinkButton href={BUSINESS.phones.primary.tel} variant="primary">
                      <Phone size={16} />
                      <span>Call {BUSINESS.phones.primary.display}</span>
                    </LinkButton>
                    <LinkButton href={BUSINESS.phones.primary.sms} variant="dark">
                      <MessageSquare size={16} />
                      <span>Text Primary Line</span>
                    </LinkButton>
                    <Button
                      variant="outline-on-light"
                      onClick={() => {
                        setSubmittedRef(null);
                        setName('');
                        setPhone('');
                        setEmail('');
                        setMessage('');
                      }}
                    >
                      Submit Another Request
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div>
                    <h2 className="display-md" style={{ margin: '0 0 6px', color: 'var(--black)' }}>
                      Request Your Free Estimate
                    </h2>
                    <p style={{ margin: 0, color: 'var(--gray-dark)', fontSize: '0.95rem' }}>
                      Pick the services you have in mind so we come prepared to walk your yard.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Your Name *"
                      placeholder="First & last name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      label="Phone Number *"
                      type="tel"
                      placeholder="(408) 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      error={errors.phone}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Email (Optional)"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                    />
                    <CustomSelect
                      label="City"
                      value={city}
                      onChange={setCity}
                      options={cityOptions}
                    />
                  </div>

                  {/* Services Multi-Select */}
                  <div className="c-field">
                    <span className="c-field__label">Services Needed (Select any that apply)</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                      {SERVICES.map((svc) => (
                        <Chip
                          key={svc.slug}
                          label={svc.title}
                          active={selectedServices.includes(svc.title)}
                          onClick={() => toggleService(svc.title)}
                          showCheck
                        />
                      ))}
                    </div>
                  </div>

                  {/* Yard Size */}
                  <div className="c-field">
                    <span className="c-field__label">Approximate Yard Size</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                      {YARD_SIZE_OPTIONS.map((opt) => (
                        <Chip
                          key={opt}
                          label={opt}
                          active={yardSize === opt}
                          onClick={() => setYardSize(opt)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Timeline & Custom Date Picker */}
                  <div className="grid gap-5 sm:grid-cols-2 items-start">
                    <div className="c-field">
                      <span className="c-field__label">Target Timeline</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                        {TIMELINE_OPTIONS.map((opt) => (
                          <Chip
                            key={opt}
                            label={opt}
                            active={timeline === opt}
                            onClick={() => setTimeline(opt)}
                          />
                        ))}
                      </div>
                    </div>

                    <CustomDatePicker
                      label="Preferred Walkthrough Date"
                      value={preferredDate}
                      onChange={setPreferredDate}
                    />
                  </div>

                  <Textarea
                    label="Project Details"
                    placeholder="Tell us about patio size, lawn condition, tree branches near the roof, fence length, or side-gate access..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <Button type="submit" variant="primary" size="lg" disabled={submitting}>
                    <span>{submitting ? 'Preparing Request...' : 'Request Free Estimate'}</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                </form>
              )}
            </div>

            {/* Direct Contact Sidebar */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  backgroundColor: 'var(--black)',
                  color: 'var(--white)',
                  borderRadius: '20px',
                  border: '2px solid var(--yellow)',
                  padding: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span className="font-mono-label" style={{ color: 'var(--yellow)' }}>
                  Call or Text Directly
                </span>
                <h3 className="display-sm" style={{ margin: 0, color: 'var(--white)' }}>
                  Speak straight with our crew.
                </h3>
                <p style={{ margin: 0, fontSize: '0.94rem', color: 'rgba(255,255,255,0.78)' }}>
                  Free Estimates across San Jose and Silicon Valley. Tap to call or send a quick
                  text with photos of your yard.
                </p>

                {/* Primary Line */}
                <div
                  style={{
                    backgroundColor: 'var(--soot)',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid var(--border-dark-strong)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                    Primary Number
                  </span>
                  <LinkButton href={BUSINESS.phones.primary.tel} variant="primary" style={{ width: '100%' }}>
                    <Phone size={17} />
                    <span>{BUSINESS.phones.primary.display}</span>
                  </LinkButton>
                  <LinkButton
                    href={BUSINESS.phones.primary.sms}
                    variant="outline-on-dark"
                    size="sm"
                    style={{ width: '100%' }}
                  >
                    <MessageSquare size={15} />
                    <span>Text {BUSINESS.phones.primary.display}</span>
                  </LinkButton>
                </div>

                {/* Secondary Line */}
                <div
                  style={{
                    backgroundColor: 'var(--soot)',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid var(--border-dark)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <span className="font-mono-label" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Secondary Number
                  </span>
                  <LinkButton href={BUSINESS.phones.secondary.tel} variant="light" style={{ width: '100%' }}>
                    <Phone size={17} />
                    <span>{BUSINESS.phones.secondary.display}</span>
                  </LinkButton>
                  <LinkButton
                    href={BUSINESS.phones.secondary.sms}
                    variant="outline-on-dark"
                    size="sm"
                    style={{ width: '100%' }}
                  >
                    <MessageSquare size={15} />
                    <span>Text {BUSINESS.phones.secondary.display}</span>
                  </LinkButton>
                </div>

                {BUSINESS.email && (
                  <p style={{ margin: 0, fontSize: '0.92rem' }}>
                    Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                  </p>
                )}
                {BUSINESS.streetAddress && (
                  <p style={{ margin: 0, fontSize: '0.92rem' }}>{BUSINESS.streetAddress}</p>
                )}
                {BUSINESS.hours && (
                  <p style={{ margin: 0, fontSize: '0.92rem' }}>Hours: {BUSINESS.hours}</p>
                )}
              </div>

              <div
                style={{
                  backgroundColor: 'var(--white)',
                  border: '1px solid var(--border-light-strong)',
                  borderRadius: '18px',
                  padding: '22px',
                }}
              >
                <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                  Service Area Note
                </span>
                <p style={{ margin: '8px 0 8px', fontWeight: 700, color: 'var(--black)' }}>
                  {BUSINESS.region}
                </p>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--gray-dark)' }}>
                  {AREA_FALLBACK_NOTE}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="surface-black section-pad-sm">
        <div className="container">
          <div style={{ maxWidth: '860px' }}>
            <span className="font-mono-label" style={{ color: 'var(--yellow)' }}>
              Before Your Walkthrough
            </span>
            <h2 className="display-md" style={{ margin: '8px 0 20px', color: 'var(--white)' }}>
              Quick Estimate Questions
            </h2>
            <Accordion items={FAQS.slice(0, 3)} darkSurface />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
