import React from "react";

const DiscountPercent = ({rowData}) => {
  return (
    <span>
      {rowData.percent  ? rowData.percent+"%" : ""}
    </span>
  );
};

export default DiscountPercent;
