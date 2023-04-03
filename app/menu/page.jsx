import axios from "axios";
import MenuWrapper from "../../components/menu/MenuWrapper";

async function Menu() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    cache: "force-cache",
  });
  const categories = res.data.data;
  console.log(categories);
  return (
    <div>
      <MenuWrapper categories={categories} />
    </div>
  );
}

export default Menu;
