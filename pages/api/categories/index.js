import Category from "../../../models/Category";
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const categories = await Category.find({});
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      console.log(error);
    }
  }
  if (method === "POST") {
    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json({ success: true, data: newCategory });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
