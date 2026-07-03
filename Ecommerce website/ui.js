import { appState } from './state.js';

export function renderGrid(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.thumbnail}" alt="${p.title}" loading="lazy" />
      <h3>${p.title}</h3>
      <div class="price">$${p.price}</div>
      <div class="rating">⭐ ${p.rating} · ${p.stock} in stock</div>
    `;
    card.onclick = () => window.openProduct(p.id);
    grid.appendChild(card);
  });
}

export function renderProductDetail(p) {
  const originalPrice = (p.price / (1 - p.discountPercentage / 100)).toFixed(2);

  const thumbs = p.images.map((img, i) =>
    `<img src="${img}" class="${i === 0 ? 'active' : ''}" onclick="window.changeMainImg(this, '${img}')" />`
  ).join('');

  document.getElementById('product-detail').innerHTML = `
    <div class="product-layout">
      <div class="product-images">
        <img id="main-img" src="${p.images[0]}" alt="${p.title}" />
        <div class="thumb-row">${thumbs}</div>
      </div>
      <div class="product-info">
        <div class="brand">${p.brand || p.category}</div>
        <h2>${p.title}</h2>
        <div class="price-big">$${p.price}</div>
        <div class="original">$${originalPrice} · ${p.discountPercentage}% off</div>
        <p>${p.description}</p>
        <div class="tags">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <table class="info-table">
          <tr><td>Category</td><td>${p.category}</td></tr>
          <tr><td>Stock</td><td>${p.stock} units</td></tr>
          <tr><td>SKU</td><td>${p.sku}</td></tr>
          <tr><td>Warranty</td><td>${p.warrantyInformation}</td></tr>
          <tr><td>Shipping</td><td>${p.shippingInformation}</td></tr>
          <tr><td>Return Policy</td><td>${p.returnPolicy}</td></tr>
        </table>
        <div class="qty-row">
          <button onclick="window.changeQty(-1)">−</button>
          <span id="qty">1</span>
          <button onclick="window.changeQty(1)">+</button>
        </div>
        <button class="add-cart-btn" onclick="window.addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `;

  if (p.reviews && p.reviews.length) {
    document.getElementById('product-reviews').innerHTML = `
      <h3>Customer Reviews</h3>
      ${p.reviews.map(r => `
        <div class="review-card">
          <div class="reviewer">${r.reviewerName}</div>
          <div class="review-rating">${'⭐'.repeat(r.rating)}</div>
          <div class="comment">${r.comment}</div>
        </div>
      `).join('')}
    `;
  }
}

export function renderCart() {
  const list = document.getElementById('cart-items-list');
  const bill = document.getElementById('bill-summary');

  if (appState.cart.length === 0) {
    list.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
    bill.innerHTML = '';
    return;
  }

  list.innerHTML = appState.cart.map((item, i) => `
    <div class="cart-item">
      <img src="${item.thumbnail}" alt="${item.title}" />
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <div class="cprice">$${item.price}</div>
        <div class="qty-row">
          <button onclick="window.updateCartQty(${i}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="window.updateCartQty(${i}, 1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="window.removeFromCart(${i})">×</button>
    </div>
  `).join('');

  const subtotal = appState.cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = appState.cart.reduce((s, c) => {
    const original = c.price / (1 - c.discountPercentage / 100);
    return s + (original - c.price) * c.qty;
  }, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  bill.innerHTML = `
    <h3>Bill Summary</h3>
    <div class="bill-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="bill-row"><span>You save</span><span style="color:#2a9d5c">-$${discount.toFixed(2)}</span></div>
    <div class="bill-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span></div>
    <div class="bill-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    <button class="checkout-btn">Proceed to Checkout</button>
  `;
}

export function updateCartCountBadge() {
  const total = appState.cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cart-count').innerText = total;
}

export function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(name).classList.add('active');
  if (name === 'cart') renderCart();
  window.scrollTo(0, 0);
}