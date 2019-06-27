import passport from 'passport';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'secret'
}

// passport.use(new JwtStrategy(jwtOptions, async (payload: any, done: any) => {
//   try {
//     const user = await User.findOne({where: {id: payload.id}});
//     	if(!user) {
//         return done(null, false)
//       }
//       done(null, user);  
//   } catch(error) {
//       done(error, false);
//     }
// }));

passport.use(new JwtStrategy(jwtOptions, async (payload: any, done: any) => {
  try {
    const user = await User.findOne({where: {id: payload.id}});
    	if(!user) {
        return done(null, false)
      }
      done(null, user);  
  } catch(error) {
      done(error, false);
    }
}));

// passport.use(new LocalStrategy({usernameField: 'email'}, async (email: any, password: any, done: any) => {
//   try {
//     const user = await User.findOne({where: {email: email}});
//     if(!user) {
//       return done(null, false)
//     } else {
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) throw err;
//             user.password = hash;
//         })
//     })  

//      let passwordMatch = await bcrypt.compare(password, user.password);
//      if (!passwordMatch) {
//       return done(null, false);
//      } else {
//        done(null, user)
//      }
//     }
//   } catch (error) {
//     done(error, false);    
//   }
// }));

export const passportHandler = passport.initialize();