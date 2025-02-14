import "../components/sort.css";

const Sort = ({ onSort }) => {
  const order = [
    { label: "Sort by goal date ascending", value: "ASC" },
    { label: "Sort by goal date descending", value: "DESC" },
  ];

  return (
    <div className="sortDropdown">
      <select className="selectDropdown" onChange={onSort}>
        <option className="dropdownText">Select Sorting</option>
        {order.map((orderType) => {
          return (
            <option key={orderType.value} value={orderType.value}>
              {orderType.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Sort;
