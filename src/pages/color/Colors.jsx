import React from "react";
import ColorTable from "./colorTable";
import AddColors from "./AddColors";

const Colors = () => {
  return (
    <div
      id="manage_color_section"
      className="add_color_section main_section"
    >
      <h4 className="text-center my-3">مدیریت رنگ ها</h4>
        <ColorTable/>
    </div>
  );
};

export default Colors;
