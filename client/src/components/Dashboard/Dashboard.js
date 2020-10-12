/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import { DashboardContext } from "../../context/dashboard.context";

import { useMessage } from "../../hooks/message.hook";

import {
  getPasswords,
  createPassword,
  editPassword,
  deletePassword,
} from "../../hooks/dashboard.hook";

import PasswordList from "./ListMenu/PasswordList";
import PasswordPanel from "./PasswordPanel";
import Loader from "../Loader";

function Dashboard() {
  // state status
  const [editStatus, setEditStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  // sort value
  const [sortValue, setSortValue] = useState("website");

  // data state
  const [currentItem, setCurrentItem] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // auth context
  const { token, logout } = useContext(AuthContext);

  // message - notification func
  const message = useMessage();

  useEffect(() => {
    if (token) {
      getPasswords(token, sortValue)
        .then((passwords) => {
          setPasswords(passwords);
          setLoading(false);
        })
        .catch((errStatus) => {
          if (errStatus === 401) {
            logout(); // logout when token was expired
          }
        });
    }
  }, [createStatus, editStatus, token, deleteTrigger, sortValue]);

  // edit status
  const handleEdit = () => {
    setViewStatus();
    setEditStatus(!editStatus);
  };

  const handleCreate = () => {
    setViewStatus();
    setCreateStatus(!createStatus);
    setCurrentItem({
      website: "",
      username: "",
      password: "",
    });
  };

  // view status
  const setViewStatus = () => {
    setCreateStatus(false);
    setEditStatus(false);
  };

  // set sort value
  const handleSortValue = (sort) => {
    if (sort !== sortValue) setSortValue(sort);
  };

  // set current item
  const handleSetCurrentItem = (obj) => {
    setCurrentItem(obj);
  };

  // create query to API
  const onCreate = (obj) => {
    createPassword(obj)
      .then((res) => {
        message("Password was created successfully");
        setCreateStatus(false);
        setCurrentItem(res.password);
      })
      .catch((err) => {
        message(err);
        setCurrentItem({
          website: "",
          username: "",
          password: "",
        });
      });
  };

  // edit query to API
  const onEdit = (obj) => {
    editPassword(obj)
      .then((res) => {
        message("Password was edited successfully");
        setEditStatus(false);
        setCurrentItem(res);
      })
      .catch((err) => message(err));
  };

  // delete query to API
  const onDelete = () => {
    deletePassword(currentItem._id)
      .then((res) => {
        message(res);
        setDeleteTrigger(!deleteTrigger);
        let obj = passwords.find((obj) => obj._id === currentItem._id);
        let index = passwords.indexOf(obj);
        if (index === passwords.length - 1 && index !== 0) {
          setCurrentItem(passwords[index - 1]);
        } else if (index === 0 && passwords.length === 1) {
          setCurrentItem({
            website: "",
            username: "",
            password: "",
          });
        } else setCurrentItem(passwords[index + 1]);
      })
      .catch((err) => message(err));
  };

  return (
    <DashboardContext.Provider
      value={{
        count: passwords.length || 0,
        currentItem,
        editStatus,
        createStatus,
        handleEdit,
        handleCreate,
        handleSetCurrentItem,
        setViewStatus,
        handleSortValue,
        onCreate,
        onEdit,
        onDelete,
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard-container">
          <PasswordList list={passwords} />
          <PasswordPanel />
        </div>
      )}
    </DashboardContext.Provider>
  );
}

export default Dashboard;
