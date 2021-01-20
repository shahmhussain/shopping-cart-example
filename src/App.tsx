import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Shop } from "./component/shop/Shop";
import { Basket } from "./component/basket/Basket";
import { shopItems } from "./component/shop/ShopData";

function App() {
  return (
    <div className="app" data-testid="app-page">
      <div className="row">
        <div className="app__item col-6">
          <Shop shopItems={shopItems}></Shop>
        </div>
        <div className="app__item col">
          <Basket></Basket>
        </div>
      </div>
    </div>
  );
}

export default App;
