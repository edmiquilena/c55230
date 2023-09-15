import passport from "passport";

// => unauthorized
// passport.authenticate("jwt", { session: false })
// passportMW("jwt)");
const passportMW = (strategy) => async (req, res, next) => {
  console.log(req.headers);
  passport.authenticate(strategy, (err, user, info) => {
    if (err) next(err);
    if (!user) {
      return res.status(401).send({
        error: true,
        msg: info.messages ? info.messages : info.toString(),
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};
export default passportMW;
