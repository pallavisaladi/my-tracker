import { useState } from "react";
import dropdown from "../images/dropdown.svg";
import "../components/accordion.css";

const Accordion = ({
  header,
  children,
  className = "",
  initialAccordionClose = true,
}) => {
  const [value, setValue] = useState(initialAccordionClose);

  const handleClick = () => {
    setValue(!value);
  };
  return (
    <div className={`accordion-container ${className}`}>
      <div className="headerUp" onClick={handleClick}>
        {header}
        <div className="title">
          <div className="icon">
            <img src={dropdown} />
          </div>
        </div>
      </div>
      <div className={value ? "contentUp" : " contentUp contentDown"}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
