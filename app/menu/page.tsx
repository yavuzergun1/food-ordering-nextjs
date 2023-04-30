import MenuWrapper from "../../components/menu/MenuWrapper";
import { getCategories, getProducts } from "../../Data";
async function Menu() {
  const products = getProducts();
  const categories = getCategories();

const result = await Promise.all([products, categories])
console.log(result[1]);

  return (
    <div>
      <MenuWrapper products={result[0]} categories={result[1]} />
    </div>
  );
}

export default Menu;
