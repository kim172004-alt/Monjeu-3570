import { useId } from "react";
import type { Character, CharacterPose } from "./character-model";

function Outfit({ data, robot = false }: { data: Character; robot?: boolean }) {
  const top = data.clothes.toLowerCase();
  const bottom = data.bottoms.toLowerCase();
  const shoe = data.shoes.toLowerCase();
  const bare = robot && top === "sans vêtement";
  const dress = top.includes("robe");
  const cape = top.includes("cape");
  const suit = top.includes("costume") || top.includes("veste") || top.includes("blazer");
  const uniform = top.includes("uniforme");
  const armor = top.includes("armure");
  const cyber = /cyber|technologique|futuriste/.test(top);
  const shirt = top.includes("chemise") || top.includes("blouse");
  const coat = top.includes("manteau") || top.includes("blouse");
  const overalls = top.includes("salopette");
  return <g data-outfit={data.clothes}>
    {!robot || bottom !== "châssis apparent" ? <g fill={data.bottomColor}>
      {bottom.includes("jupe") ? <path d={bottom.includes("longue") ? "M78 206h64l21 74H57z" : "M78 206h64l17 40H61z"} /> : <>
        <path d={bottom.includes("short") ? "M76 206h33l-1 39H78zm35 0h34l-2 39h-29z" : "M76 206h33l-5 77H79zm35 0h34l-2 77h-29z"}/>
        {bottom.includes("jeans") && <path d="M82 220h16m24 0h15M102 224l-3 45m18-45 3 45" stroke="#e8e3d466" strokeWidth="1.5" fill="none"/>}
        {/cyber|technique/.test(bottom) && <path d="M87 229v35m45-35v35" stroke={data.lightColor} strokeWidth="2.5"/>}
      </>}
    </g> : null}
    {!robot || shoe !== "pieds mécaniques" ? <g fill={data.shoeColor}>
      {shoe.includes("bot") && <path d="M78 252h27v33H76zm36 0h28v33h-28z"/>}
      <path d="M78 278h27v12H71q-3-8 7-12m37 0h27q10 5 9 12h-36z"/>
      {shoe.includes("baskets") && <path d="M73 286h31m12 0h30m-61-6h12m23 0h12" stroke="#f4efde" strokeWidth="2"/>}
      {shoe.includes("mag") && <path d="M75 284h29m12 0h31" stroke={data.lightColor} strokeWidth="2"/>}
    </g> : null}
    {!bare && <>
      {cape && <path d="M86 120h48l42 152H45z" fill={data.clothingColor} stroke="#121811" strokeWidth="1"/>}
      <path d={dress ? "M80 123q30-12 60 0l-7 59 31 91H56l31-91z" : coat ? "M78 123q32-13 64 0l18 121H62z" : "M78 123q32-13 64 0l17 87H63z"} fill={data.clothingColor} stroke="#19241e" strokeWidth="1"/>
      <path d="M80 124q-14-1-22 22l-11 61 17 4 18-55m57-32q14-1 22 22l11 61-17 4-18-55" fill={data.clothingColor}/>
      {suit && <><path d="M97 126l13 13 13-13 7 84H90z" fill="#e3dfcd"/><path d="M93 122l-11 24 14 9-5 55m35-88 12 24-14 9 6 55" fill="none" stroke={data.accessoryColor} strokeWidth="2"/></>}
      {shirt && <><path d="M95 122l15 17 15-17m-15 17v72" stroke="#f4eadc88" strokeWidth="2" fill="none"/>{[153,170,187].map(y=><circle key={y} cx="114" cy={y} r="1.7" fill={data.accessoryColor}/>)}</>}
      {uniform && <><path d="M91 123l19 22 19-22-7 25h-24z" fill="#edead8"/><path d={top.includes("marin") ? "M104 140h12l9 15-15-5-15 5z" : "M105 141h10l3 28-8 8-8-8z"} fill={data.accessoryColor}/><path d="M78 154h16m32 0h16" stroke="#eeebd566"/></>}
      {overalls && <><path d="M86 122h7v46h34v-46h7v90H86z" fill={data.bottomColor}/><path d="M95 182h30v17H95z" fill="none" stroke={data.accessoryColor} strokeWidth="1.5"/><circle cx="90" cy="167" r="2.5" fill={data.accessoryColor}/><circle cx="130" cy="167" r="2.5" fill={data.accessoryColor}/></>}
      {armor && <><path d="M81 128l29-8 29 8-3 66-26 17-26-17z" fill="#c3cbbe" stroke={data.accessoryColor} strokeWidth="2"/><path d="M110 127v71m-22-49h44m-45 19h46" stroke="#6c7d74" strokeWidth="3"/><path d="M63 126l20 3-3 26-25-9zm74 3 20-3 8 20-25 9z" fill="#c3cbbe"/></>}
      {cyber && <><path d="M86 128l11 11v42l-13 21m50-74-11 11v42l13 21M98 151h24" stroke={data.lightColor} strokeWidth="2.5" fill="none"/><circle className="robot-glow" cx="110" cy="159" r="5" fill={data.lightColor}/></>}
      {dress && <><path d="M84 174h52" stroke={data.accessoryColor} strokeWidth="4"/><path d="M86 218l-10 46m34-46v49m24-49 10 46" stroke="#eeeade24" strokeWidth="2"/></>}
      {top.includes("tunique") && <path d="M91 124l19 19 19-19m-19 20v25M68 188h83" stroke={data.accessoryColor} strokeWidth="2" fill="none"/>}
      {top.includes("pull") && <path d="M95 124q15 18 30 0M64 203h91" stroke="#eeeade33" strokeWidth="3" fill="none"/>}
    </>}
  </g>;
}

