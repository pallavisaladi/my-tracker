import { useRef, useState } from "react";
import "../components/inputComponent.css";

const InputComponent = ({
  errorMessage = "",
  actionType,
  buttonAction,
  initialInputValue = "",
  initialDateValue = "",
}) => {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [dateValue, setDateValue] = useState(initialDateValue);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateValue(e.target.value);
  };
  return (
    <div className="inputContainer">
      <input
        className="inputItem"
        type="text"
        placeholder="Enter todo item...."
        value={inputValue}
        onChange={handleInputChange}
      />
      <input
        className="inputItem"
        type="date"
        value={dateValue}
        onChange={(e) => handleDateChange(e)}
      />
      <button
        className="buttonAction"
        onClick={() => {
          buttonAction(inputValue, dateValue);
          setInputValue("");
          setDateValue("");
        }}
      >
        {actionType}
      </button>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
};

export default InputComponent;
