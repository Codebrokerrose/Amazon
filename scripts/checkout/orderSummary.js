//named import
import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions ,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";
//  ESM -- EcmaScript Module  
import dayjs from 'https://cdn.skypack.dev/dayjs@1.11.10';  //default

// const today = dayjs(); // Get the current date
// const deliveryDate = today.add(7, 'days'); // Add significant amount of time to the current date 
// const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D'); // Easy-to-read format

//MVC - model , view ,controller .... it makes sure the page always matches the data , MVC is a design pattern, its a way to organize and design our code

export function renderOrderSummary(){

  let cartSummaryHTML = '';
  //took to MODEL/data
  cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      const matchingProduct = getProduct(productId);

      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      if (deliveryOption) { // Check if a matching delivery option is found
          const today = dayjs();
          const deliveryDate = today.add(
              deliveryOption.deliveryDays,
              'days'
          );
          const dateString = deliveryDate.format(
              'dddd, MMMM D'
          );
          //GENETATE THE HTML FOR THE VIEW
          cartSummaryHTML += `
              <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                  <div class="delivery-date">
                    Delivery date: ${dateString}
                  </div>

                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src="${matchingProduct.image}">

                    <div class="cart-item-details">
                      <div class="product-name">
                        ${matchingProduct.name}
                      </div>
                      <div class="product-price">
                        ${matchingProduct.getPrice()}
                      </div>
                      <div class="product-quantity">
                        <span>
                          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>

                      ${deliveryOptionsHTML(matchingProduct, cartItem)}
                      
                    </div>
                  </div>
                </div>
          `;
      } else {
          console.error(`No matching delivery option found for id: ${deliveryOptionId}`);
      }
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = '';
      deliveryOptions.forEach((deliveryOption) => {
        // For each delivery option, generate the HTML
          const today = dayjs();
          const deliveryDate = today.add(
              deliveryOption.deliveryDays,
              'days'
          );
          const dateString = deliveryDate.format(
              'dddd, MMMM D'
          );

          const priceString = deliveryOption.priceCents === 0
              ? 'FREE'
              : `$${formatCurrency(deliveryOption.priceCents)} - `;

          const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

          html += `
          <div class="delivery-option js-delivery-option"
              data-product-id="${matchingProduct.id}"
              data-delivery-id="${deliveryOption.id}">

              <input type="radio" 
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
          </div>
          `;
      });
      return html;
  }
  
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          removeFromCart(productId);

          const container = document.querySelector(
              `.js-cart-item-container-${productId}`
          );
          container.remove();

          renderPaymentSummary();
      });
  });

  //CONTROLLER
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener('click', () => {
            const productId = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryId;
            updateDeliveryOption(productId, deliveryOptionId); //UPDATE THE CONTROLLER
            //recursion
            renderOrderSummary(); //automatic updation on click , regenerate the view using the updated data

            renderPaymentSummary();
        });
    });
}

// renderOrderSummary();
