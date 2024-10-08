// Mock product data (to be replaced with API call in real scenarios)
const products = [
    { id: 1, name: "Product 1", price: 50 },
    { id: 2, name: "Product 2", price: 100 },
    { id: 3, name: "Product 3", price: 150 }
];

// Load products dynamically into the "home" section
function loadProducts() {
    let productsContainer = document.querySelector('.products');
    products.forEach(product => {
        let productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button onclick="viewProduct(${product.id})">View Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// View product details
function viewProduct(productId) {
    let product = products.find(p => p.id === productId);
    let productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <p>Description of ${product.name} goes here.</p>
    `;
    document.getElementById('product-details-modal').style.display = 'block';
}

// Add product to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Product added to cart!");
}

// Load cart items into the "cart" section
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cart.forEach(itemId => {
            let product = products.find(p => p.id === itemId);
            let cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `<p>${product.name} - $${product.price}</p>`;
            cartContainer.appendChild(cartItem);
        });
    }
}

// Close the product details modal
document.getElementById('close-modal').onclick = function() {
    document.getElementById('product-details-modal').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    let modal = document.getElementById('product-details-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Initialize the page when it loads
window.onload = function() {
    loadProducts();
    loadCart();
}
