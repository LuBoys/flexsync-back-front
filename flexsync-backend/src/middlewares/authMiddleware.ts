import passport from 'passport';

// Middleware pour authentifier les requêtes avec JWT
export const authenticateJWT = passport.authenticate('jwt', { session: false });
