import { IShopItemProps, ITEM_ERROR_MESSAGE, ShopItem } from "./ShopItem";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

describe("Shop Item", () => {
  it("should render shop item without input field when volume data is undefined", () => {
    const mockShopItem: IShopItemProps = {
      itemName: "mask",
      itemDescription: "beautiful mask",
      itemBarcode: "mask111",
      itemPrice: 1.9,
    };
    render(
      <Provider store={store}>
        <ShopItem {...mockShopItem}></ShopItem>
      </Provider>
    );
    expect(screen.getByTestId("shop-item")).toBeInTheDocument();
    expect(screen.queryAllByTestId("shop-item-volume-data")).toHaveLength(0);
  });
  it("should render shop item with volume data when volume data is populated", () => {
    const mockShopItem: IShopItemProps = {
      itemName: "mask",
      itemDescription: "beautiful mask",
      itemBarcode: "mask111",
      itemPrice: 1.9,
      volumeData: {
        itemMinVolume: 0.1,
        itemUnit: "l",
        itemUnitDescription: "litres",
      },
    };
    render(
      <Provider store={store}>
        <ShopItem {...mockShopItem}></ShopItem>
      </Provider>
    );
    expect(screen.getByTestId("shop-item")).toBeInTheDocument();
    expect(screen.queryAllByTestId("shop-item-volume-data")).toHaveLength(1);
  });

  it("should show an error message when minValue is not met on the shop item", () => {
    const mockShopItem: IShopItemProps = {
      itemName: "mask",
      itemDescription: "best one ever",
      itemBarcode: "handsanitizer111",
      itemPrice: 1.9,
      volumeData: {
        itemMinVolume: 0.3,
        itemUnit: "l",
        itemUnitDescription: "litres",
      },
    };
    render(
      <Provider store={store}>
        <ShopItem {...mockShopItem}></ShopItem>
      </Provider>
    );

    const handSanitizerBarCode = "handsanitizer111";
    const handsanitizerInputTestId =
      "shop-item-volume-input-" + handSanitizerBarCode;

    fireEvent.change(screen.getByTestId(handsanitizerInputTestId), {
      target: { value: "0.175" },
    });
    expect(screen.getByTestId("shop-item")).toBeInTheDocument();
    expect(screen.queryAllByTestId("shop-item-volume-data")).toHaveLength(1);
    expect(
      screen.getByTestId("shop-item-btn-error-message-" + handSanitizerBarCode)
    ).toHaveTextContent(ITEM_ERROR_MESSAGE);
  });
});
