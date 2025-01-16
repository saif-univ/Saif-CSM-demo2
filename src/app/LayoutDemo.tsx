import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

function LayoutDemo({ children }) {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
}

export default LayoutDemo;
