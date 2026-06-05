//convert cents to dollars
export function formatCurrency(priceCents){
    return (Math.round(priceCents) / 100).toFixed(2);
}