import React from 'react';

function QuickViewModal() {
  return (
    <div className="modal quick-view-modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="icon feather icon-x"></i>
          </button>
          <div className="modal-body">
            {/* Nội dung modal (ví dụ: hình ảnh sản phẩm, thông tin, nút thêm vào giỏ hàng) */}
            <p>Nội dung xem nhanh sản phẩm ở đây</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;