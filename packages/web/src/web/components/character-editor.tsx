import { useState } from "react";
import { Check, Cpu, Palette, Sparkles, Eye, Shirt, Gem, SlidersHorizontal, ChevronRight } from "lucide-react";
import { CharacterAvatar } from "./character-avatar";
import { chooseType, getCatalog, type Character, type CharacterType } from "./character-model";

type Update = <K extends keyof Character>(key: K, value: Character[K]) => void;
function SelectField({label,value,options,onChange}:{label:string;value:string;options:string[];onChange:(value:string)=>void}) {
 const all=options.includes(value)?options:[value,...options].filter(Boolean);
 return <label className="character-field"><span>{label}</span><select aria-label={label} value={value} onChange={e=>onChange(e.target.value)}>{all.map(x=><option key={x}>{x}</option>)}</select></label>;
}
function ColorField({label,value,colors,onChange}:{label:string;value:string;colors?:string[];onChange:(value:string)=>void}) {
 return <fieldset className="color-field"><legend>{label}</legend><div className="color-options">{(colors||["#3b2b22","#c2a166","#c69676","#728275","#49697a","#ad6881"]).map((c,i)=><button type="button" key={c} aria-label={`${label} ${i+1}`} aria-pressed={value===c} onClick={()=>onChange(c)} className={value===c?"active":""}><span style={{background:c}}>{value===c&&<Check size={13}/>}</span></button>)}<label className="custom-color"><input type="color" aria-label={`${label} personnalisée`} value={value} onChange={e=>onChange(e.target.value)}/><span>Libre</span></label></div></fieldset>;
}
export function TypeSelection({data,onChange}:{data:Character;onChange:(type:CharacterType)=>void}) {
 const options=[{type:"Robot" as const,icon:Cpu,title:"ROBOT",tag:"MÉCANIQUE & SINGULIER",description:"Personnage robotique entièrement personnalisable."},{type:"Cartoon" as const,icon:Palette,title:"CARTOON",tag:"STYLISÉ & EXPRESSIF",description:"Le style dessin animé de votre monde, avec plus de liberté."},{type:"Manga" as const,icon:Sparkles,title:"MANGA / ANIME",tag:"GRAPHIQUE & IMAGINATIF",description:"Un personnage original inspiré de l’univers manga / anime."}];
 return <div className="type-selection"><div className="character-context"><span>{data.world}</span><ChevronRight size={13}/><span>{data.destiny}</span></div><div className="character-type-grid">{options.map(o=>{
 const sample=chooseType(data,o.type);
 const preview={...sample,name:"",clothes:o.type==="Robot"?"Sans vêtement":sample.clothes, hair:o.type==="Manga"?"#b0a0c3":sample.hair,eyeColor:o.type==="Robot"?"#65d5d9":o.type==="Manga"?"#82699c":sample.eyeColor,accessories:[],validated:false};
 return <button key={o.type} className={`character-type-card choice ${data.characterType===o.type?"selected":""} ${o.type.toLowerCase()}`} aria-pressed={data.characterType===o.type} onClick={()=>onChange(o.type)}><span className="selection-mark">{data.characterType===o.type&&<Check size={12}/>}</span><span className="type-card-art"><CharacterAvatar data={preview}/></span><span className="type-card-copy"><span className="type-tag">{o.tag}</span><strong><o.icon size={17} strokeWidth={1.4}/>{o.title}</strong><span>{o.description}</span></span></button>;
 })}</div><p className="character-note">Trois façons d’exister. Un même monde, votre propre identité.</p></div>;
}

