import { BasketReducerHelper } from "./BasketReducerHelper"
import { IBasketItem } from "../interfaces/IBasketItem";
import { IDiscountApplied } from "../interfaces/IDiscountApplied";

describe('BasketReducerHelper', () => {
    
    describe('calculateSubTotal', () => {
        
        it('should return 0 when selected items is empty', () => {
            const basketItem: IBasketItem[] = []
            const subtotal = BasketReducerHelper.calculateSubTotal(basketItem)
            expect(subtotal).toBe(0)
        })
        it('should should return 11.30 when 4 items cost 2.50 and two items cost 0.65', () => {
            const basketItem: IBasketItem[] = [
                {
                    itemName: 'Face Masks',
                    itemPrice: 2.5,
                    itemId: '1610910702621',
                    itemBarcode: "facemask111",
                  },
                  {
                    itemName: 'Face Masks',
                    itemPrice: 2.5,
                    itemId: '1610910702907',
                    itemBarcode: "facemask111",
                  },
                  {
                    itemName: 'Face Masks',
                    itemPrice: 2.5,
                    itemId: '1610910703971',
                    itemBarcode: "facemask111",
                  },
                  {
                    itemName: 'Face Masks',
                    itemPrice: 2.5,
                    itemId: '1610910704295',
                    itemBarcode: "facemask111",
                  },
                  {
                    itemName: 'Toilet Paper',
                    itemPrice: 0.65,
                    itemId: '1610910713530',
                    itemBarcode: "facemask111",
                  },
                  {
                    itemName: 'Toilet Paper',
                    itemPrice: 0.65,
                    itemId: '1610910714074',
                    itemBarcode: "facemask111",
                  }
            ]
            const subtotal = BasketReducerHelper.calculateSubTotal(basketItem)
            expect(subtotal).toBe(11.30)
        })
    
    })
    describe('calculateDiscountsToApply()', () =>{
        
        it('should return an empty array when no items are in the basket', () =>{
            const basketItems: IBasketItem[] = [];
            const discountsApplied: IDiscountApplied[] = BasketReducerHelper.calculateDiscountsToApply(basketItems);
            expect(discountsApplied).toStrictEqual([]);
        })

        it('should return 2 discount codes, one for mask, another for toilet paper', () =>{
        const basketItems: IBasketItem[] = [
            {
                itemName: 'Face Masks',
                itemPrice: 2.5,
                itemId: '1610910702621',
                itemBarcode: "facemask111",
                itemDiscount: {
                    requiredVolumeForDiscount: 2,
                    discountPriceToApply: 1,
                    discountName: " 2 for 4",
                },
              },
              {
                itemName: 'Face Masks',
                itemPrice: 2.5,
                itemId: '1610910702907',
                itemBarcode: "facemask111",
                itemDiscount: {
                    requiredVolumeForDiscount: 2,
                    discountPriceToApply: 1,
                    discountName: " 2 for 4",
                },
              },
              {
                itemName: 'Face Masks',
                itemPrice: 2.5,
                itemId: '1610910702907',
                itemBarcode: "facemask111",
                itemDiscount: {
                    requiredVolumeForDiscount: 2,
                    discountPriceToApply: 1,
                    discountName: " 2 for 4",
                },
              },
              {
                itemName: 'Toilet Paper',
                itemPrice: 0.65,
                itemId: '161910713530',
                itemBarcode: "tp111",
                itemDiscount: {
                    requiredVolumeForDiscount: 6,
                    discountPriceToApply: 0.65,
                    discountName: " 6 for 5",
                },
              },
              {
                itemName: 'Toilet Paper',
                itemPrice: 0.65,
                itemId: '16109714074',
                itemBarcode: "tp111",
                itemDiscount: {
                    requiredVolumeForDiscount: 6,
                    discountPriceToApply: 0.65,
                    discountName: " 6 for 5",
                  },
              },
              {
                itemName: 'Toilet Paper',
                itemPrice: 0.65,
                itemId: '610910714071',
                itemBarcode: "tp111",
                itemDiscount: {
                    requiredVolumeForDiscount: 6,
                    discountPriceToApply: 0.65,
                    discountName: " 6 for 5",
                },
              },
              {
                itemName: 'Toilet Paper',
                itemPrice: 0.65,
                itemId: '10910714074',
                itemBarcode: "tp111",
                itemDiscount: {
                    requiredVolumeForDiscount: 6,
                    discountPriceToApply: 0.65,
                    discountName: " 6 for 5",
                },
              },
              {
                itemName: 'Toilet Paper',
                itemPrice: 0.65,
                itemId: '1610910074',
                itemBarcode: "tp111",
                itemDiscount: {
                    requiredVolumeForDiscount: 6,
                    discountPriceToApply: 0.65,
                    discountName: " 6 for 5",
                },
              },
              {
                itemName: 'Toilet Paper',
                itemPrice: 0.65,
                itemId: '1610000910714074',
                itemBarcode: "tp111",
                itemDiscount: {
                    requiredVolumeForDiscount: 6,
                    discountPriceToApply: 0.65,
                    discountName: " 6 for 5",
                },
              }
        ]
        const expectedDiscountApplied: IDiscountApplied[] = [
            {
                itemName: 'Face Masks',
                discountName: " 2 for 4",
                discountAmount: 1
            },
            {
                itemName: 'Toilet Paper',
                discountName: " 6 for 5",
                discountAmount: 0.65
            }
        ];
        
        
            const discountsApplied: IDiscountApplied[] = BasketReducerHelper.calculateDiscountsToApply(basketItems);
            expect(discountsApplied).toStrictEqual(expectedDiscountApplied);
        })
        
    })
    describe('calculateTotalSavings()', () => {
        it('should calculate the total savings from all discounts', () =>{
            const discountApplied: IDiscountApplied[] = [
                {
                    itemName: 'Face Masks',
                    discountName: " 2 for 4",
                    discountAmount: 1
                },
                {
                    itemName: 'Toilet Paper',
                    discountName: " 6 for 5",
                    discountAmount: 0.65
                },
                {
                    itemName: 'Toilet Paper',
                    discountName: " 6 for 5",
                    discountAmount: 0.65
                }
            ];
            const expectedTotalSavings = 2.3;
            const totalSavings: number = BasketReducerHelper.calculateTotalSavings(discountApplied);
            expect(totalSavings).toBe(expectedTotalSavings)
        })
    })

    describe('calculateTotalToPay()', () => {
        it('should calculate the total to pay based off sub total and total savings', () =>{
            const subTotal = 10;
            const totalSavings = 2;
            const expectedTotalToPay = 8;
            expect(BasketReducerHelper.calculateTotalToPay(subTotal, totalSavings)).toBe(expectedTotalToPay)
        })
    })
})