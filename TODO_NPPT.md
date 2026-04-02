# NPPT TODO

Contexte rapide:
- Le module NPPT sert a presenter un vrai site Nuxt comme un deck vivant.
- Il existe deux roles actifs:
  - `presenter`
  - `viewer`
- Sans `role`, le module est inactif.
- Le lancement de la presentation se fait via un composant optionnel `NpptLauncher`.
- Le presenter pilote:
  - les steps
  - les routes
  - les infos speaker
- Le viewer suit via `BroadcastChannel`.

Etat actuel stable:
- Sync `presenter` / `viewer` fonctionnelle.
- Navigation steps:
  - `Left` => prev step
  - `Right` => next step
- Navigation pages:
  - `Up` => next page
  - `Down` => prev page
- `data-nppt-next` fonctionne.
- `resetFocus()` remet bien au premier step et recharge les metadonnees du step.
- `v-nppt` existe et est type.
- `data-nppt='{"..."}'` est hydrate cote DOM.
- `NpptPresenter` existe.
- `NpptLauncher` existe et reste optionnel.

Important demain:
- Ne pas casser la stabilite actuelle.
- Priorite au besoin perso de presentation dans 4 jours.
- Eviter gros refacto non necessaire.
- Favoriser les ajouts concrets qui aident vraiment l'orateur.

## Priorites court terme

1. Revoir la presenter view pour qu'elle soit vraiment "presentation-ready"
- Le visuel actuel n'est pas juge assez bon.
- Cible:
  - cards plus propres
  - hiérarchie plus claire
  - meilleur usage de l'espace
  - rendu plus proche Nuxt UI / Tailwind
- Attention:
  - garder `100dvh`
  - garder responsive
  - ne pas casser preview / controls

2. Clarifier l'usage de `Reset` / `Refresh focus`
- Aujourd'hui:
  - `resetFocus()` remet au step 0
  - `refreshDomVisibility()` refait le focus visuel
- A decider:
  - soit renommer le bouton en `Reset to first step`
  - soit ajouter un vrai bouton `Refresh focus`
  - soit garder les deux

3. Travailler la preview viewer
- Aujourd'hui:
  - iframe miniaturisee
- Probleme percu:
  - preview pas encore ideale
- Pistes:
  - meilleur cadrage du viewport
  - centrer sur l'element focus
  - eviter effet "page complete juste scalee"
  - eventuellement mode preview specifique plus tard

4. Continuer la direction "speaker helper"
- Le timer est la, sans style.
- Eventuelles suites:
  - timer objectif
  - temps par section
  - couleur selon depassement

## Priorites fonctionnelles probablement utiles

5. Ajouter `data-nppt-prev`
- Symetrique de `data-nppt-next`
- Permettrait de controler aussi le retour inter-routes
- Evite de dependre uniquement du tri automatique des routes

6. Revoir l'ordre des routes de presentation
- Aujourd'hui:
  - fallback via ordre trie des routes statiques
- A terme:
  - ordre explicite configurable
  - ou derive de `data-nppt-next` / `data-nppt-prev`

7. Ameliorer les keywords
- Ils fonctionnent mais peuvent encore evoluer.
- Pistes:
  - groupes
  - priorites
  - zone "must say"
  - zone "optional"
  - emojis / icones peut-etre plus tard

## Sujet important: double rendu / rendu presentation

8. Les simples `data-nppt-*` ne suffiront probablement pas
- Le besoin reel:
  - modifier le rendu pour la presentation
  - masquer du texte
  - agrandir des images
  - montrer une variante simplifiee pour le viewer
  - garder des aides privees pour le presenter

9. Candidats composants minimaux
- `NpptViewerOnly`
  - rendu uniquement pour `viewer` pendant presentation
- `NpptPresenterOnly`
  - rendu uniquement pour `presenter`
- `NpptFocus`
  - wrapper declaratif pour:
    - step
    - title
    - note
    - keywords
    - next
- Ces composants semblent plus utiles a court terme que d'ajouter trop de `data-*`

10. Repenser `hideOn`
- Constat:
  - `hideOn` seul est faible
- Interet:
  - utile comme mecanisme de variation de rendu
  - pas seulement comme "cache"
- Ne pas le supprimer trop vite
- Le repositionner comme brique dans une logique de double rendu

## Nettoyage / structure

11. Exporter un vrai type public pour `v-nppt`
- Aujourd'hui le typing template fonctionne
- A faire:
  - exporter proprement un type genre `NpptBindingValue`
  - pouvoir l'utiliser dans le code utilisateur

12. Eventuelle augmentation de types pour `$nppt`
- Si pas deja satisfaisant dans IDE, revoir l'autocomplete de l'API exposee

13. Eventuels composants runtime supplementaires
- `NpptCountdown`
- `NpptSpeakerNotes`
- `NpptNextPreview`
- Ne pas faire maintenant sans vrai besoin

## Tests / robustesse

14. Plus tard, quand le besoin presentation immediate sera passe
- tests unitaires sur:
  - parsing `v-nppt`
  - parsing `data-nppt`
  - next/prev page
  - `data-nppt-next`
  - futur `data-nppt-prev`
- tests e2e presenter/viewer

## Questions ouvertes a trancher demain

- Le bouton dans la presenter view doit-il s'appeler:
  - `Reset`
  - `Reset focus`
  - `Back to first step`
?

- Le preview iframe doit-il rester:
  - miniature du viewer complet
  - ou devenir une preview plus "ciblee" autour du focus
?

- Faut-il prioriser:
  - le design de la presenter view
  - ou les composants `ViewerOnly` / `PresenterOnly`
?

- Les keywords doivent-ils rester libres
  - ou etre structures en categories
?

## Rappel usage actuel

Exemple recommande:

```vue
<section
  v-nppt="{
    step: 1,
    title: 'Opening',
    note: 'Welcome the audience',
    next: '/about',
    keywords: [
      { label: 'Welcome', tone: 'info', size: 'xl' },
      { label: 'Context', tone: 'neutral', size: 'md' },
    ],
  }"
/>
```

Composants actuels:
- `NpptLauncher`
- `NpptPresenter`

Composants possibles a creer:
- `NpptViewerOnly`
- `NpptPresenterOnly`
- `NpptFocus`