function Accessories({ data }: { data: Character }) {
  const has = (...names: string[]) => names.some(n=>data.accessories.includes(n));
  const c = data.accessoryColor;
  const bag = data.accessories.find(x=>/Sac|Bourse|Trousse/.test(x));
  const glasses = has("Lunettes", "Lunettes de laboratoire");
  return <g data-accessories={data.accessories.join(",")}>
    {has("Cape d'épaule") && <path d="M145 125l26 134-29-17-11-122z" fill={c} opacity=".9"/>}
    {bag && <g><path d="M79 132l62 73" stroke={c} strokeWidth="4"/><rect x="143" y="193" width={bag==="Bourse"?20:31} height={bag==="Bourse"?27:39} rx="5" fill={c} stroke="#17231b" strokeWidth="2"/><path d="M147 203h22m-18-8v-8q10-12 17 0v8" fill="none" stroke="#eeeade99" strokeWidth="2"/>{/scolaire|médicale/.test(bag)&&<path d="M155 211h10m-5-5v11" stroke="#eeeade" strokeWidth="2"/>}</g>}
    {has("Ceinture")&&<><path d="M68 198h85" stroke={c} strokeWidth="6"/><rect x="103" y="193" width="14" height="10" fill="none" stroke="#eeeade" strokeWidth="2"/></>}
    {has("Bijoux")&&<><path d="M94 126q16 28 32 0" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="110" cy="145" r="4" fill={c}/><circle cx="78" cy="95" r="3" fill={c}/><circle cx="142" cy="95" r="3" fill={c}/></>}
    {has("Broche")&&<path d="M135 140l4 6-4 6-4-6z" fill={c}/>}
    {has("Montre", "Bracelet lumineux")&&<><rect x="151" y="198" width="19" height="5" rx="2" fill={c}/><circle cx="162" cy="200" r="4" fill={has("Bracelet lumineux")?data.lightColor:c}/></>}
    {has("Cravate")&&<path d="M106 133h8l4 45-8 7-8-7z" fill={c}/>}
    {glasses&&<g fill="none" stroke={c} strokeWidth="2.3"><rect x="84" y="73" width="22" height="18" rx="5"/><rect x="115" y="73" width="22" height="18" rx="5"/><path d="M106 80h9m-31 0h-7m60 0h7"/></g>}
    {has("Visière")&&<path d="M79 69h63l-3 25H82z" fill={data.lightColor} fillOpacity=".4" stroke={c} strokeWidth="2"/>}
    {has("Casque audio")&&<><path d="M71 83V62q0-35 39-35t39 35v21" stroke={c} strokeWidth="5" fill="none"/><rect x="68" y="74" width="12" height="24" rx="4" fill={c}/><rect x="141" y="74" width="12" height="24" rx="4" fill={c}/></>}
    {has("Couronne")&&<path d="M79 47l-3-26 18 13 16-20 16 20 18-13-3 26z" fill={c} stroke="#eeeade88" strokeWidth="1.5"/>}
    {has("Chapeau de paille", "Chapeau feutre")&&<><path d="M79 40l7-24h48l8 24z" fill={c}/><ellipse cx="110" cy="42" rx="51" ry="8" fill={c}/><path d="M82 33h57" stroke="#283b2d" strokeWidth="5"/></>}
    {has("Béret")&&<><ellipse cx="108" cy="30" rx="37" ry="14" fill={c}/><path d="M105 17l3-8" stroke={c} strokeWidth="4"/></>}
    {has("Toque")&&<><path d="M85 43V20q-13-21 7-20 18-11 25 3 25-4 21 19v21z" fill="#eeeade"/><path d="M85 36h52" stroke={c} strokeWidth="3"/></>}
    {has("Ruban")&&<path d="M140 40l-15-12v25l15-9 14 10V28z" fill={c}/>}
    {has("Fleur")&&<g fill={c}>{[0,72,144,216,288].map(a=><ellipse key={a} cx="145" cy="43" rx="5" ry="9" transform={`rotate(${a} 145 50)`}/>)}<circle cx="145" cy="50" r="4" fill="#efd28b"/></g>}
    {has("Carnet")&&<><rect x="36" y="200" width="19" height="26" rx="2" fill={c} transform="rotate(-12 45 210)"/><path d="M39 205l2 17m3-16 9-2" stroke="#eeeade" strokeWidth="1.5"/></>}
    {has("Palette")&&<g><path d="M38 189q-21 4-13 26 9 15 22 1l3-15q3-13-12-12z" fill={c}/>{["#c57469","#ddbd72","#7daf91"].map((color,i)=><circle key={color} cx={31+i*4} cy={199+i*6} r="3" fill={color}/>)}</g>}
    {has("Instrument")&&<><ellipse cx="39" cy="222" rx="15" ry="19" fill={c}/><path d="M36 212l6-43h8l-7 46" fill={c}/><circle cx="39" cy="220" r="5" fill="#243028"/></>}
    {has("Note musicale")&&<g stroke={c} strokeWidth="3" fill={c}><path d="M177 161v-26l14-4v23" fill="none"/><ellipse cx="173" cy="162" rx="5" ry="3"/><ellipse cx="187" cy="154" rx="5" ry="3"/></g>}
    {has("Gourde", "Fiole")&&<><rect x="40" y="207" width="15" height="24" rx="5" fill={c}/><rect x="44" y="200" width="7" height="8" fill={c}/><path d="M44 221h7" stroke="#eeeade" strokeWidth="2"/></>}
    {has("Boussole")&&<><circle cx="67" cy="188" r="11" fill={c}/><path d="M65 181l6 13-9-5z" fill="#22382b"/></>}
    {has("Hologramme")&&<g fill="none" stroke={data.lightColor} strokeWidth="1.5" opacity=".8"><path d="M175 164l14-9 14 9v20l-14 9-14-9zM175 164l14 8 14-8m-14 8v21"/><ellipse cx="189" cy="200" rx="18" ry="4"/></g>}
  </g>;
}

