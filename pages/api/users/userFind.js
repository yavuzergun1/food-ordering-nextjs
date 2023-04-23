import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { email },
  } = req;

  if (method === "GET") {
    try {
      const user = await User.findOne({ email });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
};

export default handler;
