// loading cart packed in a function -> but it still runs 
// when we import cart in some other file -> the whole cart.js runs once.

export let cart;

loadFromStorage();

//load cart from storage: to support mock function
export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart){
        cart = [{
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
}

// add products to cart
export function addToCart(pressedItemId){
    let matchedInCart = '';
    cart.forEach((product) => {
        if(product.id === pressedItemId){
            matchedInCart = product;
        }
    });
    
    //if found in card, increase quantity by 1, else add the product object to the cart.
    if(matchedInCart){
        matchedInCart.quantity += 1;
    } else{
        cart.push({
            id: pressedItemId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    saveCart();
}

// remove products from cart
export function removeFromCart(productId){
    let newCart = [];

    cart.forEach((item) => {
        if(item.id !== productId){
            newCart.push(item);
        }
    })

    cart = newCart;
    saveCart();
}

// update the delivery option
export function updateDeliveryOption(cartItemId, newOption){
    let cartItem;
    cart.forEach((item) => {
        if(item.id === cartItemId){
            cartItem = item;
            return;
        }
    })

    if(!cartItem) return;
    cartItem.deliveryOptionId = newOption;
    saveCart();
}

//get cart quantity
export function getCartQuantity(){
    let total = 0;
    cart.forEach((item) => {
        total += item.quantity;
    })
    return total;
}


//save the cart to local storage
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();  //marks the end of our work
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}