function HumanoidHead({data,manga}:{data:Character;manga:boolean}){
 const long = data.hairLength === "Très longs" ? 194 : data.hairLength === "Longs" ? 153 : data.hairLength === "Mi-longs" ? 119 : 91;
 const attached = /cheval|attachés|tresses/i.test(data.haircut);
 const hairVisible = data.haircut !== "Rasés";
 const eyeWide = manga || data.eyeShape === "Amande";
 const eyeR = data.eyeShape === "Fins" ? 3 : manga ? 9 : 3.5;
 const eyebrowY = manga ? 69 : 75;
 const brows = data.brows === "Droits" ? "M87 69h16m14 0h16" : data.brows === "Épais" ? "M87 69q8-5 16 0m14 0q8-5 16 0" : "M87 69q8-3 16 0m14 0q8-3 16 0";
 return <g className="avatar-head">
  {hairVisible&&<g className="avatar-hair" fill={data.hair}>
    {!attached && long>100&&<path d={`M73 65q-3-39 37-39t37 39l7 ${long-65}q-14 15-32-3l-12 5-12-5q-20 18-32 3z`}/>}
    {attached&&<path d={data.haircut==="Tresses"?`M143 58q26 5 10 ${long-45}l-13-2q17-63-2-89z`:`M137 42q35-9 34 24l-13 ${long-70}q-16 3-9-20l4-45z`}/ >}
    {data.haircut==="Tresses"&&[83,99,115,131].filter(y=>y<long).map(y=><path key={y} d={`M146 ${y}l11 7-11 7`} stroke={data.highlightColor} strokeWidth="2" fill="none"/>)}
  </g>}
  <path d="M96 103h28v26l-14 14-14-14z" fill={data.skin}/>
  {manga?<path d={data.appearance==="Douce"?"M78 61q2-29 32-29t32 29v32q-8 22-32 28-24-6-32-28z":"M79 61q2-29 31-29t31 29v31l-12 20-19 12-19-12-12-20z"} fill={data.skin} stroke="#332e2f" strokeWidth="1.3"/>:<ellipse cx="110" cy="78" rx={data.appearance==="Anguleuse"?30:data.appearance==="Douce"?37:34} ry={data.appearance==="Douce"?37:39} fill={data.skin}/>}
  <ellipse cx="78" cy="82" rx="5" ry="9" fill={data.skin}/><ellipse cx="142" cy="82" rx="5" ry="9" fill={data.skin}/>
  {hairVisible&&<g className="avatar-hair" fill={data.hair}>
    <path d={data.haircut==="Bouclés"?"M75 66q-12-12 0-20-5-17 13-15 9-15 21-5 16-12 23 3 20 0 16 17 13 12-4 23l-10-14-16-7-27 10z":data.haircut==="Anime effilé"?"M71 73l-5-25 13 2 4-24 13 7 12-17 14 13 17-7 2 16 16 10-9 28-15-17-6 9-10-19-11 17-6-14-15 23z":data.haircut==="Carré"?"M74 112V62q-2-34 36-35 39 2 37 36v49h-14V58l-22 7-22-9v56z":data.haircut==="Détachés"||data.haircut==="Longs"?"M75 101V64q0-37 35-37t35 37v58l-17-6V61q-31 11-37-3v50z":"M76 67q-4-36 34-37 39 1 34 37l-10-11q-21 8-39-4z"}/>
    {data.fringe==="Droite"&&<path d="M79 49h62v18H79z"/>}
    {data.fringe==="Latérale"&&<path d="M80 44l59 8-46 26z"/>}
    {data.fringe==="Effilée"&&<path d="M80 50h58l-10 27-9-13-10 15-9-16-11 12z"/>}
    {data.hairTexture!=="Lisse"&&<path d={data.hairTexture==="Bouclée"?"M82 45q10-15 12 0t12 0t12 0t12 0M80 54q10-12 12 0t12 0t12 0t12 0":"M81 42q17 16 48-3M80 51q17 16 51-3"} stroke={data.highlightColor} strokeOpacity=".5" strokeWidth="1.5" fill="none"/>}
    {data.highlights&&<path d="M90 39q14 0 16 22m15-26 13 18" stroke={data.highlightColor} strokeWidth="5" strokeLinecap="round" fill="none"/>}
  </g>}
  <g transform={`translate(0 ${eyebrowY-69})`}><path d={brows} stroke={data.hair} strokeWidth={data.brows==="Épais"?4:2} fill="none" strokeLinecap="round"/></g>
  <g className="avatar-eyes">
    {[96,124].map(x=><g key={x}>
      {eyeWide&&<ellipse cx={x} cy="84" rx={manga?11:7} ry={manga?13:5} fill="#fbf8ec" stroke="#343036" strokeWidth={manga?1.5:1}/ >}
      <ellipse cx={x} cy="85" rx={eyeR} ry={manga?(data.eyeShape==="Fins"?5:10):data.eyeShape==="Fins"?1.5:eyeR} fill={data.eyeColor}/>
      <circle cx={x} cy="85" r={manga?4:1.6} fill="#20232a"/>
      <circle cx={x-2} cy={manga?81:83} r={manga?2.6:.8} fill="#fff"/>
      {manga&&<path d={`M${x-11} 77q10-7 21 1`} stroke="#302e36" strokeWidth="2" fill="none"/>}
    </g>)}
  </g>
  <path d={data.nose==="Fin"?"M110 88l-2 9 4 1":data.nose==="Arrondi"?"M107 91q-4 9 6 8":"M110 88l-3 9h6"} fill="none" stroke="#795746" strokeWidth={manga?1:1.6}/>
  <path d={data.lipShape==="Sourire"?"M102 105q8 6 16 0":data.lipShape==="Pulpeuses"?"M101 106q9-7 18 0-9 9-18 0z":"M104 107h12"} fill={data.lipShape==="Pulpeuses"?data.lipColor:"none"} stroke={data.lipColor} strokeWidth={data.lipShape==="Pulpeuses"?1:2} strokeLinecap="round"/>
  {data.makeup!=="Aucun"&&<><ellipse cx="86" cy="98" rx="7" ry="3" fill={data.lipColor} opacity=".3"/><ellipse cx="134" cy="98" rx="7" ry="3" fill={data.lipColor} opacity=".3"/>{data.makeup==="Eyeliner"&&<path d="M84 77l-4-3m56 3 4-3" stroke="#2b242b" strokeWidth="2"/>}</>}
  {data.faceDetail==="Taches de rousseur"&&[87,92,128,133].map((x,i)=><circle key={x} cx={x} cy={97+i%2*3} r="1" fill="#885b45"/>)}
  {data.faceDetail==="Marque anime"&&<path d="M134 99l-5 7 6-2-4 8" stroke={data.accessoryColor} strokeWidth="2" fill="none"/>}
  {data.faceDetail==="Grain de beauté"&&<circle cx="128" cy="103" r="1.5" fill="#755042"/>}
 </g>;
}

