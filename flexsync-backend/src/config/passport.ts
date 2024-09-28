import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

// Options pour configurer la stratégie JWT
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraire le token JWT
  secretOrKey: process.env.JWT_SECRET as string, // Assurez-vous que JWT_SECRET est bien défini dans votre fichier .env
};

// Configuration de la stratégie JWT
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // Chercher l'utilisateur dans la base de données à partir du token JWT
      const user = await prisma.user.findUnique({
        where: { user_id: jwt_payload.sub },
      });

      // Si l'utilisateur est trouvé, on le renvoie dans la requête
      if (user) {
        return done(null, user);
      } else {
        // Si aucun utilisateur n'est trouvé, on renvoie false
        return done(null, false);
      }
    } catch (error) {
      // En cas d'erreur, on renvoie l'erreur
      return done(error, false);
    }
  })
);

export default passport;
