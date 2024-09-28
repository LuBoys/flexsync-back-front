"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
// Importer les routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const measurementRoutes_1 = __importDefault(require("./routes/measurementRoutes"));
// Charger les variables d'environnement depuis .env
dotenv_1.default.config({ path: '../.env' });
// Importer la documentation Swagger
const swaggerDocument = require('./swagger/swagger.json'); // Swagger JSON n'a pas besoin d'être typé
const app = (0, express_1.default)();
// Middleware pour analyser les requêtes JSON
app.use(express_1.default.json());
// Initialiser Passport
app.use(passport_1.default.initialize());
// Documentation Swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Routes pour les utilisateurs
app.use(userRoutes_1.default);
// Routes pour les mesures corporelles
app.use('/api/measurements', measurementRoutes_1.default);
app.get('/test', (res) => {
    res.status(400).json({ error: 'test' });
});
// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});
exports.default = app;
