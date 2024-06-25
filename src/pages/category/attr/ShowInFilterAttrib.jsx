import React from 'react';

const ShowInFilterAttrib = ({rowData}) => {
    return (
        <span className={rowData.in_filter==1?`text-success`:`text-danger`}>{rowData.in_filter==1?"هست":"نیست"}</span>

    );
}

export default ShowInFilterAttrib;
