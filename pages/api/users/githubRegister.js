import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const inputs = req.body;
  console.log(inputs);
  const user = await User.findOne({ email: inputs.email });
  console.log(user);
  if (!user) {
    try {
      const newUser = await new User(inputs);
      //   password encryption

      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
