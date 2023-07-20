import { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";

function DashboardItem(props) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState(props.editRef);

  function toggleEdit() {
    setEdit(!edit);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center">
        <div className="flex flex-col">
          <p className="font-semibold text-green-600 text-sm sm:text-base">{props.title}</p>
          {edit ? (
            <input
              value={value}
              type={props.title === "EMAIL" ? "email" : "text"}
              placeholder={props.title === "EMAIL" ? email : props.editRef}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              className="text-lg sm:text-xl bg-gray-700 text-white border-b-2 border-white"
            />
          ) : (
            <p className="text-lg sm:text-xl">
              {props.title === "EMAIL" ? email : props.editRef}
            </p>
          )}
        </div>
        {edit ? (
          <button
            onClick={() => {
              setValue("");
              if (value) {
                if (props.title === "EMAIL") {
                  props
                    .submitHandler(value.toLowerCase(), setError)
                    .then((newEmail) => {
                      !error && setEmail(newEmail);
                    });
                } else {
                  props.submitHandler(value, setError);
                }
              }
              if (!error) {
                props.setChangesSaved(true);
                setTimeout(() => props.setChangesSaved(false), 2000);
              }
              toggleEdit();
            }}
            className="py-1 sm:py-2 px-4 rounded-md bg-green-600 hover:bg-green-500 active:bg-green-800 border-2 w-min border-white duration-300 flex gap-2 items-center"
          >
            Update
          </button>
        ) : (
          <button
            onClick={toggleEdit}
            className="py-1 sm:py-2 pl-2 pr-4 rounded-md bg-gray-500 hover:bg-gray-400 active:bg-gray-700 duration-300 w-min flex gap-2 items-center"
          >
            <MdEdit className="sm:w-6 sm:h-6" /> Edit
          </button>
        )}
      </div>
      {error && <div className="text-red-600 -mt-8">{error}</div>}
    </>
  );
}

export default DashboardItem;
