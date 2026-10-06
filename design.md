# WorldCraft — Design

Application web mobile-first existante, conservée. Mise à jour ciblée du système de personnage : dix routes exclusives, sans 3D ni backend supplémentaire.

Direction validée : sobre et immersive, fond charbon #101411, surfaces olive #1a201b, texte ivoire #eeeade, accents or mat #c3a777. Titres Cormorant Garamond/Georgia et texte Poppins/sans-serif. Emblème orbital et contours topographiques vectoriels ; aucun asset photographique nécessaire.

## Brand & Colors

Variables partagées dans `packages/web/src/web/worldcraft.css`. Cette version concerne uniquement le web adapté au mobile.

| Token | Valeur | Usage |
|-------|--------|-------|
| wc-gold | #c3a777 | Actions et sélections |
| wc-bg | #101411 | Fond |
| wc-surface | #191f1a | Panneaux |
| wc-text | #eeeade | Texte principal |
| wc-muted | #a0a497 | Texte secondaire |
| wc-line | #333a30 | Bordures |

## Typography

Titres serif éditoriaux, labels sans-serif espacés, paragraphes lisibles. Focus doré visible. Animations discrètes avec respect de reduced-motion.

## Pages & Screens

Routes : /, /univers, /destin, /type-personnage, /personnage, /validation-personnage, /histoire, /resume, /chargement, /jeu. Un seul écran monté à la fois dans Worldcraft. Progression et actions communes pour la configuration uniquement.

Le composant `components/worldcraft.tsx` résout la route vers une seule vue exclusive. Accueil centré, configuration dans un cadre de 1080px, cartes univers et destins sélectionnables, résumé en deux colonnes sur ordinateur, monde minimal plein écran. Sur mobile, grille de destins à deux colonnes, formulaires et résumé empilés à l’intérieur de leur seul écran actif. Barre d’actions dégagée du badge de plateforme.

## Key User Flows

1. Accueil inchangé → cinq univers inchangés → vingt destins inchangés → type → personnalisation → validation → styles multiples et résumé existants → chargement → monde existant.
2. Retour et historique fonctionnels, localStorage pour conserver les choix. Résumé modifiable. Validation des choix requis.
3. Monde 2D abstrait, avatar cohérent et six commandes ouvrant des panneaux compacts ; aucune fonctionnalité de gameplay avancée ajoutée.

## Architecture

- **Stack** : managed Bun, React, Vite, Wouter ; infrastructure Hono conservée.
- **État** : React et localStorage, aucun compte ni backend supplémentaire.
- **Navigation** : historique natif, validations de parcours, timer de chargement nettoyé à la sortie.
- **Tests** : Playwright sur 1440x1000, 390x844 et cas limites sur 320x700 ; vérification d’un seul `data-screen` monté.

## Mise à jour ciblée — personnage

Robot réellement mécanique (tête, panneau facial, lentilles, articulations, antennes et lumières), Cartoon conservant les proportions et traits de l’avatar original, Manga original avec visage anguleux, grands yeux et cheveux anime. Rendu SVG cohérent avec la base existante, partagé entre aperçu, validation, résumé et jeu. Idle différencié et clignement, désactivés avec reduced-motion ; API de pose préparée sans créer de déplacement.

Éditeur à onglets locaux (identité, visage, cheveux, vêtements, accessoires ou structure/lumières robot) avec aperçu principal visible. Sur mobile, aperçu sticky compact et options séparément accessibles ; aucun panneau plein écran. Les champs sont réellement reliés au rendu. Couleurs personnalisables, accessoires cumulables. Catalogue extensible par univers, enrichissements facultatifs par destin et type ; aucune tenue professionnelle forcée.

Conserver exactement l’accueil, les cartes d’univers, les destins, le contenu des styles d’histoire, le CSS global, le monde et les six commandes de jeu. Modifications du conteneur limitées à l’ordre des routes, aux contrôles de validation et au composant d’avatar partagé. Les anciennes sauvegardes sont migrées vers Cartoon sans perdre nom, univers, destin, apparence ni styles.