export function CharacterEditor({data,update}:{data:Character;update:Update}){
 const robot=data.characterType==="Robot";
 const [tab,setTab]=useState(robot?"Structure":"Identité");
 const catalog=getCatalog(data);
 const tabs=robot?[{name:"Structure",icon:Cpu},{name:"Lentilles & lumière",icon:Eye},{name:"Vêtements",icon:Shirt},{name:"Accessoires",icon:Gem}]:[{name:"Identité",icon:SlidersHorizontal},{name:"Visage",icon:Eye},{name:"Cheveux",icon:Palette},{name:"Vêtements",icon:Shirt},{name:"Accessoires",icon:Gem}];
 const select=(label:string,key: keyof Character,options:string[]) => <SelectField label={label} value={String(data[key])} options={options} onChange={v=>update(key,v as never)}/>;
 const color=(label:string,key: keyof Character,colors?:string[]) => <ColorField label={label} value={String(data[key])} colors={colors} onChange={v=>update(key,v as never)}/>;
 const accessoryToggle=(name:string)=>update("accessories",data.accessories.includes(name)?data.accessories.filter(x=>x!==name):[...data.accessories,name]);
 return <div className="detailed-character-layout" data-editor-type={data.characterType}>
  <aside className="detailed-character-preview character-preview"><span className="eyebrow">APERÇU EN DIRECT · {data.characterType.toUpperCase()}</span><div className="avatar-stage"><div className="avatar-halo"/><CharacterAvatar data={data}/></div><div className="preview-identity"><h3>{data.name}</h3><span className="preview-caption">{data.world}<br/>{data.destiny}</span></div><span className="idle-indicator"><span className="status-dot"/> IDLE</span></aside>
  <div className="character-customization"><div className="character-tabs" role="tablist" aria-label="Personnalisation du personnage">{tabs.map(t=><button key={t.name} id={`tab-${t.name}`} role="tab" aria-selected={tab===t.name} aria-controls="character-options" onClick={()=>setTab(t.name)}><t.icon size={15}/><span>{t.name}</span></button>)}</div>
   <div className="character-options" id="character-options" role="tabpanel" aria-labelledby={`tab-${tab}`}>
    <div className="options-heading"><span className="eyebrow">{tab.toUpperCase()}</span><span>Chaque détail vous appartient.</span></div>
    {tab==="Identité"&&<><label className="character-field"><span>Nom</span><input aria-label="Nom du personnage" maxLength={40} value={data.name} onChange={e=>update("name",e.target.value)}/></label><div className="character-fields-grid">{select("Identité","gender",["Masculin","Féminin","Non précisé","Non-binaire"])}{select("Forme du visage","appearance",["Classique","Anguleuse","Douce"])}</div>{select("Style général","style",["Décontracté","Élégant","Audacieux"])}<p className="character-note">Votre identité ne limite ni les tenues ni les accessoires.</p></>}
    {tab==="Visage"&&<>
     {color("Couleur de peau","skin",["#f0d0b3","#deb390","#c69676","#a67350","#775139","#4f3429"])}
     <div className="character-fields-grid">{select("Forme du visage","appearance",["Classique","Anguleuse","Douce"])}{select("Forme des yeux","eyeShape",data.characterType==="Manga"?["Grands yeux","Amande anime","Fins"]:["Ronds","Amande","Fins"])}</div>
     {color("Couleur des yeux","eyeColor",["#563e2c","#426c5a","#497b9a","#8e75a9","#bf8b41","#29251f"])}
     <div className="character-fields-grid">{select("Sourcils","brows",["Naturels","Droits","Épais"])}{select("Nez","nose",["Petit","Fin","Arrondi"])}{select("Forme des lèvres","lipShape",["Sourire","Discrètes","Pulpeuses"])}{select("Maquillage léger","makeup",["Aucun","Blush","Eyeliner"])}{select("Détails du visage","faceDetail",data.characterType==="Manga"?["Aucun","Taches de rousseur","Grain de beauté","Marque anime"]:["Aucun","Taches de rousseur","Grain de beauté"])}</div>
     {color("Couleur des lèvres","lipColor",["#98614e","#ad6881","#884753","#c78671","#67483e"])}
    </>}
    {tab==="Cheveux"&&<><div className="character-fields-grid">{select("Longueur","hairLength",["Courts","Mi-longs","Longs","Très longs"])}{select("Coiffure","haircut",data.characterType==="Manga"?["Anime effilé","Carré","Détachés","Queue de cheval","Tresses","Bouclés","Rasés"]:["Courts","Carré","Détachés","Cheveux attachés","Queue de cheval","Tresses","Bouclés","Rasés"])}</div>
     {color("Couleur des cheveux","hair",["#231f1b","#3b2b22","#805039","#c2a166","#c9c8b8","#984841",...(data.characterType==="Manga"?["#b0a0c3","#89b6c2"]:[])])}
     <div className="character-fields-grid">{select("Texture","hairTexture",["Lisse","Ondulée","Bouclée"])}{select("Frange","fringe",data.characterType==="Manga"?["Naturelle","Droite","Latérale","Effilée"]:["Naturelle","Droite","Latérale"])}</div><label className="character-checkbox"><input type="checkbox" checked={data.highlights} onChange={e=>update("highlights",e.target.checked)}/><span>Mèches contrastées</span></label>{data.highlights&&color("Couleur des mèches","highlightColor")}
    </>}
    {tab==="Structure"&&<><div className="character-fields-grid">{select("Forme de la tête","headShape",["Carrée","Ronde","Hexagonale","Capsule"])}{select("Visage mécanique","facePlate",["Écran","Grille","Plaque"])}{select("Bras","arms",["Articulés","Renforcés","Fins","Pinces"])}{select("Jambes","legs",["Pistons","Articulées","Roues"])}{select("Proportions","proportions",["Équilibrées","Massives","Élancées"])}{select("Détails mécaniques","mechanics",catalog.mechanics)}{select("Antennes","antenna",catalog.antennas)}{select("Style général","style",["Décontracté","Élégant","Audacieux"])}</div>{color("Métal principal","metalPrimary",["#a4afad","#c7b589","#727d8e","#bd8065","#455657","#d6d7ce"])}{color("Métal secondaire","metalSecondary",["#3c5056","#423b31","#6d597c","#716442","#282e32","#667a6c"])}</>}
    {tab==="Lentilles & lumière"&&<><div className="character-fields-grid">{select("Forme des lentilles","eyeShape",["Lentilles rondes","Lentilles carrées","Visière"])}{select("Éléments lumineux","lights",["Aucun","Cœur lumineux","Bandes lumineuses","Constellation"])}</div>{color("Couleur des lentilles","eyeColor",["#65d5d9","#d0a2d7","#e6b95c","#80c898","#d36b66","#89a8e7"])}{color("Couleur lumineuse","lightColor",["#65d5d9","#d0a2d7","#e6b95c","#80c898","#d36b66","#89a8e7"])}</>}
    {tab==="Vêtements"&&<><div className="wardrobe-context"><span className="eyebrow">CATALOGUE · {data.world}</span><p>Les options tiennent compte de votre monde, de votre destin et de votre type. Aucun uniforme n’est imposé.</p></div>
     {select(robot?"Vêtement robot":"Haut / tenue","clothes",catalog.tops)}{color("Couleur des vêtements","clothingColor")}
     <div className="character-fields-grid">{select("Bas","bottoms",catalog.bottoms)}{select("Chaussures","shoes",catalog.shoes)}</div>{color("Couleur du bas","bottomColor",["#303c34","#4e637c","#9b8060","#775763","#c0bca4"])}{color("Couleur des chaussures","shoeColor",["#171e1a","#805a40","#b4b7a6","#596375","#998057"])}
    </>}
    {tab==="Accessoires"&&<><p className="character-note accessory-intro">Plusieurs choix possibles. Les propositions de votre destin enrichissent le catalogue, sans obligation.</p><div className="character-accessory-grid">{catalog.accessories.map(a=><button key={a} className={`choice ${data.accessories.includes(a)?"selected":""}`} aria-pressed={data.accessories.includes(a)} onClick={()=>accessoryToggle(a)}>{a}<span className="selection-mark">{data.accessories.includes(a)&&<Check size={12}/>}</span></button>)}</div>{color("Couleur des accessoires","accessoryColor",["#c3a777","#a76e63","#749c8e","#8889a7","#d4c7b0","#303d35"])}</>}
   </div>
  </div>
 </div>;
}

export function CharacterValidation({data}:{data:Character}) {
 return <div className="summary-layout character-validation"><div className="character-preview"><span className="eyebrow">VOTRE PERSONNAGE · {data.characterType.toUpperCase()}</span><div className="avatar-stage"><div className="avatar-halo"/><CharacterAvatar data={data}/></div><h3>{data.name}</h3><span className="preview-caption">{data.style}</span></div><div className="summary-details"><span className="eyebrow">PRÊT À REJOINDRE VOTRE MONDE</span><dl><div><dt>Nom</dt><dd>{data.name}</dd></div><div><dt>Univers</dt><dd>{data.world}</dd></div><div><dt>Destin</dt><dd>{data.destiny}</dd></div><div><dt>Type</dt><dd>{data.characterType}</dd></div><div><dt>Tenue</dt><dd>{data.clothes} · {data.bottoms} · {data.shoes}</dd></div><div><dt>Accessoires</dt><dd>{data.accessories.join(" · ")||"Aucun"}</dd></div></dl><p>Votre monde. Votre destinée.<br/><em>Votre personnage.</em></p></div></div>;
}