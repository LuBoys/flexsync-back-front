"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeasurements = exports.addMeasurement = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Fonction pour ajouter une nouvelle mesure corporelle
const addMeasurement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, weight, body_fat_percentage, muscle_mass, other_metrics } = req.body;
    try {
        // Ajouter une nouvelle mesure pour l'utilisateur
        const measurement = yield prisma.measurement.create({
            data: {
                user_id: parseInt(user_id), // On s'assure que user_id est bien un entier
                weight: weight || null, // Si non fourni, stocker null
                body_fat_percentage: body_fat_percentage || null, // Facultatif
                muscle_mass: muscle_mass || null, // Facultatif
                other_metrics: other_metrics || null, // Facultatif
                date: new Date(), // Date actuelle pour la mesure
            },
        });
        res.status(201).json({ message: 'Mesure ajoutée avec succès', measurement });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addMeasurement = addMeasurement;
// Fonction pour récupérer l'historique des mesures corporelles d'un utilisateur
const getMeasurements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    try {
        // Récupérer toutes les mesures de l'utilisateur, triées par date
        const measurements = yield prisma.measurement.findMany({
            where: { user_id: parseInt(user_id) },
            orderBy: { date: 'asc' }, // Trier par date croissante
        });
        if (!measurements.length) {
            res.status(404).json({ message: 'Aucune mesure trouvée pour cet utilisateur.' });
            return;
        }
        res.status(200).json(measurements);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMeasurements = getMeasurements;
