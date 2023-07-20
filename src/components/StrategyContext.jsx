import { createContext, useContext, useState } from "react";
import { database } from "../firebase";
import { get, set, push, remove, ref } from "firebase/database";
import { useUserContext } from "./UserContext";

const StrategyContext = createContext();

export function StrategyProvider(props) {
  const [strategy, setStrategy] = useState({});
  const [strategyKey, setStrategyKey] = useState("");
  const { username, currentUser } = useUserContext();

  function newStrategy(name) {
    const strategyData = {
      name: name,
      creator: username,
      purchased: false,
      details: {
        orderQuantity: 1,
        riskReward: 1,
      },
    };

    const strategyRef = ref(database, `userData/${currentUser.uid}/strategies`);
    push(strategyRef, strategyData);
  }

  function deleteStrategy() {
    const deleteStrategyRef = ref(
      database,
      `userData/${currentUser.uid}/strategies/${strategyKey}`
    );
    remove(deleteStrategyRef);
  }

  async function getUserStrategies() {
    const strategyRef = ref(database, `userData/${currentUser.uid}/strategies`);
    return get(strategyRef)
      .then((response) => {
        return response.val();
      })
      .then((strategyData) => {
        const strategies = [];

        for (const id in strategyData) {
          const strategy = {
            id: id,
            ...strategyData[id],
          };
          strategies.push(strategy);
        }
        return strategies;
      });
  }

  function purchaseStrategy() {
    const updateStrategyRef = ref(
      database,
      `userData/${currentUser.uid}/strategies/${strategyKey}`
    );
    strategy.purchased = true;
    return set(updateStrategyRef, strategy);
  }

  function updateStrategy() {
    const updateStrategyRef = ref(
      database,
      `userData/${currentUser.uid}/strategies/${strategyKey}`
    );
    strategy.purchased = false;
    return set(updateStrategyRef, strategy);
  }

  function disregardChanges() {
    const disregardChangesRef = ref(
      database,
      `userData/${currentUser.uid}/strategies/${strategyKey}`
    );
    get(disregardChangesRef)
      .then((response) => {
        return response.val();
      })
      .then((data) => {
        setStrategy({ ...data });
      });
  }

  const value = {
    strategy,
    setStrategy,
    strategyKey,
    setStrategyKey,
    getUserStrategies,
    newStrategy,
    deleteStrategy,
    updateStrategy,
    disregardChanges,
    purchaseStrategy,
  };

  return (
    <StrategyContext.Provider value={value}>
      {props.children}
    </StrategyContext.Provider>
  );
}

export function useStrategyContext() {
  return useContext(StrategyContext);
}
export default StrategyContext;
