import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const Signup = async (req, res) => {
  try {
    console.log("hi");
    const { fullName, username, password, confirmPassword, gender } = req.body;
    console.log(password);
    console.log(confirmPassword);
    if (!fullName || !username || !password || !confirmPassword || !gender)
      return res.status(401).json({ message: "All Fields Are Required!" });
    if (password != confirmPassword)
      return res.status(401).json({ message: "Passwords Don't Match" });

    const user = await User.findOne({ username });
    if (user)
      return res.status(401).json({ message: "Username Already Exists" });
    //   HASH PASS
    const hash = await bcrypt.hash(password, 10);
    const boyprofile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlprofile = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = await User.create({
      fullName,
      username,
      password: hash,
      gender,
      profilePic: gender === "male" ? boyprofile : girlprofile,
    });
    await newUser.save();
    return res.status(200).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json(err);
  }
};

export const Login = async (req, res) => {
  console.log("hi");
  try {
    const { username, password } = req.body;
    console.log("username", username, "password", password);
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ message: "User Not Found" });
    console.log("pass user", user.password);
    let comparePassword = await bcrypt.compare(password, user.password);
    console.log("compar", comparePassword);
    if (!comparePassword)
      return res.status(402).json({ message: "Password not Correct!" });
    // Create Token

    const accesstoken = jwt.sign(
      {
        userid: user._id,
      },
      "jwt-access-token-secret-key",
      {
        expiresIn: "1d",
      }
    );
    // Refresh Token
    const refreshToken = jwt.sign(
      { userid: user._id },
      "jwt-refresh-token-secret-key",
      {
        expiresIn: "7d",
      }
    );
    // console.log("accesstoken", accesstoken);
    // console.log("refreshtoken", refreshToken);
    // Set Access Token in cookie
    res.cookie("accessToken", accesstoken, {
      maxAge: 1000 * 60 * 60 * 24,
    });

    // Set Refresh Token in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    console.log(user);
    res.status(200).json({ user });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json(err);
  }
};

export const Logout = (req, res) => {
  try {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json("User has been logged out.");
    window.location.href("/login");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  // console.log("req.cookies", req.cookies);

  if (!refreshToken) return res.json({ valid: false, message: "No Token" });

  jwt.verify(refreshToken, "jwt-refresh-token-secret-key", (err, decoded) => {
    if (err) return res.json({ valid: false, message: "INVALID" });
    delete decoded.iat;
    delete decoded.exp;
    const newAccessToken = jwt.sign(decoded, "jwt-access-token-secret-key", {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(decoded, "jwt-refresh-token-secret-key", {
      expiresIn: "7d",
    });
    res.cookie("accessToken", newAccessToken, { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json({ valid: true });
  });
};
