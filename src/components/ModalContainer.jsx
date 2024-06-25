import React from 'react';
import { createPortal } from 'react-dom';

const ModalContainer = ({children,id,fulScreen,title,edit}) => {
    return createPortal(
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className={`modal-dialog ${fulScreen? "modal-fullscreen": null}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title flex-fill" id="exampleModalLabel">
              {title}<span className='text-primary'>{edit}</span>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
        ,
        document.getElementById("modal-root")
    );
}

export default ModalContainer;
