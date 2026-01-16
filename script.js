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

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const image = btn.dataset.image;

    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  });
});

function updateCart() {
  // Drawer
  if (cartItemsDiv) {
    cartItemsDiv.innerHTML = "";
  }

  // Cart page
  const cartPageItems = document.getElementById("cartPageItems");

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    if (cartItemsDiv) {
      cartItemsDiv.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
          <div>
            <span>${item.name}</span>
            <span>R${item.price.toFixed(2)}</span>
          </div>
        </div>
      `;
    }

    if (cartPageItems) {
      cartPageItems.innerHTML += `
        <div class="cart-page-item">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
          <div>
            <span>${item.name}</span>
            <span>R${item.price.toFixed(2)}</span>
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