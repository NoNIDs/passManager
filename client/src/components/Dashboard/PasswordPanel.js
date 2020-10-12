import React, { useState, useContext, useEffect } from "react";
import { DashboardContext } from "../../context/dashboard.context";

import { dateFormatter } from "./dateFormatUtil";

function PasswordPanel() {
  const dashboard = useContext(DashboardContext);

  const [currentItemDate, setCurrentItemDate] = useState({
    date_created: "",
    date_modified: "",
  });

  const [form, setForm] = useState({
    website: "",
    username: "",
    password: "",
  });

  const [passwordShow, setPasswordShow] = useState(false);

  const [itemTitle, setItemTitle] = useState("");

  useEffect(() => {
    if (dashboard.currentItem) {
      setForm(dashboard.currentItem);
      if (dashboard.createStatus) {
        setItemTitle("Create new login");
      } else {
        let title = dashboard.currentItem.website.replace(/https?:\/\//, "");
        setItemTitle(title);
      }
      // changing date for view
      if (!dashboard.createStatus && dashboard.currentItem.website !== "") {
        setCurrentItemDate({
          date_created: dateFormatter(dashboard.currentItem.date_created),
          date_modified: dateFormatter(dashboard.currentItem.date_modified),
        });
      }

      //set active class first item in list(current)
      const listLabel = document.getElementsByClassName("details-label");
      for (let item of listLabel) {
        item.classList.add("active");
      }
    }

    // turn off visibility password when switching
    let passwordInput = document.getElementsByName("password");
    passwordInput[0].setAttribute("type", "password");
    setPasswordShow(false);
  }, [dashboard.currentItem]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleShowPassword = (event) => {
    event.preventDefault();
    let passwordInput = document.getElementsByName("password");
    if (passwordInput[0].type === "password") {
      passwordInput[0].setAttribute("type", "text");
      setPasswordShow(true);
    } else if (passwordInput[0].type === "text") {
      passwordInput[0].setAttribute("type", "password");
      setPasswordShow(false);
    }
  };

  const handleCloseCreate = () => {
    dashboard.setViewStatus();
  };

  const onCreateOrEditItem = () => {
    if (dashboard.createStatus) dashboard.onCreate(form);
    if (dashboard.editStatus) dashboard.onEdit(form);
  };
  return (
    <div className="password-panel-container">
      <div className="password-panel-header">
        <div className="site-name">{itemTitle}</div>
        {!dashboard.createStatus && form.website !== "" ? (
          <div className="password-panel-header-buttons">
            <button
              className="waves-effect waves-light btn"
              onClick={dashboard.handleEdit}
            >
              Edit
              <i className="material-icons right">create</i>
            </button>
            <button
              className="waves-effect waves-light btn"
              onClick={dashboard.onDelete}
            >
              Remove
              <i className="material-icons right">delete</i>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="password-panel-details">
        <div className="details-site-name">
          <div className="input-field col s6">
            <input
              disabled={!dashboard.createStatus}
              id="website_name"
              name="website"
              type="text"
              className="validate"
              value={form.website}
              autoComplete="off"
              onChange={changeHandler}
            />
            <label className="details-label" htmlFor="website_name">
              Website
            </label>
          </div>
        </div>
        <div className="details-username">
          <div className="input-field col s6">
            <input
              disabled={!(dashboard.editStatus || dashboard.createStatus)}
              id="website_username"
              name="username"
              type="text"
              className="validate"
              value={form.username}
              autoComplete="off"
              onChange={changeHandler}
            />
            <label className="details-label" htmlFor="website_username">
              Username
            </label>
          </div>
        </div>
        <div className="details-password">
          <div className="input-field col s6">
            <input
              disabled={!(dashboard.editStatus || dashboard.createStatus)}
              id="website_password"
              name="password"
              type="password"
              className="validate"
              value={form.password}
              autoComplete="off"
              onChange={changeHandler}
            />
            <label className="details-label" htmlFor="website_password">
              Password
            </label>
          </div>
          <i className="material-icons show-icon" onClick={handleShowPassword}>
            {passwordShow ? "visibility_off" : "visibility"}
          </i>
        </div>
        {dashboard.editStatus || dashboard.createStatus ? (
          <div className="details-edit-buttons">
            <button
              className="waves-effect waves-light btn"
              onClick={onCreateOrEditItem}
            >
              Save
            </button>
            <button
              className="waves-effect waves-light btn"
              onClick={handleCloseCreate}
            >
              Cancel
            </button>
          </div>
        ) : (
          ""
        )}
        {!dashboard.createStatus && form.website !== "" ? (
          <div className="details-info">
            <p>Created: {currentItemDate.date_created}</p>
            <p>Last modified: {currentItemDate.date_modified}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PasswordPanel;
