import * as React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addItemToBasket } from "../basket/redux/basketSlice";
import { convertNumberToCurrency } from "../../app/currency";
import { IShopItemDiscountInfo } from "./interfaces/IShopItemDiscountInfo";
import "./ShopItem.scss";

interface IShopItemVolumeData {
  itemMinVolume?: number;
  itemUnit: string;
  itemUnitDescription: string;
}

export type IShopItemProps = {
  itemName: string;
  itemPrice: number;
  itemDescription: string;
  itemBarcode: string;
  itemDiscount?: IShopItemDiscountInfo;
  volumeData?: IShopItemVolumeData;
};

const DEFAULT_ITEM_MIN_VOLUME: number = 0.1;
export const ITEM_ERROR_MESSAGE: string = "Please enter a value greater than";

/**
 * I decided to make this a seperate component so i could unit test this easier
 *
 */

export const ShopItem = ({
  itemName,
  itemPrice,
  itemDescription,
  itemDiscount,
  itemBarcode,
  volumeData,
}: IShopItemProps) => {
  const dispatch = useDispatch();
  const [itemVolume, setItemVolume] = useState(1);
  const itemMimimumVolume =
    volumeData?.itemMinVolume ?? DEFAULT_ITEM_MIN_VOLUME;
  return (
    <div className="shop-item" data-testid="shop-item">
      <h3>{itemName}</h3>
      <h4 className="shop-item__details">
        {convertNumberToCurrency(itemPrice)} {itemDescription}
      </h4>
      <div>
        {volumeData && (
          <span data-testid="shop-item-volume-data">
            <input
              data-testid={"shop-item-volume-input-" + itemBarcode}
              className="shop-item__unit"
              type="number"
              required
              name="price"
              min={itemMimimumVolume ?? DEFAULT_ITEM_MIN_VOLUME}
              value={itemVolume}
              step=".1"
              onChange={(e) => {
                setItemVolume(Number(e.target.value));
              }}
            />{" "}
            <span className="shop-item__unit-description">
              {volumeData.itemUnit}
            </span>
          </span>
        )}
        <Button
          disabled={itemMimimumVolume > itemVolume}
          data-testid={"shop-item-btn-" + itemBarcode}
          onClick={() =>
            dispatch(
              addItemToBasket({
                itemName: itemName,
                itemPrice: itemPrice,
                itemId: Date.now().toString(),
                itemDiscount: itemDiscount,
                itemBarcode: itemBarcode,
                itemVolume: itemVolume,
                itemVolumeMetric: volumeData?.itemUnit,
              })
            )
          }
        >
          Add To Basket{" "}
        </Button>
        {itemMimimumVolume > itemVolume && (
          <div
            data-testid={"shop-item-btn-error-message-" + itemBarcode}
            className="shop-item__error-message"
          >
            {ITEM_ERROR_MESSAGE} {itemMimimumVolume}
          </div>
        )}{" "}
      </div>
    </div>
  );
};
