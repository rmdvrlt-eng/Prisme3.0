# Mettre Prisme sur GitHub et Vercel

## 1. Créer le dépôt GitHub

1. Ouvrir GitHub et cliquer sur **New repository**.
2. Nom conseillé : `prisme`.
3. Choisir **Private** au début si tu ne veux pas rendre le code public.
4. Ne pas ajouter de README, de licence ou de `.gitignore` : ils sont déjà inclus.

## 2. Envoyer ce projet depuis le navigateur

1. Décompresser `Prisme_GitHub_Officiel.zip` sur ton ordinateur.
2. Dans le dépôt GitHub vide, cliquer sur **uploading an existing file**.
3. Glisser **le contenu du dossier décompressé**, pas le dossier ZIP lui-même.
4. Vérifier que `package.json`, `app`, `components`, `data`, `lib` et `public` apparaissent à la racine.
5. Ajouter le message `Initial Prisme release`, puis cliquer sur **Commit changes**.

## 3. Mettre en ligne avec Vercel

1. Ouvrir Vercel et se connecter avec GitHub.
2. Cliquer sur **Add New > Project**.
3. Sélectionner le dépôt `prisme`.
4. Laisser les réglages détectés automatiquement : Framework **Next.js**.
5. Cliquer sur **Deploy**.

Aucune variable d’environnement n’est requise pour cette version. Les données restent dans le navigateur de chaque utilisateur.

## Lancer sur ordinateur

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Vérifications disponibles

```bash
npm run typecheck
npm run build
```
