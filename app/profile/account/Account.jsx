import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

function Account() {
  const session = useSession();
  console.log("SESSION", session);
  const [user, setUser] = useState();
  useEffect(() => {
    const userEmail = session?.data?.user.email;

    const getUsers = async () => {
      const users = await getAccount(userEmail);
      console.log(users);

      const user = users.find((user) => user.email === userEmail);
      console.log("user", user);
      setUser(user);
    };
    getUsers();
  }, [session]);

  return <div>  {user && `Hello ${user?.fullName ? user?.fullName : user?.name}!`}  </div>;
}

export async function getAccount() {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users`
    );
    const users = data.data;
    return users;
  } catch (error) {
    console.log(error);
  }
}
export default Account;
