import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  res.status(200).json({ message: "You did it man!" });
  req
};
export default handler;
