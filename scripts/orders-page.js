import { orders } from "../data/orders.js"; 
import { formatDate } from "./utils/formatDate.js";
import { formatCurrency } from "./utils/money.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";

function generateOrderDetails(order) {
    let html = '';

    html += `
    <div class="order-header">
        <div class="order-header-left-section">
            <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
        </div>
        <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
        </div>
    </div>
    `

    order.products.forEach((productDetails) => {
        const product = getProduct(productDetails.productId);

        html += `
        <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formatDate(productDetails.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button"
                data-product-id=${product.id} >
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.id}">  <!-- adding info to the url-->
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>  
        </div>
        `
    });

    return html;
}

function renderOrdersPage() {
    let ordersHTML = '';

    orders.forEach((order) => {
        ordersHTML += `
        <div class="order-container">
            ${generateOrderDetails(order)}
        </div>
        `
    });

    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(button.dataset.productId);
        updateCartQuantity();
      })
    });
}

loadProductsFetch().then(() => {
    renderOrdersPage();
    updateCartQuantity();
}).catch(() => {
    console.log('Loading products failed!');
})


