import { IBasketItem } from "../interfaces/IBasketItem";
import basketReducer, { addItemToBasket, IBasketState, removeItemFromBasket } from './basketSlice'


describe('Basket Reducer', () => {
    
    const mockHandSanitizerItem: IBasketItem = {
        itemName: "hand sanitizer",
        itemPrice: 19.99,
        itemId: "hs111",
        itemBarcode: "hs111"
    }
    const mockMaskItem: IBasketItem = {
        itemName: "mask",
        itemPrice: 2.00,
        itemId: "mask111111",
        itemBarcode: "mask111"
    }
    const mockToiletPaperItem: IBasketItem = {
        itemName: "toiletpaper",
        itemPrice: 0.60,
        itemId: "tp111",
        itemBarcode: "tp1114444"
    }

    it('should add to basket successfully', () => {
        const initialState: IBasketState = {
            selectedShopItems: [mockMaskItem, mockHandSanitizerItem],
            subTotal: 21.99,
            discountsApplied: [],
            totalSavings: 0,
            totalToPay: 21.99
        };
        const expectedState: IBasketState = {
            selectedShopItems: [
                mockMaskItem, 
                mockHandSanitizerItem,
                mockToiletPaperItem

            ],
            discountsApplied: [],
            subTotal: 22.59,
            totalSavings: 0,
            totalToPay: 22.59,
        }

        const state = basketReducer(initialState, addItemToBasket(mockToiletPaperItem))
        expect(state).toEqual(expectedState)
    })

    it('should remove from basket successfully', () => {

        const initialState: IBasketState = {
            selectedShopItems: [
                mockHandSanitizerItem,
                mockToiletPaperItem,
                mockMaskItem,

            ],
            subTotal: 0,
            discountsApplied: [],
            totalSavings: 0,
            totalToPay: 0
        };
        const expectedState: IBasketState = {
            selectedShopItems: [
                mockHandSanitizerItem,
                mockMaskItem
            ],
            discountsApplied: [],
            subTotal: 21.99,
            totalSavings: 0,
            totalToPay: 21.99,
        }

        const state = basketReducer(initialState, removeItemFromBasket(mockToiletPaperItem.itemId))
        expect(state).toEqual(expectedState)  
    })
})