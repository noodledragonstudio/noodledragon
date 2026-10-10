"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { PrivacyContent } from "./privacy-content";
import { SiteHeader } from "./site-header";
const basePath = import.meta.env.VITE_BASE_PATH ?? "";
const homePath = `${basePath}/`;
const privacyPath = `${basePath}/privacy.html`;
const siteUrl = "https://noodledragon.studio";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: "Noodle Dragon Studio | Awakado, Macaroni & Munch Monsters",
      description:
        "Independent New Zealand app and game studio behind Awakado, Macaroni and Munch Monsters—thoughtful software and playful games.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      mainEntity: [
        { "@id": `${siteUrl}/#macaroni` },
        { "@id": `${siteUrl}/#awakado` },
        { "@id": `${siteUrl}/#munch-monsters` },
      ],
      inLanguage: "en-NZ",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#awakado`,
      name: "Awakado",
      url: "https://awakado.noodledragon.studio/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "macOS 14 or later",
      description:
        "A Mac menu-bar app that keeps a Mac awake while AI coding agents work and lets it sleep when they finish.",
      image: `${siteUrl}/products/awakado-icon.webp`,
      publisher: { "@id": `${siteUrl}/#organization` },
      offers: [
        {
          "@type": "Offer",
          name: "Awakado",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://awakado.noodledragon.studio/",
        },
        {
          "@type": "Offer",
          name: "Awakado Pro",
          price: "9.99",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://awakado.noodledragon.studio/",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#macaroni`,
      name: "Macaroni",
      url: "https://macaroni.noodledragon.studio/",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS 15 or later",
      description:
        "A read-only Markdown viewer for Mac that watches project folders and shows what changed while AI agents work.",
      image: `${siteUrl}/products/macaroni-icon.webp`,
      publisher: { "@id": `${siteUrl}/#organization` },
      offers: {
        "@type": "Offer",
        price: "14.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://macaroni.noodledragon.studio/",
      },
    },
    {
      "@type": ["VideoGame", "MobileApplication"],
      "@id": `${siteUrl}/#munch-monsters`,
      name: "Munch Monsters – Food Fun",
      url: "https://munch-monsters.noodledragon.studio/",
      applicationCategory: "GameApplication",
      operatingSystem: "iOS, iPadOS and Android",
      description:
        "A gentle, voice-led healthy-eating game for children aged 4–7, with 20 free levels, no ads and no data collection.",
      image: `${siteUrl}/products/munch-monsters-icon.webp`,
      publisher: { "@id": `${siteUrl}/#organization` },
      audience: {
        "@type": "PeopleAudience",
        suggestedMinAge: 4,
        suggestedMaxAge: 7,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
        url: "https://munch-monsters.noodledragon.studio/",
      },
    },
  ],
};

const homeTitle =
  "Noodle Dragon Studio | Awakado, Macaroni & Munch Monsters";
