import React, { useContext } from 'react';
import Category from './category/Category';
import Dashboard from "./dashboard/Dashboard";
import { adminContext } from '../contexts/SidebarCON';
import Product from './product/Product';
import { Route, Routes } from 'react-router';
import Colors from './color/Colors';
import Brands from './brands/Brands';
import Garantys from './garantys/Garantys';
import Discounts from './discounts/Discounts';
import Cards from './cards/Cards';
import Orders from './orders/Orders';
import Deliverys from './deliverys/Deliverys';
import Users from './users/Users';
import Roles from './roles/Roles';
import Permissions from './permissions/Permissions';
import Questions from './questions/questions';
import Comments from './comments/Comments';
import Logout from './auth/logout';
import ChildrenCategory from './category/ChildrenCategory';
import AttributeCategory from './category/attr/AttributeCategory';
import AddColors from './color/AddColors';
import AddBrands from './brands/AddBrands';
import AddGrantees from './garantys/AddGrantees';
import AttributeProduct from './product/AttributeProduct';


const ContainSection = () => {
    const {showMenu}=useContext(adminContext)
    return (
      <section id="content_section" className={`bg-light py-2 px-3${showMenu?" with_sidebar":null}`}>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/category' element={<Category/>} >
            <Route path=':categoryId' element={<ChildrenCategory/>} />
          </Route>
          <Route path='/category/:attributeId/attribute' element={<AttributeCategory/>} />
          <Route path='/Products' element={<Product/>} />

          <Route path='/Products/addColor' element={<Colors/>} />
          <Route path='/Products/addBrand' element={<Brands/>} />
          <Route path='/Products/addGuaranty' element={<Garantys/>} />

          <Route path='/Product/:attributeIdProduct/attribute' element={<AttributeProduct/>} />

          <Route path='/Brands' element={<Brands/>} />
          <Route path='/Colors' element={<Colors/>} />
          <Route path='/Garantys' element={<Garantys/>} />
          <Route path='/Discounts' element={<Discounts/>} />
          <Route path='/Cards' element={<Cards/>} />
          <Route path='/Orders' element={<Orders/>} />
          <Route path='/Deliverys' element={<Deliverys/>} />
          <Route path='/Users' element={<Users/>} />
          <Route path='/Roles' element={<Roles/>} />
          <Route path='/Permissions' element={<Permissions/>} />
          <Route path='/Questions' element={<Questions/>} />
          <Route path='/Comments' element={<Comments/>} />
          <Route path='/Logout' element={<Logout/>} />




          <Route path='*' element={<Category/>} />

        </Routes>
      </section>
    );
}

export default  ContainSection;
