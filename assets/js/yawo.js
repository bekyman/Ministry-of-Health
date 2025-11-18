// Menu data
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
        id: 4,
        name: "Tea",
        nameAm: "ሻይ",
        price: 10,
        category: "beverages",
        image: "🍹"
    },
    {
        id: 5,
        name: "Fruit Salad",
        nameAm: "ፍራፍሬ ሰላጣ",
        description: "Seasonal fresh fruits",
        descriptionAm: "በየወቅቱ የሚገኙ ትኩስ ፍራፍሬዎች",
        price: 12,
        category: "snacks",
        image: "🍎"
    },
    {
        id: 6,
        name: "Samosa",
        nameAm: "ሳሞሳ",
        description: "Crispy pastry with savory filling",
        descriptionAm: "ክርስፕ ያለው እንጀራ ከጣፋጭ ሙጫ",
        price: 8,
        category: "snacks",
        image: "🥟"
    }
];

// DOM elements
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const heroSignInBtn = document.getElementById('heroSignInBtn');
const heroSignUpBtn = document.getElementById('heroSignUpBtn');
const footerSignIn = document.getElementById('footerSignIn');
const footerSignUp = document.getElementById('footerSignUp');
const signInModal = document.getElementById('signInModal');
const signUpModal = document.getElementById('signUpModal');
const closeSignInModal = document.getElementById('closeSignInModal');
const closeSignUpModal = document.getElementById('closeSignUpModal');
const switchToSignUp = document.getElementById('switchToSignUp');
const switchToSignIn = document.getElementById('switchToSignIn');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const menuGrid = document.getElementById('menuGrid');
const viewFullMenuBtn = document.getElementById('viewFullMenuBtn');
const langButtons = document.querySelectorAll('.lang-btn');

// Event listeners for modal triggers
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

// Event listeners for modal closers
closeSignInModal.addEventListener('click', () => closeModal(signInModal));
closeSignUpModal.addEventListener('click', () => closeModal(signUpModal));

// Switch between modals
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

// Form submissions
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = currentLang === 'en' ? 
        'Sign In functionality would be implemented here!' : 
        'የመግባት ተግባር እዚህ ይተገበራል!';
    alert(message);
    closeModal(signInModal);
});

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = currentLang === 'en' ? 
        'Sign Up functionality would be implemented here!' : 
        'የመመዝገቢያ ተግባር እዚህ ይተገበራል!';
    alert(message);
    closeModal(signUpModal);
});

// View full menu button
viewFullMenuBtn.addEventListener('click', () => {
    const message = currentLang === 'en' ? 
        'Full menu would be displayed here!' : 
        'ሙሉው የምግብ ዝርዝር እዚህ ይታያል!';
    alert(message);
});

// Language switching
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
    
    // Reload menu items with correct language
    loadMenuItems();
}

// Modal functions
function openModal(modal) {
    modal.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === signInModal) {
        closeModal(signInModal);
    }
    if (e.target === signUpModal) {
        closeModal(signUpModal);
    }
});

// Load menu items
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
                <p class="menu-item-description lang-am">${item.descriptionAm}</p>
                <div class="menu-item-footer">
                    <div class="menu-item-price">${item.price} ETB</div>
                    <button class="add-to-cart" data-id="${item.id}">
                        <i class="fas fa-cart-plus"></i> 
                        <span class="lang-en">Add to Cart</span>
                        <span class="lang-am">ወደ ጋሪ ጨምር</span>
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItemElement);
    });

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.closest('.add-to-cart').getAttribute('data-id');
            addToCart(itemId);
        });
    });
    
    // Apply current language visibility
    switchLanguage(currentLang);
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id == itemId);
    if (item) {
        const message = currentLang === 'en' ? 
            `Added ${item.name} to cart!` : 
            `${item.nameAm} ወደ ጋሪ ተጨምሯል!`;
        alert(message);
        // In a real application, we would update the cart state here
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadMenuItems();
    
    // Add animation to feature cards on scroll
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