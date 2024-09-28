"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = void 0;
const joi_1 = __importDefault(require("joi"));
// Schéma de validation pour l'inscription des coachs
const coachSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    bio: joi_1.default.string().required(),
    specializations: joi_1.default.string().required(),
    certifications: joi_1.default.string().optional(),
    experience_years: joi_1.default.number().integer().min(0).optional(),
    phone_number: joi_1.default.string().optional(),
    profile_picture: joi_1.default.string().optional(),
    location: joi_1.default.string().optional(),
});
// Schéma de validation pour l'inscription des clients
const clientSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    weight: joi_1.default.number().precision(2).required(),
    height: joi_1.default.number().precision(2).required(),
    body_fat_percentage: joi_1.default.number().precision(2).optional(),
    muscle_mass: joi_1.default.number().precision(2).optional(),
    phone_number: joi_1.default.string().optional(),
    profile_picture: joi_1.default.string().optional(),
    location: joi_1.default.string().optional(),
});
// Middleware pour valider l'inscription
const validateRegister = (req, res, next) => {
    const { role } = req.body;
    let schema;
    if (role === 'coach') {
        schema = coachSchema;
    }
    else if (role === 'client') {
        schema = clientSchema;
    }
    else {
        res.status(400).json({ error: 'Le rôle doit être soit "coach" soit "client".' });
        return;
    }
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next(); // Continuer si tout est bon
};
exports.validateRegister = validateRegister;
// Validation pour la connexion
const validateLogin = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next(); // Continuer si tout est bon
};
exports.validateLogin = validateLogin;