const privacyTitle = "Privacy | Noodle Dragon Studio";
const homeSectionHashes = new Set([
  "#top",
  "#products",
  "#flavour",
  "#process",
  "#about",
  "#contact",
  "#macos",
  "#mobile",
  "#games",
]);
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}
const capabilities = [
  {
    number: "01",
    id: "macos",
    name: "macOS apps",
    tag: "AT HOME ON YOUR MAC",
    copy: "Thoughtful tools that make everyday tasks feel effortless. Purposeful interfaces, considered details, and a little joy in getting things done.",
    skills: ["App design", "Desktop development", "Everyday utility"],
  },
  {
    number: "02",
    id: "mobile",
    name: "Mobile apps",
    tag: "SMALL SCREEN. BIG POSSIBILITIES.",
    copy: "Useful experiences built around real life. Clear, intuitive and comfortable in your hand—from the first tap to the moments that become a habit.",
    skills: ["UX & UI design", "Mobile development", "Interaction design"],
  },
  {
    number: "03",
    id: "games",
    name: "Mobile games",
    tag: "JUST ONE MORE GO",
    copy: "Little escapes with plenty of personality. Playful mechanics, expressive characters and those satisfying moments that bring you back for more.",
    skills: ["Game design", "Prototyping", "Game development"],
  },
];
function CapabilityArt({ type }: { type: string }) {
  return (
    <div className={`capability-art art-${type}`} aria-hidden="true">
      {type === "macos" ? (
        <div className="drawn-window">
          <div className="window-bar">
            <i />
            <i />
            <i />
            <span>Room for a good idea.</span>
          </div>
          <div className="window-body">
            <div className="window-sidebar">
              <b />
              <b />
              <b />
            </div>
            <div className="window-page">
              <span className="asterisk">✳</span>
              <i />
              <i />
              <i />
              <div className="cursor-arrow">↖</div>
            </div>
          </div>
        </div>
      ) : type === "mobile" ? (
        <>
          <span className="mobile-orbit orbit-one" />
          <span className="mobile-orbit orbit-two" />
          <div className="drawn-phone">
            <div className="phone-camera" />
            <span className="phone-flower">✳</span>
            <div className="phone-lines">
              <i />
              <i />
            </div>
            <div className="phone-action">
              A little everyday delight <span>↗</span>
            </div>
          </div>
          <span className="tap-spark">✦</span>
        </>
      ) : (
        <>
          <div className="game-grid" />
          <span className="game-star">✦</span>
          <div className="drawn-controller">
            <span className="dpad">+</span>
            <div className="game-buttons">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className="game-heart">♥</span>
        </>
      )}
    </div>
  );
}
export function SiteApp({ initialPrivacy = false }: { initialPrivacy?: boolean }) {
  const [privacyView, setPrivacyView] = useState(initialPrivacy);
  const pendingSection = useRef<string | null>(null);

  useEffect(() => {
    const syncRoute = () => {
      const currentPath = window.location.pathname.replace(/\/+$/, "");
      const cleanPrivacyPath = privacyPath.replace(/\/+$/, "");
      setPrivacyView(currentPath === cleanPrivacyPath);
    };

    syncRoute();
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    const handleHomeSectionLink = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      const hash = link?.getAttribute("href");
      if (!hash || !homeSectionHashes.has(hash)) return;

      event.preventDefault();
      const targetId = hash.slice(1);

      if (privacyView) {
        pendingSection.current = targetId;
        window.history.pushState({}, "", homePath);
        setPrivacyView(false);
        return;
      }

      window.history.replaceState({}, "", homePath);
      if (targetId === "top") {
        window.scrollTo(0, 0);
      } else {
        document.getElementById(targetId)?.scrollIntoView();
      }
    };

    document.addEventListener("click", handleHomeSectionLink);
    return () => document.removeEventListener("click", handleHomeSectionLink);
  }, [privacyView]);

  useEffect(() => {
    document.title = privacyView ? privacyTitle : homeTitle;

    const frame = window.requestAnimationFrame(() => {
      if (privacyView) {
        window.scrollTo(0, 0);
        document.getElementById("privacy-content")?.focus({ preventScroll: true });
        return;
      }

      const targetId = pendingSection.current ?? window.location.hash.slice(1);
      pendingSection.current = null;
      if (!targetId || targetId === "top") {
        window.scrollTo(0, 0);
      } else {
        document.getElementById(targetId)?.scrollIntoView();
      }
      if (window.location.hash) {
        window.history.replaceState({}, "", homePath);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [privacyView]);

  const showPrivacy = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history[privacyView ? "replaceState" : "pushState"](
      {},
      "",
      privacyPath,
    );
    setPrivacyView(true);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <a className="skip-link" href={privacyView ? "#privacy" : "#main"}>
        {privacyView ? "Skip to privacy policy" : "Skip to content"}
      </a>
      <SiteHeader />
      {privacyView ? (
        <PrivacyContent />
      ) : (
      <main id="main">
        <section className="hero shell" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> INDEPENDENT BY NATURE. PLAYFUL BY
              DESIGN.
            </p>
            <h1 id="hero-title">
              Serious craft.
              <br />
              <em>Playful spirit.</em>
            </h1>
            <p className="hero-lede">
              We design and build macOS apps, mobile apps and mobile games—with
              a little more personality. Thoughtful, useful, and never boring.
            </p>
            <div className="hero-actions">
              <a className="button button-ink" href="#products">
                Explore our apps <Arrow />
              </a>
              <a className="quiet-link" href="#about">
                Meet the studio <Arrow diagonal />
              </a>
            </div>
            <p className="hero-location">
              <span aria-hidden="true">↘</span> Made in Aotearoa New Zealand.
              For life everywhere.
            </p>
          </div>
          <div className="hero-art">
            <div className="art-caption">
              <span>THE STUDIO SPIRIT</span>
              <span>01 / 01</span>
            </div>
            <span className="hero-spark" aria-hidden="true">
              ✳
            </span>
            <Image
              className="hero-dragon"
              src={`${basePath}/brand/mascot-900.webp`}
              alt="Our pink dragon mascot, happily munching noodles"
              width={900}
              height={900}
              sizes="(max-width: 760px) 90vw, 46vw"
              priority
            />
            <span className="mascot-note">
              A healthy appetite
              <br />
              for good ideas.
            </span>
            <div className="art-bottom">
              <span className="art-cross" aria-hidden="true">
                +
              </span>
              <span>
                A little unexpected.
                <br />A lot of character.
              </span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </section>
        <div className="platform-strip shell" aria-label="Our focus">
          <span>THREE WAYS WE MAKE THINGS BETTER</span>
          <div>
            <a href="#macos">
              macOS apps <Arrow diagonal />
            </a>
            <a href="#mobile">
              Mobile apps <Arrow diagonal />
            </a>
            <a href="#games">
              Mobile games <Arrow diagonal />
            </a>
          </div>
        </div>
        <section
          className="capabilities shell section-space"
          id="flavour"
          aria-labelledby="capabilities-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / WHAT WE MAKE</p>
              <h2 id="capabilities-title">
                Different screens.
                <br />
                <em>Same spark.</em>
              </h2>
            </div>
            <p>
              From a useful little tool to a whole new world, we bring the same
              care, curiosity and character to everything we make.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability" id={item.id} key={item.id}>
                <CapabilityArt type={item.id} />
                <div className="capability-heading">
                  <h3>{item.name}</h3>
                  <span>{item.number}</span>
                </div>
                <p className="mini-label">{item.tag}</p>
                <p className="capability-copy">{item.copy}</p>
                <ul className="skill-list">
                  {item.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section
          className="products shell section-space"
          id="products"
          aria-labelledby="products-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / FROM THE STUDIO</p>
              <h2 id="products-title">
                Meet the things
                <br />
                <em>we’re making.</em>
              </h2>
            </div>
            <p>
              Two useful Mac apps. One playful food game. All made with care,
              character and a healthy appetite for the details.
            </p>
          </div>
          <div className="product-grid">
            <article className="product-card product-macaroni">
              <div className="product-content">
                <div className="product-topline">
                  <p className="eyebrow">MAC APP · AVAILABLE NOW</p>
                  <span>01</span>
                </div>
                <div className="product-title-row">
                  <Image
                    className="product-icon"
                    src={`${basePath}/products/macaroni-icon.webp`}
                    alt="Macaroni app icon"
                    width={180}
                    height={180}
                    sizes="(max-width: 760px) 64px, 80px"
                  />
                  <div>
                    <h3>Macaroni</h3>
                    <p className="product-subtitle">
                      Reads the whole folder.
                    </p>
                  </div>
                </div>
                <p>
                  Open one Markdown file or point Macaroni at a project. It
                  tracks what changed, renders Mermaid and maths, and never
                  writes to your files.
                </p>
                <ul className="product-tags" aria-label="Macaroni highlights">
                  <li>macOS 15+</li>
                  <li>Read-only</li>
                  <li>$14.99 once</li>
                </ul>
                <a
                  className="product-link"
                  href="https://macaroni.noodledragon.studio/"
                >
                  Visit Macaroni <Arrow diagonal />
                </a>
              </div>
            </article>

            <article className="product-card product-awakado">
              <div className="product-content">
                <div className="product-topline">
                  <p className="eyebrow">MAC APP · AVAILABLE NOW</p>
                  <span>02</span>
                </div>
                <div className="product-title-row">
                  <Image
                    className="product-icon"
                    src={`${basePath}/products/awakado-icon.webp`}
                    alt="Awakado app icon"
                    width={256}
                    height={256}
                    sizes="(max-width: 760px) 64px, 80px"
                  />
                  <div>
                    <h3>Awakado</h3>
                    <p className="product-subtitle">
                      Awake while your agents work.
                    </p>
                  </div>
                </div>
                <p>
                  Keeps your Mac awake while 21 AI coding agents work, then lets
                  it sleep when they finish. Desk use is free; Pro handles
                  lid-closed runs and usage-limit wake.
                </p>
                <ul className="product-tags" aria-label="Awakado highlights">
                  <li>macOS 14+</li>
                  <li>21 AI agents</li>
                  <li>Free · Pro $9.99</li>
                </ul>
                <a
                  className="product-link"
                  href="https://awakado.noodledragon.studio/"
                >
                  Visit Awakado <Arrow diagonal />
                </a>
              </div>
            </article>

            <article className="product-card product-munch">
              <div className="product-content">
                <div className="product-topline">
                  <p className="eyebrow">KIDS’ GAME · COMING SOON</p>
                  <span>03</span>
                </div>
                <div className="product-title-row">
                  <Image
                    className="product-icon"
                    src={`${basePath}/products/munch-monsters-icon.webp`}
                    alt="Munch Monsters app icon"
                    width={180}
                    height={180}
                    sizes="(max-width: 760px) 64px, 80px"
                  />
                  <div>
                    <h3>Munch Monsters</h3>
                    <p className="product-subtitle">
                      Feed the monster. Learn the foods.
                    </p>
                  </div>
                </div>
                <p>
                  A gentle sorting game for ages 4–7. Feed everyday foods to
                  Munch and save treats for later. All 20 levels are
                  free—offline and ad-free.
                </p>
                <ul
                  className="product-tags"
                  aria-label="Munch Monsters highlights"
                >
                  <li>iOS &amp; Android</li>
                  <li>20 levels free</li>
                  <li>No data collected</li>
                </ul>
                <a
                  className="product-link"
                  href="https://munch-monsters.noodledragon.studio/"
                >
                  Visit Munch Monsters <Arrow diagonal />
                </a>
              </div>
            </article>
          </div>
        </section>
        <section className="belief-section" aria-labelledby="belief-title">
          <div className="shell belief-inner">
            <p className="eyebrow">A LITTLE NOODLE DRAGON THINKING</p>
            <h2 id="belief-title">
              Useful can be joyful.
              <br />
              Playful can be <em>beautifully made.</em>
            </h2>
            <div className="belief-bottom">
              <span className="belief-star" aria-hidden="true">
                ✳
              </span>
              <p>
                We don’t think you should have to choose. Good software respects
                your time. Great games invite you to lose track of it. Both
                deserve a thoughtful touch.
              </p>
            </div>
          </div>
        </section>
        <section
          className="process shell section-space"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / HOW WE WORK</p>
              <h2 id="process-title">
                A good idea.
                <br />
                <em>Made really good.</em>
              </h2>
            </div>
            <p>
              No magic formula. Just curiosity, thoughtful decisions and a
              willingness to keep making it better.
            </p>
          </div>
          <div className="process-grid">
            {[
              {
                title: "Find the heart",
                copy: "Start with the thing that matters. The problem worth solving, the moment worth making, or the feeling that brings an idea to life.",
                word: "EXPLORE",
                symbol: "◎",
              },
              {
                title: "Make it tangible",
                copy: "Sketch it. Build it. Try it. We bring ideas into the real world early, so what feels good—and what doesn’t—can guide the design.",
                word: "DESIGN & BUILD",
                symbol: "↗",
              },
              {
                title: "Sweat the small stuff",
                copy: "Refine the flow, the feedback and the finishing touches. Test on real screens. Keep listening, learning and polishing.",
                word: "REFINE",
                symbol: "✳",
              },
            ].map((step, i) => (
              <article className="process-step" key={step.title}>
                <div className="step-top">
                  <span>0{i + 1}</span>
                  <span aria-hidden="true">{step.symbol}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <span className="mini-label">{step.word}</span>
              </article>
            ))}
          </div>
        </section>
        <section
          className="about-section shell"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-art">
            <span className="eyebrow">SMALL STUDIO. BIG IMAGINATION.</span>
            <Image
              src={`${basePath}/brand/logo-square-apps-games-800.webp`}
              alt="Noodle Dragon Studio illustrated dragon emblem"
              width={800}
              height={800}
              sizes="(max-width: 760px) 80vw, 34vw"
            />
            <div>
              <span>AOTEAROA / NEW ZEALAND</span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">04 / A BIT ABOUT US</p>
            <h2 id="about-title">
              Thoughtful humans.
              <br />
              <em>Hungry dragon.</em>
            </h2>
            <p>
              We’re Noodle Dragon Studio, an independent design and development
              studio based in Aotearoa New Zealand.
            </p>
            <p>
              We create macOS apps, mobile apps and mobile games. Different
              kinds of experiences, connected by one simple idea: the things we
              use every day should feel good to use.
            </p>
            <p>
              Our name is a little unusual. Our approach is straightforward.
              Make something useful. Give it character. Care about the details.
            </p>
            <a className="quiet-link" href="mailto:tony@noodledragon.studio">
              Say hello to Tony <Arrow diagonal />
            </a>
          </div>
        </section>
        <div className="ticker">
          <span className="sr-only">Make. Play. Smile. Repeat.</span>
          <div className="ticker-track" aria-hidden="true">
            {[0, 1].map((group) => (
              <div className="ticker-group" key={group}>
                {[0, 1, 2].map((i) => (
                  <span key={i}>
                    MAKE <b>✦</b> PLAY <b>✦</b> SMILE <b>✦</b> REPEAT <b>✦</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <section
          className="contact shell section-space"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div>
            <p className="eyebrow">GOOD THINGS START WITH A CONVERSATION</p>
            <h2 id="contact-title">
              Got a little
              <br />
              <em>something in mind?</em>
            </h2>
            <p>
              An idea, a question, or just a friendly hello.
              <br />
              We’d love to hear from you.
            </p>
            <a className="contact-email" href="mailto:tony@noodledragon.studio">
              tony@noodledragon.studio <Arrow diagonal />
            </a>
          </div>
          <a
            className="hello-disc"
            href="mailto:tony@noodledragon.studio"
            aria-label="Say kia ora to Tony by email"
          >
            <span>Kia ora!</span>
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
      )}
      <footer className="shell">
        <a href={privacyView ? "#privacy" : "#top"} className="footer-wordmark">
          Noodle Dragon<span>STUDIO</span>
        </a>
        <p>Apps. Games. A little personality.</p>
        <div>
          <span>© {new Date().getFullYear()} Noodle Dragon Studio</span>
          <a
            href={privacyPath}
            aria-current={privacyView ? "page" : undefined}
            onClick={showPrivacy}
          >
            Privacy
          </a>
          <a href={privacyView ? "#privacy" : "#top"}>Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteApp />
    </>
  );
}