function Robot({ data, id }: { data: Character; id: string }) {
 const m=data.metalPrimary, s=data.metalSecondary, glow=data.lightColor;
 const chunky=data.proportions==="Massives"?1.16:data.proportions==="Élancées"?.87:1;
 return <g className="avatar-body robot-body" transform={`translate(${110*(1-chunky)} 0) scale(${chunky} 1)`}>
  <g stroke="#182b2f" strokeWidth="2">
    {data.legs==="Roues"?<><path d="M86 208v47m47-47v47" stroke={s} strokeWidth="11"/><circle cx="85" cy="270" r="18" fill={s}/><circle cx="134" cy="270" r="18" fill={s}/><circle cx="85" cy="270" r="9" fill={m}/><circle cx="134" cy="270" r="9" fill={m}/></>:<><path d="M83 205v75m52-75v75" stroke={s} strokeWidth="17"/><rect x="75" y="220" width="19" height="35" rx={data.legs==="Pistons"?2:8} fill={m}/><rect x="126" y="220" width="19" height="35" rx={data.legs==="Pistons"?2:8} fill={m}/><path d="M71 276h28v14H64q-3-9 7-14m50 0h28q9 4 8 14h-36z" fill={s}/><path d="M84 222v31m52-31v31" stroke={data.legs==="Pistons"?s:glow} strokeWidth="3"/></>}
    <rect x="75" y="124" width="70" height="87" rx="15" fill={`url(#${id})`}/><path d="M95 124v-14h30v14" fill={s}/>
    <circle cx="73" cy="141" r="11" fill={s}/><circle cx="147" cy="141" r="11" fill={s}/>
    <path d="M65 146l-9 42m99-42 9 42" stroke={s} strokeWidth={data.arms==="Renforcés"?22:14}/>
    <circle cx="56" cy="185" r="8" fill={m}/><circle cx="164" cy="185" r="8" fill={m}/>
    <rect x="46" y="189" width={data.arms==="Fins"?14:21} height="31" rx="5" fill={m}/><rect x="154" y="189" width={data.arms==="Fins"?14:21} height="31" rx="5" fill={m}/>
    <path d={data.arms==="Pinces"?"M45 223v11l8 6 10-6v-11m91 0v11l8 6 10-6v-11":"M48 221v10h15v-10m94 0v10h15v-10"} fill="none" stroke={s} strokeWidth="5"/>
    <Outfit data={data} robot/>
    <g className="avatar-head robot-head">
      {data.headShape==="Ronde"?<ellipse cx="110" cy="77" rx="39" ry="37" fill={`url(#${id})`}/>:data.headShape==="Hexagonale"?<path d="M88 39h44l19 20v39l-20 19H89L70 98V59z" fill={`url(#${id})`}/>:<rect x="73" y="38" width="74" height="78" rx={data.headShape==="Capsule"?29:10} fill={`url(#${id})`}/>}
      <rect x="66" y="67" width="8" height="24" rx="3" fill={s}/><rect x="146" y="67" width="8" height="24" rx="3" fill={s}/>
      {data.facePlate==="Écran"?<rect x="81" y="59" width="58" height="39" rx="7" fill="#172c33"/>:data.facePlate==="Grille"?<><rect x="81" y="59" width="58" height="39" rx="3" fill={s}/>{[64,72,80,88].map(y=><path key={y} d={`M85 ${y}h50`} stroke={m}/>)}</>:<path d="M82 61l28-9 28 9v37l-28 8-28-8z" fill={s}/>}
      <g className="robot-lenses" fill={data.eyeColor} stroke="none">
       {data.eyeShape==="Visière"?<rect x="88" y="72" width="44" height="8" rx="3"/>:[96,124].map(x=>data.eyeShape==="Lentilles carrées"?<rect key={x} x={x-6} y="69" width="12" height="12" rx="2"/>:<circle key={x} cx={x} cy="76" r="7"/>)}
      </g>
      <path d="M95 105h30m-22 0v5m14-5v5" stroke={s} strokeWidth="3"/>
      {data.antenna!=="Aucune"&&<g stroke={s} strokeWidth="3" fill={glow}>
       {data.antenna==="Double"?<><path d="M91 40l-7-18m45 18 7-18"/><circle cx="84" cy="21" r="4"/><circle cx="136" cy="21" r="4"/></>:data.antenna==="Crête"?<path d="M95 39l-4-18 13 7 6-17 7 17 14-7-5 18z"/>:data.antenna==="Satellite"?<><path d="M110 40V20"/><path d="M94 14q16 19 32 0" fill={m}/><circle cx="110" cy="15" r="3"/></>:data.antenna==="Holographique"?<><path d="M110 40V28"/><path d="M96 19l14-12 14 12-14 12z" fillOpacity=".3" stroke={glow}/></>:<><path d="M110 39V20"/><circle cx="110" cy="17" r="5"/></>}
      </g>}
    </g>
    {data.mechanics==="Rivets"&&[84,136].flatMap(x=>[135,199].map(y=><circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={s}/>))}
    {data.mechanics==="Engrenages"&&<><circle cx="109" cy="169" r="17" fill="none" stroke={s} strokeWidth="5" strokeDasharray="4 3"/><circle cx="109" cy="169" r="7" fill={s}/></>}
    {/Circuits|Réacteur|Servomoteurs/.test(data.mechanics)&&<path d="M84 157h12v24h12m28-24h-12v24h-12m-28 9h52" stroke={glow} strokeWidth="2" fill="none"/>}
    {data.mechanics==="Pistons renforcés"&&<path d="M79 156v31m62-31v31" stroke={s} strokeWidth="6"/>}
    {data.mechanics==="Plaques gravées"&&<path d="M93 159l17-13 17 13-17 29z" fill="none" stroke={s} strokeWidth="2"/>}
    {data.lights!=="Aucun"&&<g className="robot-glow" fill={glow} stroke="none">
     {data.lights==="Bandes lumineuses"?<path d="M84 152h52v4H84zm0 26h52v4H84z"/>:data.lights==="Constellation"?[96,112,125].map((x,i)=><circle key={x} cx={x} cy={156+i*9} r="4"/>):<><circle cx="110" cy="164" r="12" fill={s}/><circle cx="110" cy="164" r="7" fill={glow}/></>}
    </g>}
    <Accessories data={data}/>
  </g>
 </g>;
}

