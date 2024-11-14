// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Código para el login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const validEmail = 'correo123@prueba.com';
            const validPassword = 'contraseñasecreta123';

            if (email === validEmail && password === validPassword) {
                window.location.href = 'e-commerce.html';
            } else {
                alert('Correo o contraseña incorrectos');
            }
        });
    }

    // Codigo main para la pagina
    if (document.body.classList.contains('ecommerce')) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const cartTotalElement = document.createElement('div');
        cartTotalElement.className = 'cart-total';
        document.querySelector('.header-container').appendChild(cartTotalElement);

        function updateCartTotal() {
            const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
            cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function addToCart(product) {
            const existingProduct = cart.find(p => p.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCartTotal();
        }

        // Agregar eventos a los botones solo en la página de productos
        const addToCartButtons = document.querySelectorAll('.product button');
        if (addToCartButtons.length > 0) {
            addToCartButtons.forEach(button => {
                const productElement = button.closest('.product');
                const name = productElement.querySelector('h3').textContent;
                const price = parseFloat(productElement.querySelector('.price').textContent.replace('$', ''));

                button.addEventListener('click', () => {
                    addToCart({ name, price });
                    
                });
            });
        }

        // Mostrar la tabla en la pagina del carrito
        const cartTable = document.getElementById('cart-table');
        if (cartTable) {
            const tbody = cartTable.querySelector('tbody');
            
            function updateCartDisplay() {
                tbody.innerHTML = '';
                
                cart.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.name}</td>
                        <td>$${product.price.toFixed(2)}</td>
                        <td>${product.quantity}</td>
                        <td>$${(product.price * product.quantity).toFixed(2)}</td>
                    `;
                    tbody.appendChild(row);
                });

                const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
                document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
            }

            // Funcion para vaciar el carrito
            function clearCart() {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                updateCartTotal();
            }

            // Evento para el boton de vaciar el carrito 
            const clearCartButton = document.getElementById('clear-cart');
            if (clearCartButton) {
                clearCartButton.addEventListener('click', () => {
                    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                        clearCart();
                    }
                });
            }

            updateCartDisplay();
        }

        // Evento para el boton de finalizar compra 
        const checkoutButton = document.getElementById('checkout');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (cart.length > 0) {
                    window.location.href = 'checkout.html';
                } else {
                    alert('El carrito está vacío');
                }
            });
        }

        // Formulario del checkout
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (event) => {
                event.preventDefault();
                alert('¡Gracias por tu compra!');
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = 'e-commerce.html';
            });
        }

        //Actualizar el total del carrito 
        updateCartTotal();
    }
    
});
