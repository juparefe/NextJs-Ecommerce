export function FormatCurrency (value: number, currencyObject: any) {
    const price = value * (currencyObject?.currencyRate);
    return new Intl.NumberFormat('es-CO', { currency: currencyObject?.selectedCurrency || 'COP', style: 'currency' }).format(price);
};
