import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should should render the app page", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("app-page")).toBeInTheDocument();
  });
  // integration test to show add and remove works
  it("should add and remove items from basket", () => {
    const testidPrefix = "shop-item-btn";
    const mockItemId1 = new Date("1111").valueOf();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const spy = jest
      .spyOn(global.Date, "now")
      .mockImplementationOnce(() => mockItemId1);
    fireEvent.click(screen.getByTestId(testidPrefix + "-facemask111"));
    spy.mockRestore();

    expect(screen.queryAllByTestId("basket-selected-item-info")).toHaveLength(
      1
    );
    expect(screen.getByTestId("basket-total-to-pay")).toHaveTextContent("2.50");

    //remove toilet roll from basket
    fireEvent.click(screen.getByTestId("basket-remove-" + mockItemId1));

    expect(screen.queryAllByTestId("basket-selected-item-info")).toHaveLength(
      0
    );
    expect(screen.getByTestId("basket-total-to-pay")).toHaveTextContent("0.00");
  });

  /**
   * The below is more of an integration type test but proves the add to basket feature
   * works and total savings and total to pay is calculated correctly.
   */
  it("should render the correct savings and total to pay after adding items", async () => {
    /**
     * Face Mask 2.50
      Face Mask 2.50
      Toilet Paper 0.65
      Toilet Paper 0.65
      Toilet Paper 0.65
      Toilet Paper 0.65
      Toilet Paper 0.65
      Toilet Paper 0.65
      Hand Sanitizer
      0.175 l @ £19.99/l 3.50
      -----
      Sub-total 12.40
      Savings
      Face Masks 2 for £4 -1.00
      Toilet Paper 6 for 5 -0.65
      -----
      Total savings -1.65
      ---------------------------
      Total to Pay 10.75
     */

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const testidPrefix = "shop-item-btn";

    // add 2 facemasks
    fireEvent.click(screen.getByTestId(testidPrefix + "-facemask111"));
    fireEvent.click(screen.getByTestId(testidPrefix + "-facemask111"));

    // add 6 toilet rolls
    fireEvent.click(screen.getByTestId(testidPrefix + "-toiletPaper111"));
    fireEvent.click(screen.getByTestId(testidPrefix + "-toiletPaper111"));
    fireEvent.click(screen.getByTestId(testidPrefix + "-toiletPaper111"));
    fireEvent.click(screen.getByTestId(testidPrefix + "-toiletPaper111"));
    fireEvent.click(screen.getByTestId(testidPrefix + "-toiletPaper111"));
    fireEvent.click(screen.getByTestId(testidPrefix + "-toiletPaper111"));

    //add hand sanitizer with 0.175
    const handSanitizerBarCode = "handsanitizer111";
    const handsanitizerInputTestId =
      "shop-item-volume-input-" + handSanitizerBarCode;

    fireEvent.change(screen.getByTestId(handsanitizerInputTestId), {
      target: { value: "0.175" },
    });

    fireEvent.click(screen.getByTestId(testidPrefix + "-handsanitizer111"));

    expect(screen.getByTestId("basket-total-savings")).toHaveTextContent(
      "1.65"
    );
    expect(screen.getByTestId("basket-total-to-pay")).toHaveTextContent(
      "10.75"
    );
  });
});
