/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import { DashboardContext } from "../../../context/dashboard.context";

function PasswordItem(props) {
  const dashboard = useContext(DashboardContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (props.password._id === dashboard.currentItem._id) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [dashboard.currentItem]);
  const handleSetItem = () => {
    dashboard.handleSetCurrentItem(props.password);
    dashboard.setViewStatus();
  };
  return (
    <div
      className={`password-list-item ${active ? "active-item" : ""}`}
      onClick={handleSetItem}
    >
      <i className="material-icons right">fingerprint</i>
      <div className="item-info">
        <span className="item-website ">{props.password.website}</span>
        <span className="item-username">{props.password.username}</span>
      </div>
    </div>
  );
}

export default PasswordItem;
