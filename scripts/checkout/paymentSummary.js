import { cart, resetCart } from '../../data/cart.js';
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder, orders } from "../../data/orders.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let totalItems = 0; // Initialize totalItems to count the items

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        totalItems += cartItem.quantity; // Update totalItems based on the quantity

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (<span class="top">${totalItems}</span>):</div> <!-- Corrected to reflect totalItems -->
        <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
        </div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}
        </div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
        </div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
        </div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
        </div>
        </div>

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-place-order')
        .addEventListener('click', async () => {
            try {
                const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart: cart
                    })
                });

                const order = await response.json();
                addOrder(order);
                
                // Empty the cart after the order is placed successfully
                resetCart();

                // Redirect to the orders page
                window.location.href = 'orders.html';
            } catch (error) {
                console.log('Unexpected Error, Try again later.');
            }
        });
}
