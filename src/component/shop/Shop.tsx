import * as React from "react";
import { IShopItemProps, ShopItem } from "./shop-item/ShopItem";
import "./Shop.scss";

type IShopProps = {
  shopItems: IShopItemProps[];
};

export const Shop = ({ shopItems }: IShopProps) => {
  return (
    <div className="shop" data-testid="shop-page">
      <h1 className="shop__title">Shop Items </h1>
      {shopItems.map((item) => {
        return (
          <ShopItem
            key={item.itemName}
            itemName={item.itemName}
            itemPrice={item.itemPrice}
            itemDescription={item.itemDescription}
            volumeData={item.volumeData}
            itemBarcode={item.itemBarcode}
            itemDiscount={item.itemDiscount}
          ></ShopItem>
        );
      })}
    </div>
  );
};
