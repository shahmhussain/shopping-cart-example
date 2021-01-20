import { IShopItemDiscountInfo } from "../../shop/shop-item/interfaces/IShopItemDiscountInfo";

export interface IBasketItem {
    itemName: string;
    itemPrice: number;
    itemId: string;
    itemBarcode: string;
    itemDiscount?: IShopItemDiscountInfo;
    itemVolume?: number;
    itemVolumeMetric?: string;
}