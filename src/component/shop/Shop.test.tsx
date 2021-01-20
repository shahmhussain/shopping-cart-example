import { Shop } from "./Shop";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { shopItems } from "./ShopData";

describe("Shop ", () => {
  it("should should render the shop page with 3 shop items", () => {
    render(
      <Provider store={store}>
        <Shop shopItems={shopItems}></Shop>
      </Provider>
    );
    expect(screen.getByTestId("shop-page")).toBeInTheDocument();
    expect(screen.queryAllByTestId("shop-item")).toHaveLength(3);
  });
});
