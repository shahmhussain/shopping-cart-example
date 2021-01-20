### Shopping Cart Example

### Start Application

#### npm install

#### npm run start

### Running Unit tests

#### npm run test

### Setting up discount codes

```
    Discount codes are applied based off the itemDiscount object


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
    It is better to apply discounts based off the data passed in
    so if business wanted to change the discount type to 3 for 2,
    they could easily do this in the application, like this:

    {
      itemName: "Toilet Paper",
      itemPrice: 0.65,
      itemDescription: "per roll",
      itemBarcode: "toiletPaper111",
      itemDiscount: {
        requiredVolumeForDiscount: 3,
        discountPriceToApply: 0.65,
        discountName: " 3 for 2",
      },
    },

```
