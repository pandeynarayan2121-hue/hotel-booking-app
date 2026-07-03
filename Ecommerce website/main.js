import { appState } from './state.js';
import { fetchAllProducts, fetchProductById } from './api.js';
import { 
  renderGrid, 
  renderProductDetail, 
  renderCart, 
  updateCartCountBadge, 
  showPage 
} from './ui.js';

// --- INIT APP ---
async function init() {
  document.getElementById('search').addEventListener('input', filterProducts);
  
  const products = await fetchAllProducts();
  appState.allProducts = products;
  
  document.getElementById('loading').style.display = 'none';
  renderGrid(appState.allProducts);
}

// --- LOGIC HANDLERS ---
function filterProducts() {
  const q = document.getElementById('search').value.toLowerCase();
  const filtered = appState.allProducts.filter(p =>
    p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );
  renderGrid(filtered);
}

async function openProduct(id) {
  showPage('product');
  document.getElementById('product-detail').innerHTML = '<div class="loading">Loading...</div>';
  document.getElementById('product-reviews').innerHTML = '';

  const product = await fetchProductById(id);
  appState.currentProduct = product;
  renderProductDetail(product);
}

function changeMainImg(el, src) {
  document.getElementById('main-img').src = src;
  document.querySelectorAll('.thumb-row img').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

function changeQty(delta) {
  const el = document.getElementById('qty');
  let val = parseInt(el.innerText) + delta;
  if (val < 1) val = 1;
  el.innerText = val;
}

function addToCart(id) {
  const p = appState.currentProduct;
  const qty = parseInt(document.getElementById('qty').innerText);
  const existing = appState.cart.find(c => c.id === id);
  
  if (existing) {
    existing.qty += qty;
  } else {
    appState.cart.push({ ...p, qty });
  }
  
  updateCartCountBadge();
  alert(`${p.title} added to cart!`);
}

function updateCartQty(i, delta) {
  appState.cart[i].qty += delta;
  if (appState.cart[i].qty < 1) appState.cart[i].qty = 1;
  updateCartCountBadge();
  renderCart();
}

function removeFromCart(i) {
  appState.cart.splice(i, 1);
  updateCartCountBadge();
  renderCart();
}

// --- EXPOSE TO WINDOW ---
// Because ES6 modules hide their functions by default, 
// we must attach them to the 'window' object so the 
// inline 'onclick' handlers in the HTML can still find them.
window.showPage = showPage;
window.openProduct = openProduct;
window.changeMainImg = changeMainImg;
window.changeQty = changeQty;
window.addToCart = addToCart;
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;

// Start the app
init();