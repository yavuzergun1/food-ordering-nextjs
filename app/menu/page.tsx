import MenuWrapper from "../../components/menu/MenuWrapper";
import { getCategories, getProducts } from "../../Data";

async function Menu({title}: {title: string}) {
  const products = getProducts();
  const categories = getCategories();
  const result = await Promise.all([products, categories]);

  return (
    <div>
      <MenuWrapper title={title} products={result[0]} categories={result[1]} />
    </div>
  );
}

export default Menu;
