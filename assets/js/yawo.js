// Menu data: Corrected duplicate IDs
const menuItems = [
    {
        id: 1,
        name: "Injera with Stew",
        nameAm: "እንጀራ ከወጥ",
        description: "Traditional injera with meat or vegetable stew",
        descriptionAm: "ባህላዊ እንጀራ ከስጋ ወይም ከአትክልት ወጥ",
        price: 35,
        category: "meals",
        image: "🍛"
    },
    {
        id: 2,
        name: "Misto",
        nameAm: "ሚስቶ",
        price: 50,
        category: "meals",
        image: "🍗"
    },
    {
        id: 3,
        name: "Coffee",
        nameAm: "ቡና",
        price: 5,
        category: "beverages",
        image: "☕"
    },
    {
        id: 4,
        name: "Fresh Juice",
        nameAm: "ትኩስ ጠማማ",
        description: "Seasonal fresh fruit juice",
        descriptionAm: "በየወቅቱ የሚገኝ ትኩስ ፍራፍሬ ጠማማ",
        price: 18,
        category: "beverages",
        image: "🍹"
    },
    {
        id: 5, 
        name: "Tea",
        nameAm: "ሻይ",
        price: 10,
        category: "beverages",
        image: "☕"
    },
    {
        id: 6, 
        name: "Fruit Salad",
        nameAm: "ፍራፍሬ ሰላጣ",
        description: "Seasonal fresh fruits",
        descriptionAm: "በየወቅቱ የሚገኙ ትኩስ ፍራፍሬዎች",
        price: 12,
        category: "snacks",
        image: "🍎"
    },
    {
        id: 7, 
        name: "Samosa",
        nameAm: "ሳሞሳ",
        description: "Crispy pastry with savory filling",
        descriptionAm: "ክርስፕ ያለው እንጀራ ከጣፋጭ ሙጫ",
        price: 8,
        category: "snacks",
        image: "🥟"
    }
];

// NEW: Cart state
let cart = [];

// DOM elements
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const heroSignInBtn = document.getElementById('heroSignInBtn');
const heroSignUpBtn = document.getElementById('heroSignUpBtn');
const footerSignIn = document.getElementById('footerSignIn');
const footerSignUp = document.getElementById('footerSignUp');
const signInModal = document.getElementById('signInModal');
const signUpModal = document.getElementById('signUpModal');
const orderModal = document.getElementById('orderModal'); // NEW
const closeSignInModal = document.getElementById('closeSignInModal');
const closeSignUpModal = document.getElementById('closeSignUpModal');
const closeOrderModal = document.getElementById('closeOrderModal'); // NEW
const continueBrowsing = document.getElementById('continueBrowsing'); // NEW
const switchToSignUp = document.getElementById('switchToSignUp');
const switchToSignIn = document.getElementById('switchToSignIn');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const menuGrid = document.getElementById('menuGrid');
const viewFullMenuBtn = document.getElementById('viewFullMenuBtn');
const langButtons = document.querySelectorAll('.lang-btn');
// NEW: Cart DOM elements
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');

// Event listeners for modal triggers (unchanged)
signInBtn.addEventListener('click', () => openModal(signInModal));
signUpBtn.addEventListener('click', () => openModal(signUpModal));
heroSignInBtn.addEventListener('click', () => openModal(signInModal));
heroSignUpBtn.addEventListener('click', () => openModal(signUpModal));
footerSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signInModal);
});
footerSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signUpModal);
});

// Event listeners for modal closers (updated)
closeSignInModal.addEventListener('click', () => closeModal(signInModal));
closeSignUpModal.addEventListener('click', () => closeModal(signUpModal));
closeOrderModal.addEventListener('click', () => closeModal(orderModal)); // NEW

// NEW: Continue browsing button closes order modal
continueBrowsing.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(orderModal);
});


// Switch between modals (unchanged)
switchToSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signInModal);
    openModal(signUpModal);
});

switchToSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signUpModal);
    openModal(signInModal);
});

// Form submissions (MODIFIED to open orderModal)
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate successful login
    closeModal(signInModal);
    openModal(orderModal); // Open the cart/order modal
    // In a real app, successful sign-in would load user's existing cart
});

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate successful signup/login
    closeModal(signUpModal);
    openModal(orderModal); // Open the cart/order modal
    // In a real app, successful sign-up would load empty cart
});

// View full menu button (unchanged)
viewFullMenuBtn.addEventListener('click', () => {
    const message = currentLang === 'en' ? 
        'Full menu would be displayed here!' : 
        'ሙሉው የምግብ ዝርዝር እዚህ ይታያል!';
    alert(message);
});

