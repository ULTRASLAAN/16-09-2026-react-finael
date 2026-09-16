# AutoTrust

AutoTrust est une interface locale de vérification et d'importation de véhicules. Elle aide un acheteur à rassembler les preuves disponibles, repérer les incohérences et estimer le coût réel d'un véhicule importé.

## Fonctionnalités

- Tableau de bord avec dossiers récents, activité et niveau de complétude.
- Liste des véhicules et favoris avec données mockées locales.
- Dossier détaillé dynamique : documents, statut, chronologie kilométrique et anomalies à examiner.
- Formulaire contrôlé avec validation, messages d'erreur, `useReducer` et `useContext`.
- Simulateur d'importation Allemagne/Belgique/Espagne/etc. vers la France.
- Routage React Router : accueil, véhicules, détail dynamique, ajout, importation et 404.
- Responsive desktop/mobile, composants réutilisables, React Profiler et cartes mémorisées.

## Démarrer

```bash
npm install
npm run dev
```

L'application est alors disponible sur `http://localhost:5173`.

## Qualité

```bash
npm run test
npm run lint
npm run build
```

Les tests utilisent Vitest, jsdom et Testing Library. Toutes les données sont locales : aucune API ni clé secrète n'est nécessaire.

## Déploiement HTTPS

Le dossier `dist/` est généré par `npm run build`. Il peut être déployé sur Vercel, Netlify ou GitHub Pages. Ces plateformes servent automatiquement le site en HTTPS. Pour Vercel : importer le dépôt, conserver `npm run build` comme commande de build et `dist` comme sortie. Pour Netlify, utiliser la même commande avec `dist` comme dossier de publication.

## Organisation

- `src/components` : composants d'interface réutilisables.
- `src/context` : état global, actions et reducer immuable.
- `src/pages` : écrans et parcours métier.
- `src/data.ts` : données de démonstration typées.
- `src/App.test.tsx` : tests des parcours essentiels.
