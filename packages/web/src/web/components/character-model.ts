export type CharacterType = "" | "Robot" | "Cartoon" | "Manga";
export type CharacterPose = "idle" | "walk" | "run" | "stop" | "interact" | "build" | "emotion";
export type Character = {
  name: string; gender: string; appearance: string; skin: string; hair: string; haircut: string;
  clothes: string; style: string; world: string; destiny: string; stories: string[];
  version: number; characterType: CharacterType; validated: boolean;
  eyeColor: string; eyeShape: string; brows: string; nose: string; lipShape: string; lipColor: string;
  makeup: string; faceDetail: string; hairLength: string; hairTexture: string; highlights: boolean;
  highlightColor: string; fringe: string; bottoms: string; shoes: string; clothingColor: string;
  bottomColor: string; shoeColor: string; accessoryColor: string; accessories: string[];
  headShape: string; facePlate: string; metalPrimary: string; metalSecondary: string; antenna: string;
  lights: string; lightColor: string; mechanics: string; arms: string; legs: string; proportions: string;
};
export const initialCharacter: Character = {
  name: "", gender: "Non précisé", appearance: "Classique", skin: "#c69676", hair: "#3b2b22",
  haircut: "Courts", clothes: "Veste", style: "Décontracté", world: "", destiny: "", stories: [],
  version: 2, characterType: "", validated: false, eyeColor: "#563e2c", eyeShape: "Ronds",
  brows: "Naturels", nose: "Petit", lipShape: "Sourire", lipColor: "#98614e", makeup: "Aucun",
  faceDetail: "Aucun", hairLength: "Courts", hairTexture: "Lisse", highlights: false,
  highlightColor: "#d4b57d", fringe: "Naturelle", bottoms: "Pantalon", shoes: "Chaussures",
  clothingColor: "#728275", bottomColor: "#303c34", shoeColor: "#171e1a", accessoryColor: "#c3a777",
  accessories: [], headShape: "Carrée", facePlate: "Écran", metalPrimary: "#a4afad",
  metalSecondary: "#3c5056", antenna: "Simple", lights: "Cœur lumineux", lightColor: "#65d5d9",
  mechanics: "Rivets", arms: "Articulés", legs: "Pistons", proportions: "Équilibrées",
};

