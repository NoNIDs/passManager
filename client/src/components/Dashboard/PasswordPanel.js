/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import useClippy from "use-clippy";

import { DashboardContext } from "../../context/dashboard.context";

import { dateFormatter } from "./dateFormatUtil";

import { useMessage } from "../../hooks/message.hook";

function PasswordPanel() {
  const dashboard = useContext(DashboardContext);

  const [clipboard, setClipboard] = useClippy(); // copy hook
  const message = useMessage();

  // initial value for date state
  const [currentItemDate, setCurrentItemDate] = useState({
    date_created: "",
    date_modified: "",
  });

  // current form state
  const [form, setForm] = useState({
    website: "",
    username: "",
    password: "",
  });

  // password visibility state
  const [passwordShow, setPasswordShow] = useState(false);

  // current title in header block
  const [itemTitle, setItemTitle] = useState("");

  useEffect(() => {
    if (dashboard.currentItem) {
      setForm(dashboard.currentItem);

      // set title
      if (dashboard.createStatus) {
        setItemTitle("Create new entry");
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

  // change handler for data state
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // set password visibility
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

  // set status state (Dashboard)
  const handleCloseCreateOrEdit = () => {
    setForm(dashboard.currentItem);
    dashboard.setViewStatus();
  };

  // form submit handler
  const handleSumbit = (e) => {
    e.preventDefault();
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
      <form className="password-panel-details" onSubmit={handleSumbit}>
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
          {form.password ? (
            <i
              className="material-icons show-icon"
              onClick={handleShowPassword}
            >
              {passwordShow ? "visibility_off" : "visibility"}
            </i>
          ) : (
            ""
          )}
          {form.password && !dashboard.createStatus && !dashboard.editStatus ? (
            <button
              className="waves-effect waves-light btn grey darken-2"
              onClick={() => {
                setClipboard(form.password);
                message("Password copied");
              }}
            >
              Copy
            </button>
          ) : (
            ""
          )}
        </div>
        {dashboard.editStatus || dashboard.createStatus ? (
          <div className="details-edit-buttons">
            <button type="submit" className="waves-effect waves-light btn">
              Save
            </button>
            <button
              className="waves-effect waves-light btn"
              onClick={handleCloseCreateOrEdit}
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
      </form>
    </div>
  );
}

export default PasswordPanel;
