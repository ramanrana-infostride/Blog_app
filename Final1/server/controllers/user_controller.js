import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/Token.js";
dotenv.config();

export const signupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = {
      email: request.body.email,
      name: request.body.name,
      password: hashedPassword,
    };
    const newUser = new User(user);
    await newUser.save();
    return response.status(200).json({ msg: "Signed Up Successfully" });
  } catch (error) {
    return response.status(500).json({ msg: "Error While Signing Up" });
  }
};

export const loginUser = async (request, response) => {
  try {
  const { email, password } = request.body;

  let user = await User.findOne({ email });

  if (!user) {
    return response.status(404).json({ msg: "User Not Found" });  
  }

    let isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
      return response
        .status(404)
        .json({ msg: "Please Enter Valid Credentials" });
    }

    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      user.toJSON(),
      process.env.REFRESH_SECRET_KEY
    );

    const newToken = new Token({ token: refreshToken });
    newToken.save();

    return response
      .status(200)
      .json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    console.log(error )
    return response
    .status(500)
    .json({ msg: "Error while log in" });

  }
};
