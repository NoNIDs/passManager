import React from "react";

import SortPanel from "./SortPanel";
import PasswordItem from "./PasswordItem";
import CreateButton from "./CreateButton";

function PasswordList(props) {
  return (
    <div className="password-list-container">
      <SortPanel />
      <div className="password-list">
        {props.list.map((item) => (
          <PasswordItem key={item._id} password={item} />
        ))}
      </div>
      <CreateButton />
    </div>
  );
}

export default PasswordList;