export function CharacterAvatar({data,compact=false,pose="idle"}:{data:Character;compact?:boolean;pose?:CharacterPose}){
 const id=useId().replace(/:/g,"");
 const type=data.characterType||"Cartoon";
 const manga=type==="Manga";
 const color=data.clothingColor;
 const identityScale=data.gender==="Femme"||data.gender==="Féminin"?.96:1;
 return <svg className={`${compact?"avatar compact":"avatar"} enhanced-avatar type-${type.toLowerCase()}`} viewBox="0 0 220 310" aria-label={`${type} de ${data.name||"votre histoire"}, ${data.clothes}, ${data.eyeShape}`} data-character-type={type} data-pose={pose} data-character-config={JSON.stringify({...data,validated:undefined,stories:undefined,name:undefined})}>
  <title>{type} original · {data.name} · {data.clothes}</title>
  <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor={type==="Robot"?data.metalPrimary:color}/><stop offset="1" stopColor={type==="Robot"?data.metalSecondary:color}/></linearGradient></defs>
  <ellipse cx="110" cy="291" rx="56" ry="8" fill="#000" opacity=".3"/>
  {type==="Robot"?<Robot data={data} id={id}/>:<g className="avatar-body" transform={`translate(${110*(1-identityScale)} 0) scale(${identityScale} 1)`}>
    <g fill={data.skin}><path d="M79 209h25v74H79zm35 0h27v74h-27z"/><path d="M49 204h15v21q-8 10-16 0zm107 0h15l1 21q-8 10-15 0z"/></g>
    <Outfit data={data}/>
    <HumanoidHead data={data} manga={manga}/>
    <Accessories data={data}/>
   </g>}
 </svg>;
}