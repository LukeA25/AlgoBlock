import { createContext, useState } from "react";

const StrategyContext = createContext();

export function StrategyProvider(props) {
  const [currentStrategy, setCurrentStrategy] = useState("");

  return (
    <StrategyContext.Provider value={{currentStrategy, setCurrentStrategy}}>
      {props.children}
    </StrategyContext.Provider>
  );
}

export default StrategyContext;