export const getCategories = async () => {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
       cache: "force-cache",
     });
    return res.json();
}

export const getProducts = async () => {
   const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        cache: "force-cache",
   });
        return res.json();
}