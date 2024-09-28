"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const measurementController_1 = require("../controllers/measurementController");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// Route pour ajouter une mesure corporelle (nécessite authentification)
router.post('/add', passport_1.default.authenticate('jwt', { session: false }), measurementController_1.addMeasurement);
// Route pour récupérer l'historique des mesures corporelles d'un utilisateur
router.get('/:user_id', passport_1.default.authenticate('jwt', { session: false }), measurementController_1.getMeasurements);
exports.default = router;
