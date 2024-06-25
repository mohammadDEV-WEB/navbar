import React from 'react';
import TableDelivery from './TableDelivery';
import AddDelivery from './AddDelivery';

const Deliverys = () => {
    return (
        <div id="manage_deliveries_section" className="manage_deliveries_section main_section">
            <h4 className="text-center my-3">مدیریت نحوه ارسال</h4>
            <div className="row justify-content-between">
                <div className="col-10 col-md-6 col-lg-4">
                    <div className="input-group mb-3 dir_ltr">
                        <input type="text" className="form-control" placeholder="قسمتی از عنوان را وارد کنید"/>
                        <span className="input-group-text" >جستجو</span>
                    </div>
                </div>
                <AddDelivery/>
            </div>
            <TableDelivery/>
        </div>
    );
}

export default Deliverys;
