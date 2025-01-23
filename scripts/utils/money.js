export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}

// export default formatCurrancy; // now you can import it any where without the curly brackets , each file only have 1 default export