import DashboardItem from "../components/DashboardItem";
import { useUserContext } from "../components/UserContext";
import { useState } from "react";

function Dashboard() {
  const {
    currentUser,
    username,
    usernameHandler,
    emailHandler,
    passwordHandler,
  } = useUserContext();
  const [changesSaved, setChangesSaved] = useState(false);

  if (!currentUser) {
    return (
      <div className="w-screen min-h-[calc(100vh-13.6rem)] relative pt-20">
        <h1 className="text-white text-7xl text-center font-semibold pt-20">
          Oops...
        </h1>
        <h3 className="text-white text-5xl text-center pt-6 m-auto w-2/3">
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
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-24 font-semibold text-7xl text-center relative top-8">
        Dashboard
      </h1>
      <div className="w-3/4 max-w-4xl bg-gray-800 rounded-lg m-auto border-2 border-white mt-10 mb-16">
        <h2 className="text-white text-5xl font-semibold px-10 py-6">
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
