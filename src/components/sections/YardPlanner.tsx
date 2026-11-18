import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  PLANNER_GOALS,
  PLANNER_SIZES,
  PLANNER_PRIORITIES,
  buildYardPlan,
  type PlannerGoal,
  type PlannerSize,
  type PlannerPriority,
} from '../../data/planner';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { BannerRibbon } from '../svg/BannerRibbon';

export const YardPlanner: React.FC = () => {
  const [goal, setGoal] = useState<PlannerGoal>('patio');
  const [size, setSize] = useState<PlannerSize>('medium');
  const [priority, setPriority] = useState<PlannerPriority>('entertaining');
  const navigate = useNavigate();

  const plan = useMemo(() => buildYardPlan(goal, size, priority), [goal, size, priority]);

  const handleSendPlan = () => {
    navigate('/contact', {
      state: {
        prefillServices: plan.services.map((s) => s.title),
        prefillYardSize:
          size === 'small' ? 'Small / Compact' : size === 'medium' ? 'Medium' : 'Large / Estate',
        prefillMessage: `Yard Planner focus: ${plan.headline} (${size}, priority: ${priority}). Recommended services: ${plan.services.map((s) => s.title).join(', ')}.`,
      },
    });
  };

  return (
    <section id="yard-planner" className="surface-black section-pad">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.95fr] items-start">
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <div style={{ marginBottom: '14px' }}>
                <BannerRibbon>INTERACTIVE YARD PLANNER</BannerRibbon>
              </div>
              <h2 className="display-lg" style={{ margin: '0 0 12px', color: 'var(--white)' }}>
                Build your{' '}
                <span className="editorial-accent" style={{ color: 'var(--yellow)' }}>
                  scope
                </span>{' '}
                in 30 seconds.
              </h2>
              <p className="body-copy" style={{ margin: 0, color: 'rgba(255,255,255,0.78)' }}>
                Pick what you want to fix or improve. We will suggest a clean crew sequence you can
                send straight to our estimate form — no guesswork or fake online pricing.
              </p>
            </div>

            {/* Step 1 */}
            <div>
              <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 10px' }}>
                01. What do you want to improve?
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {PLANNER_GOALS.map((opt) => (
                  <Chip
                    key={opt.id}
                    label={opt.label}
                    active={goal === opt.id}
                    onClick={() => setGoal(opt.id)}
                    darkSurface
                  />
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 10px' }}>
                02. Yard size
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {PLANNER_SIZES.map((opt) => (
                  <Chip
                    key={opt.id}
                    label={opt.label}
                    active={size === opt.id}
                    onClick={() => setSize(opt.id)}
                    darkSurface
                  />
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 10px' }}>
                03. Top priority
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {PLANNER_PRIORITIES.map((opt) => (
                  <Chip
                    key={opt.id}
                    label={opt.label}
                    active={priority === opt.id}
                    onClick={() => setPriority(opt.id)}
                    darkSurface
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div
            style={{
              backgroundColor: 'var(--paper)',
              color: 'var(--black)',
              borderRadius: '22px',
              border: '3px solid var(--yellow)',
              padding: 'clamp(22px, 3vw, 34px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div>
              <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                Recommended Scope
              </span>
              <h3 className="display-md" style={{ margin: '6px 0 10px', color: 'var(--black)' }}>
                {plan.headline}
              </h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--gray-dark)', lineHeight: 1.55 }}>
                {plan.summary}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {plan.services.map((item) => (
                <div
                  key={item.slug}
                  style={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <CheckCircle2
                    size={20}
                    style={{ color: 'var(--forest)', flexShrink: 0, marginTop: '2px' }}
                    aria-hidden="true"
                  />
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '2px' }}>
                      {item.title}
                    </strong>
                    <span style={{ fontSize: '0.88rem', color: 'var(--gray-dark)', lineHeight: 1.45 }}>
                      {item.reason}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                paddingTop: '10px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <Button variant="primary" size="lg" onClick={handleSendPlan} style={{ width: '100%' }}>
                <span>Send This Plan to Castaneda</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <p
                style={{
                  margin: 0,
                  textAlign: 'center',
                  fontSize: '0.84rem',
                  color: 'var(--gray-dark)',
                }}
              >
                Free Estimate — final measurements &amp; material choices confirmed on site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