export type Catalog = { tops: string[]; bottoms: string[]; shoes: string[]; accessories: string[]; mechanics: string[]; antennas: string[] };
// Add a universe here to extend the wardrobe without changing the editor or avatar API.
export const universeCatalogs: Record<string, Catalog> = {
  "ÉCOLE & ROMANCE": {
    tops: ["Uniforme scolaire", "Chemise", "Pull", "Veste", "Robe"],
    bottoms: ["Pantalon", "Jupe", "Jeans", "Short"], shoes: ["Baskets", "Chaussures"],
    accessories: ["Lunettes", "Sac scolaire", "Ruban", "Bijoux", "Carnet"],
    mechanics: ["Rivets", "Panneaux lisses", "Servomoteurs"], antennas: ["Aucune", "Simple", "Double"],
  },
  "ROYAUME MÉDIÉVAL": {
    tops: ["Tunique", "Robe médiévale", "Armure", "Cape", "Chemise"],
    bottoms: ["Pantalon médiéval", "Jupe longue"], shoes: ["Bottes", "Chaussures médiévales"],
    accessories: ["Couronne", "Ceinture", "Bijoux", "Bourse", "Broche", "Cape d'épaule"],
    mechanics: ["Rivets", "Engrenages", "Plaques gravées"], antennas: ["Aucune", "Simple", "Crête"],
  },
  "MAFIA & PÈGRE": {
    tops: ["Costume", "Chemise", "Veste", "Manteau", "Robe élégante", "Veste urbaine"],
    bottoms: ["Pantalon élégant", "Jeans", "Jupe"], shoes: ["Chaussures habillées", "Bottines"],
    accessories: ["Lunettes", "Bijoux", "Chapeau feutre", "Montre", "Sac luxueux", "Cravate"],
    mechanics: ["Rivets", "Panneaux lisses", "Plaques gravées"], antennas: ["Aucune", "Simple", "Double"],
  },
  "VILLAGE AGRICOLE & NATURE": {
    tops: ["Salopette", "Chemise", "Robe champêtre", "Veste", "Pull", "Tunique"],
    bottoms: ["Pantalon", "Jeans", "Jupe longue", "Short"], shoes: ["Bottes", "Chaussures"],
    accessories: ["Chapeau de paille", "Sac de récolte", "Fleur", "Ceinture", "Bijoux", "Gourde"],
    mechanics: ["Rivets", "Engrenages", "Pistons renforcés"], antennas: ["Aucune", "Simple", "Double"],
  },
  "CITÉ FUTURISTE": {
    tops: ["Combinaison futuriste", "Veste technologique", "Haut cyber", "Robe cyber", "Veste urbaine"],
    bottoms: ["Pantalon cyber", "Jupe cyber", "Short technique"], shoes: ["Bottes magnétiques", "Baskets cyber"],
    accessories: ["Visière", "Bracelet lumineux", "Hologramme", "Casque audio", "Sac technique", "Bijoux"],
    mechanics: ["Rivets", "Servomoteurs", "Circuits apparents", "Réacteur", "Panneaux lisses", "Pistons renforcés"],
    antennas: ["Aucune", "Simple", "Double", "Crête", "Satellite", "Holographique"],
  },
};
const fallback: Catalog = { tops: ["Veste", "Chemise", "Pull"], bottoms: ["Pantalon", "Jupe"], shoes: ["Chaussures", "Bottes"], accessories: ["Lunettes", "Bijoux", "Sac"], mechanics: ["Rivets", "Panneaux lisses"], antennas: ["Aucune", "Simple"] };
const unique = (items: string[]) => [...new Set(items)];
export function getCatalog(data: Character): Catalog {
  const base = universeCatalogs[data.world] || fallback;
  const result: Catalog = Object.fromEntries(Object.entries(base).map(([key, value]) => [key, [...value]])) as Catalog;
  const medieval = data.world === "ROYAUME MÉDIÉVAL";
  const extras: Record<string, string[]> = {
    Artiste: ["Palette", "Béret"], Explorateur: ["Sac d'exploration", "Boussole"],
    "Mafia / Pègre": ["Montre", "Bijoux"], "Étudiant / Universitaire": ["Carnet", medieval ? "Bourse" : "Sac scolaire"],
    Médecin: medieval ? ["Sac d'herboriste"] : ["Trousse médicale"], Musicien: ["Instrument", "Note musicale"],
    Scientifique: medieval ? ["Fiole"] : ["Lunettes de laboratoire"], "Restaurateur / Chef": ["Toque"],
    Journaliste: ["Carnet"], Agriculteur: ["Gourde"], Aventurier: ["Boussole"],
  };
  result.accessories.push(...(extras[data.destiny] || []));
  if (data.destiny === "Artiste") result.tops.push(medieval ? "Tunique créative" : "Veste créative");
  if (data.destiny === "Explorateur") result.tops.push(medieval ? "Tunique de voyage" : "Veste d'exploration");
  if (data.destiny === "Médecin" && !medieval) result.tops.push("Blouse médicale");
  if (data.characterType === "Manga" && data.world === "ÉCOLE & ROMANCE") result.tops.push("Uniforme anime marin", "Uniforme anime blazer");
  if (data.characterType === "Robot") {
    result.tops = ["Sans vêtement", ...result.tops.map(x => `${x} robot` )];
    result.bottoms = ["Châssis apparent", ...result.bottoms.map(x => `${x} robot`)];
    result.shoes = ["Pieds mécaniques", ...result.shoes.map(x => `${x} robot`)];
  }
  return { ...result, tops: unique(result.tops), accessories: unique(result.accessories) };
}

export function contextualize(data: Character): Character {
  const catalog = getCatalog(data);
  return { ...data,
    clothes: catalog.tops.includes(data.clothes) ? data.clothes : catalog.tops[0],
    bottoms: catalog.bottoms.includes(data.bottoms) ? data.bottoms : catalog.bottoms[0],
    shoes: catalog.shoes.includes(data.shoes) ? data.shoes : catalog.shoes[0],
    mechanics: catalog.mechanics.includes(data.mechanics) ? data.mechanics : catalog.mechanics[0],
    antenna: catalog.antennas.includes(data.antenna) ? data.antenna : catalog.antennas[0],
    accessories: data.accessories.filter(x => catalog.accessories.includes(x)),
  };
}
export function chooseType(data: Character, type: CharacterType): Character {
  if (type === data.characterType) return data;
  return contextualize({ ...data, characterType: type, validated: false,
    eyeShape: type === "Robot" ? "Lentilles rondes" : type === "Manga" ? "Grands yeux" : "Ronds",
    haircut: type === "Manga" ? "Anime effilé" : data.haircut === "Anime effilé" ? "Courts" : data.haircut,
  });
}

export function restoreCharacter(): Character {
  try {
    const saved = JSON.parse(localStorage.getItem("worldcraft-character") || "null");
    if (!saved || typeof saved !== "object") return initialCharacter;
    const legacy = !saved.version;
    const merged = { ...initialCharacter, ...saved, version: 2,
      stories: Array.isArray(saved.stories) ? saved.stories : [], accessories: Array.isArray(saved.accessories) ? saved.accessories : [],
      ...(legacy ? { characterType: "Cartoon" as const, validated: true,
        hairLength: saved.haircut === "Longs" ? "Longs" : "Courts",
        clothingColor: saved.style === "Élégant" ? "#494c43" : saved.style === "Audacieux" ? "#a65d43" : "#728275",
        eyeColor: "#29251f", } : {}),
    };
    return merged;
  } catch { return initialCharacter; }
}