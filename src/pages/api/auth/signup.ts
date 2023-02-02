import UserController from "@/controller/UserController";
import connectionDb from "@/lib/database/connectionDb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectionDb().catch((err) =>
    res.status(500).json({ status: 500, error: "Internal Server Error", message: err })
  );
  // get, post , patch, delete
  const { method } = req;
  const controller = new UserController();

  switch (method) {
    // case "GET":
    //   res.status(200).json({ message: "Signup Get Request" });
    //   break;
    case "POST":
      await controller.createUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
