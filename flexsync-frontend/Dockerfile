# Étape 1 : Utiliser une image Node.js pour le build
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
RUN npm run build

# Étape 2 : Utiliser une image légère pour exécuter l'application
FROM node:20-alpine AS runner

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de build et les dépendances de production
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Exposer le port 3000 pour Next.js
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start"]
