import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CharacterAvatar as Avatar } from "./character-avatar";
import { CharacterEditor, CharacterValidation, TypeSelection } from "./character-editor";
import { contextualize, chooseType, restoreCharacter, type Character } from "./character-model";
import "../character-system.css";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Compass,
  Leaf,
  GraduationCap,
  Crown,
  Cpu,
  Palette,
  Flag,
  BriefcaseBusiness,
  Fingerprint,
  Heart,
  Search,
  Scale,
  Stethoscope,
  Clapperboard,
  Star,
  Music,
  Wheat,
  ChefHat,
  Code,
  Newspaper,
  FlaskConical,
  Swords,
  Landmark,
  X,
  Menu,
  UserRound,
  Backpack,
  Hammer,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

const paths = ["/", "/univers", "/destin", "/type-personnage", "/personnage", "/validation-personnage", "/histoire", "/resume", "/chargement", "/jeu"];
const stages = ["Accueil", "Univers", "Destin", "Type", "Personnage", "Validation", "Histoire", "Résumé"];
const worlds = [
  {
    name: "MAFIA & PÈGRE",
    label: "Les règles sont faites pour être réécrites.",
    description:
      "Ville criminelle, quartiers clandestins, organisations, rivalités, argent, pouvoir, secrets.",
    icon: Fingerprint,
    tone: "mafia",
    note: "Secrets · Influence · Rivalités",
  },
  {
    name: "VILLAGE AGRICOLE & NATURE",
    label: "Une autre vie, au rythme des saisons.",
    description: "Nature, ferme, animaux, champs, village, commerce local, communauté.",
    icon: Leaf,
    tone: "nature",
    note: "Nature · Communauté · Liberté",
  },
  {
    name: "ÉCOLE & ROMANCE",
    label: "Les rencontres qui changent une vie.",
    description: "École, classes, clubs, activités, camarades, amitiés, rivalités, événements.",
    icon: GraduationCap,
    tone: "school",
    note: "Rencontres · Amitié · Émotions",
  },
  {
    name: "ROYAUME MÉDIÉVAL",
    label: "Votre légende reste à écrire.",
    description: "Village médiéval, château, forêt, marché, chevaliers, politique, aventure.",
    icon: Crown,
    tone: "kingdom",
    note: "Honneur · Aventure · Légende",
  },
  {
    name: "CITÉ FUTURISTE",
    label: "Le futur appartient à ceux qui le créent.",
    description:
      "Ville futuriste, technologie, transports, entreprises, laboratoires, bâtiments modernes.",
    icon: Cpu,
    tone: "future",
    note: "Innovation · Technologie · Progrès",
  },
];
const destinies: { name: string; icon: LucideIcon }[] = [
  { name: "Artiste", icon: Palette },
  { name: "Explorateur", icon: Compass },
  { name: "Leader", icon: Flag },
  { name: "Entrepreneur", icon: BriefcaseBusiness },
  { name: "Mafia / Pègre", icon: Fingerprint },
  { name: "Étudiant / Universitaire", icon: GraduationCap },
  { name: "Romance & Relations", icon: Heart },
  { name: "Détective / Enquêteur", icon: Search },
  { name: "Avocat / Justice", icon: Scale },
  { name: "Médecin", icon: Stethoscope },
  { name: "Acteur / Cinéma", icon: Clapperboard },
  { name: "Célébrité", icon: Star },
  { name: "Musicien", icon: Music },
  { name: "Agriculteur", icon: Wheat },
  { name: "Restaurateur / Chef", icon: ChefHat },
  { name: "Technologie / Start-up", icon: Code },
  { name: "Journaliste", icon: Newspaper },
  { name: "Scientifique", icon: FlaskConical },
  { name: "Aventurier", icon: Swords },
  { name: "Politique / Pouvoir", icon: Landmark },
];
const storyStyles = [
  "Romance",
  "Amitié",
  "Rivalité",
  "Mystère",
  "Aventure",
  "Richesse",
  "Pouvoir",
  "Ambition",
  "Vie tranquille",
  "Drame",
];
function Emblem({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "emblem small" : "emblem"}
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="80" cy="80" r="55" />
      <ellipse cx="80" cy="80" rx="24" ry="55" />
      <ellipse cx="80" cy="80" rx="55" ry="20" />
      <path d="M25 80h110M80 25v110M38 45c23 17 61 17 84 0M38 115c23-17 61-17 84 0" />
      <ellipse cx="80" cy="80" rx="78" ry="34" transform="rotate(-38 80 80)" />
      <circle cx="137" cy="34" r="3" fill="currentColor" />
      <path d="M80 7v9M80 144v9M7 80h9M144 80h9" />
    </svg>
  );
}
function Choice({
  selected,
  children,
  onClick,
  className = "",
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`choice ${selected ? "selected" : ""} ${className}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
      <span className="selection-mark">{selected && <Check size={12} />}</span>
    </button>
  );
}

export default function Worldcraft() {
  const [location, navigate] = useLocation();
  const rawStep = paths.indexOf(location);
  const step = rawStep < 0 ? 0 : rawStep;
  const [data, setData] = useState<Character>(restoreCharacter);
  const [panel, setPanel] = useState<string | null>(null);
  const update = <K extends keyof Character>(key: K, value: Character[K]) =>
    setData((old) => {
      const next = { ...old, [key]: value, validated: key === "stories" ? old.validated : false };
      return key === "world" || key === "destiny" ? contextualize(next) : next;
    });
  const go = (next: number, replace = false) => {
    setPanel(null);
    navigate(paths[next], { replace, state: { worldcraft: true } });
  };
  const back = () => {
    if (window.history.state?.worldcraft) window.history.back();
    else go(Math.max(0, step - 1), true);
  };
  useEffect(() => {
    localStorage.setItem("worldcraft-character", JSON.stringify(data));
  }, [data]);
  useEffect(() => {
    document.documentElement.lang = "fr";
    document.title = "WorldCraft — Life & Legacy";
  }, []);
  useEffect(() => {
    const missing = !data.name.trim() ? 0 : !data.world ? 1 : !data.destiny ? 2 : !data.characterType ? 3 : !data.validated ? 5 : !data.stories.length ? 6 : 10;
    if (step > missing) navigate(paths[missing], { replace: true });
  }, [step, data, navigate]);
  useEffect(() => {
    if (step !== 8) return;
    const timer = setTimeout(
      () => navigate("/jeu", { replace: true, state: { worldcraft: true } }),
      1800,
    );
    return () => clearTimeout(timer);
  }, [step, navigate]);
  useEffect(() => {
    document.querySelector<HTMLElement>("[data-screen]")?.focus();
  }, [step]);
  const world = worlds.find((w) => w.name === data.world);
  const canContinue = step === 0 || step === 4 || step === 5 ? !!data.name.trim() : step === 1 ? !!data.world : step === 2 ? !!data.destiny : step === 3 ? !!data.characterType : step === 6 ? data.stories.length > 0 : true;
  const titles = ["", "Choisissez votre univers", "Quelle vie voulez-vous mener ?", "Choisissez votre type de personnage", "Créez votre personnage", "Validez votre personnage", "Comment voulez-vous vivre votre histoire ?", "Votre destinée"];
  let content: React.ReactNode;
  switch (step) {
    case 0:
      content = (
        <main className="welcome" data-screen="1" tabIndex={-1}>
          <div className="welcome-art">
            <Emblem />
          </div>
          <span className="eyebrow">UN MONDE DE POSSIBILITÉS</span>
          <h1>WORLDCRAFT</h1>
          <div className="subtitle">
            <span />
            Life & Legacy
            <span />
          </div>
          <h2>
            Construisez un monde.
            <br />
            <em>Écrivez votre histoire.</em>
          </h2>
          <p className="welcome-copy">
            Créez votre personnage, choisissez votre destinée et
            <br className="desktop-break" /> construisez une vie qui vous ressemble.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (data.name.trim()) {
                update("name", data.name.trim());
                go(1);
              }
            }}
            className="start-form"
          >
            <label htmlFor="welcome-name">NOM DU PERSONNAGE</label>
            <div className="input-wrap">
              <UserRound size={17} />
              <input
                id="welcome-name"
                aria-label="Nom du personnage"
                placeholder="Comment vous appelez-vous ?"
                value={data.name}
                maxLength={40}
                required
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <button className="primary" disabled={!canContinue}>
              COMMENCER
              <ArrowRight size={17} />
            </button>
          </form>
        </main>
      );
      break;
    case 4:
      content = <CharacterEditor key={data.characterType} data={data} update={update} />;
      break;
    case 3:
      content = <TypeSelection data={data} onChange={type => setData(old => chooseType(old, type))} />;
      break;
    case 5:
      content = <CharacterValidation data={data} />;
      break;
    case 1:
      content = (
        <div className="world-grid">
          {worlds.map((w, i) => (
            <Choice
              key={w.name}
              className={`world-card ${w.tone}`}
              selected={data.world === w.name}
              onClick={() => update("world", w.name)}
            >
              <div className="world-card-art">
                <w.icon size={48} strokeWidth={0.8} />
                <span className="world-number">0{i + 1}</span>
              </div>
              <span className="world-card-body">
                <strong>{w.name}</strong>
                <span className="world-label">{w.label}</span>
                <span className="world-description">{w.description}</span>
                <span className="world-note">{w.note}</span>
              </span>
            </Choice>
          ))}
        </div>
      );
      break;
    case 2:
      content = (
        <div className="destiny-grid">
          {destinies.map((d) => (
            <Choice
              key={d.name}
              selected={data.destiny === d.name}
              onClick={() => update("destiny", d.name)}
            >
              <d.icon size={21} strokeWidth={1.4} />
              <span>{d.name}</span>
            </Choice>
          ))}
        </div>
      );
      break;
    case 6:
      content = (
        <div className="story-layout">
          <div className="story-symbol">
            <Compass size={128} strokeWidth={0.5} />
            <span>
              Chaque choix,
              <br />
              <em>un nouveau chapitre.</em>
            </span>
          </div>
          <div>
            <div className="story-grid">
              {storyStyles.map((s) => (
                <Choice
                  key={s}
                  selected={data.stories.includes(s)}
                  onClick={() =>
                    update(
                      "stories",
                      data.stories.includes(s)
                        ? data.stories.filter((x) => x !== s)
                        : [...data.stories, s],
                    )
                  }
                >
                  {s}
                </Choice>
              ))}
            </div>
            <p className="story-explanation">
              Vos choix influenceront les événements, les personnages et les situations qui
              apparaîtront dans votre monde.
            </p>
            <span className="selection-count">
              {data.stories.length} style{data.stories.length > 1 ? "s" : ""} sélectionné
              {data.stories.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>
      );
      break;
    case 7:
      content = (
        <div className="summary-layout">
          <div className="character-preview">
            <span className="eyebrow">PRÊT À ÉCRIRE VOTRE HISTOIRE</span>
            <div className="avatar-stage">
              <div className="avatar-halo" />
              <Avatar data={data} />
            </div>
            <h3>{data.name}</h3>
            <span className="preview-caption">
              {data.style} · {data.gender}
            </span>
          </div>
          <div className="summary-details">
            <span className="eyebrow">LE PREMIER CHAPITRE</span>
            <dl>
              <div>
                <dt>Nom</dt>
                <dd>{data.name}</dd>
              </div>
              <div>
                <dt>Univers</dt>
                <dd>{data.world}</dd>
              </div>
              <div>
                <dt>Destin</dt>
                <dd>{data.destiny}</dd>
              </div>
              <div>
                <dt>Styles</dt>
                <dd className="summary-tags">
                  {data.stories.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </dd>
              </div>
            </dl>
            <p>
              Un monde vous attend.
              <br />
              <em>La suite vous appartient.</em>
            </p>
          </div>
        </div>
      );
      break;
    case 8:
      content = (
        <main className="loading-screen" data-screen="9" tabIndex={-1}>
          <Emblem />
          <span className="eyebrow">LE DÉBUT D’UNE NOUVELLE VIE</span>
          <h1>Votre monde se construit...</h1>
          <div className="loading-track">
            <span />
          </div>
          <p>
            {data.world} · {data.name}
          </p>
          <button className="back-button" onClick={back}>
            <ArrowLeft size={16} />
            RETOUR
          </button>
        </main>
      );
      break;
    default:
      content = (
        <main className={`game-screen ${world?.tone || "nature"}`} data-screen="10" tabIndex={-1}>
          <div className="world-map" aria-label={`Monde minimal : ${data.world}`}>
            <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M80 0H0v80" stroke="currentColor" strokeWidth=".5" fill="none" />
                </pattern>
              </defs>
              <rect width="1400" height="900" fill="url(#grid)" />
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M-40 170C320-100 480 350 850 110S1300 150 1500 40M-40 195C320-75 480 375 850 135S1300 175 1500 65M-40 220C320-50 480 400 850 160S1300 200 1500 90M-40 700C330 480 320 1000 850 700S1300 600 1500 740M-40 725C330 505 320 1025 850 725S1300 625 1500 765M-40 750C330 530 320 1050 850 750S1300 650 1500 790" />
              </g>
              <path
                d="M-50 490C300 260 400 650 780 460S1110 200 1490 370"
                fill="none"
                stroke="#a5b4a0"
                strokeWidth="65"
                opacity=".06"
              />
              <path
                d="M-50 490C300 260 400 650 780 460S1110 200 1490 370"
                fill="none"
                stroke="#a5b4a0"
                strokeWidth="1"
                opacity=".4"
              />
            </svg>
          </div>
          <header className="game-top">
            <div className="brand">
              <Emblem small />
              <span>
                WORLDCRAFT<small>Life & Legacy</small>
              </span>
            </div>
            <div className="world-location">
              <span className="status-dot" /> {data.world}
            </div>
          </header>
          <div className="world-player">
            <span className="player-name">{data.name}</span>
            <Avatar data={data} compact />
            <span className="player-circle" />
          </div>
          <div className="map-compass">
            <Compass size={38} strokeWidth={1} />
            <span>N</span>
          </div>
          <span className="world-caption">
            LE PREMIER JOUR<small>Votre histoire commence ici.</small>
          </span>
          {panel && (
            <aside className="game-panel">
              <div>
                <h2>{panel}</h2>
                <button aria-label="Fermer le panneau" onClick={() => setPanel(null)}>
                  <X size={18} />
                </button>
              </div>
              {panel === "Menu" ? (
                <>
                  <p>Votre monde est prêt. Cette version teste le parcours de navigation.</p>
                  <button className="secondary" onClick={() => go(7)}>
                    REVOIR MA DESTINÉE
                  </button>
                </>
              ) : panel === "Personnage" ? (
                <>
                  <strong>{data.name}</strong>
                  <p>{data.destiny}</p>
                  <p>
                    {data.gender} · {data.style}
                  </p>
                  <p>{data.stories.join(" · ")}</p>
                </>
              ) : (
                <p>
                  {panel === "Inventaire"
                    ? "Votre inventaire est vide."
                    : panel === "Construire"
                      ? "La construction sera ajoutée après validation de la navigation."
                      : panel === "Interaction"
                        ? "Aucun personnage à proximité dans ce monde minimal."
                        : "Nova sera disponible dans une prochaine version."}
                </p>
              )}
            </aside>
          )}
          <nav className="game-toolbar" aria-label="Commandes de jeu">
            {[
              { name: "Menu", icon: Menu },
              { name: "Personnage", icon: UserRound },
              { name: "Inventaire", icon: Backpack },
              { name: "Construire", icon: Hammer },
              { name: "Interaction", icon: MessageCircle },
              { name: "Nova", icon: Sparkles },
            ].map((item) => (
              <button
                key={item.name}
                aria-pressed={panel === item.name}
                onClick={() => setPanel(panel === item.name ? null : item.name)}
              >
                <item.icon size={21} strokeWidth={1.4} />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </main>
      );
  }
  if (step === 9) return content;
  return (
    <div className={`app-shell ${step === 0 ? "home-shell" : ""}`}>
      <div className="topography" aria-hidden="true" />
      <header className="app-header">
        <div className="brand">
          <Emblem small />
          <span>
            WORLDCRAFT<small>Life & Legacy</small>
          </span>
        </div>
        <div className="header-note">
          <span className="status-dot" /> VOTRE VIE. VOS CHOIX.
        </div>
      </header>
      {step === 0 || step === 8 ? (
        content
      ) : (
        <main key={step} className="setup-screen" data-screen={step + 1} tabIndex={-1}>
          <nav className="progress" aria-label="Progression">
            {stages.map((s, i) => (
              <span className={i === step ? "current" : i < step ? "done" : ""} key={s}>
                <b>{i < step ? <Check size={12} /> : String(i + 1).padStart(2, "0")}</b>
                <span>{s}</span>
              </span>
            ))}
          </nav>
          <div className="screen-heading">
            <span className="eyebrow">
              CHAPITRE {String(step).padStart(2, "0")} <span>/ 07</span>
            </span>
            <h1>{titles[step]}</h1>
            <p>
              {step === 1 ? "Cinq mondes. Cinq façons de commencer. Lequel sera le vôtre ?" : step === 2 ? "Votre univers est le décor. Votre destin, le chemin que vous choisissez." : step === 3 ? "Robot, Cartoon ou Manga : choisissez votre façon d’exister dans ce monde." : step === 4 ? "Tout commence par vous. Donnez vie à votre personnage." : step === 5 ? "Vérifiez votre création avant de poursuivre votre histoire." : step === 6 ? "Choisissez un ou plusieurs styles pour donner le ton à votre aventure." : "Vos choix sont réunis. Votre prochaine vie peut commencer."}
            </p>
          </div>
          <div className="screen-content">{content}</div>
          <footer className="screen-actions">
            <button className="back-button" onClick={step === 5 || step === 7 ? () => go(4) : back}>
              <ArrowLeft size={16} />
              {step === 5 || step === 7 ? "MODIFIER" : "RETOUR"}
            </button>
            <span className="action-hint">
              {step === 1 ? data.world ? "Univers sélectionné" : "Sélectionnez un univers" : step === 2 ? data.destiny || "Sélectionnez un destin" : step === 3 ? data.characterType || "Sélectionnez un type" : step === 6 ? "Plusieurs choix possibles" : step === 7 ? "Tout commence par un choix." : "Votre personnage, vos règles."}
            </span>
            <button className="primary" disabled={!canContinue} onClick={() => { if(step === 5) setData(old => ({...old, validated: true})); go(step + 1); }}>
              {step === 7 ? "ENTRER DANS MON MONDE" : step === 5 ? "VALIDER MON PERSONNAGE" : step === 4 ? "VÉRIFIER MON PERSONNAGE" : "CONTINUER"}
              <ArrowRight size={17} />
            </button>
          </footer>
        </main>
      )}
      {step === 0 && (
        <footer className="welcome-footer">
          <span>CHAQUE VIE EST UNE HISTOIRE UNIQUE.</span>
          <span>LA VÔTRE COMMENCE ICI.</span>
        </footer>
      )}
    </div>
  );
}
