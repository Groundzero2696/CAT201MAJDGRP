import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { api } from "../api/client";

const StoreContext = createContext(null);

const initialState = {
  ui: { cartOpen: false, loading: false, error: "" },
  promo: { freeShippingThreshold: 80, announcement: "Free delivery above RM80" },
  cart: { items: [], subtotal: 0 },
  wishlist: { ids: [] },
  auth: { isLoggedIn: false, role: "customer", user: { name: "Guest", email: "" } },
};

function reducer(state, action) {
  switch (action.type) {
    case "UI_LOADING":
      return { ...state, ui: { ...state.ui, loading: action.value } };
    case "UI_ERROR":
      return { ...state, ui: { ...state.ui, error: action.value || "" } };

    case "UI_CART_OPEN":
      return { ...state, ui: { ...state.ui, cartOpen: true } };
    case "UI_CART_CLOSE":
      return { ...state, ui: { ...state.ui, cartOpen: false } };

    case "PROMO_SET_LOCAL":
      return { ...state, promo: action.promo };

    case "CART_SET_LOCAL":
      return { ...state, cart: action.cart };

    case "WISHLIST_TOGGLE": {
      const has = state.wishlist.ids.includes(action.id);
      const ids = has ? state.wishlist.ids.filter((x) => x !== action.id) : [...state.wishlist.ids, action.id];
      return { ...state, wishlist: { ids } };
    }

    case "AUTH_LOGIN_CUSTOMER":
      return { ...state, auth: { isLoggedIn: true, role: "customer", user: action.user } };
    case "AUTH_LOGIN_ADMIN":
      return { ...state, auth: { isLoggedIn: true, role: "admin", user: action.user } };
    case "AUTH_LOGOUT":
      return { ...state, auth: initialState.auth };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userId = "demo"; // demo user for backend

  async function safeRun(fn) {
    dispatch({ type: "UI_ERROR", value: "" });
    dispatch({ type: "UI_LOADING", value: true });
    try {
      return await fn();
    } catch (e) {
      dispatch({ type: "UI_ERROR", value: e.message || "Unknown error" });
      throw e;
    } finally {
      dispatch({ type: "UI_LOADING", value: false });
    }
  }

  const actions = useMemo(() => {
    return {
      refreshPromo: () =>
        safeRun(async () => {
          const promo = await api.getPromo();
          dispatch({ type: "PROMO_SET_LOCAL", promo });
        }),

      refreshCart: () =>
        safeRun(async () => {
          const cart = await api.getCart(userId);
          dispatch({ type: "CART_SET_LOCAL", cart });
        }),

      addToCart: (item) =>
        safeRun(async () => {
          await api.cartAdd(item, userId);
          const cart = await api.getCart(userId);
          dispatch({ type: "CART_SET_LOCAL", cart });
        }),

      setCartQty: (id, qty) =>
        safeRun(async () => {
          await api.cartQty(id, qty, userId);
          const cart = await api.getCart(userId);
          dispatch({ type: "CART_SET_LOCAL", cart });
        }),

      removeFromCart: (id) =>
        safeRun(async () => {
          await api.cartRemove(id, userId);
          const cart = await api.getCart(userId);
          dispatch({ type: "CART_SET_LOCAL", cart });
        }),

      checkout: () =>
        safeRun(async () => {
          const result = await api.checkout(userId);
          const cart = await api.getCart(userId); // backend clears cart after checkout
          dispatch({ type: "CART_SET_LOCAL", cart });
          return result; // {orderId,total}
        }),

      adminUpdatePromo: (announcement, threshold) =>
        safeRun(async () => {
          await api.adminUpdatePromo(announcement, Number(threshold));
          const promo = await api.getPromo();
          dispatch({ type: "PROMO_SET_LOCAL", promo });
        }),
    };
  }, []);

  useEffect(() => {
    actions.refreshPromo();
    actions.refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectors = useMemo(() => {
    const remaining = Math.max(0, state.promo.freeShippingThreshold - (state.cart.subtotal || 0));
    const cartCount = (state.cart.items || []).reduce((s, i) => s + (i.qty || 0), 0);
    return { remaining, cartCount };
  }, [state.promo.freeShippingThreshold, state.cart.subtotal, state.cart.items]);

  return (
    <StoreContext.Provider value={{ state, dispatch, selectors, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
