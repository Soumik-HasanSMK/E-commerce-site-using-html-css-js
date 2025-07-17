document.addEventListener('DOMContentLoaded', function () {
    // Sample product data - REPLACE WITH YOUR OWN PRODUCTS
    const products = [
        {
            id: 1,
            name: "Casio FX-991ES Plus",
            price: 2200,
            oldPrice: 2500,
            image: "products/calculator.jpg",
            category: "Scientific Calculator",
            description: "Casio FX-991ES Plus (2nd Edition) Non-Programmable Scientific Calculator Black",
            details: [
                "Model: fx-991ES",
                "Display Type: LCD Display",
                "Number of Digits: 12 Digit",
                "Dimensions: 165.5mm W x 77mm D x 11.1mm H",
            ],
            rating: 4.8,
            reviews: 124,
            stock: 15
        },
        {
            id: 2,
            name: "Sonata Hand Watch",
            price: 3000,
            oldPrice: 3550,
            image: "products/watch.jpg",
            category: "Hand Watch",
            description: "Sonata Quartz Analog Black Dial Metal Strap Watch for Men-NS7133KM03",
            details: [
                "Case Diameter: 47mm",
                "Band Color: Silver",
                "Weight: 190g",
                "Country of Origin: India"
            ],
            rating: 4.6,
            reviews: 89,
            stock: 8
        },
        {
            id: 3,
            name: "One plus Airbuds",
            price: 650,
            oldPrice: 850,
            image: "products/tws.jpg",
            category: "Wireless Earbuds",
            description: "Oneplus Airairpods Pro Wireless TWS Earbuds One plus Airbuds ।। Wireless Earbuds.",
            details: [
                "Usage Time: About 3 hours (Headset)",
                "Charging Time: About 1.5 hours (Headset)",
                "Transmission Distance: >10m",
                "Battery Capacity: 35mAh"
            ],
            rating: 4.9,
            reviews: 215,
            stock: 22
        },
        {
            id: 4,
            name: "CLogitech B170 Wireless Mouse",
            price: 990,
            oldPrice: 109,
            image: "products/mouse.jpg",
            category: "Wireless mouse",
            description: "Logitech B170 is an affordable wireless mouse with reliable connectivity, 12 months battery life.",
            details: [
                "Color: White",
                "Dimensions: 97.7mm (3.85 in) W x 61.5mm (2.42 in) D x 35.2mm (1.39 in) H",
                "Weight: 70.5g (2.49 oz) with battery",
                "Battery Life: 12 months"
            ],
            rating: 4.7,
            reviews: 178,
            stock: 42
        },
        {
            id: 5,
            name: "Wireless Bluetooth Headphones",
            price: 159.99,
            oldPrice: 199.99,
            image: "product5.jpg",
            category: "Electronics",
            description: "Premium sound quality with 30-hour battery life. These over-ear headphones feature active noise cancellation and crystal-clear call quality.",
            details: [
                "Battery: 30 hours playtime",
                "Charging: USB-C",
                "Connectivity: Bluetooth 5.0",
                "Includes: Carrying case, audio cable"
            ],
            rating: 4.5,
            reviews: 312,
            stock: 17
        },
        {
            id: 6,
            name: "Organic Cotton T-Shirt",
            price: 29.99,
            image: "product6.jpg",
            category: "Apparel",
            description: "Soft, breathable fabric with a relaxed fit. Made from 100% organic cotton, this tee is perfect for everyday wear and comes in multiple colors.",
            details: [
                "Materials: 100% organic cotton",
                "Care: Machine wash cold, tumble dry low",
                "Fit: Relaxed",
                "Available in sizes S-XXL"
            ],
            rating: 4.3,
            reviews: 94,
            stock: 36
        },
        {
            id: 7,
            name: "Leather Wallet",
            price: 49.99,
            oldPrice: 59.99,
            image: "product7.jpg",
            category: "Accessories",
            description: "Genuine leather bifold wallet with multiple card slots. Handcrafted for durability and featuring RFID blocking technology.",
            details: [
                "Dimensions: 4.25\" x 3.25\" when closed",
                "Materials: Full-grain leather",
                "Features: 8 card slots, 2 bill compartments",
                "Color options: Black, Brown, Tan"
            ],
            rating: 4.7,
            reviews: 143,
            stock: 28
        },
        {
            id: 8,
            name: "Stainless Steel Water Bottle",
            price: 24.99,
            image: "product8.jpg",
            category: "Outdoor",
            description: "Double-walled insulation keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof design with a carrying loop for convenience.",
            details: [
                "Capacity: 20oz",
                "Materials: 18/8 stainless steel",
                "Features: Sweat-proof, BPA-free",
                "Includes: 3 lids (straw, chug, flip)"
            ],
            rating: 4.8,
            reviews: 267,
            stock: 53
        }
    ];

    // DOM Elements
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const productContainer = document.getElementById('product-container');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartIcon = document.querySelector('.cart-icon');
    const searchInput = document.querySelector('.search-bar input');
    const sortSelect = document.getElementById('sort-products');
    const productModal = document.getElementById('product-modal');
    const closeProductModal = document.querySelector('.close-product-modal');
    const productModalContainer = document.getElementById('product-modal-container');

    // Cart functionality
    let cart = [];

    // Display products
    function displayProducts(productsToDisplay = products) {
        productContainer.innerHTML = '';

        if (productsToDisplay.length === 0) {
            productContainer.innerHTML = '<p class="no-results">No products found matching your search.</p>';
            return;
        }

        productsToDisplay.forEach(product => {
            const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                ${product.oldPrice ? `<span class="product-badge">-${discount}%</span>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <button class="action-btn" data-id="${product.id}"><i class="far fa-heart"></i></button>
                        <button class="action-btn quick-view" data-id="${product.id}"><i class="far fa-eye"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="category">${product.category}</span>
                    <h3>${product.name}</h3>
                    <div class="price">
                        ৳${product.price.toFixed(2)}
                        ${product.oldPrice ? `<span class="old-price">৳${product.oldPrice.toFixed(2)}</span>` : ''}
                        ${product.oldPrice ? `<span class="discount">Save ৳${(product.oldPrice - product.price).toFixed(2)}</span>` : ''}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="view-details" data-id="${product.id}">View Details</button>
                </div>
            `;
            productContainer.appendChild(productCard);
        });

        // Add event listeners
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });

        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', showProductDetails);
        });

        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', showProductDetails);
        });
    }

    // Add to cart function
    function addToCart(e) {
        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);

        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();
        showCartNotification(product.name);
    }

    // Show cart notification
    function showCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart</span>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Update cart display
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items display
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartSubtotal.textContent = '0.00';
            cartTotal.textContent = '0.00';
            return;
        }

        let subtotal = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">৳${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            subtotal += item.price * item.quantity;
        });

        // Update prices
        cartSubtotal.textContent = subtotal.toFixed(2);
        cartTotal.textContent = subtotal.toFixed(2);

        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', updateQuantity);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Update quantity function
    function updateQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);

        if (e.target.classList.contains('plus')) {
            item.quantity += 1;
        } else if (e.target.classList.contains('minus')) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // Remove item if quantity is 1 and minus is clicked
                cart = cart.filter(item => item.id !== productId);
            }
        }

        updateCart();
    }

    // Remove item function
    function removeItem(e) {
        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Search functionality
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Sort functionality
    sortSelect.addEventListener('change', function () {
        const sortValue = this.value;
        let sortedProducts = [...products];

        switch (sortValue) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // Default sorting (by ID or whatever original order was)
                break;
        }

        displayProducts(sortedProducts);
    });

    // Show product details
    function showProductDetails(e) {
        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);

        productModalContainer.innerHTML = `
            <div class="product-modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-modal-details">
                <h2 class="product-modal-title">${product.name}</h2>
                <div class="product-modal-price">
                    ৳${product.price.toFixed(2)}
                    ${product.oldPrice ? `<span class="old-price">৳${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="rating">
                    ${Array(Math.floor(product.rating)).fill('<i class="fas fa-star"></i>').join('')}
                    ${product.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    <span>(${product.reviews} reviews)</span>
                </div>
                <p class="product-modal-description">${product.description}</p>
                
                <h3>Details</h3>
                <ul class="product-details-list">
                    ${product.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
                
                <div class="product-modal-actions">
                    <div class="quantity-selector">
                        <button class="minus">-</button>
                        <input type="number" value="1" min="1" max="${product.stock}">
                        <button class="plus">+</button>
                    </div>
                    <button class="btn product-modal-add-to-cart" data-id="${product.id}">
                        Add to Cart - ৳${product.price.toFixed(2)}
                    </button>
                </div>
                
                <div class="stock-status">
                    ${product.stock > 5 ?
                `<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock (${product.stock} available)</span>` :
                product.stock > 0 ?
                    `<span class="low-stock"><i class="fas fa-exclamation-circle"></i> Only ${product.stock} left in stock!</span>` :
                    `<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>`
            }
                </div>
            </div>
        `;

        // Add event listeners for quantity selector
        const minusBtn = productModalContainer.querySelector('.quantity-selector .minus');
        const plusBtn = productModalContainer.querySelector('.quantity-selector .plus');
        const quantityInput = productModalContainer.querySelector('.quantity-selector input');

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < product.stock) {
                quantityInput.value = currentValue + 1;
            }
        });

        // Add event listener for add to cart button
        const addToCartBtn = productModalContainer.querySelector('.product-modal-add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    ...product,
                    quantity: quantity
                });
            }

            updateCart();
            showCartNotification(product.name);
            closeProductModal.click();
        });

        productModal.style.display = 'flex';
    }

    // Toggle cart modal
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        setTimeout(() => {
            cartModal.classList.add('active');
        }, 10);
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
        setTimeout(() => {
            cartModal.style.display = 'none';
        }, 300);
    });

    // Close product modal
    closeProductModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            setTimeout(() => {
                cartModal.style.display = 'none';
            }, 300);
        }

        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    // Initialize the page
    displayProducts();
});

// Add CSS for cart notification
const style = document.createElement('style');
style.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        z-index: 3000;
        transition: transform 0.3s ease-out;
    }
    
    .cart-notification.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .cart-notification i {
        margin-right: 10px;
        font-size: 1.2rem;
    }
    
    .stock-status {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;
    }
    
    .in-stock {
        color: #4CAF50;
    }
    
    .low-stock {
        color: #FF9800;
    }
    
    .out-of-stock {
        color: #F44336;
    }
    
    .product-details-list {
        margin: 15px 0 25px;
        padding-left: 20px;
    }
    
    .product-details-list li {
        margin-bottom: 8px;
    }
    
    .no-results {
        text-align: center;
        grid-column: 1 / -1;
        padding: 40px;
        color: #777;
    }
`;
document.head.appendChild(style);