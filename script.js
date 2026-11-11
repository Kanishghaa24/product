// ========================================
// CLASSIFIEDS WEBSITE JAVASCRIPT
// ========================================

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");


// ========================================
// PAGE NAVIGATION
// ========================================

function loadPage() {

    const params = new URLSearchParams(window.location.search);

    let currentPage = params.get("page") || "home";

    const validPages = ["home", "buy", "sell", "about"];

    if (!validPages.includes(currentPage)) {
        currentPage = "home";
    }

    // Display selected page only

    document.querySelectorAll("[data-page]").forEach(function(section) {

        section.hidden = section.dataset.page !== currentPage;

    });

    // Update active navigation

    document.querySelectorAll("[data-page-link]").forEach(function(link) {

        link.classList.toggle(
            "active",
            link.dataset.pageLink === currentPage
        );

    });

    // Always start at top without scrolling animation

    window.scrollTo(0, 0);
}


// Navigate without reloading the entire website

function navigateToPage(page) {

    const validPages = ["home", "buy", "sell", "about"];

    if (!validPages.includes(page)) {
        return;
    }

    history.pushState({}, "", "?page=" + page);

    loadPage();
}


// Navbar click events

document.querySelectorAll("[data-page-link]").forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const page = link.dataset.pageLink;

        navigateToPage(page);

    });

});


// Browser back and forward buttons

window.addEventListener("popstate", function() {

    loadPage();

});


// Start Exploring button

function exploreProducts() {

    navigateToPage("buy");

}


// ========================================
// NOTIFICATION
// ========================================

function showNotification(message) {

    const notification = document.getElementById("notification");

    const notificationText = document.getElementById("notificationText");

    notificationText.textContent = message;

    notification.style.display = "flex";

    clearTimeout(window.notificationTimer);

    window.notificationTimer = setTimeout(function() {

        notification.style.display = "none";

    }, 3000);

}


function closeNotification() {

    document.getElementById("notification").style.display = "none";

}


// ========================================
// BUY PRODUCT / CHECKOUT
// ========================================

function buyProduct(productName) {

    const modal = document.getElementById("checkoutModal");

    const productText = document.getElementById("checkoutProduct");

    productText.textContent = "Product: " + productName;

    modal.dataset.product = productName;

    modal.style.display = "flex";

}


function closeCheckout() {

    document.getElementById("checkoutModal").style.display = "none";

}


// Connect Buy buttons

function connectBuyButtons() {

    const buttons = document.querySelectorAll(".buy-btn");

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            const card = button.closest(".product-card");

            if (!card) {
                return;
            }

            const productName = card.dataset.name;

            buyProduct(productName);

        });

    });

}


// ========================================
// CHECKOUT FORM
// ========================================

document.getElementById("checkoutForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const modal = document.getElementById("checkoutModal");

    const productName = modal.dataset.product;

    const customerName = document.getElementById("billingName").value.trim();

    const email = document.getElementById("billingEmail").value.trim();

    const phone = document.getElementById("billingPhone").value.trim();

    const address = document.getElementById("shippingAddress").value.trim();

    const city = document.getElementById("shippingCity").value.trim();

    const state = document.getElementById("shippingState").value.trim();

    const pincode = document.getElementById("shippingPincode").value.trim();

    const payment = document.getElementById("paymentMethod").value;


    if (
        customerName === "" ||
        email === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        state === "" ||
        pincode === "" ||
        payment === ""
    ) {

        showNotification("Please fill all details!");

        return;

    }


    modal.style.display = "none";

    showNotification("Order placed successfully!");


    console.log("========== ORDER ==========");

    console.log("Product:", productName);

    console.log("Customer:", customerName);

    console.log("Email:", email);

    console.log("Phone:", phone);

    console.log("Address:", address);

    console.log("City:", city);

    console.log("State:", state);

    console.log("Pincode:", pincode);

    console.log("Payment:", payment);

    console.log("==========================");


    document.getElementById("checkoutForm").reset();


    setTimeout(function() {

        showNotification(
            "Thank you " +
            customerName +
            "! Your " +
            productName +
            " will be shipped soon."
        );

    }, 1500);

});


// ========================================
// SEARCH PRODUCTS
// ========================================

function searchProducts() {

    const searchValue = searchInput.value.toLowerCase().trim();

    filterProducts(searchValue);

}


function filterCategory() {

    const searchValue = searchInput.value.toLowerCase().trim();

    filterProducts(searchValue);

}


function filterProducts(searchValue) {

    const selectedCategory = categorySelect.value;

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(function(card) {

        const productName = card.dataset.name.toLowerCase();

        const productCategory = card.dataset.category;

        const matchesSearch = productName.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory ||
            productCategory === "all";

        if (matchesSearch && matchesCategory) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });

}


// Search using Enter key

searchInput.addEventListener("keyup", function(event) {

    if (event.key === "Enter") {

        searchProducts();

    }

});


// ========================================
// ADD NEW PRODUCT
// ========================================

function addProduct() {

    const name = document.getElementById("productName").value.trim();

    const price = document.getElementById("productPrice").value.trim();

    const condition = document.getElementById("productCondition").value.trim();

    const image = document.getElementById("productImage").value.trim();


    if (
        name === "" ||
        price === "" ||
        condition === ""
    ) {

        showNotification("Please fill all required fields!");

        return;

    }


    if (Number(price) <= 0 || !Number.isFinite(Number(price))) {

        showNotification("Please enter a valid price!");

        return;

    }


    let imageURL = image;

    if (imageURL === "") {

        imageURL =
            "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80";

    }


    // Create product card

    const productCard = document.createElement("div");

    productCard.className = "product-card";

    productCard.dataset.category = "all";

    productCard.dataset.name = name;


    const productImage = document.createElement("img");

    productImage.src = imageURL;

    productImage.alt = name;


    const productInfo = document.createElement("div");

    productInfo.className = "product-info";


    const productTitle = document.createElement("h3");

    productTitle.textContent = name;


    const productCondition = document.createElement("p");

    productCondition.textContent = condition;


    const productPrice = document.createElement("strong");

    productPrice.textContent = "₹" + Number(price).toLocaleString("en-IN");


    const buyButton = document.createElement("button");

    buyButton.type = "button";

    buyButton.className = "buy-btn";

    buyButton.innerHTML =
        '<i class="fa-solid fa-cart-shopping"></i> Buy Now';


    buyButton.addEventListener("click", function() {

        buyProduct(name);

    });


    // Add elements

    productInfo.appendChild(productTitle);

    productInfo.appendChild(productCondition);

    productInfo.appendChild(productPrice);

    productInfo.appendChild(buyButton);


    productCard.appendChild(productImage);

    productCard.appendChild(productInfo);


    productsGrid.appendChild(productCard);


    // Clear form

    document.getElementById("productName").value = "";

    document.getElementById("productPrice").value = "";

    document.getElementById("productCondition").value = "";

    document.getElementById("productImage").value = "";


    showNotification("Product added for sale successfully!");

}


// ========================================
// INITIALIZE WEBSITE
// ========================================

// Connect existing Buy buttons

connectBuyButtons();

// Display correct page

loadPage();
