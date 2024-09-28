# Utilise l'image officielle Node.js
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le fichier .env dans le conteneur
COPY .env .env

# Copier tout le projet dans le conteneur
COPY . .

# Exposer le port 5000
EXPOSE 5000

# Démarrer l'application
CMD ["npm", "run", "dev"]
