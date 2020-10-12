import React, { useEffect, useContext } from "react";
import { DashboardContext } from "../../../context/dashboard.context";

function SortPanel() {
  const dashboard = useContext(DashboardContext);
  useEffect(() => {
    window.M.AutoInit();
  });

  return (
    <div className="sort-panel-container">
      <div className="sort-panel-block">
        <span>Sort by:</span>
        <div className="input-field col s12 sort-select">
          <select>
            <option value="name">Name(A-Z)</option>
            <option value="-name">Name(Z-A)</option>
            <option value="last_created">Last created</option>
            <option value="last_modified">Last modified</option>
          </select>
        </div>
      </div>
      <div className="passwords-count-details">{dashboard.count} logins</div>
    </div>
  );
}

export default SortPanel;
