// ==========================================
// WILDWEST SHOES - SHOPPING CART
// ==========================================


// ==========================================
// PRODUCTS
// ==========================================

const products = [
    {
        id: 1,
        name: "Black Air",
        price: 2499,
        image: "shoe1.webp"
    },

    {
        id: 2,
        name: "Street Runner",
        price: 2299,
        image: "shoe2.webp"
    },

    {
        id: 3,
        name: "Urban Classic",
        price: 2699,
        image: "shoe3.webp"
    },

    {
        id: 4,
        name: "Daily Flex",
        price: 1999,
        image: "shoe4.png"
    }
];


// ==========================================
// CART
// ==========================================

let cart = [];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const cartElement = document.getElementById("cart");
const overlay = document.getElementById("overlay");

const cartButton = document.getElementById("cartButton");
const closeCartButton = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutButton = document.getElementById("checkoutButton");


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    cartElement.classList.add("open");

    overlay.classList.add("show");
}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    cartElement.classList.remove("open");

    overlay.classList.remove("show");
}


// ==========================================
// CART BUTTON
// ==========================================

cartButton.addEventListener("click", function () {

    openCart();

});


// ==========================================
// CLOSE BUTTON
// ==========================================

closeCartButton.addEventListener("click", function () {

    closeCart();

});


// ==========================================
// CLICK OUTSIDE CART
// ==========================================

overlay.addEventListener("click", function () {

    closeCart();

});


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

    const product = products.find(function (item) {

        return item.id === productId;

    });


    if (!product) {

        console.log("Product not found.");

        return;
    }


    cart.push(product);


    updateCart();


    // Open cart automatically
    openCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    // Update cart number
    cartCount.textContent = cart.length;


    // If cart is empty
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "0";

        return;
    }


    // Clear cart display
    cartItems.innerHTML = "";


    let total = 0;


    // Display cart items
    cart.forEach(function (product, index) {

        total += product.price;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>${product.name}</h4>

                <p>
                    ₱${product.price.toLocaleString()}
                </p>

            </div>

            <button
                class="remove-button"
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>
        `;


        cartItems.appendChild(cartItem);

    });


    // Update total
    cartTotal.textContent = total.toLocaleString();

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==========================================
// CHECKOUT
// ==========================================

checkoutButton.addEventListener("click", function () {

    // Check if cart is empty
    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    // Calculate total
    let total = 0;

    cart.forEach(function (product) {

        total += product.price;

    });


    // Ask for confirmation
    const confirmOrder = confirm(
        "Confirm your order?\n\n" +
        "Number of items: " + cart.length + "\n" +
        "Total: ₱" + total.toLocaleString()
    );


    // If user clicks Cancel
    if (!confirmOrder) {

        return;

    }


    // Successful checkout
    alert(
        "Order placed successfully!\n\n" +
        "Thank you for shopping at WildWest Shoes!"
    );


    // Empty cart
    cart = [];


    // Update screen
    updateCart();


    // Close cart
    closeCart();

});


// ==========================================
// START
// ==========================================

updateCart();