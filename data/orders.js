export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveOrders();
}

export function getOrder(orderId) {
    let matchingOrder;
    orders.forEach((order) => {
        if(order.id === orderId){
            matchingOrder = order;
        }
    });
    return matchingOrder;
}

export function getProductFromOrder(productId, orderId) {
    const order = getOrder(orderId);
    let matchingProduct;

    order.products.forEach((product) => {
        if(product.productId === productId){
            matchingProduct = product;
        }
    });
    return matchingProduct;
}

function saveOrders(){
    localStorage.setItem('orders', JSON.stringify(orders));
}