import cookie from "cookie";

const handler = (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("admin_token", process.env.ADMIN_TOKEN, {
          maxAge: 60 * 60 /* login time 1 hour  */,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "wrong credentials" });
    }
  }
    if (method === "PUT") {
      const { username, password } = req.body;
     
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("admin_token", process.env.ADMIN_TOKEN, {
            maxAge: -1/* logout */,
            path: "/",
          })
        )
        res.status(200).json({ message: "Success" });
      
      
    }
};
export default handler;
