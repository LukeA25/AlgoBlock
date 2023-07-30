import { useState } from "react";

import PineEditor from "../assets/tutorialSS/PineEditor.png";
import CopyPasted from "../assets/tutorialSS/CopyPasted.png";
import BacktestStrategy from "../assets/tutorialSS/BacktestStrategy.png";
import RunStrategy from "../assets/tutorialSS/RunStrategy.png";
import StrategySettings from "../assets/tutorialSS/StrategySettings.png";
import StrategySettingsOpen from "../assets/tutorialSS/StrategySettingsOpen.png";
import SelectIndicator from "../assets/tutorialSS/SelectIndicator.png";
import SelectAlert from "../assets/tutorialSS/SelectAlert.png";
import AlertSelectStrategy from "../assets/tutorialSS/AlertSelectStrategy.png";
import AlertSettings from "../assets/tutorialSS/AlertSettings.png";

function Tutorial() {
  const [workspace, setWorkspace] = useState(true);
  const [tradingview, setTradingview] = useState(false);
  const [community, setCommunity] = useState(false);

  function enableWorkspace() {
    setWorkspace(true);
    setTradingview(false);
    setCommunity(false);
  }

  function enableTradingview() {
    setTradingview(true);
    setWorkspace(false);
    setCommunity(false);
  }

  function enableCommunity() {
    setCommunity(true);
    setWorkspace(false);
    setTradingview(false);
  }

  return (
    <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-16 sm:h-24 font-semibold text-5xl sm:text-7xl text-center relative top-8">
        Tutorial
      </h1>
      <div className="w-5/6 flex flex-col m-auto my-10">
        <div className="flex sm:gap-2">
          <button
            className={`px-1 sm:px-4 py-2 sm:text-3xl text-white font-semibold rounded-t-xl border-2 border-b-0 border-white hover:bg-green-500 active:bg-green-800 duration-300 ${
              workspace ? "bg-green-800" : "bg-green-600"
            }`}
            onClick={enableWorkspace}
          >
            Workspace
          </button>
          <button
            className={`px-1 sm:px-4 py-2 sm:text-3xl text-white font-semibold rounded-t-xl border-2 border-b-0 border-white hover:bg-green-500 active:bg-green-800 duration-300 ${
              tradingview ? "bg-green-800" : "bg-green-600"
            }`}
            onClick={enableTradingview}
          >
            TradingView
          </button>
          <button
            className={`px-1 sm:px-4 py-2 sm:text-3xl text-white font-semibold rounded-t-xl border-2 border-b-0 border-white hover:bg-green-500 active:bg-green-800 duration-300 ${
              community ? "bg-green-800" : "bg-green-600"
            }`}
            onClick={enableCommunity}
          >
            Community Indicators
          </button>
        </div>
        <div className="bg-gray-800 border-2 border-white rounded-b-lg p-8 text-white">
          {workspace && (
            <div>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                Trigger
              </h3>
              <ol className="sm:text-xl mb-10 list-disc ml-10">
                <li>
                  The trigger is the first condition that must be met to execute
                  a buy order.
                </li>
                <li>
                  If there are no Entry Conditions in your strategy, this
                  condition alone will start a new position.
                </li>
                <li>A trigger is a required to download a strategy.</li>
              </ol>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                Entry Conditions
              </h3>
              <ol className="sm:text-xl mb-10 list-disc ml-10">
                <li>
                  Entry Conditions are other conditions that must be true during
                  the trigger event to open a position.
                </li>
                <li>
                  Entry Conditions are not required to download a strategy.
                </li>
              </ol>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                Exit Conditions
              </h3>
              <ol className="sm:text-xl mb-10 list-disc ml-10">
                <li>
                  If any Exit Condition is true during an open position, the
                  position will be closed.
                </li>
                <li>
                  Exit Conditions are not required to download a strategy if you
                  have a stop loss and take profit level set. You are also
                  allowed to have both.
                </li>
              </ol>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                Details
              </h3>
              <ol className="sm:text-xl mb-10 list-disc ml-10">
                <li>
                  <b>Order Type:</b> The order type determines whether your
                  strategy opens a long or short position when a new position is
                  opened.
                </li>
                <li>
                  <b>Order Quantity:</b> This determines either how many shares
                  or what percentage of your portfolio is used during each
                  trade.
                </li>
                <li>
                  <b>Stop Loss Price:</b> This is the stop price for each order.
                  If the instrument price reaches this, the trade will be exited
                  for a loss. If no stop loss is selected, you must add exit
                  conditions to your strategy. You are also allowed to have a
                  stop loss and exit conditions.
                </li>
                <li>
                  <b>Risk/Reward Ratio:</b> This is the ratio of your stop loss
                  and take profit prices. If your Risk/Reward Ratio was 1:3,
                  then your take profit level would be 3 times greater than your
                  stop loss level. This is only required if you have a stop loss
                  price set.
                </li>
              </ol>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                Indicators
              </h3>
              <ol className="sm:text-xl mb-10 list-disc ml-10">
                <li>
                  Default TradingView Technical Indicators can be chosen as the
                  value for many different conditions.
                </li>
                <li>
                  If the indicator has multiple outputs, you will be able to
                  select which to use.
                </li>
                <li>
                  If it has user input values, then you can modify them by
                  clicking on the gear icon.
                </li>
                <li>
                  If you would like to use a community made TradingView
                  indicator, look at the "Community Indicators" tab.
                </li>
              </ol>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                Downloading Strategies
              </h3>
              <p className="text-xl">
                To download your finalized strategy, select the "Download
                Strategy" button at the bottom.
              </p>
            </div>
          )}
          {tradingview && (
            <div>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                Pasting your Script
              </h3>
              <ol className="sm:text-xl mb-4 list-disc ml-10">
                <li>
                  After copying your script from AlgoBlock, you need to open
                  TradingView, and select Pine Editor.
                </li>
                <li>
                  Create a new script, title it the name of your script, and
                  paste the script into the editor.
                </li>
              </ol>
              <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-8 mb-10">
                <img src={PineEditor} className="sm:w-[calc(50%-1rem)]" />
                <img
                  src={CopyPasted}
                  className="sm:w-[calc(50%-1rem)] object-cover object-left"
                />
              </div>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                Backtesting your Strategy
              </h3>
              <ol className="sm:text-xl mb-4 list-disc ml-10">
                <li>
                  After pasting your script, select "Strategy Tester" which is
                  next to "Pine Editor".
                </li>
                <li>
                  Select "Load your Strategy", and then see how your strategy
                  performed over the testing period.
                </li>
              </ol>
              <img src={BacktestStrategy} className="m-auto mb-10" />
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                Executing your Strategy
              </h3>
              <ol className="sm:text-xl mb-4 list-disc ml-10">
                <li>
                  For executing your strategy, there are two main options.
                </li>
                <li>
                  For short-term day trading strategies, executing your strategy
                  through TradingView would most likely be the best fit for your
                  strategy.
                </li>
                <li>
                  For long-term position trading strategies, executing your
                  strategy manually and using TradingView Alerts would most
                  likely be the best fit for your strategy.
                </li>
              </ol>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                TradingView Execution
              </h3>
              <ol className="sm:text-xl mb-4 list-disc ml-10">
                <li>
                  Once you're ready to run your script, select "Trading Panel".
                </li>
                <li>
                  You can start with Paper Trading from TradingView, or you can
                  just connect directly to your broker.
                </li>
                <li>
                  After logging into your broker, it will be running. If you
                  want to stop it, you can Log Out of the broker or take thte
                  strategy off of the chart.
                </li>
                <li className="text-red-600">
                  <b>IMPORTANT:</b> TradingView must be open in order to
                  activate trades. If you would like it to run always, you can
                  look into a dedicated server or a virtual private server
                  (VPS).
                </li>
              </ol>
              <img src={RunStrategy} className="m-auto mb-4" />
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                TradingView Alerts
              </h3>
              <ol className="sm:text-xl mb-4 list-disc ml-10">
                <li>
                  To activate TradingView Alerts to recieve notifications on
                  your computer, or on your phone, start by selecting "Alerts"
                  in the top left.
                </li>
                <img src={SelectAlert} className="mx-auto my-4" />
                <li>
                  In the dropdown menu, select the strategy that you would like
                  to recieve alerts on. The strategy must be active on your
                  chart to do this.
                </li>
                <img src={AlertSelectStrategy} className="mx-auto my-4" />
                <li>
                  If you'd like, you can select the "Notifications" tab and edit
                  the notification settings for where you would like to recieve
                  the alerts.
                </li>
                <img src={AlertSettings} className="mx-auto my-4" />
                <li>
                  Finally, you can select "Create", and your alert will be all set up!
                </li>
              </ol>
            </div>
          )}
          {community && (
            <div>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                In the Workspace
              </h3>
              <ol className="sm:text-xl mb-4 list-disc ml-10">
                <li>
                  For any indicator dropdown, you can use a TradingView
                  community indicator by selecting "Community Indicator".
                </li>
                <li>
                  You can name it anything, it doesn't need to be the exact same
                  as the indicator name.
                </li>
                <li>
                  If you plan on using the same community indicator for more
                  than one condition, make sure that you name them the same.
                </li>
                <li>
                  If you plan on using different outputs of the same indicator,
                  such as the high and low band from the bollinger bands, then
                  you can name them differently.
                </li>
              </ol>
              <h3 className="text-green-500 text-2xl sm:text-4xl font-semibold mb-2">
                In TradingView
              </h3>
              <ol className="sm:text-xl mb-4 list-disc ml-10">
                <li>
                  If your strategy has community indicators, then your strategy
                  might not work right away. You need to set the indicator as an
                  input in the strategy.
                </li>
                <li>
                  Start by putting the indicator that you would like to use on
                  your chart.
                </li>
                <li>Then select the settings icon on the strategy.</li>
                <img src={StrategySettings} className="mx-auto my-4" />
                <li>
                  Once you open the settings menu, look for the name of the
                  indicator that you set in the Workspace.
                </li>
                <img src={StrategySettingsOpen} className="mx-auto my-4" />
                <li>
                  Finally, select the community indicator value from the
                  dropdown.
                </li>
                <img src={SelectIndicator} className="mx-auto my-4" />
                <li>That's it. Your community indicator is all set up.</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
