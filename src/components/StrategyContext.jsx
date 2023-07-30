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

  function getPurchased() {
    const updateStrategyRef = ref(
      database,
      `userData/${currentUser.uid}/strategies/${strategyKey}/purchased`
    );
    return get(updateStrategyRef);
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

  function checkStrategy() {
    for (const value of strategy.trigger.values) {
      if (typeof value !== "string" && value.title) {
        if (!value.name) {
          return false;
        }
      }
      if (typeof value !== "string" && value.name === "Enter Value") {
        if (!value.value) {
          return false;
        }
      }
      if (value === "") {
        return false;
      }
    }
    if (strategy.entryConditions) {
      for (const condition of strategy.entryConditions) {
        for (const value of condition.values) {
          if (typeof value !== "string" && value.title) {
            if (!value.name) {
              return false;
            }
          }
          if (typeof value !== "string" && value.name === "Enter Value") {
            if (!value.value) {
              return false;
            }
          }
          if (value === "") {
            return false;
          }
        }
      }
    }
    if (strategy.exitConditions) {
      for (const condition of strategy.exitConditions) {
        for (const value of condition.values) {
          if (typeof value !== "string" && value.title) {
            if (!value.name) {
              return false;
            }
          }
          if (typeof value !== "string" && value.name === "Enter Value") {
            if (!value.value) {
              return false;
            }
          }
          if (value === "") {
            return false;
          }
        }
      }
    }
    if (!strategy.details.stopLoss && (!strategy.exitConditions || strategy.exitConditions.length == 0)) return false;
    if (!strategy.details.orderType) return false;
    if (!strategy.details.orderQuantity.amount) return false;
    if (!strategy.details.orderQuantity.type) return false;

    return true;
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
    getPurchased,
    checkStrategy,
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
