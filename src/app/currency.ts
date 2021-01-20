export const CURRENCY_SYMBOL: string = "£";

export const convertNumberToCurrency = (number: number): string => {
    return CURRENCY_SYMBOL+ number.toFixed(2)  
} 