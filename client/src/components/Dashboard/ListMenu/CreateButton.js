import React, { useContext } from "react";
import { DashboardContext } from "../../../context/dashboard.context";

function CreateButton() {
  const dashboard = useContext(DashboardContext);
  return (
    <div className="create-btn-container">
      <button
        className="waves-effect waves-light btn-large"
        onClick={dashboard.handleCreate}
      >
        Create new login
      </button>
    </div>
  );
}

export default CreateButton;
