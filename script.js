// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Menu Category Filter
function filterMenu(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = document.querySelectorAll('.menu-item');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Cart System
let cart = JSON.parse(localStorage.getItem('burgerCart')) || [];

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (countEl) countEl.innerText = cart.length;
    if (!itemsEl) return;

    itemsEl.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        itemsEl.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small style="color:#ff9800;">Rs. ${item.price}</small>
                </div>
                <button onclick="removeFromCart(${index})" style="background:red;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">X</button>
            </div>
        `;
    });

    if (totalEl) totalEl.innerText = 'Rs. ' + total;
}

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('burgerCart', JSON.stringify(cart));
    updateCartUI();
    toggleCart(true);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('burgerCart', JSON.stringify(cart));
    updateCartUI();
}

function toggleCart(forceOpen = false) {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    if (forceOpen) modal.classList.add('open');
    else modal.classList.toggle('open');
}

function checkoutOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you! Your order has been placed successfully.');
    cart = [];
    localStorage.removeItem('burgerCart');
    updateCartUI();
    toggleCart();
}

window.addEventListener('DOMContentLoaded', updateCartUI);