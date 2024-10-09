import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import prisma from '../models/prismaClient'; // Assurez-vous d'importer Prisma

// Options pour la stratégie JWT
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'default_secret', // Utiliser une clé par défaut si JWT_SECRET n'est pas défini
};

// Interface pour représenter la structure des rôles de l'utilisateur
interface UserRole {
  role: {
    role_name: string;
  };
}

// Définir la stratégie JWT avec Passport
passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      // Rechercher l'utilisateur dans la base de données avec ses rôles
      const user = await prisma.user.findUnique({
        where: { user_id: jwt_payload.sub },
        include: {
          userRoles: { include: { role: true } },  // Inclure les rôles associés
        },
      });

      if (user) {
        // Créer un objet utilisateur avec les rôles extraits
        const userWithRole = {
          ...user,
          roles: user.userRoles.map((userRole: UserRole) => userRole.role.role_name),  // Extraire les noms de rôle
        };
        return done(null, userWithRole);  // Retourner l'utilisateur avec les rôles associés
      } else {
        return done(null, false);  // Si l'utilisateur n'est pas trouvé, retourner false
      }
    } catch (error) {
      return done(error, false);  // Gérer les erreurs et retourner false
    }
  })
);

// Middleware pour authentifier les requêtes avec JWT
export const authenticateJWT = passport.authenticate('jwt', { session: false });
