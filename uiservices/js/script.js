document.addEventListener("DOMContentLoaded", () => {

  const products = [
    { name: "HP Pavilion Laptop", price: 65000, image: "images/laptop1.png" },
    { name: "HP Gaming Laptop", price: 95000, image: "images/laptop2.png" },
    { name: "HP Printer", price: 12000, image: "images/printer.png" },
    { name: "HP Desktop", price: 70000, image: "images/desktop.png" }
  ];

  const container = document.getElementById("products");

  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <img src="${p.image}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button>Add to Cart</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      addToCart(p);
    });

    container.appendChild(div);
  });

  updateCartCount();
});