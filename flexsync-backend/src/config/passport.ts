import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

const prisma = new PrismaClient();

// Options pour configurer la stratégie JWT
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraire le token JWT
  secretOrKey: process.env.JWT_SECRET_KEY as string, // Assurez-vous que JWT_SECRET_KEY est bien défini dans votre fichier .env
};

// Interface pour représenter la structure des rôles de l'utilisateur
interface UserRole {
  role: {
    role_name: string;
  };
}

// Configuration de la stratégie JWT
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // Chercher l'utilisateur dans la base de données à partir du token JWT
      const user = await prisma.user.findUnique({
        where: { user_id: jwt_payload.sub },
        include: {
          userRoles: { include: { role: true } }, // Inclure les rôles associés
        },
      });

      if (user) {
        // Extraire les rôles et les ajouter à l'utilisateur
        const userWithRoles = {
          ...user,
          roles: user.userRoles.map((userRole: UserRole) => userRole.role.role_name), // Extraire les noms de rôle
        };
        return done(null, userWithRoles); // Retourner l'utilisateur avec les rôles associés
      } else {
        return done(null, false);
      }
    } catch (error) {
      // En cas d'erreur, on renvoie l'erreur
      return done(error, false);
    }
  })
);

export default passport;
 