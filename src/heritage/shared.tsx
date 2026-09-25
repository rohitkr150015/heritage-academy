import { answerQuestion } from "./knowledge";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Globe2,
  Menu,
  MessageCircle,
  Search,
  X,
  Sparkles,
  Mic,
  Check,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { school } from "./data";
import { DemoContext, useLanguage } from "./demo";
export function DemoProvider({ children }: { children: ReactNode }) {
  const [hindi, setHindi] = useState(false);
  return (
    <DemoContext.Provider value={{ hindi, toggle: () => setHindi((v) => !v) }}>
      {children}
    </DemoContext.Provider>
  );
}
export function Crest() {
  return (
    <svg className="crest" viewBox="0 0 64 72" fill="none" aria-hidden="true">
      <path
        d="M7 7h50v37C57 57 32 67 32 67S7 57 7 44Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 12h40v30c0 11-20 20-20 20S12 53 12 42Z"
        stroke="currentColor"
        strokeWidth=".6"
      />
      <path
        d="M20 27v23m24-23v23M20 38h24m-27-11h6m18 0h6m-30 23h6m18 0h6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m32 17 2 4 5 .6-3.5 3.5 1 5-4.5-2.5-4.5 2.5 1-5-3.5-3.5 5-.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function ButtonLink({
  to,
  children,
  secondary = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`button ${secondary ? "secondary" : ""} ${className}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function TextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
export function PageHeading({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="page-heading">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={13} />
        <span>{label}</span>
      </div>
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement;
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      trigger?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-head">
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Empty({
  title = "Nothing here just yet.",
  text = "Try another filter or clear your search.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="empty">
      <BookOpen size={32} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
export function Success({ children }: { children: ReactNode }) {
  return (
    <div className="success" role="status">
      <Check size={20} />
      <div>{children}</div>
    </div>
  );
}
export function DemoHint() {
  return (
    <p className="hint">
      Interactive demo · Use fictional details only. Files stay on your device.
    </p>
  );
}
export function SimpleForm({
  kind,
  upload = false,
}: {
  kind: string;
  upload?: boolean;
}) {
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!navigator.onLine)
      return setError(
        "You are offline. Reconnect before saving this demo request.",
      );
    setDone("HA-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  }
  return done ? (
    <Success>
      <strong>{kind} saved in this preview.</strong>
      <p>Demo reference {done}. No request was sent to a school.</p>
      <button className="text-link" onClick={() => setDone("")}>
        Start another request
      </button>
    </Success>
  ) : (
    <form className="form" onSubmit={submit}>
      <DemoHint />
      <label>
        Sample name
        <input required name="name" placeholder="e.g. Alex Sample" />
      </label>
      <label>
        Email
        <input
          required
          type="email"
          name="email"
          placeholder="alex@example.com"
        />
      </label>
      <label>
        {kind === "Event registration" ? "Number of attendees" : "Details"}
        {kind === "Event registration" ? (
          <input type="number" min="1" max="5" required defaultValue="2" />
        ) : (
          <textarea
            required
            minLength={10}
            placeholder="Tell us a little more…"
          />
        )}
      </label>
      {upload && (
        <label>
          CV · PDF, JPG or PNG · max 10 MB
          <input
            type="file"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const f = e.target.files?.[0];
              const invalid =
                f && (f.size > 10485760 || !/\.(pdf|jpe?g|png)$/i.test(f.name));
              e.target.setCustomValidity(
                invalid ? "Choose a PDF, JPG or PNG under 10 MB." : "",
              );
              setFile(f && !invalid ? `${f.name} — local preview only` : "");
            }}
          />
          <small>{file}</small>
        </label>
      )}
      <label className="check">
        <input type="checkbox" required />I am using fictional details for this
        demo.
      </label>
      {error && <p role="alert">{error}</p>}
      <button className="button">
        Save demo {kind.toLowerCase()}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
export function AskHeritage({ onClose }: { onClose: () => void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState("/admissions");
  const [voice, setVoice] = useState(false);
  const ask = (q: string) => {
    setQuestion(q);
    const result = answerQuestion(q);
    setAnswer(result.text);
    setSource(result.source);
  };
  return (
    <Modal title="Ask Heritage" onClose={onClose}>
      <div className="assistant-intro">
        <Sparkles />
        <p>
          A little guidance for your next chapter.
          <small>
            Demo answers · Curated sample sources, updated {school.updated}
          </small>
        </p>
      </div>
      <div className="chips">
        {[
          "What are the admission documents?",
          "How much are Primary fees?",
          "Can I visit the library?",
        ].map((q) => (
          <button key={q} onClick={() => ask(q)}>
            {q}
          </button>
        ))}
      </div>
      {answer && (
        <div className="answer" aria-live="polite">
          <p>{answer}</p>
          <Link onClick={onClose} to={source}>
            Read source: Heritage sample guide, v1 <ArrowUpRight size={14} />
          </Link>
          <small>
            Section: {source.split("/").filter(Boolean).join(" / ")} · 22 Sep
            2026
          </small>
        </div>
      )}
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          if (question.trim()) ask(question);
        }}
      >
        <label className="sr-only" htmlFor="question">
          Your question
        </label>
        <input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about life at Heritage…"
          required
        />
        <button
          type="button"
          className="icon-button"
          aria-label="Voice assistant availability"
          onClick={() => setVoice(!voice)}
        >
          <Mic size={18} />
        </button>
        <button aria-label="Ask question" className="icon-button">
          <ArrowRight />
        </button>
      </form>
      {voice && (
        <p className="hint">
          Voice integration preview: speech recognition is not connected. Use
          the text field to ask your question.
        </p>
      )}
      <Link className="button" to="/visit" onClick={onClose}>
        Explore visit slots
        <ArrowUpRight size={17} />
      </Link>
    </Modal>
  );
}
export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { hindi, toggle } = useLanguage();
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);
  const [offline, setOffline] = useState(!navigator.onLine);
  const portal = pathname.startsWith("/portal");
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
    const label =
      pathname === "/"
        ? "A place to belong. A world to become."
        : pathname
            .split("/")
            .filter(Boolean)
            .map((s) => s.replaceAll("-", " "))
            .join(" · ");
    document.title = `${label} | Heritage Academy`;
    document
      .querySelector("meta[name=description]")
      ?.setAttribute(
        "content",
        `${label}. Explore Heritage Academy?s fictional school frontend, programmes and interactive demo journeys.`,
      );
    document.documentElement.lang = hindi ? "hi" : "en";
  }, [pathname, hindi]);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  const nav = [
    ["About", "/about"],
    ["Academics", "/academics"],
    ["Campus", "/campus"],
    ["Admissions", "/admissions"],
    ["Community", "/community"],
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="demo-bar">
        <span>
          <span className="demo-dot" />
          Demo school — sample data; no real submission/payment.
        </span>
        <button
          onClick={() => {
            Object.keys(localStorage)
              .filter((k) => k.startsWith("heritage-demo:"))
              .forEach((k) => localStorage.removeItem(k));
            window.location.reload();
          }}
        >
          Reset demo
        </button>
      </div>
      {offline && (
        <div role="status" className="offline">
          You are offline. Loaded pages remain readable; demo submissions are
          paused.
        </div>
      )}
      <header className="site-header">
        <div className="utility">
          <span>Rooted in values. Open to possibilities.</span>
          <div>
            <Link to="/notices">Notices</Link>
            <Link to="/events">Calendar</Link>
            <button onClick={toggle}>
              <Globe2 size={13} />
              {hindi ? "English" : "हिन्दी"}
            </button>
            <Link className="portal-link" to="/login">
              School portal <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <div className="masthead">
          <Link className="brand" to="/" aria-label="Heritage Academy home">
            <Crest />
            <span>
              HERITAGE<span>ACADEMY</span>
            </span>
          </Link>
          <nav aria-label="Main navigation">
            {nav.map(([name, path]) => (
              <NavLink key={path} to={path}>
                {hindi
                  ? {
                      About: "परिचय",
                      Academics: "शिक्षा",
                      Campus: "परिसर",
                      Admissions: "प्रवेश",
                      Community: "समुदाय",
                    }[name]
                  : name}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="icon-button"
              to="/search"
              aria-label="Search website"
            >
              <Search size={20} />
            </Link>
            <ButtonLink to="/visit">Visit our campus</ButtonLink>
            <button
              className="icon-button menu-toggle"
              aria-label="Open navigation"
              onClick={() => setMenu(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      {hindi && (
        <div className="language-note">
          हिन्दी नेविगेशन सक्रिय है। विस्तृत सामग्री अभी अंग्रेज़ी में उपलब्ध
          है। <span lang="en">English fallback for detailed content.</span>
        </div>
      )}
      {menu && (
        <Modal title="Explore Heritage" onClose={() => setMenu(false)}>
          <nav className="mobile-nav">
            {[
              ...nav,
              ["Notices", "/notices"],
              ["Calendar", "/events"],
              ["School portal", "/login"],
            ].map(([name, path]) => (
              <Link onClick={() => setMenu(false)} key={path} to={path}>
                {name}
                <ArrowRight size={18} />
              </Link>
            ))}
          </nav>
        </Modal>
      )}
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      {!portal && (
        <>
          <section className="visit-band">
            <div>
              <Eyebrow>Your next chapter starts here</Eyebrow>
              <h2>Some places have to be experienced.</h2>
              <p>
                Walk our corridors. Meet our people. Imagine the possibilities.
              </p>
            </div>
            <ButtonLink to="/visit" secondary>
              Come, visit Heritage
            </ButtonLink>
          </section>
          <footer>
            <div className="footer-top">
              <div className="footer-brand">
                <Link className="brand" to="/">
                  <Crest />
                  <span>
                    HERITAGE<span>ACADEMY</span>
                  </span>
                </Link>
                <p>
                  Rooted in values.
                  <br />
                  Growing towards possibility.
                </p>
                <small>A fictional school, thoughtfully imagined.</small>
              </div>
              <div>
                <h3>Discover</h3>
                {[
                  ["Our story", "/about"],
                  ["Our history", "/about/history"],
                  ["Academic programmes", "/academics"],
                  ["Our educators", "/faculty"],
                  ["Campus trail", "/campus"],
                  ["Life at Heritage", "/community"],
                  ["Photo gallery", "/gallery"],
                  ["Clubs & societies", "/clubs"],
                  ["Achievements", "/achievements"],
                ].map(([a, b]) => (
                  <Link key={b} to={b}>
                    {a}
                  </Link>
                ))}
              </div>
              <div>
                <h3>Take the next step</h3>
                {[
                  ["Admissions", "/admissions"],
                  ["Plan a visit", "/visit"],
                  ["Fees & eligibility", "/admissions/fees"],
                  ["Track application", "/admissions/track"],
                  ["Careers", "/careers"],
                ].map(([a, b]) => (
                  <Link key={b} to={b}>
                    {a}
                  </Link>
                ))}
              </div>
              <div>
                <h3>Stay connected</h3>
                {[
                  ["News & notices", "/notices"],
                  ["Downloads", "/downloads"],
                  ["Alumni", "/alumni"],
                  ["Transport", "/transport"],
                  ["Contact & support", "/contact"],
                ].map(([a, b]) => (
                  <Link key={b} to={b}>
                    {a}
                  </Link>
                ))}
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 Heritage Academy · Frontend demonstration</span>
              <div>
                <Link to="/privacy">Privacy</Link>
                <Link to="/accessibility">Accessibility</Link>
                <Link to="/help">Help</Link>
              </div>
            </div>
          </footer>
        </>
      )}
      <button
        aria-label="Ask Heritage"
        className="ask-button"
        onClick={() => setChat(true)}
      >
        <MessageCircle size={19} />
        <span>Ask Heritage</span>
        <span className="ai-dot" />
      </button>
      {chat && <AskHeritage onClose={() => setChat(false)} />}
      <div className="mobile-actions">
        <Link to="/admissions/apply">
          Apply now
          <ArrowUpRight size={16} />
        </Link>
        <Link to="/visit">
          Plan a visit
          <CalendarDays size={16} />
        </Link>
      </div>
    </>
  );
}
