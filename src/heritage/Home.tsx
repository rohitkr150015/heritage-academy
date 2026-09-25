import { createElement, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Heart,
  Play,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ButtonLink, Eyebrow, TextLink } from "./shared";
import { useLanguage } from "./demo";
import { events, facilities, programmes } from "./data";
export default function Home() {
  const [heroSlide, setHeroSlide] = useState(0);
  const heroPhotos = [
    "school-20.webp",
    "reading-room.webp",
    "science-lab.webp",
  ];
  const heroWidths = [1280, 1360, 1500];
  const heroAlts = [
    "Illustrative school courtyard",
    "Illustrative library interior",
    "Illustrative science laboratory",
  ];
  const [stage, setStage] = useState(1);
  const [stop, setStop] = useState(0);
  const { hindi } = useLanguage();
  const facility = facilities[stop];
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Eyebrow>A tradition of looking forward</Eyebrow>
          <h1>
            {hindi ? (
              <>
                जड़ों से जुड़े।
                <br />
                सपनों की ओर।
              </>
            ) : (
              <>
                Rooted in values.
                <br />
                Ready for <em>the world.</em>
              </>
            )}
          </h1>
          <p>
            A place where curious minds find their purpose,
            <br className="desktop-only" /> character grows, and every child
            belongs.
          </p>
          <div className="hero-buttons">
            <ButtonLink to="/admissions">Begin their journey</ButtonLink>
            <Link className="tour-link" to="/campus">
              <span>
                <Play size={13} fill="currentColor" />
              </span>
              Discover our campus
            </Link>
          </div>
          <div className="hero-foot">
            <span className="fine-rule" />
            <p>
              More than an education.
              <br />
              <strong>A foundation for life.</strong>
            </p>
            <span className="handwritten">Since 1986*</span>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={"/images/" + heroPhotos[heroSlide]}
            srcSet={`/images/${heroPhotos[heroSlide].replace(".webp", "-mobile.webp")} 720w, /images/${heroPhotos[heroSlide]} ${heroWidths[heroSlide]}w`}
            sizes="(max-width: 767px) 100vw, 50vw"
            alt={heroAlts[heroSlide]}
            fetchPriority="high"
          />
          <div className="image-shade" />
          <div className="hero-image-label">
            <span>THE HERITAGE EXPERIENCE</span>
            <p>
              A world of possibility.
              <br />A place to call your own.
            </p>
          </div>
          <div className="photo-index">
            <button
              aria-label="Previous campus photograph"
              onClick={() => setHeroSlide((heroSlide + 2) % 3)}
            >
              <ChevronLeft size={17} />
            </button>
            <span className="slide-count">0{heroSlide + 1} / 03</span>
            <button
              aria-label="Next campus photograph"
              onClick={() => setHeroSlide((heroSlide + 1) % 3)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
          <div className="photo-credit">Illustrative campus photograph</div>
          <div className="hero-seal">
            <BookOpen size={27} />
            <span>
              KNOWLEDGE
              <br />
              WITH CHARACTER
            </span>
          </div>
        </div>
      </section>
      {createElement("school-discovery", { theme: "heritage", id: "discovery-studio" })}
      <section className="admission-ribbon">
        <span className="ribbon-label">
          <span />
          THE NEXT CHAPTER
        </span>
        <p>Admissions for 2027–28 are open to explore.</p>
        <Link to="/admissions">
          Find your place <ArrowRight size={18} />
        </Link>
      </section>
      <section className="section philosophy">
        <div>
          <Eyebrow>The Heritage way</Eyebrow>
          <h2>
            A good education opens minds.
            <br />
            <em>A great one opens worlds.</em>
          </h2>
        </div>
        <div>
          <p>
            We believe school should be a place of discovery—of ideas, of
            friendships, and of who you can become. Here, academic ambition
            lives alongside kindness, creativity and the courage to ask
            questions.
          </p>
          <TextLink to="/about">Get to know Heritage</TextLink>
        </div>
        <div className="values-row">
          {[
            [
              BookOpen,
              "Depth in learning",
              "Understanding that goes beyond the textbook.",
            ],
            [
              Heart,
              "Strength in character",
              "Kindness, integrity and a sense of responsibility.",
            ],
            [
              Compass,
              "Freedom to discover",
              "Space to explore what makes each child unique.",
            ],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof BookOpen;
            return (
              <div key={title as string}>
                <I size={25} />
                <div>
                  <h3>{title as string}</h3>
                  <p>{text as string}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="programmes section">
        <div className="section-heading">
          <div>
            <Eyebrow>Learning, at every stage</Eyebrow>
            <h2>
              Small beginnings.
              <br />
              <em>Limitless possibilities.</em>
            </h2>
          </div>
          <TextLink to="/academics">Explore our academics</TextLink>
        </div>
        <div
          className="programme-tabs"
          role="tablist"
          aria-label="Academic stages"
        >
          {programmes.map((p, i) => (
            <button
              role="tab"
              aria-selected={stage === i}
              aria-controls="programme-panel"
              id={`stage-${i}`}
              key={p.slug}
              onClick={() => setStage(i)}
            >
              {p.name}
              <small>{p.grades}</small>
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
        <div
          className="programme-feature"
          id="programme-panel"
          role="tabpanel"
          aria-labelledby={`stage-${stage}`}
        >
          <div>
            <img
              key={programmes[stage].image}
              src={"/images/" + programmes[stage].image}
              alt={`Illustrative ${programmes[stage].name} learning environment`}
              loading="lazy"
            />
          </div>
          <article>
            <span className="eyebrow">0{stage + 1} / THE LEARNING JOURNEY</span>
            <h3>{programmes[stage].description}</h3>
            <p>
              {programmes[stage].age} · {programmes[stage].grades}
            </p>
            <p>
              Learning is hands-on, connected and full of possibility. A
              thoughtful balance of academic foundations, creative expression
              and everyday exploration.
            </p>
            <TextLink to={"/academics/" + programmes[stage].slug}>
              Inside {programmes[stage].name}
            </TextLink>
          </article>
        </div>
      </section>
      <section className="campus-home">
        <div className="campus-home-image">
          <img
            src={"/images/" + facility.image}
            alt={facility.short + " sample interior"}
            loading="lazy"
          />
          <span className="photo-credit">Sample campus imagery</span>
        </div>
        <div className="campus-home-copy">
          <Eyebrow>Spaces that inspire</Eyebrow>
          <h2>
            Every corner,
            <br />
            <em>a new discovery.</em>
          </h2>
          <p>
            Follow your curiosity through our campus. There is always something
            waiting to be found.
          </p>
          <div className="trail-tabs">
            {facilities.map((f, i) => (
              <button
                key={f.slug}
                className={stop === i ? "active" : ""}
                onClick={() => setStop(i)}
              >
                <span>{f.number}</span>
                {f.short}
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          <TextLink to={"/campus/" + facility.slug}>
            Walk the campus trail
          </TextLink>
        </div>
      </section>
      <section className="section stories-home">
        <div className="section-heading">
          <div>
            <Eyebrow>Life beyond the classroom</Eyebrow>
            <h2>
              Extraordinary starts
              <br />
              <em>with the everyday.</em>
            </h2>
          </div>
          <TextLink to="/community">Stories from Heritage</TextLink>
        </div>
        <div className="story-grid">
          <Link className="feature-story" to="/school-life/projects/water-wise">
            <div className="story-image">
              <img
                src="/images/young-makers.webp"
                alt="Illustrative student-built science project"
                loading="lazy"
              />
            </div>
            <div>
              <span className="tag">CURIOSITY IN ACTION</span>
              <h3>
                Small ideas.
                <br />A world of difference.
              </h3>
              <p>When young minds turn a question into a possibility.</p>
              <span className="text-link">
                Meet our young innovators <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>
          <div className="quote-card">
            <span className="quote-mark">“</span>
            <blockquote>
              Heritage didn’t just teach me what to think. It gave me the
              confidence to wonder.
            </blockquote>
            <div className="quote-person">
              <span>MS</span>
              <div>
                <strong>Mira Sen</strong>
                <small>Class of 2024 · Fictional alumni voice</small>
              </div>
            </div>
            <Link to="/alumni" className="text-link">
              A community for life <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section events-home">
        <div className="section-heading">
          <div>
            <Eyebrow>On the school calendar</Eyebrow>
            <h2>
              Good things <em>ahead.</em>
            </h2>
          </div>
          <TextLink to="/events">View the calendar</TextLink>
        </div>
        <div className="event-grid">
          {events.map((e) => (
            <Link
              key={e.slug}
              to={"/events/" + e.slug}
              className="event-preview"
            >
              <div className="event-date">
                <span>OCT</span>
                <strong>{e.date.slice(-2)}</strong>
              </div>
              <div>
                <span className="tag">{e.category}</span>
                <h3>{e.title}</h3>
                <p>10:00 AM · Heritage Campus</p>
              </div>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
        <p className="sample-note">
          *Heritage Academy, its history, events and voices are fictional.
          Photographs are illustrative sample assets.
        </p>
      </section>
      <section className="location-strip">
        <MapPin size={21} />
        <div>
          <strong>A place to discover, together.</strong>
          <span>Explore the campus and plan your family's first visit.</span>
        </div>
        <Link to="/contact">
          Find your way <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
