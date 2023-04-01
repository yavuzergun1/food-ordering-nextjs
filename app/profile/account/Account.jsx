import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

function Account() {
    const session = useSession();
    const [user, setUser] = useState();
  useEffect(() => {
    if (session.status === "authenticated") {
      console.log(session?.data?.user.email);
      const userEmail = session?.data?.user.email;

      const getUsers = async () => {
        const users = await getAccount(userEmail);
        console.log(users);

          const user = users.find((user) => user.email === userEmail);
          console.log("user", user);
            setUser(user);
      };

      getUsers();
    }
  }, [session]);

    return <div>{user?.email }</div>;
}

export async function getAccount() {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users`
    );
    const users = data.data;
    // console.log("USERS", users);
    return users;
  } catch (error) {
    console.log(error);
    }
}
export default Account;
// export async function getAccount(userEmail) {
//   try {
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/users`
//     );
//     console.log("USERS", data.data);
//     const users = data.data;
//     const user = users.find((user) => user.email === userEmail);
//     console.log(user);
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// }
