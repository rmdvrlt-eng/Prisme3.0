# Prisme — Dépôt officiel GitHub (v3.3)

Application Next.js mobile-first d’exploration psychologique ludique et immersive. Cette version est exécutable et déployable sur Vercel.

## Inclus

- 150 questions réparties en 8 territoires
- embranchements adaptatifs
- scoring prudent avec niveaux de confiance
- onboarding et consentement explicite
- réponses « aucune ne me correspond »
- favoris, reprise automatique et historique local
- avatar psychologique animé
- 8 illustrations originales locales
- 8 paysages sonores originaux locaux
- saisons psychologiques et archétypes métaphoriques
- carte intérieure radar
- exercices personnalisés
- journal émotionnel
- thème clair/sombre
- options d’accessibilité pour mouvements, son, haptique et halos
- PWA et fonctionnement hors ligne après première visite
- export du rapport en PDF via impression

## Installation

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Déploiement

Importer le dossier dans GitHub puis connecter le dépôt à Vercel.

## Limites

Prisme est un outil exploratoire non médical. Il ne pose aucun diagnostic et ne remplace pas une évaluation professionnelle.

## Validation technique

- `npm run build` réussi avec Next.js 16.2.10
- vérification TypeScript réussie
- démarrage production vérifié
- réponse HTTP 200 vérifiée sur la page d’accueil
- 150 questions confirmées dans la banque

## Nouveautés 2.1 — moteur du monde

- état persistant du monde dans le navigateur
- croissance du Jardin selon les réponses, la créativité et le journal
- Fleuve influencé par la mémoire et les rapports
- ciel influencé par le sens et la pensée symbolique
- montagnes influencées par la structure et la mise en action
- brume influencée par l’anxiété et la rumination déclarées
- ouverture progressive des huit territoires
- monde recalculé après chaque rapport et chaque entrée du journal

## Nouveautés 2.2 — World + Light Engine

- vieillissement doux du monde pendant les absences
- nombre de visites et mémoire lumineuse persistants
- cycle aube, jour, crépuscule et nuit basé sur l’heure locale
- saisons visuelles basées sur la date locale
- soleil mobile, étoiles, nuages, brume et reflets animés
- végétation et fleurs générées à partir du Jardin et du journal
- zones interactives expliquant les métaphores du paysage
- accessibilité conservée via le mode animations réduites

## Étape 2 — Narrative Engine 2.4

- synchronisation automatique des entrées du journal en graines
- transformation de chaque rapport en stèle persistante
- ajout manuel de créations sous forme de constellations
- galerie filtrable et consultation détaillée des souvenirs
- favoris « garder près du feu »
- suppression contrôlée des créations manuelles
- traces visibles directement dans le paysage
- données stockées uniquement dans le navigateur


## Narrative Engine 2.4

- questions intégrées comme événements du monde
- choix présentés comme chemins symboliques
- réaction visuelle avant le passage à la question suivante
- transformations : croissance, lumière, courant, pierre, brume, étoiles, feu et pont
- historique persistant des chemins parcourus
- interface plein écran contemplative pendant la passation

## Étape 4 — Psychology Engine 2.5

- séparation explicite entre observations, hypothèses et sujets à explorer avec un professionnel
- niveau de confiance par affirmation
- traçabilité vers les questions et réponses contributrices
- affichage des contributions positives ou négatives
- explications alternatives pour éviter les conclusions uniques
- anciennes passations conservées avec un message lorsque la traçabilité n’était pas encore enregistrée

## Étape 5 — Companion Engine 2.6

- compagnon local fondé uniquement sur les affirmations traçables du rapport
- réponses accompagnées des observations et preuves utilisées
- refus explicite des diagnostics et conclusions non soutenues
- questions de réflexion lorsque les données sont insuffisantes
- historique local effaçable
- aucun appel réseau ni modèle externe

## Étape 6 — Companion Presence Engine 2.8

- paysage sonore intégralement synthétisé dans le navigateur avec Web Audio
- aucune boucle musicale ni ressource audio distante
- harmonie propre à chacun des huit territoires
- rythme influencé par le Fleuve et la saison
- graves influencés par les Montagnes
- harmoniques influencées par le Ciel
- souffle et filtrage influencés par la Brume et la nature sauvage
- variations selon l’aube, le jour, le crépuscule et la nuit
- transitions sonores progressives entre les territoires
- volume mémorisé localement et arrêt complet du moteur à la fermeture


## Companion Presence Engine 2.8

- présence intégrée directement au monde plutôt qu’un chatbot permanent
- apparitions limitées à une fois tous les trois jours
- déclenchement uniquement sur un changement traçable : comparaison de rapports, tendance du journal, retour après absence, territoire ouvert ou jalon de parcours
- aucune apparition lorsque les données sont insuffisantes
- source et détail du déclenchement consultables
- signatures mémorisées pour éviter les répétitions
- possibilité de laisser partir immédiatement l’observation
- aucune affirmation diagnostique et aucune donnée externe

## Étape 8 — House Engine 2.9

- Maison réellement explorable depuis le monde
- sept pièces définitives : Bibliothèque, Atelier, Serre, Grenier, Salon, Balcon et Cave
- Bibliothèque reliée aux rapports enregistrés
- Atelier relié aux créations manuelles et à leur territoire symbolique
- Serre reliée aux entrées du journal
- Grenier réservé aux traces anciennes de plus de trente jours
- Salon alimenté par les souvenirs épinglés « près du feu »
- Balcon présentant l’état métaphorique actuel du monde
- Cave accueillant volontairement les entrées plus lourdes sans les qualifier ni les effacer
- mémoire locale des pièces visitées

## Territory Engine 3.0

- huit territoires réellement visitables depuis le monde
- verrouillage fondé sur la progression persistante
- atmosphère, palette et état symbolique propres à chaque lieu
- souvenirs filtrés et affichés dans leur territoire d’origine
- compteur local des visites par territoire
- accès direct au parcours psychologique correspondant
- lieux en sommeil visibles mais non accessibles avant leur ouverture

## Version 3.2 — Mobile-first & River Gameplay

- interface recalibrée pour téléphone et tablette
- zones tactiles de 48 px minimum
- cadrage vertical du Jardin
- commandes au pouce et respect des zones sûres iOS
- Fleuve interactif avec progression horizontale
- souvenirs visibles comme reflets
- première question relationnelle intégrée au décor
- mise en page tablette dédiée


## Forest Gameplay Engine 3.3

- Forêt jouable en plein écran mobile et tablette
- déplacement tactile par glissement, commandes au pouce et clavier
- quatre lieux interactifs : clairière, pierres, bosquet et cabane
- habitudes, clarté du sentier et repos conservés localement
- souvenirs de la Forêt visibles comme des lueurs dans le décor
- première question du quotidien intégrée au sentier

## Étape 3 — Pixel match
Accueil aligné visuellement sur la maquette de référence avec hotspots interactifs et animations atmosphériques.


## Cumulative realism pass 12

- real local-time light cycle
- progressive cloud and rain atmosphere
- deeper animated water with glints and layered waves
- seasonal color response
- mobile density reduction and reduced-motion support
