export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveOrders();
}

function saveOrders(){
    localStorage.setItem('orders', JSON.stringify(orders));
}