const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartItemsDiv = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

// Toggle cart (only on index page)
if (cartBtn && cartDrawer) {
  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.toggle("show");
  });
}

// Close cart drawer
const closeCartBtn = document.getElementById("closeCart");
if (closeCartBtn) {
  closeCartBtn.addEventListener("click", () => {
    cartDrawer.classList.remove("show");
  });
}

// Add to cart moved to product page
// Collection page now uses "View" links to navigate to product detail

function updateCart() {
  // Drawer
  if (cartItemsDiv) {
    cartItemsDiv.innerHTML = "";
  }

  // Cart page
  const cartPageItems = document.getElementById("cartPageItems");
  if (cartPageItems) {
    cartPageItems.innerHTML = "";
  }

  let total = 0;

  console.log("Cart items:", cart);

  cart.forEach((item, index) => {
    const price = item.price || 0; // Default to 0 if price is null/undefined
    total += parseFloat(price);

    if (cartItemsDiv) {
      const imageHtml = item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">` : '';
      const sizeLabel = item.size ? ` - Size: ${item.size}` : '';
      cartItemsDiv.innerHTML += `
        <div class="cart-item">
          ${imageHtml}
          <div>
            <span>${item.name}${sizeLabel}</span>
            <span>R${parseFloat(price).toFixed(2)}</span>
          </div>
        </div>
      `;
    }

    if (cartPageItems) {
      const imageHtml = item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">` : '';
      const sizeLabel = item.size ? ` - Size: ${item.size}` : '';
      cartPageItems.innerHTML += `
        <div class="cart-page-item">
          ${imageHtml}
          <div>
            <span>${item.name}${sizeLabel}</span>
            <span>R${parseFloat(price).toFixed(2)}</span>
            <button class="remove-item" onclick="removeItem(${index})">
              REMOVE
            </button>
          </div>
        </div>
      `;
    }
  });

  if (cartTotal) cartTotal.textContent = total.toFixed(2);
  const cartPageTotal = document.getElementById("cartPageTotal");
  if (cartPageTotal) cartPageTotal.textContent = total.toFixed(2);

  if (cartCount) cartCount.textContent = cart.length;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Initialize cart display on page load
updateCart();