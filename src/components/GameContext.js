import React, { useEffect } from "react";
import { usePersistedState } from "./usePersistedState";
import items from "./data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState("numOfCookies", 1000);
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    "purchasedItems",
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    }
  );

  const calculateCookiesPerSecond = (items, purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  useEffect(() => {
    let prevTime = localStorage.getItem("time") || 0;
    const now = new Date().getTime();

    const cookiesGainAway = Math.floor(
      ((now - prevTime) / 1000) *
        calculateCookiesPerSecond(items, purchasedItems) +
        numCookies
    );
    setNumCookies(cookiesGainAway);
    return localStorage.setItem("time", new Date().getTime());
  }, []);

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        items,
        cookiesPerSecond: calculateCookiesPerSecond(items, purchasedItems),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
