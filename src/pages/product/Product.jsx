import React from 'react';
import TableProduct from './TableProduct';
import AttributeProduct from './AttributeProduct';

const Product = () => {
    return (
    <div
      id="manage_product_section"
      className="manage_product_section main_section"
    >
      <h4 className="text-center my-3">مدیریت محصولات</h4>

      <TableProduct />
    </div>
    );
}

export default Product;
