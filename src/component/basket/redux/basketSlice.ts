import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { BasketReducerHelper } from './BasketReducerHelper';
import { IDiscountApplied } from '../interfaces/IDiscountApplied'
import { IBasketItem } from "../interfaces/IBasketItem";

export interface IBasketState {
  selectedShopItems: IBasketItem[];
  subTotal: number;
  discountsApplied: IDiscountApplied[]
  totalSavings: number;
  totalToPay: number;
}


const initialState: IBasketState = {
  selectedShopItems: [],
  subTotal: 0,
  discountsApplied: [],
  totalSavings: 0,
  totalToPay: 0
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket: (state, action: PayloadAction<IBasketItem>) => {
      state.selectedShopItems = [...state.selectedShopItems, action.payload ]
      state.subTotal = BasketReducerHelper.calculateSubTotal(state.selectedShopItems);
      state.discountsApplied = BasketReducerHelper.calculateDiscountsToApply(state.selectedShopItems);
      state.totalSavings = BasketReducerHelper.calculateTotalSavings(state.discountsApplied);
      state.totalToPay = BasketReducerHelper.calculateTotalToPay(state.subTotal, state.totalSavings);
    },
    removeItemFromBasket: (state, action: PayloadAction<string>) => {
      state.selectedShopItems = state.selectedShopItems.filter( item => item.itemId !== action.payload)
      state.subTotal = BasketReducerHelper.calculateSubTotal(state.selectedShopItems);
      state.discountsApplied = BasketReducerHelper.calculateDiscountsToApply(state.selectedShopItems);
      state.totalSavings = BasketReducerHelper.calculateTotalSavings(state.discountsApplied);
      state.totalToPay = BasketReducerHelper.calculateTotalToPay(state.subTotal, state.totalSavings);
    },
  },
});

export const { addItemToBasket, removeItemFromBasket } = basketSlice.actions;


export const selectShopItems = (state: RootState) => state.basket.selectedShopItems;
export const selectSubTotal = (state: RootState) => state.basket.subTotal;
export const selectDiscountsApplied = (state: RootState) => state.basket.discountsApplied;
export const selectTotalSavings = (state: RootState) => state.basket.totalSavings;
export const selectTotalToPay = (state: RootState) => state.basket.totalToPay;


export default basketSlice.reducer;
