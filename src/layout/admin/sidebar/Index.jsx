import React, { memo, useCallback, useContext, useState } from "react";
import { adminContext } from "../../../contexts/SidebarCON";
import SidebarTitle from "./SidebarTitle";
import SidebarLi from "./SidebarLi";
import Avatar from "./Avatar";

const Sidebar = () => {
  const { showMenu } = useContext(adminContext);
  const { hover,setHover } = useContext(adminContext);

  const onMouseOver =() => {
    setHover(true);
  } 

  const onMouseOur =() => {
    setHover(false);
  }
  return (
    <section id="sidebar_section">
      <div
        className={`mini_sidebar collapsedd h-100 ${
          showMenu ? "expanded" : null
        }`}
      >
        <ul
          className="p-0 m-0"
          onMouseOver={()=>onMouseOver()}
          onMouseOut={()=>onMouseOur()}
        >
          <Avatar
            img="/assets/images/avatar/user2.jpg"
            title1="قاسم بساکی"
            title2="ادمین"
            hover={hover}
          />
          <SidebarLi path={"/"} title="داشبورد" icon="fas fa-tachometer-alt" />
          {/* <!-- =================================== --> */}
          <SidebarTitle title="فروشگاه" />
          <SidebarLi
            path={"/Category"}
            title="مدیریت گروه محصول"
            icon="fas fa-stream"
          />
          <SidebarLi
            path={"/Products"}
            title="مدیریت محصول"
            icon="fas fa-cube"
          />
          <SidebarLi
            path={"/Brands"}
            title="مدیریت برند ها"
            icon="fas fa-copyright"
          />
          <SidebarLi
            path={"/Garantys"}
            title="مدیریت گارانتی ها"
            icon="fab fa-pagelines"
          />
          <SidebarLi
            path={"/Colors"}
            title="مدیریت رنگ ها"
            icon="fas fa-palette"
          />
          <SidebarLi
            path={"/Discounts"}
            title="مدیریت تخفیف ها "
            icon="fas fa-percentage"
          />
          {/* <!-- = path={"/test"}================================== --> */}
          <SidebarTitle title="سفارشات و سبد" />
          <SidebarLi
            path={"/Cards"}
            title="مدیریت سبد ها"
            icon="fas fa-shopping-basket"
          />
          <SidebarLi
            path={"/Orders"}
            title="مدیریت سفارشات"
            icon="fas fa-luggage-cart"
          />
          <SidebarLi
            path={"/Deliverys"}
            title="مدیریت نحوه ارسال"
            icon="fas fa-truck-loading"
          />
          {/* <!-- = path={"/test"}================================== --> */}
          <SidebarTitle title="کاربران و همکاران" />
          <SidebarLi
            path={"/Users"}
            title="مشاهده کاربران"
            icon="fas fa-users"
          />
          <SidebarLi path={"/Roles"} title="نقش ها" icon="fas fa-user-tag" />
          <SidebarLi
            path={"/Permissions"}
            title="مجوز ها"
            icon="fas fa-shield-alt"
          />
          {/* <!-- =================================== --> */}
          <SidebarTitle title="ارتباطات" />
          <SidebarLi
            path={"/Questions"}
            title="سوال ها"
            icon="fas fa-question-circle"
          />
          <SidebarLi path={"/Comments"} title="نظرات" icon="fas fa-comment" />
        </ul>
      </div>
    </section>
  );
};

export default memo(Sidebar);
