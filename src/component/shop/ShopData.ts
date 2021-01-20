import { IShopItemProps } from "../shop-item/ShopItem";

export const shopItems: IShopItemProps[] = [
    {
      itemName: "Face Masks",
      itemPrice: 2.5,
      itemDescription: "each",
      itemBarcode: "facemask111",
      itemDiscount: {
        requiredVolumeForDiscount: 2,
        discountPriceToApply: 1,
        discountName: " 2 for 4",
      },
    },
    {
      itemName: "Toilet Paper",
      itemPrice: 0.65,
      itemDescription: "per roll",
      itemBarcode: "toiletPaper111",
      itemDiscount: {
        requiredVolumeForDiscount: 6,
        discountPriceToApply: 0.65,
        discountName: " 6 for 5",
      },
    },
    {
      itemName: "Hand Sanitizer",
      itemPrice: 19.99,
      itemDescription: "per litre",
      itemBarcode: "handsanitizer111",
      volumeData: {
        itemMinVolume: 0.1,
        itemUnit: "l",
        itemUnitDescription: "litres",
      },
    },
  ];