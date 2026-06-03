export const cart = []

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
            quantity: 1
        });
    }
}