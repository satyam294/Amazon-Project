// render tracking page based on the url
import { getProductFromOrder } from "../data/orders.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import { formatDate } from "../scripts/utils/formatDate.js";

function renderTrackingPage(){
    const url = new URL(window.location.href);
    
    const productId = url.searchParams.get('productId');
    const orderId = url.searchParams.get('orderId');

    const product = getProduct(productId);
    const orderDetails = getProductFromOrder(productId ,orderId);

    let html = `
    <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
    </a>

    <div class="delivery-date">
        Arriving on ${formatDate(orderDetails.estimatedDeliveryTime, 'day')}
    </div>

    <div class="product-info">
        ${product.name}
    </div>

    <div class="product-info">
        Quantity: ${orderDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
        <div class="progress-label">
        Preparing
        </div>
        <div class="progress-label current-status">
        Shipped
        </div>
        <div class="progress-label">
        Delivered
        </div>
    </div>

    <div class="progress-bar-container">
        <div class="progress-bar"></div>
    </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = html;
}

loadProductsFetch().then(() => {
    renderTrackingPage();
}).catch(() => {
    console.log('Products not available! Failed to load tracking page!');
})


