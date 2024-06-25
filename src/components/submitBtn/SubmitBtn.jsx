import React from "react";
import LoadingCom from "../LoadingCom";

const SubmitBtn = ({title,isSubmitting,setLoading}) => {
  return (
    <button className="btn btn-primary" disabled={isSubmitting} type="submit">
      {title}
      {isSubmitting ? (
        <LoadingCom colorClass="text-white" inline={true} isSmall={true} />
      ) : (
        ""
      )}
    </button>
  );
};

export default SubmitBtn;
