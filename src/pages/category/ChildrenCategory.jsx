import React, { useEffect } from "react";
import { useLocation } from "react-router";
import PrevBtn from "../../components/prevBtn/PrevBtn";

const ChildrenCategory = () => {
  const location = useLocation();

  return (
    <div className="d-flex flex-row align-items-center justify-content-around my-4">
      <h4 className="text-center mb-4">
        زیر مجموعه{" "}
        <span className="text-primary">{location.state.parent_id.title}</span>
      </h4>
      <PrevBtn/>
    </div>
  );
};

export default ChildrenCategory;
