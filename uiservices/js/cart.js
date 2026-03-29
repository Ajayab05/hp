let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

function renderCart() {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<h2>Your cart is empty</h2>";
    totalEl.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");

    div.innerHTML = `
      <p>${item.name} - ₹${item.price}</p>
      <div>
        <button onclick="decreaseQty(${index})">-</button>
        ${item.qty}
        <button onclick="increaseQty(${index})">+</button>
      </div>
      <button onclick="removeItem(${index})">Remove</button>
      </div>
      <button onclick="checkout()">Checkout</button>
    `;

    container.appendChild(div);
  });

  totalEl.innerText = "Total: ₹" + total;
}

function increaseQty(index) {
  cart[index].qty += 1;
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();


async function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/pay", {
      method: "POST"
    });

    const data = await res.json();

    if (data.status === "success") {
      alert("✅ Payment Success! ID: " + data.transactionId);

      localStorage.removeItem("cart");
      window.location.href = "index.html";
    }
  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
}