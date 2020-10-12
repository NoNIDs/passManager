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

function Dashboard() {
  const [editStatus, setEditStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  const [sortValue, setSortValue] = useState("-website");

  const [currentItem, setCurrentItem] = useState("");
  const [passwords, setPasswords] = useState([]);

  const { token } = useContext(AuthContext);

  const message = useMessage();

  useEffect(() => {
    if (token) {
      getPasswords(token, sortValue).then((passwords) =>
        setPasswords(passwords)
      );
    }
  }, [createStatus, editStatus, token, deleteTrigger, sortValue]);

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

  const setViewStatus = () => {
    setCreateStatus(false);
    setEditStatus(false);
  };

  const handleSortValue = (sort) => {
    setSortValue(sort);
  };

  const handleSetCurrentItem = (obj) => {
    setCurrentItem(obj);
  };

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

  const onEdit = (obj) => {
    editPassword(obj)
      .then((res) => {
        message("Password was edited successfully");
        setEditStatus(false);
        console.log(res);
        setCurrentItem(res);
      })
      .catch((err) => message(err));
  };

  const onDelete = () => {
    deletePassword(currentItem._id)
      .then((res) => {
        message(res);
        setDeleteTrigger(!deleteTrigger);
        let obj = passwords.find((obj) => obj._id === currentItem._id);
        let index = passwords.indexOf(obj);
        if (index === passwords.length - 1)
          setCurrentItem(passwords[index - 1]);
        else if (index === 0 && passwords.length === 1) {
          setCurrentItem({
            website: "",
            username: "",
            password: "",
          });
        } else if (index === 0) setCurrentItem(passwords[1]);
        else setCurrentItem(passwords[index + 1]);
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
      <div className="dashboard-container">
        <PasswordList list={passwords} />
        <PasswordPanel />
      </div>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
