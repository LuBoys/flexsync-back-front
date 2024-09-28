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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// Fonction pour l'inscription
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, first_name, last_name, role, bio, specializations, certifications, experience_years, phone_number, profile_picture, location } = req.body;
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Utilisateur déjà existant' });
            return; // On utilise return pour arrêter l'exécution, mais pas pour retourner un objet Response.
        }
        // Hacher le mot de passe
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Créer un nouvel utilisateur
        let newUser;
        if (role === 'coach') {
            newUser = {
                email,
                password_hash: hashedPassword,
                first_name,
                last_name,
                bio,
                specializations,
                certifications: certifications || null,
                experience_years: experience_years || null,
                phone_number: phone_number || null,
                profile_picture: profile_picture || null,
                location: location || null,
            };
        }
        else if (role === 'client') {
            newUser = {
                email,
                password_hash: hashedPassword,
                first_name,
                last_name,
                phone_number: phone_number || null,
                profile_picture: profile_picture || null,
                location: location || null,
            };
        }
        else {
            res.status(400).json({ error: 'Rôle invalide, doit être "coach" ou "client".' });
            return;
        }
        // Insérer l'utilisateur dans la base de données
        const createdUser = yield prisma.user.create({
            data: newUser,
        });
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: createdUser });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.register = register;
// Fonction pour la connexion
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ error: 'Utilisateur non trouvé' });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(400).json({ error: 'Mot de passe incorrect' });
            return;
        }
        // Générer un token JWT
        const token = jsonwebtoken_1.default.sign({ sub: user.user_id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
