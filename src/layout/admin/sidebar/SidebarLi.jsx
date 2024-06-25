import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLi = ({title,icon,path}) => {
    return (
        <NavLink
            to={path}
            className="pb-1 text-start pe-4 sidebar_menu_item"
            data-section-id="dashboard_section"
            style={{lineHeight: "1.7 !import"}}
          >
            <i className={`ms-3 icon ${icon} text-light`}></i>
            <span className="hiddenable no_wrap font_08">{title}</span>
        </NavLink>
    );
}

export default SidebarLi;
