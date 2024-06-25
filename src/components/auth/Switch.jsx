import { FastField } from 'formik';
import React from 'react';

const Switch = ({name,label}) => {
    return (
        <div className="form-Check-input">
            <FastField className="form-check-input " type="checkbox" name={name} />
            <label className='form-check-label mx-3'>{label}</label>
        </div>
    );
}

export default Switch;
