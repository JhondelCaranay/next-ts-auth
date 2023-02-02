import { NextApiRequest, NextApiResponse } from "next";
import { MongoError } from "mongodb";
import User from "@/model/User";
import * as argon2 from "argon2";

export default class UserController {
  async createUser(req: NextApiRequest, res: NextApiResponse) {
    const { username, email, password } = req.body;
    console.log({
      username,
      email,
      password,
    });

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please add all the fields" });
    }

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ error: "User already exists with that email" });
      }

      // hash
      const hash = await argon2.hash(password);

      const newUser = await User.create({
        username,
        email,
        password: hash,
      });

      const userObj: {
        id: string;
        username: string;
        email: string;
      } = {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      };

      res.status(201).json({
        message: "User Created Successfully",
        user: userObj,
      });
    } catch (error) {
      if (error instanceof MongoError) {
        console.log(error.message);
        res.status(404).json({ message: "Error While Fetching Data" });
      }
    }
  }
}
