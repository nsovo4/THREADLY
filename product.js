document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  let name = params.get("name") || "";
  let price = params.get("price") || "0";
  let image = params.get("image") || "";

  console.log("Product params:", { name, price, image });

  const productNameEl = document.getElementById("product-name");
  const productPriceEl = document.getElementById("product-price");
  const productImageEl = document.getElementById("product-image");

  if (productNameEl) productNameEl.textContent = name || "Product";
  if (productPriceEl) productPriceEl.textContent = price || "0";
  if (productImageEl && image) productImageEl.src = image;

  // Size selection
  let selectedSize = null;

  document.querySelectorAll(".size").forEach(size => {
    size.addEventListener("click", () => {
      document.querySelectorAll(".size").forEach(s => s.classList.remove("active"));
      size.classList.add("active");
      selectedSize = size.textContent;
    });
  });

  // Add to cart
  const addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      if (!selectedSize) {
        alert("Please select a size");
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const cartItem = {
        name: name || "Unnamed Product",
        price: parseFloat(price) || 0,
        image: image || "",
        size: selectedSize,
        qty: 1
      };

      console.log("Adding to cart:", cartItem);

      cart.push(cartItem);

      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart drawer and page
      updateCart();

      // Add animation and tick
      const btn = document.getElementById("addToCartBtn");
      btn.classList.add("clicked");
      
      // Save original text
      const originalText = btn.textContent;
      
      // Add tick
      btn.innerHTML = '✓ ' + originalText;
      
      setTimeout(() => {
        btn.classList.remove("clicked");
        btn.textContent = originalText;
      }, 600);

      // Update cart count
      const cartCount = document.getElementById("cartCount");
      if (cartCount) {
        cartCount.textContent = cart.length;
      }
    });
  }
});
