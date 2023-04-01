import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method, query: {id} } = req;

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
