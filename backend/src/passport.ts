import passport from 'passport';
import User from './models/user.model';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'secret'
}

passport.use(new JwtStrategy(jwtOptions, async (payload: any, done: any) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

export const passportHandler = passport.initialize();