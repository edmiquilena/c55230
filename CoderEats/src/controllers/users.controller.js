import jwt from "jsonwebtoken";
import * as UsersService from "../services/user.service.js";
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await UsersService.LoginUser(email, password);
    const token = jwt.sign(
      { user: userLogin, sub: userLogin._id },
      "SUPERSECRETO"
    );

    res.send({ error: false, accessToken: token });
  } catch (e) {
    res.status(401).send({ error: true, msg: e.message });
  }
};

export const UserRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newUser = await UsersService.RegisterUser({ email, password, name });
    const token = jwt.sign({ user: newUser, sub: newUser._id }, "SUPERSECRETO");

    res.send({ error: false, accessToken: token });
  } catch (e) {
    res.send({ error: true, msg: e.message });
  }
};

export const UserGetMe = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const isJWT = await jwt.verify(token, "SUPERSECRETO");

    const user = await UsersService.GetUserById(isJWT.sub);
    res.send({ error: false, user });
  } catch (e) {
    res.send({ error: true, msg: e.message });
  }
};
