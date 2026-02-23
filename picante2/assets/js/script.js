// Cart System
let cart = [];

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        if (!link.classList.contains('cart-link') && !link.classList.contains('chat-btn')) {
            navMenu.classList.remove('active');
        }
    });
});

// Update active nav link based on current page
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
updateActiveNav();

// Chat Functionality
const chatBtn = document.getElementById('chatBtn');
const chatModal = document.getElementById('chatModal');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

if (chatBtn) {
    chatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        chatModal.style.display = 'block';
        chatInput.focus();
    });
}

function closeChatModal() {
    chatModal.style.display = 'none';
}

// Close chat when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === chatModal) {
        closeChatModal();
    }
});

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';

    // Simulate CEO response
    setTimeout(() => {
        const response = generateCEOResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const textSpan = document.createElement('span');
    textSpan.className = 'message-text';
    textSpan.textContent = text;
    
    messageDiv.appendChild(textSpan);
    chatMessages.appendChild(messageDiv);
    
    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateCEOResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
        'hello': 'Hello! Welcome to CAFE PICANTE. How can I help you today?',
        'hi': 'Hi there! Great to see you. What can I do for you?',
        'menu': 'Our menu features premium coffee, delicious pastries, and authentic spicy dishes. Would you like to know more about any specific category?',
        'coffee': 'We serve the finest coffee in town! From espresso to cappuccino, each cup is prepared with care. Are you interested in any special blend?',
        'reservation': 'We\'d love to have you visit us! You can make a reservation through our Services page. How many guests are you planning to bring?',
        'hours': 'We\'re open Monday to Sunday, 7 AM to 10 PM. Perfect time to stop by!',
        'location': 'You can find us at our location. Feel free to call us at +1 (555) 123-4567 for directions.',
        'delivery': 'Yes, we offer delivery service! Orders can be placed through our Takeout or Delivery option on the Services page.',
        'catering': 'We provide excellent catering services for events and gatherings. What kind of event are you planning?',
        'price': 'Our prices are very reasonable! Check our Menu page for detailed pricing on all items.',
        'spicy': 'Love spicy food? You\'re in the right place! We have a variety of spicy options that will satisfy your taste buds.',
        'team': 'Our team is passionate about delivering excellence. We have experienced chefs, baristas, and staff dedicated to your satisfaction.',
        'about': 'CAFE PICANTE was founded in 2015 with a mission to bring premium coffee and authentic spicy cuisine together. Check our About page to learn more!',
        'contact': 'You can reach us at info@cafepicante.com or call +1 (555) 123-4567. We\'d love to hear from you!',
        'thanks': 'You\'re welcome! It\'s our pleasure to serve you. Come back soon!',
        'thank you': 'You\'re very welcome! We appreciate your support. See you soon!',
        'cart': 'I can help you find items to add to your cart! Check our menu page for all our delicious offerings.',
        'order': 'Ready to place an order? Browse our menu, add items to your cart, and checkout when you\'re ready!',
    };

    for (const [key, value] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }

    // Default responses
    const defaultResponses = [
        'That\'s a great question! Feel free to visit us or call +1 (555) 123-4567 for more information.',
        'I appreciate the inquiry! Please check our website or contact us directly for more details.',
        'Thanks for your interest! Is there anything else I can help you with?',
        'That\'s interesting! Feel free to explore our menu and services on the website.',
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Reservation Form Handler
function handleReservation(event) {
    event.preventDefault();
    alert('Thank you for your reservation request! We will confirm your booking shortly. Please check your email for confirmation.');
    event.target.reset();
}

// Cart Functions
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
    }
}

const cartToggle = document.getElementById('cartToggle');
if (cartToggle) {
    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleCart();
    });
}

function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }
    
    updateCart();
    showAddedNotification(itemName);
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCart();
}

function updateQuantity(itemName, change) {
    const item = cart.find(i => i.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const subtotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.style.display = 'none';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            const itemTotal = item.price * item.quantity;
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rs${item.price} × ${item.quantity}</p>
                    <p class="item-total">Total: Rs${itemTotal.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        checkoutBtn.style.display = 'block';
    }

    // Calculate totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotalAmount * 0.1;
    const totalAmount = subtotalAmount + taxAmount;

    subtotal.textContent = `Rs${subtotalAmount.toFixed(2)}`;
    tax.textContent = `Rs${taxAmount.toFixed(2)}`;
    total.textContent = `Rs${totalAmount.toFixed(2)}`;

    // Save to localStorage
    localStorage.setItem('cafePicanteCart', JSON.stringify(cart));
}

function gotoCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Close cart sidebar
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
    }

    // Display order summary
    orderItems.innerHTML = '';
    let totalAmount = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>Rs${itemTotal.toFixed(2)}</span>
        `;
        orderItems.appendChild(orderItem);
    });

    const taxAmount = totalAmount * 0.1;
    const finalTotal = totalAmount + taxAmount;
    orderTotal.textContent = `Rs${finalTotal.toFixed(2)}`;

    // Show checkout modal
    if (checkoutModal) {
        checkoutModal.classList.add('active');
    }
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.remove('active');
    }
}

function placeOrder(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const notes = document.getElementById('customerNotes').value;

    // Calculate order total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotal * 0.1;
    const total = subtotal + taxAmount;

    // Create order object
    const order = {
        id: Date.now(),
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address,
        customerNotes: notes,
        items: cart,
        subtotal: subtotal,
        tax: taxAmount,
        total: total,
        orderDate: new Date().toLocaleString(),
        status: 'pending'
    };

    // Save order
    let orders = JSON.parse(localStorage.getItem('cafePicanteOrders')) || [];
    orders.push(order);
    localStorage.setItem('cafePicanteOrders', JSON.stringify(orders));

    // Show success message
    showOrderSuccess(order);

    // Clear form and cart
    document.querySelector('.checkout-form').reset();
    cart = [];
    updateCart();
    
    // Close modal
    closeCheckout();
}

function showOrderSuccess(order) {
    alert(`
