import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import "../data/backend-practice.js";


async function loadPage() {
    try {
        //throw 'error1';

        await loadProductsFetch();

        await new Promise((resolve, reject) => {
            // throw 'error2';
            loadCart(() => {
                //reject('error3');
                resolve();  
            })
        });

    }catch (error) {
        console.log('Error Orcured. try again');
    }
    

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
// Promise.all() : runs all the promises simultaneously, then executes the final step
// moves to then when all promises are resolved.
Promise.all([
    
    loadProductsFetch(),   //returns a promise

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value 1');  //values passed to resolve is shared with next then
    });

}).then((value) => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/

//lot of nesting using simple callbacks for synchronization
// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();  // render order summary
//         renderPaymentSummary();// render payment summary
//     });
// })

