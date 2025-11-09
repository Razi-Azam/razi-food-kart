import React, { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { calcTotal } from "../utils/helpers";
import { toast } from "react-toastify";

export const CartContext = createContext();

const initial = JSON.parse(localStorage.getItem("razi_cart")) || { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      let updated;
      if (exists) {
        updated = state.items.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
        );
      } else {
        updated = [...state.items, { ...item, qty: item.qty || 1 }];
      }
      return { items: updated };
    }
    case "UPDATE": {
      const { id, qty } = action.payload;
      const updated = state.items.map((i) => (i.id === id ? { ...i, qty } : i));
      return { items: updated };
    }
    case "REMOVE": {
      return { items: state.items.filter((i) => i.id !== action.payload) };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    localStorage.setItem("razi_cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: "ADD", payload: item });
    toast.success(`${item.name} is added to Cart.`);
  }
  const updateQty = (id, qty) =>
    dispatch({ type: "UPDATE", payload: { id, qty } });
  const remove = (id) => dispatch({ type: "REMOVE", payload: id });
  const clear = () => dispatch({ type: "CLEAR" });

  const total = calcTotal(state.items);

  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, updateQty, remove, clear, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