✅ Order Placed Successfully!

Order ID: ${order.id}
Customer: ${order.customerName}
Phone: ${order.customerPhone}
Address: ${order.customerAddress}

Items:
${order.items.map(item => `- ${item.name} x${item.quantity}: Rs${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Subtotal: Rs${order.subtotal.toFixed(2)}
Tax: Rs${order.tax.toFixed(2)}
Total: Rs${order.total.toFixed(2)}

A confirmation email will be sent to: ${order.customerEmail}
We will deliver your order within 30-45 minutes!

Thank you for ordering from CAFE PICANTE! 🌶️☕
    `);
}

function showAddedNotification(itemName) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #d84a38 0%, #2c3e50 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        z-index: 2500;
    `;
    notification.textContent = `✓ ${itemName} added to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Load cart from localStorage on page load
window.addEventListener('load', function() {
    const savedCart = localStorage.getItem('cafePicanteCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card, .menu-item, .value-card, .team-member, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add smooth fade-in for page load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});
document.body.style.opacity = '0.95';

// Search Menu Items Function
function searchMenuItems() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const menuCategories = document.querySelectorAll('.menu-category');
    let hasResults = false;

    menuCategories.forEach(category => {
        const menuItems = category.querySelectorAll('.menu-item');
        let categoryHasResults = false;

        menuItems.forEach(item => {
            const itemName = item.querySelector('h4').textContent.toLowerCase();
            const itemDescription = item.querySelector('p').textContent.toLowerCase();
            
            if (itemName.includes(searchInput) || itemDescription.includes(searchInput) || searchInput === '') {
                item.style.display = 'block';
                categoryHasResults = true;
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide category based on whether it has visible items
        if (categoryHasResults || searchInput === '') {
            category.style.display = 'block';
        } else {
            category.style.display = 'none';
        }
    });

    // Show "no results" message if nothing found
    let noResultsMsg = document.getElementById('noResultsMsg');
    if (!hasResults && searchInput !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMsg';
            noResultsMsg.className = 'no-results';
            noResultsMsg.textContent = '❌ No items found matching your search';
            document.querySelector('.menu-section .container').insertBefore(
                noResultsMsg,
                document.querySelector('.menu-category')
            );
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}
// Rating Modal Functions
let userRating = 0;

function openRating() {
    const ratingModal = document.getElementById('ratingModal');
    if (ratingModal) {
        ratingModal.style.display = 'flex';
        ratingModal.style.justifyContent = 'center';
        ratingModal.style.alignItems = 'center';
        userRating = 0;
        // Reset stars
        document.querySelectorAll('.rating-stars .star').forEach(star => {
            star.style.color = '#ddd';
        });
    }
}

function closeRating() {
    const ratingModal = document.getElementById('ratingModal');
    if (ratingModal) {
        ratingModal.style.display = 'none';
    }
}

function setRating(rating) {
    userRating = rating;
    const stars = document.querySelectorAll('.rating-stars .star');
    stars.forEach((star, index) => {
        star.style.color = index < rating ? '#f39c12' : '#ddd';
        star.style.fontSize = index < rating ? '2rem' : '1.5rem';
        star.style.cursor = 'pointer';
        star.style.transition = 'all 0.2s ease';
    });
}

function submitRating() {
    const comment = document.getElementById('ratingComment').value.trim();
    
    if (userRating === 0) {
        alert('Please select a rating before submitting!');
        return;
    }

    // Create rating object
    const rating = {
        id: Date.now(),
        rating: userRating,
        comment: comment,
        date: new Date().toLocaleString()
    };

    // Save rating
    let ratings = JSON.parse(localStorage.getItem('cafePicanteRatings')) || [];
    ratings.push(rating);
    localStorage.setItem('cafePicanteRatings', JSON.stringify(ratings));

    // Show success message
    alert(`✨ Thank you for your feedback!\n\nRating: ${'⭐'.repeat(userRating)}\nComment: ${comment || 'No comment provided'}\n\nWe appreciate your support! 🌶️`);

    // Reset and close
    document.getElementById('ratingComment').value = '';
    closeRating();
}

// Keyboard shortcut for rating
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRating();
    }
});

// Close rating modal when clicking outside
window.addEventListener('click', function(e) {
    const ratingModal = document.getElementById('ratingModal');
    if (e.target === ratingModal) {
        closeRating();
    }
});

// Phone Number Validation - Limit to 11 numbers only
const phoneInput = document.getElementById('customerPhone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        // Remove all non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 11 digits
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        // Update the input value
        e.target.value = value;
    });

    // Prevent non-numeric input
    phoneInput.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which);
        if (!/[0-9]/.test(char)) {
            e.preventDefault();
        }
    });
}