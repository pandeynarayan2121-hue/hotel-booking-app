export async function fetchAllProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=194');
  const data = await res.json();
  return data.products;
}

export async function fetchProductById(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return await res.json();
}