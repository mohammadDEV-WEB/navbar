import React from 'react';

const FormikErorr = ({children}) => {
    return (
        <small className='d-block text-danger mb-4 error-massage'>{children}</small>
    );
}

export default FormikErorr;
