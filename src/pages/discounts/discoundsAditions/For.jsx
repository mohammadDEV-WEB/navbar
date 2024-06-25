import React from "react";

const For = ({rowData}) => {
  return (
    <span
      className={rowData.for_all == 1 ? `text-success` : `text-danger`}
    >
      {rowData.for_all == 1 ? `هست` : `نیست`}
    </span>
  );
};

export default For;
