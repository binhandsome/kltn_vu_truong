import React from 'react';

function QuickViewModal() {
  return (
<<<<<<< HEAD
    <div
  className="modal quick-view-modal fade"
  id="exampleModal"
  tabIndex={-1}
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        <i className="icon feather icon-x" />
      </button>
      <div className="modal-body">
        <div className="row g-xl-4 g-3">
          <div className="col-xl-6 col-md-6">
            <div className="dz-product-detail mb-0">
              <div className="swiper-btn-center-lr">
                <div className="swiper quick-modal-swiper2">
                  <div className="swiper-wrapper" id="lightgallery">
                    <div className="swiper-slide">
                      <div className="dz-media DZoomImage">
                        <a
                          className="mfp-link lg-item"
                          href="../../assets/user/images//products/lady-1.png"
                          data-src="../../assets/user/images//products/lady-1.png"
                        >
                          <i className="feather icon-maximize dz-maximize top-right" />
                        </a>
                        <img src="../../assets/user/images//products/lady-1.png" alt="image" />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="dz-media DZoomImage">
                        <a
                          className="mfp-link lg-item"
                          href="../../assets/user/images//products/lady-2.png"
                          data-src="../../assets/user/images//products/lady-2.png"
                        >
                          <i className="feather icon-maximize dz-maximize top-right" />
                        </a>
                        <img src="../../assets/user/images//products/lady-2.png" alt="image" />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="dz-media DZoomImage">
                        <a
                          className="mfp-link lg-item"
                          href="../../assets/user/images//products/lady-3.png"
                          data-src="../../assets/user/images//products/lady-3.png"
                        >
                          <i className="feather icon-maximize dz-maximize top-right" />
                        </a>
                        <img src="../../assets/user/images//products/lady-3.png" alt="image" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper quick-modal-swiper thumb-swiper-lg thumb-sm swiper-vertical">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <img
                        src="../../assets/user/images//products/thumb-img/lady-1.png"
                        alt="image"
                      />
                    </div>
                    <div className="swiper-slide">
                      <img
                        src="../../assets/user/images//products/thumb-img/lady-2.png"
                        alt="image"
                      />
                    </div>
                    <div className="swiper-slide">
                      <img
                        src="../../assets/user/images//products/thumb-img/lady-3.png"
                        alt="image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-6">
            <div className="dz-product-detail style-2 ps-xl-3 ps-0 pt-2 mb-0">
              <div className="dz-content">
                <div className="dz-content-footer">
                  <div className="dz-content-start">
                    <span className="badge bg-secondary mb-2">
                      SALE 20% Off
                    </span>
                    <h4 className="title mb-1">
                      <a href="shop-list.html">Cozy Knit Cardigan Sweater</a>
                    </h4>
                    <div className="review-num">
                      <ul className="dz-rating me-2">
                        <li className="star-fill">
                          <i className="flaticon-star-1" />
                        </li>
                        <li className="star-fill">
                          <i className="flaticon-star-1" />
                        </li>
                        <li className="star-fill">
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                      </ul>
                      <span className="text-secondary me-2">4.7 Rating</span>
                      <a href="javascript:void(0);">(5 customer reviews)</a>
                    </div>
                  </div>
                </div>
                <p className="para-text">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has.
                </p>
                <div className="meta-content m-b20 d-flex align-items-end">
                  <div className="me-3">
                    <span className="form-label">Price</span>
                    <span className="price">
                      $125.75 <del>$132.17</del>
                    </span>
                  </div>
                  <div className="btn-quantity light me-0">
                    <label className="form-label">Quantity</label>
                    <input type="text" defaultValue={1} name="demo_vertical2" />
                  </div>
                </div>
                <div className=" cart-btn">
                  <a
                    href="shop-cart.html"
                    className="btn btn-secondary text-uppercase"
                  >
                    Add To Cart
                  </a>
                  <a
                    href="shop-wishlist.html"
                    className="btn btn-md btn-outline-secondary btn-icon"
                  >
                    <svg
                      width={19}
                      height={17}
                      viewBox="0 0 19 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.24805 16.9986C8.99179 16.9986 8.74474 16.9058 8.5522 16.7371C7.82504 16.1013 7.12398 15.5038 6.50545 14.9767L6.50229 14.974C4.68886 13.4286 3.12289 12.094 2.03333 10.7794C0.815353 9.30968 0.248047 7.9162 0.248047 6.39391C0.248047 4.91487 0.755203 3.55037 1.67599 2.55157C2.60777 1.54097 3.88631 0.984375 5.27649 0.984375C6.31552 0.984375 7.26707 1.31287 8.10464 1.96065C8.52734 2.28763 8.91049 2.68781 9.24805 3.15459C9.58574 2.68781 9.96875 2.28763 10.3916 1.96065C11.2292 1.31287 12.1807 0.984375 13.2197 0.984375C14.6098 0.984375 15.8885 1.54097 16.8202 2.55157C17.741 3.55037 18.248 4.91487 18.248 6.39391C18.248 7.9162 17.6809 9.30968 16.4629 10.7792C15.3733 12.094 13.8075 13.4285 11.9944 14.9737C11.3747 15.5016 10.6726 16.1001 9.94376 16.7374C9.75136 16.9058 9.50417 16.9986 9.24805 16.9986ZM5.27649 2.03879C4.18431 2.03879 3.18098 2.47467 2.45108 3.26624C1.71033 4.06975 1.30232 5.18047 1.30232 6.39391C1.30232 7.67422 1.77817 8.81927 2.84508 10.1066C3.87628 11.3509 5.41011 12.658 7.18605 14.1715L7.18935 14.1743C7.81021 14.7034 8.51402 15.3033 9.24654 15.9438C9.98344 15.302 10.6884 14.7012 11.3105 14.1713C13.0863 12.6578 14.6199 11.3509 15.6512 10.1066C16.7179 8.81927 17.1938 7.67422 17.1938 6.39391C17.1938 5.18047 16.7858 4.06975 16.045 3.26624C15.3152 2.47467 14.3118 2.03879 13.2197 2.03879C12.4197 2.03879 11.6851 2.29312 11.0365 2.79465C10.4585 3.24179 10.0558 3.80704 9.81975 4.20255C9.69835 4.40593 9.48466 4.52733 9.24805 4.52733C9.01143 4.52733 8.79774 4.40593 8.67635 4.20255C8.44041 3.80704 8.03777 3.24179 7.45961 2.79465C6.811 2.29312 6.07643 2.03879 5.27649 2.03879Z"
                        fill="black"
                      />
                    </svg>
                    Add To Wishlist
                  </a>
                </div>
                <div className="dz-info mb-0">
                  <ul>
                    <li>
                      <strong>SKU:</strong>
                    </li>
                    <li>PRT584E63A</li>
                  </ul>
                  <ul>
                    <li>
                      <strong>Category:</strong>
                    </li>
                    <li>
                      <a href="shop-standard.html">Dresses,</a>
                    </li>
                    <li>
                      <a href="shop-standard.html">Jeans,</a>
                    </li>
                    <li>
                      <a href="shop-standard.html">Swimwear,</a>
                    </li>
                    <li>
                      <a href="shop-standard.html">Summer,</a>
                    </li>
                    <li>
                      <a href="shop-standard.html">Clothing</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <strong>Tags:</strong>
                    </li>
                    <li>
                      <a href="shop-standard.html">Casual</a>
                    </li>
                    <li>
                      <a href="shop-standard.html">Athletic,</a>
                    </li>
                    <li>
                      <a href="shop-standard.html">Workwear,</a>
                    </li>
                    <li>
                      <a href="shop-standard.html">Accessories</a>
                    </li>
                  </ul>
                  <div className="dz-social-icon">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.facebook.com/dexignzone"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://twitter.com/dexignzones"
                        >
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.youtube.com/@dexignzone1723"
                        >
                          <i className="fa-brands fa-youtube" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.linkedin.com/showcase/3686700/admin/"
                        >
                          <i className="fa-brands fa-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.instagram.com/dexignzone/"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
=======
    <div className="modal quick-view-modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="icon feather icon-x"></i>
          </button>
          <div className="modal-body">
            {/* Nội dung modal (ví dụ: hình ảnh sản phẩm, thông tin, nút thêm vào giỏ hàng) */}
            <p>Nội dung xem nhanh sản phẩm ở đây</p>
>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  </div>
</div>

=======
>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913
  );
}

export default QuickViewModal;