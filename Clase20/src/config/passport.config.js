import passport from "passport";
import local from "passport-local";
import UserManager from "../dao/mongo/userManager.js";
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

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.username);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.getUsuarioByName(id);
      done(null, user);
    } catch (e) {
      done(null, false);
    }
  });
};
export default InitLocalStrategy;
