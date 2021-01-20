import * as React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { convertNumberToCurrency } from "../../app/currency";
import "./Basket.scss";
import { IDiscountApplied } from "./interfaces/IDiscountApplied";
import { IBasketItem } from "./interfaces/IBasketItem";
import {
  removeItemFromBasket,
  selectDiscountsApplied,
  selectShopItems,
  selectSubTotal,
  selectTotalSavings,
  selectTotalToPay,
} from "./redux/basketSlice";

export const Basket = () => {
  const selectedShopItems: IBasketItem[] = useSelector(selectShopItems);
  const subtotal: number = useSelector(selectSubTotal);
  const discountsApplied: IDiscountApplied[] = useSelector(
    selectDiscountsApplied
  );
  const totalSavings: number = useSelector(selectTotalSavings);
  const totalToPay: number = useSelector(selectTotalToPay);
  const dispatch = useDispatch();

  return (
    <div className="basket" data-testid="basket">
      <h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="32"
          fill="currentColor"
          className="bi bi-basket-fill basket__icon"
          viewBox="0 0 16 16"
        >
          <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z" />
        </svg>
        <span className="basket__title"> Basket </span>
      </h1>
      <div className="basket__summary">
        <div className="basket__section">
          <h4>
            Items In Basket &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;Sub Total:{" "}
            <span data-testid={"basket-sub-total"}>
              {convertNumberToCurrency(subtotal)}
            </span>
          </h4>
          {selectedShopItems.map((item) => {
            return (
              <div key={item.itemId} className="basket__item">
                {item.itemVolumeMetric && item.itemVolume && (
                  <div data-testid={"basket-selected-item-info"}>
                    {item.itemName}
                    <br />
                    {item.itemVolume}&nbsp;
                    {item.itemVolumeMetric} @{" "}
                    {convertNumberToCurrency(item.itemPrice)}/
                    {item.itemVolumeMetric}{" "}
                    {convertNumberToCurrency(item.itemPrice * item.itemVolume)}
                  </div>
                )}
                {!item.itemVolumeMetric && (
                  <div data-testid={"basket-selected-item-info"}>
                    {item.itemName} {convertNumberToCurrency(item.itemPrice)}
                  </div>
                )}
                <div className="basket__remove">
                  <Button
                    data-testid={"basket-remove-" + item.itemId}
                    onClick={() => dispatch(removeItemFromBasket(item.itemId))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="basket__section"></div>
        <div className="basket__section">
          <h4>Savings / Discounts Applied</h4>
          {discountsApplied.length > 0 &&
            discountsApplied.map((discount, i) => {
              return (
                <div key={"discount-applied-" + i}>
                  <p>
                    {" "}
                    {discount.itemName} &nbsp; &nbsp;&nbsp;&nbsp;
                    {discount.discountName} Discount Amount:&nbsp;&nbsp;
                    {discount.discountAmount.toFixed(2)}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="basket__section">
          <h4 data-testid="basket-total-savings">
            Total Savings: {convertNumberToCurrency(totalSavings)}
          </h4>
        </div>
        <div className="basket__section">
          <h4 data-testid="basket-total-to-pay">
            Total To Pay: {convertNumberToCurrency(totalToPay)}
          </h4>
        </div>
      </div>
    </div>
  );
};
