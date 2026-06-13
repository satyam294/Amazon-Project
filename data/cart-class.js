class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage(); 
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
            this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    saveCart(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(pressedItemId){
        let matchedInCart;
        this.cartItems.forEach((product) => {
            if(product.productId === pressedItemId){
                matchedInCart = product;
            }
        });
        
        if(matchedInCart){
            matchedInCart.quantity += 1;
        } else{
            this.cartItems.push({
                productId: pressedItemId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }
        this.saveCart();
    }

    removeFromCart(productId){
        let newCart = [];

        this.cartItems.forEach((item) => {
            if(item.productId !== productId){
                newCart.push(item);
            }
        })

        this.cartItems = newCart;
        this.saveCart();
    }

    updateDeliveryOption(cartItemId, newOption){
        let match;
        this.cartItem.forEach((item) => {
            if(item.productId === cartItemId){
                match = item;
                return;
            }
        })

        if(!match) return;
        match.deliveryOptionId = newOption;
        this.saveCart();
    }

     getCartQuantity(){
        let total = 0;
        this.cartItems.forEach((item) => {
            total += item.quantity;
        })
        return total;
    }

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);










