import React from 'react';
import { useNavigate } from 'react-router';

const PrevBtn = () => {
    const navigate =useNavigate()
    return (
        <button className="btn btn-secondary px-2 py-1" onClick={()=>navigate(-1)}>بازگشت</button>
    );
}

export default PrevBtn;
