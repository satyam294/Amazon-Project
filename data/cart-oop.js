// loading cart packed in a function -> but it still runs 
// when we import cart in some other file -> the whole cart.js runs once.

function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,

        //load cart from storage: to support mock function
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            if(!this.cartItems){
                this.cartItems = [{
                            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
                            quantity: 2,
                            deliveryOptionId: '1'
                        },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            quantity: 1,
                            deliveryOptionId: '2'
                        }
                    ]
            }
        },

        //save the cart to local storage
        saveCart(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        // add products to cart
        addToCart(pressedItemId){
            let matchedInCart;
            this.cartItems.forEach((product) => {
                if(product.id === pressedItemId){
                    matchedInCart = product;
                }
            });
            
            //if found in card, increase quantity by 1, else add the product object to the cart.
            if(matchedInCart){
                matchedInCart.quantity += 1;
            } else{
                this.cartItems.push({
                    id: pressedItemId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }
            this.saveCart();
        },

        // remove products from cart
        removeFromCart(productId){
            let newCart = [];

            this.cartItems.forEach((item) => {
                if(item.id !== productId){
                    newCart.push(item);
                }
            })

            this.cartItems = newCart;
            this.saveCart();
        },

        // update the delivery option
        updateDeliveryOption(cartItemId, newOption){
            let match;
            this.cartItem.forEach((item) => {
                if(item.id === cartItemId){
                    match = item;
                    return;
                }
            })

            if(!match) return;
            match.deliveryOptionId = newOption;
            this.saveCart();
        },

        //get cart quantity
        getCartQuantity(){
            let total = 0;
            this.cartItems.forEach((item) => {
                total += item.quantity;
            })
            return total;
        }
    };
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);













