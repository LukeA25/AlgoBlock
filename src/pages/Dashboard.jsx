import DashboardItem from "../components/DashboardItem";
import { useUserContext } from "../components/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../components/Popup";
import AlgoBlockPlusPopup from "../components/AlgoBlockPlusPopup";

function Dashboard() {
  const {
    currentUser,
    username,
    usernameHandler,
    emailHandler,
    passwordHandler,
    getSubscriptionId,
  } = useUserContext();
  const [changesSaved, setChangesSaved] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [purchaseData, setPurchaseData] = useState({});
  const [dateString, setDateString] = useState("");
  const [message, setMessage] = useState("");

  const [cancelPopup, setCancelPopup] = useState(false);
  const [restorePopup, setRestorePopup] = useState(false);
  const [plusPopup, setPlusPopup] = useState(false);

  function togglePlusPopup() {
    setPlusPopup(!plusPopup);
  }

  function toggleCancelPopup() {
    setCancelPopup(!cancelPopup);
  }

  function toggleRestorePopup() {
    setRestorePopup(!restorePopup);
  }

  function getFormattedDate(time) {
    const milliseconds = time * 1000;
    const nextPaymentDate = new Date(milliseconds);
    const date = nextPaymentDate.toLocaleDateString();
    setDateString(date);
  }

  useEffect(() => {
    async function getSubscription() {
      if (getSubscriptionId()) {
        const subscriptionId = await getSubscriptionId();
        setSubscriptionId(subscriptionId);

        const response = await axios.post("https://algoblock-backend-5df4fb859f35.herokuapp.com/get-subscription-info", {
          subscriptionId: subscriptionId,
        });
        setPurchaseData(response.data);
        getFormattedDate(response.data.endDate);

        if (new Date(response.data.startDate * 1000).toDateString() === new Date().toDateString()) {
          setMessage("Thank you for your purchase!");
        }
      }
    }

    getSubscription();
  }, []);

  if (!currentUser) {
    return (
      <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
        <h1 className="text-white text-6xl sm:text-7xl text-center font-semibold pt-20">
          Oops...
        </h1>
        <h3 className="text-white text-3xl sm:text-5xl text-center pt-6 m-auto w-2/3">
          You're not supposed to be here yet. Visit the{" "}
          <Link
            to="/"
            replace
            className="font-semibold text-green-600 hover:text-green-500 active:text-green-800 duration-300"
          >
            home page
          </Link>{" "}
          instead.
        </h3>
      </div>
    );
  }

  return (
    <div className="pt-20 w-screen min-h-[calc(100vh-13.6rem)] text-white">
      <div
        className={`w-48 h-12 fixed bg-gray-700 z-50 rounded-full left-[calc(50vw-6rem)] flex items-center justify-center top-32 duration-500 text-white text-xl ${
          !changesSaved && "scale-x-50 scale-y-0 -translate-y-[8rem]"
        }`}
      >
        Changes Saved!
      </div>
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-20 sm:h-24 font-semibold text-5xl sm:text-7xl text-center relative top-8 mb-6">
        Dashboard
      </h1>
      {message && <div className="bg-green-100 border-2 border-green-600 text-green-600 p-4 rounded-lg text-xl m-auto w-3/4">{message}</div>}
      <div className="w-3/4 max-w-4xl bg-gray-800 rounded-lg m-auto border-2 border-white mt-6 mb-16">
        <h2 className="text-white text-3xl sm:text-5xl font-semibold px-[5%] py-6">
          {username}
        </h2>
        <div className="w-[90%] rounded-xl bg-gray-700 m-auto flex p-8 flex-col mb-6 gap-8">
          <DashboardItem
            title="USERNAME"
            editRef={username}
            submitHandler={usernameHandler}
            setChangesSaved={setChangesSaved}
          />
          <DashboardItem
            title="EMAIL"
            editRef={currentUser.email}
            submitHandler={emailHandler}
            setChangesSaved={setChangesSaved}
          />
          <DashboardItem
            title="PASSWORD"
            editRef="***********"
            submitHandler={passwordHandler}
            setChangesSaved={setChangesSaved}
          />
          {subscriptionId && !purchaseData.canceled ? (
            <>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center">
                <div className="flex flex-col">
                  <p className="font-semibold text-green-600 text-sm sm:text-base">
                    SUBSCRIPTION
                  </p>
                  <p className="text-lg sm:text-xl">AlgoBlock+</p>
                </div>
                {purchaseData.cancelSoon ? (
                  <button
                    onClick={toggleRestorePopup}
                    className="py-1 sm:py-2 pl-2 pr-4 rounded-md bg-gray-500 hover:bg-gray-400 active:bg-gray-700 duration-300 w-min"
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    onClick={toggleCancelPopup}
                    className="py-1 sm:py-2 pl-2 pr-4 rounded-md bg-gray-500 hover:bg-gray-400 active:bg-gray-700 duration-300 w-min"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-green-600 text-sm sm:text-base">
                  TOTAL
                </p>
                <p className="text-lg sm:text-xl">$19.99 / month</p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-green-600 text-sm sm:text-base">
                  STATUS
                </p>
                <p className="text-lg sm:text-xl">
                  {purchaseData.cancelSoon
                    ? `Active until ${dateString}`
                    : "Active"}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-green-600 text-sm sm:text-base">
                  NEXT PAYMENT
                </p>
                <p className="text-lg sm:text-xl">
                  {purchaseData.cancelSoon ? "N/A" : dateString}
                </p>
              </div>
              {purchaseData.cancelSoon ? (
                <Popup
                  toggle={toggleRestorePopup}
                  getActive={restorePopup}
                  title="Are you sure?"
                >
                  <p className="text-black text-lg sm:text-xl">
                    Are you sure you want to restore your{" "}
                    <b className="text-green-600 font-semibold">AlgoBlock+</b>{" "}
                    subscription?
                  </p>
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      await axios.post("https://algoblock-backend-5df4fb859f35.herokuapp.com/restore-subscription", {
                        subscriptionId: subscriptionId,
                      });
                      getSubscription();
                      toggleRestorePopup();
                    }}
                  >
                    <div className="flex gap-8 mt-8">
                      <button
                        type="button"
                        className="w-48 h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold"
                        onClick={toggleRestorePopup}
                      >
                        Nevermind
                      </button>
                      <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold">
                        Yes!
                      </button>
                    </div>
                  </form>
                </Popup>
              ) : (
                <Popup
                  toggle={toggleCancelPopup}
                  getActive={cancelPopup}
                  title="Are you sure?"
                >
                  <p className="text-black text-lg sm:text-xl">
                    Are you sure you want to cancel your{" "}
                    <b className="text-green-600 font-semibold">AlgoBlock+</b>{" "}
                    subscription? <br />
                    <br />
                    You will still have access until <b>{dateString}</b>.
                  </p>
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      await axios.post("https://algoblock-backend-5df4fb859f35.herokuapp.com/cancel-subscription", {
                        subscriptionId: subscriptionId,
                      });
                      getSubscription();
                      toggleCancelPopup();
                    }}
                  >
                    <div className="flex gap-8 mt-8">
                      <button
                        type="button"
                        className="w-48 h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold"
                        onClick={toggleCancelPopup}
                      >
                        Nevermind
                      </button>
                      <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold">
                        Cancel
                      </button>
                    </div>
                  </form>
                </Popup>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center">
                <div className="flex flex-col">
                  <p className="font-semibold text-green-600 text-sm sm:text-base">
                    SUBSCRIPTION
                  </p>
                  <p className="text-lg sm:text-xl">None</p>
                </div>
                <button
                  onClick={togglePlusPopup}
                  className="py-1 sm:py-2 px-4 font-semibold rounded-md bg-green-600 hover:bg-green-500 active:bg-green-800 border-2 w-36 border-white duration-300 flex gap-2 items-center"
                >
                  Subscribe to AlgoBlock+
                </button>
              </div>
              <AlgoBlockPlusPopup
                getActive={plusPopup}
                toggle={togglePlusPopup}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