// Language switching (modified to include cart render)
let currentLang = 'en';

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active button
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Show/hide language content
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? 'block' : 'none';
    });
    
    document.querySelectorAll('.lang-am').forEach(el => {
        el.style.display = lang === 'am' ? 'block' : 'none';
    });
    
    // Update placeholders
    document.querySelectorAll('input, select').forEach(el => {
        const placeholderEn = el.getAttribute('data-placeholder-en');
        const placeholderAm = el.getAttribute('data-placeholder-am');
        
        if (placeholderEn && placeholderAm) {
            el.placeholder = lang === 'en' ? placeholderEn : placeholderAm;
        }
    });
    
    // Reload menu items and cart with correct language
    loadMenuItems();
    renderCart(); // Rerender cart on language switch
}

// Modal functions (unchanged)
function openModal(modal) {
    modal.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Close modal when clicking outside (updated)
window.addEventListener('click', (e) => {
    if (e.target === signInModal) {
        closeModal(signInModal);
    }
    if (e.target === signUpModal) {
        closeModal(signUpModal);
    }
    if (e.target === orderModal) { // NEW
        closeModal(orderModal);
    }
});

// Load menu items (modified to apply language after creation)
function loadMenuItems() {
    menuGrid.innerHTML = '';
    
    menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <div class="menu-item-image">
                <span style="font-size: 3rem;">${item.image}</span>
            </div>
            <div class="menu-item-content">
                <h3 class="menu-item-title lang-en">${item.name}</h3>
                <h3 class="menu-item-title lang-am">${item.nameAm}</h3>
                <p class="menu-item-description lang-en">${item.description}</p>
                <p class="menu-item-description lang-am">${item.descriptionAm || ''}</p>
                <div class="menu-item-footer">
                    <div class="menu-item-price">${item.price} ETB</div>
                    <button class="add-to-cart btn-primary" data-id="${item.id}">
                        <i class="fas fa-cart-plus"></i> 
                        <span class="lang-en">Add to Order</span>
                        <span class="lang-am">ወደ ትዕዛዝ ጨምር</span>
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItemElement);
    });

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            // Traverse up to find the button element itself
            const targetButton = e.target.closest('.add-to-cart');
            const itemId = targetButton.getAttribute('data-id');
            addToCart(itemId);
            // After adding to cart, open the order modal if not already open.
            if (orderModal.style.display !== 'flex') {
                openModal(orderModal);
            }
        });
    });
    
    // Apply current language visibility
    switchLanguage(currentLang);
}

// NEW: Add item to cart logic
function addToCart(itemId) {
    const id = parseInt(itemId);
    const itemInMenu = menuItems.find(i => i.id === id);
    
    if (itemInMenu) {
        const itemInCart = cart.find(i => i.id === id);
        
        if (itemInCart) {
            itemInCart.quantity += 1; // Increment quantity
        } else {
            // Add new item to cart
            cart.push({
                ...itemInMenu,
                quantity: 1
            });
        }
        
        renderCart();
    }
}

// NEW: Render Cart UI
function renderCart() {
    cartItemsList.innerHTML = '';
    let subtotal = 0;
    
    if (cart.length === 0) {
        const message = currentLang === 'en' ? 
            'Your order list is empty. Add items from the menu.' : 
            'የትዕዛዝ ዝርዝርዎ ባዶ ነው። ከምናሌው እቃዎችን ይጨምሩ።';
        cartItemsList.innerHTML = `<p class="empty-cart-message">${message}</p>`;
        cartSubtotal.textContent = '0 ETB';
        cartTotal.textContent = '0 ETB';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemName = currentLang === 'en' ? item.name : item.nameAm;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item-card';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-qty">${item.quantity}x</span>
                <span class="cart-item-name">${itemName}</span>
            </div>
            <div class="cart-item-details">
                <span class="cart-item-price">${itemTotal.toFixed(2)} ETB</span>
            </div>
        `;
        cartItemsList.appendChild(cartItemElement);
    });
    
    // Assuming no tax/discount logic is needed, total equals subtotal
    const total = subtotal; 

    cartSubtotal.textContent = `${subtotal.toFixed(2)} ETB`;
    cartTotal.textContent = `${total.toFixed(2)} ETB`;
    
    // Re-apply language specific visibility for elements inside the modal
    // Note: This is redundant if switchLanguage is called, but ensures content inside cart is correct
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = currentLang === 'en' ? 'block' : 'none';
    });
    
    document.querySelectorAll('.lang-am').forEach(el => {
        el.style.display = currentLang === 'am' ? 'block' : 'none';
    });
}


// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadMenuItems();
    renderCart(); // Initial cart render
    
    // Add animation to feature cards on scroll (unchanged)
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
