import { IShopItemDiscountInfo } from "../../shop/shop-item/interfaces/IShopItemDiscountInfo";
import { IBasketItem } from "../interfaces/IBasketItem";
import { IDiscountApplied } from "../interfaces/IDiscountApplied";


interface IItemInfoForDiscount extends IShopItemDiscountInfo{
    quantity: number;   
    itemName: string;
}

export class BasketReducerHelper {
    public static calculateSubTotal( selectedItems: IBasketItem[] | []): number {
        if (selectedItems.length === 0 ) return 0;
        let total: number = 0;
        selectedItems.forEach( (item) => {
            const itemVol = item.itemVolume ?? 1
            const calculatedAmount: number = item.itemPrice * itemVol;
            total += calculatedAmount;
        })

        return total;
    }

    public static calculateDiscountsToApply ( selectedItems: IBasketItem[] | []): IDiscountApplied[]{
        
        if (selectedItems.length === 0 ) return [];

        const itemsMappedByBarCode: Map<string, IItemInfoForDiscount> = new Map();
        let discountsApplied: IDiscountApplied[] = [];
        selectedItems.forEach( (item: IBasketItem) => {
            // don't bother tracking items without discount codes
            if(item.itemDiscount){
                if(itemsMappedByBarCode.has(item.itemBarcode)){
                    const itemInfoforDiscount: IItemInfoForDiscount = itemsMappedByBarCode.get(item.itemBarcode) as IItemInfoForDiscount
                    itemsMappedByBarCode.set(item.itemBarcode, {
                        requiredVolumeForDiscount: itemInfoforDiscount.requiredVolumeForDiscount,
                        discountPriceToApply: itemInfoforDiscount.discountPriceToApply,
                        discountName: itemInfoforDiscount.discountName,
                        quantity: itemInfoforDiscount.quantity + 1,
                        itemName: itemInfoforDiscount.itemName
                    })
                } else {
                    // first entry in map
                    itemsMappedByBarCode.set(item.itemBarcode, {
                        requiredVolumeForDiscount: item.itemDiscount.requiredVolumeForDiscount,
                        discountPriceToApply: item.itemDiscount.discountPriceToApply,
                        discountName: item.itemDiscount.discountName,
                        quantity: 1,
                        itemName: item.itemName
                    })
                } 
            }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, value] of itemsMappedByBarCode) {
              const numOfDiscountsToApply: number = Math.floor(value.quantity/value.requiredVolumeForDiscount); 
              for(let i =0; i < numOfDiscountsToApply; i++){
                  discountsApplied.push({itemName: value.itemName, discountName: value.discountName, discountAmount: value.discountPriceToApply})
              }
        }
        return discountsApplied;
    }

    public static calculateTotalSavings(discountApplied: IDiscountApplied[]){
        let totalSavings: number = 0;
        discountApplied.forEach((discount) =>{
            totalSavings += discount.discountAmount
        })
        return totalSavings;
    }

    public static calculateTotalToPay( subTotal: number, totalSavings: number){
        return subTotal - totalSavings;
    }
    
}