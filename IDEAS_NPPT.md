# NPPT IDEAS

But du projet:
- Faire une presentation "vivante" a partir d'un vrai site Nuxt.
- Eviter de reconstruire tout un deck artificiel.
- Permettre un mode presenter riche et un mode viewer propre.
- Garder une integration legere pour le dev.

## Vision produit

NPPT n'est pas juste:
- un reveal.js like
- ni juste un systeme de spotlight

NPPT peut devenir:
- un mode presentation pour vrai site / portfolio / demo produit
- avec aide orateur, vues differenciees, navigation multi-routes

Le coeur:
- le site reste le site
- la presentation est une couche par-dessus

## Direction UX dev ideale

Le dev final devrait pouvoir choisir son niveau d'integration:

Niveau 1:
- juste annoter:
  - `v-nppt`
  - eventuellement `data-nppt='{}'`

Niveau 2:
- poser 1 ou 2 composants:
  - `NpptLauncher`
  - `NpptPresenter`

Niveau 3:
- utiliser des composants de variation de rendu:
  - `NpptViewerOnly`
  - `NpptPresenterOnly`
  - `NpptFocus`

## Direction UX presentation ideale

Le presenter ne veut pas voir:
- juste un overlay "technique"

Le presenter veut:
- savoir ou il en est
- savoir quoi dire
- savoir ce qui arrive ensuite
- garder conscience de la vue viewer
- garder le rythme

Donc la presenter view ideale contient:
- timer
- titre actif
- note active
- keywords
- preview viewer
- controles steps
- controles pages
- progression globale
- eventuellement "next up"

## Idee forte: double rendu intelligent

Le vrai potentiel est la:
- meme page source
- rendu adapte selon le contexte

Cas concrets:
- sur le site normal:
  - texte complet
  - layout normal
- pendant la presentation viewer:
  - moins de texte
  - image plus grosse
  - composition plus lisible
- pendant la presentation presenter:
  - infos privees
  - notes
  - navigation

Ce point semble plus important a terme que multiplier les `data-*`.

## Components a envisager

### `NpptViewerOnly`
Cas:
- version simplifiee pour le public
- agrandir une image
- montrer une stat plus grosse

### `NpptPresenterOnly`
Cas:
- notes privees
- aide memoire
- checklist

### `NpptFocus`
Cas:
- declarer un bloc important
- centraliser metadata + rendu

### `NpptStep`
Alternative plus structuree que `v-nppt`
- API component plus explicite
- plus simple a typer/documenter

## Metadata possibles a terme

Au-dela de:
- `step`
- `title`
- `note`
- `keywords`
- `next`

On pourrait avoir:
- `prev`
- `section`
- `duration`
- `goalTime`
- `audienceNote`
- `speakerMood`
- `importance`
- `pauseAllowed`
- `viewerVariant`
- `presenterVariant`

## Keywords / aide orateur

Les keywords peuvent evoluer vers:
- nuage libre
- groupe "must say"
- groupe "nice to mention"
- groupe "danger / ne pas oublier"
- tags de rythme
  - intro
  - proof
  - transition
  - closing

Peut-etre plus tard:
- drag and drop dans la vue presenter
- edition live

## Preview viewer

La preview iframe n'est probablement qu'une etape.

Futurs possibles:
- iframe avec mode preview dedie
- renderer simplifie
- mini-map de page
- cadrage automatique autour du focus
- eventuellement preview du "next page"

## Navigation

Aujourd'hui:
- step navigation
- page navigation
- `data-nppt-next`

Demain:
- `data-nppt-prev`
- ordre explicite de presentation
- branching / presentation non lineaire
- "skip optional section"

## Pause mode

Idee a ne pas jeter:
- pause pour couper la presentation
- afficher overlay neutre cote viewer
- masquer temporairement le spotlight
- timer continue ou se freeze selon option

## Ideas docs / DX

README futur a structurer autour de:
- 1. Quick start
- 2. Launcher + Presenter
- 3. `v-nppt`
- 4. navigation multi-routes
- 5. speaker notes / keywords
- 6. components de rendu conditionnel

Exemples utiles a avoir:
- portfolio
- product demo
- case study
- image-heavy presentation

## Idees post-presentation

Apres l'urgence des 4 jours:
- stabiliser API publique
- nettoyer naming
- documenter conventions
- revoir design system presenter
- ajouter tests
- penser a la publication

## Intuition importante

Le vrai angle fort du projet:
- "present your actual website"

Pas:
- "build slides in Nuxt"

Si on garde cette idee centrale, les bons choix semblent etre:
- annotation legere
- composants minimaux
- vue presenter tres utile
- variation de rendu viewer/presenter

