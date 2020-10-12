import React, { useEffect, useContext } from "react";
import { DashboardContext } from "../../../context/dashboard.context";

function SortPanel() {
  const dashboard = useContext(DashboardContext);
  useEffect(() => {
    window.M.AutoInit();
  });

  const handleChangeSortValue = () => {
    let select = document.getElementById("select_sort_value");
    let sort_value = Array.from(select.options).filter(
      (option) => option.selected
    )[0].value;
    dashboard.handleSortValue(sort_value);
  };

  return (
    <div className="sort-panel-container">
      <div className="sort-panel-block">
        <span>Sort by:</span>
        <div className="input-field col s12 sort-select">
          <select id="select_sort_value" onChange={handleChangeSortValue}>
            <option value="website">Name(A-Z)</option>
            <option value="-website">Name(Z-A)</option>
            <option value="-date_created">Last created</option>
            <option value="-date_modified">Last modified</option>
          </select>
        </div>
      </div>
      <div className="passwords-count-details">{dashboard.count} entries</div>
    </div>
  );
}

export default SortPanel;
