import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const inputs = req.body;
  const user = await User.findOne({ email: inputs.email });
  if (user) {
    res.status(400).json({ error: "User already exists" });
    return;
    }
    
    try {
        const newUser = await new User(body);
        const salt = await bcrypt.genSalt(10);
    }

};
export default handler;
