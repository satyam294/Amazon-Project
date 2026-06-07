/*
    INTEGRATION TESTING : testing interaction of two or more units
    CAN CHECK : What appears and how it behaves
*/

import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

describe('test suite: renderOrderSummary', () => {

    // HOOK : the common code that runs before each test case [it()] bundled together
    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-checkout-header-middle-section"></div>
            <div class="js-payment-summary"></div>
        `;

        // delete used localStorage.setItem() : mock it too
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                    id: productId1, 
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    id: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromStorage(); //update the cart using the mock function for the test
        renderOrderSummary(); // renders the required page
    });

    afterEach(() => {
        //clear the console after the test
        document.querySelector('.js-test-container').innerHTML = '';
    });
    

    // TC1 : tests what appears
    it('dsiplays the cart' , () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText 
        ).toContain('Quantity: 2');
        
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');
    });


    // TC2 : tests how elements behave
    it('removes a product', () => {
        // fetch the delete link and click it to test
        document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual(productId2);
    })
});