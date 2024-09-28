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
const client_1 = require("@prisma/client");
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const prisma = new client_1.PrismaClient();
// Options pour configurer la stratégie JWT
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraire le token JWT
    secretOrKey: process.env.JWT_SECRET, // Assurez-vous que JWT_SECRET est bien défini dans votre fichier .env
};
// Configuration de la stratégie JWT
passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Chercher l'utilisateur dans la base de données à partir du token JWT
        const user = yield prisma.user.findUnique({
            where: { user_id: jwt_payload.sub },
        });
        // Si l'utilisateur est trouvé, on le renvoie dans la requête
        if (user) {
            return done(null, user);
        }
        else {
            // Si aucun utilisateur n'est trouvé, on renvoie false
            return done(null, false);
        }
    }
    catch (error) {
        // En cas d'erreur, on renvoie l'erreur
        return done(error, false);
    }
})));
exports.default = passport_1.default;
