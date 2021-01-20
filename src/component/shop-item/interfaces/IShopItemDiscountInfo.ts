/**
 * If you apply discounts based on requiredVolumeForDiscount
 * you can easily apply a 3 for 2 discount on items in the future
 */
export interface IShopItemDiscountInfo {
    requiredVolumeForDiscount: number;
    discountPriceToApply: number;
    discountName: string;
}