"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMeasurement = void 0;
const joi_1 = __importDefault(require("joi"));
// Schéma de validation pour ajouter une nouvelle mesure corporelle
const validateMeasurement = (req, res, next) => {
    const schema = joi_1.default.object({
        user_id: joi_1.default.number().required(), // ID de l'utilisateur
        weight: joi_1.default.number().precision(2).optional(), // Le poids peut être fourni, mais n'est pas obligatoire
        body_fat_percentage: joi_1.default.number().precision(2).optional(), // Pourcentage de graisse corporelle optionnel
        muscle_mass: joi_1.default.number().precision(2).optional(), // Masse musculaire optionnelle
        other_metrics: joi_1.default.object().optional(), // Autres mesures (facultatif)
    });
    // Validation des données reçues
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next(); // Passer au middleware suivant si validation réussie
};
exports.validateMeasurement = validateMeasurement;
