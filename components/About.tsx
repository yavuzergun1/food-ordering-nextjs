import Image from "next/image";
import Title from "./ui/Title";

const About: React.FC = () => {
  return (
    <div className="bg-secondary py-14">
      <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
        <div className="flex justify-center">
          <div className="relative sm:w-[445px] sm:h-[600px]  flex justify-center w-[300px] h-[450px]">
            <Image src="/assets/png/about-img.png" alt="" fill />
          </div>
        </div>
        <div className="md:w-1/2 ">
          <Title addClass="text-[40px]">Project Description</Title>
          <p className="my-5 flex flex-col items-center">
            <h3>
              Full-Stack Project with NextJS + MongoDB + Mongoose with
              Authorization and CRUD abilities
            </h3>
            <br />

            <h4>Some of the techs I used for this project:</h4>
            <ul>
              <li> -NextJS for client and server-side -MongoDB for database</li>
              <li>-Mongoose for database interaction</li>
              <li> -NextAuth for login with credentials</li>
              <li> -Bcyrpt for password encryption</li>
              <li> -Redux for state management</li>
              <li> -TailwindCSS for styling</li>
              <li>-Responsive design</li>
            </ul>
            <br />
            <br />
            <h4>User Abilities:</h4>
            <ul>
              <li> -Login, Logout</li>
              <li>
                {" "}
                -Update user info (address, email, password, profile photo...)
              </li>
              <li>
                {" "}
                -Choose foods from the menu with extra options -Add to cart and
                display bill in cart
              </li>
              <li>
                {" "}
                -Checkout and send the order to seller -Display current and
                recent orders Admin Abilities
              </li>
              <li> -Checkout and send the order to seller</li>

              <li>-Display current and recent orders</li>
            </ul>
            <br />
            <h4> Admin Abilities</h4>
            <ul>
              <li>-Display all foods</li>
              <li>-Add new foods with photo and all options</li>
              <li>-Display, add or delete categories</li>
              <li>-Delete existing foods</li>
              <li>-Display orders which come from the user side</li>
              <li>
                -Change order status (payment, preparing, on the way, delivered)
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
