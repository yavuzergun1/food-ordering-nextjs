import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  await dbConnect();
  const inputs = req.body;
  const user = await User.findOne({ email: inputs.email });
  if (user) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

  try {
    const newUser = await new User(inputs);
    //   password encryption
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, salt);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};
export default handler;
