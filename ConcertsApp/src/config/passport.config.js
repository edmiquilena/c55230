import passport from "passport";
import local from "passport-local";
import UserManager from "../dao/mongo/userManager.js";
import GithubStrategy from "passport-github2";

import jwt from "passport-jwt";
import { SECRET } from "../utils/jwt.js";

const JWTStrategy = jwt.Strategy;

const User = new UserManager();
local.Strategy;
// * => username, password
const InitLocalStrategy = () => {
  // * register
  passport.use(
    ///* ||
    //*  \/
    "register",
    new local.Strategy(
      {
        passReqToCallback: true,
        // usernameField: 'email'
      },
      async (req, username, password, done) => {
        const userExists = await User.getUsuarioByName(username);

        if (userExists) return done(null, false);

        const { nombre, apellido } = req.body;

        const user = await User.crearUsuario({
          nombre,
          apellido,
          username,
          password,
          role: username == "admincoder@coder.com" ? "admin" : "user",
        });

        return done(null, user.toObject());
      }
    )
  );

  // * login
  passport.use(
    "login",
    new local.Strategy(
      {
        passReqToCallback: true,
        // usernameField: 'email'
      },
      async (req, username, password, done) => {
        const user = await User.validarUsuario(username, password);
        console.log(user);
        if (!user) return done("credenciales no validas!");

        return done(null, user);
      }
    )
  );

  // passport.use(
  //   "github",
  //   new GithubStrategy(
  //     {
  //       clientID: "",
  //       clientSecret: "",
  //       callbackURL: "http://localhost:8081/api/auth/callback",
  //     },
  //     async (accessToken, refreshToken, profile, done) => {
  //       // profile => el usuario
  //       console.log(profile);
  //       const username = profile._json.login;
  //       // profile._json;

  //       const user = await User.getUsuarioByName(username);

  //       if (user) return done(null, user);

  //       const userCreate = await User.crearUsuario({
  //         nombre: profile._json.name.split(" ")[0],
  //         apellido: profile._json.name.split(" ")[1],
  //         username,
  //         email: profile._json.email,
  //         password: "",
  //         role:
  //           profile._json.email == "admincoder@coder.com" ? "admin" : "user",
  //       });

  //       // {
  //       //   password: '',

  //       // }
  //       done(null, userCreate);
  //     }
  //   )
  // );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        //    jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtrator]),
        jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET,
      },
      async (payload, done) => {
        console.log(payload);
        const user = await User.getUserById(payload.sub);
        if (!user) return done("credenciales no validas!");

        return done(null, user);
      }
    )
  );
  // req.user

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.getUserById(id);
      done(null, user);
    } catch (e) {
      done(null, false);
    }
  });
};
export default InitLocalStrategy;
