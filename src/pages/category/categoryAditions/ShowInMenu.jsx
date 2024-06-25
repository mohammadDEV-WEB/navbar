import React from 'react';

const ShowInMenu = ({rowData}) => {
    return (
        <span className={rowData.show_in_menu==1?`text-success`:`text-danger`}>{rowData.show_in_menu==1?`هست`:`نیست`}</span>
    ) 
}

export default ShowInMenu;
