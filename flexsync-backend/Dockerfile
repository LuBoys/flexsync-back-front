# Étape 1 : Utiliser une image Node.js pour l'installation des dépendances et la génération
FROM node:20 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances (avec npm ci pour garantir l'installation correcte des versions lockées)
RUN npm ci

# Copier les fichiers Prisma
COPY src/prisma ./prisma/

# Générer les binaires Prisma
RUN npx prisma generate

# Copier le reste du projet
COPY . .

# Compiler le projet TypeScript dans le dossier dist
RUN npm run build

# Étape 2 : Utiliser une image légère pour la production
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier uniquement les fichiers nécessaires pour exécuter l'application
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Exposer le port de l'application
EXPOSE 5000

# Démarrer l'application en production
CMD ["node", "dist/server.js"]
