import { cart, getCartQuantity, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => { 
      // for each product in cart, extract its complete details from products using the id.
      const matchingProduct = getProduct(cartItem.id);
      if (!matchingProduct) return;  //break

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      if(!deliveryOption) return;  //break

      //generate date for the delivery option associated w each cart item
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      //generate the html for each cart item using fetched product details
      cartSummaryHTML += 
      `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
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
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span data-product-id="${matchingProduct.id}" class="delete-quantity-link link-primary js-delete-link">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct.id, cartItem)} 
            </div>
          </div>
      </div>`
  })

  function deliveryOptionsHTML(matchingProductId, cartItem){
      const today = dayjs();
      let html = '';

      deliveryOptions.forEach((deliveryOption) => {
          const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
          const dateString = deliveryDate.format('dddd, MMMM D');

          const priceString = deliveryOption.priceCents === 0 
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.priceCents)} -`;
          
          const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

          html += 
          `<div class="delivery-option js-delivery-option"
            data-product-id="${matchingProductId}"
            data-delivery-option-id="${deliveryOption.id}">
              <input type="radio" ${isChecked? 'checked': ''}
                  class="delivery-option-input"
                  name="${matchingProductId}">
              <div>
                  <div class="delivery-option-date">
                  ${dateString}
                  </div>
                  <div class="delivery-option-price">
                  ${priceString} Shipping
                  </div>
              </div>
          </div>`
      })

      return html;
  }
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

   //correctly display the number of items in the header
    document.querySelector('.js-checkout-header-middle-section')
    .innerHTML = 
    `Checkout (<a class="return-to-home-link"
    href="amazon.html">${getCartQuantity()} items</a>)`

  //add event listeners to delete links
  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
      link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          removeFromCart(productId);
          //fetch container and remove it from the dom
          // document.querySelector(`.js-cart-item-container-${productId}`).remove();
          // console.log(cart);
          renderOrderSummary();
          renderPaymentSummary();
      })
  })

  //add event listeners to all delivery options
  document.querySelectorAll('.js-delivery-option')
  .forEach((deliveryOption) => {
    deliveryOption.addEventListener('click', () => {
      //get the delivery option id and product id associated with each delivery option
      const {productId, deliveryOptionId} = deliveryOption.dataset; 
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  })
}

