export function getDeliveryOption(deliveryOptionId){
    let delOpt;
    deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionId){
            delOpt = option;
            return;
        }
    })
    return delOpt;
}

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];