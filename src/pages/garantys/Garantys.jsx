import React from "react";
import TableGrantees from "./TableGrantees";
import AddGrantees from "./AddGrantees";

const Garantys = () => {
  return (
    <div
      id="manage_guarantee_section"
      className="manage_guarantee_section main_section"
    >
      <h4 className="text-center my-3">مدیریت گارانتی ها</h4>
    
      <TableGrantees />
    </div>
  );
};

export default Garantys;
