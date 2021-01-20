import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { Basket } from "./Basket";

describe("Basket", () => {
  it("should render basket component", () => {
    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );
    expect(screen.getByTestId("basket")).toBeInTheDocument();
  });
});
