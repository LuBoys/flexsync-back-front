# Utiliser l'image officielle Node.js
FROM node:20 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers Prisma (incluant le schéma)
COPY src/prisma ./prisma/

# Générer les binaires Prisma pour la bonne architecture
RUN npx prisma generate

# Copier tout le reste du projet dans le conteneur
COPY . .

# Exposer le port 5000
EXPOSE 5000

# Démarrer l'application
CMD ["npm", "run", "dev"]
