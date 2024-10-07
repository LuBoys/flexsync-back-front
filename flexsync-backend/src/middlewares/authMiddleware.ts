import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import prisma from '../models/prismaClient'; // Assurez-vous d'importer Prisma

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'default_secret', // Ajoutez une valeur par défaut
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: jwt_payload.sub },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export const authenticateJWT = passport.authenticate('jwt', { session: false });
