"use client";

export default function HiringProcess() {
  const steps = [
    { icon: "description", title: "Apply Online", text: "Submit your CV and a short note on why you want to join. No cover letter essays needed." },
    { icon: "call", title: "Intro Call", text: "A 20-min chat with our recruiter to understand your background and answer your questions." },
    { icon: "task_alt", title: "Skills Round", text: "A practical, role-specific task or case study. We keep it short \u2014 max 2 hours of your time." },
    { icon: "groups", title: "Team Interview", text: "Meet the team you\u2019d work with. We assess culture fit and give you a real feel for the role." },
    { icon: "celebration", title: "Offer & Onboard", text: "Offer within 48 hours of final round. Structured onboarding so you hit the ground running." },
  ];

  return (
    <section id="process" style={{ padding: "96px 0", background: "var(--iv)" }}>
      <div className="container">
        <div className="rv" style={{ textAlign: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            How We Hire
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "var(--ink)", margin: "14px 0 10px", lineHeight: 1.2 }}>
            Our Hiring <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Process</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
            Transparent, fast, and human. We respect your time and aim to complete the process in under 3 weeks.
          </p>
        </div>
        <div className="process-steps rv">
          {steps.map((step, i) => (
            <div key={i} className="process-step">
              <div className="ps-num">
                <span className="material-symbols-rounded">{step.icon}</span>
              </div>
              <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>{step.title}</div>
              <p style={{ fontSize: 12.5, color: "var(--ink3)", lineHeight: 1.65 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .process-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          margin-top: 56px;
          position: relative;
        }
        .process-steps::before {
          content: '';
          position: absolute;
          top: 36px;
          left: 10%;
          right: 10%;
          height: 1.5px;
          background: linear-gradient(90deg, var(--cu), var(--gd));
          z-index: 0;
        }
        .process-step {
          text-align: center;
          position: relative;
          z-index: 1;
          padding: 0 12px;
        }
        .ps-num {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid var(--line2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          transition: var(--tr);
          box-shadow: var(--sh);
        }
        .ps-num span {
          font-size: 28px;
          color: var(--gn);
          transition: var(--tr);
        }
        .process-step:hover .ps-num {
          background: var(--gn);
          border-color: var(--gn);
          transform: scale(1.1);
        }
        .process-step:hover .ps-num span {
          color: #fff;
        }
        @media (max-width: 768px) {
          .process-steps {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .process-steps::before {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
