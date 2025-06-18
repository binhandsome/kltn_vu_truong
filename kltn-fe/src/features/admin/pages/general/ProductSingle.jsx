const ProductSingle = () => (
    <div className="main-content">
    {/* <!-- Page Title Start --> */}
    <div className="row">
        <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-title-wrapper">
                <div className="page-title-box">
                    {/* Product Single */}
                    <h4 className="page-title">Sản phẩm đơn</h4>
                </div>
                <div className="breadcrumb-list">
                    <ul>
                        <li className="breadcrumb-link">
                            {/* Dashboard */}
                            <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                        </li>
                        {/* Product Single */}
                        <li className="breadcrumb-link active">Sản phẩm đơn</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Products view Start --> */}
   {/* <!--===Start Index2 Product single Section===--> */}
    <div className="int-product-single">
        <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="int-thumb-slider">
                    {/* <!-- Swiper --> */}
                    <div className="swiper-container gallery-top">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide"><img src="../../assets/admin/images/thumb1.png" alt="product-img"/></div>
                          <div className="swiper-slide"><img src="../../assets/admin/images/thumb2.png" alt="product-img"/></div>
                          <div className="swiper-slide"><img src="../../assets/admin/images/thumb3.png" alt="product-img"/></div>
                          <div className="swiper-slide"><img src="../../assets/admin/images/thumb4.png" alt="product-img"/></div>
                        </div>
                    </div>
                </div>
                <div className="int-minithumb-slider">
                      <div className="swiper-container gallery-thumbs">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide"><img src="../../assets/admin/images/product.png" alt="product-img"/></div>
                          <div className="swiper-slide"><img src="../../assets/admin/images/product2.png" alt="product-img"/></div>
                          <div className="swiper-slide"><img src="../../assets/admin/images/product3.png" alt="product-img"/></div>
                          <div className="swiper-slide"><img src="../../assets/admin/images/product4.png" alt="product-img"/></div>
                        </div>
                      </div>
                    {/* <!-- Swiper --> */}
                </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="int-thumb-sidebar">
                    <div className="int-price-detail">
                        <h1>Supreme Pearl Super Chair, wooden Yellow</h1>
                        <ul>
                            <li>$60</li>
                            <li>$100</li>
                            {/* on offer */}
                            <li>Được cung cấp</li>
                            {/* 3 Customer Reviews */}
                            <li>3 đánh giá của khách hàng</li>
                            <li>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="fals"></i>
                                <i className="fa fa-star" aria-hidden="fals"></i>
                            </li>
                        </ul>
                    </div>
                    <div className="int-thumb-description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat...</p>
                        <ul>
                            <li><span>Kích thước sản phẩm: </span>Length (17 inch.), Height (32 inches)</li>
                            <li><span>Vật liệu chính: </span>Wooden</li>
                            <li><span>Màu sắc: </span>Yellow, Style: Modern</li>
                            <li><span>Bảo hành: </span>6 month warranty on manufacturing defects</li>
                        </ul>
                    </div>
                    <div className="int-color-thumb">
                        {/* Color */}
                        <h5>Màu sắc</h5>
                        <ul>
                            <li><a href="javascript:;"></a></li>
                            <li><a href="javascript:;"></a></li>
                            <li><a href="javascript:;"></a></li>
                            <li><a href="javascript:;"></a></li>
                        </ul>
                    </div>
                    <div className="int-quantity-style2">
                        <div className="int-textbox-subscribe4">
                            {/* Available Options */}
                            <p>Tùy chọn có sẵn</p>
                            <div className="int-search-wrapper" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                {/* Enter Your Pincode */}
                               <input type="text" placeholder="Nhập mã pin của bạn" id="searchInput"/>
                               {/* check */}
                                <a href="javascript:;" className="ad-btn" id="searchInputBtn">Kiểm tra</a>
                            </div>
                            {/* Generally delivered in 8 - 12 days */}
                            <span>Nói chung giao hàng trong vòng 8 - 12 ngày</span>
                        </div>
                    </div>
                    <div className="int-quantity-stock">
                        {/* Availability   Many In Stock  */}
                        <h5>Sẵn có : <span>Nhiều Còn Hàng</span></h5>
                        <ul>
                            <li>Quantity</li>
                            <li>
                                <div className="fd-pro-quantity">
                                    <div className="quantity-wrapper">
                                        <div className="input-group">
                                            <input type="text" className="quantity" value="2"/>
                                            <span className="quantity-minus quantity-minus2"> <i className="fas fa-angle-up"></i> </span>
                                            <span className="quantity-plus quantity-plus2"> <i className="fas fa-angle-down"></i> </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {/* Add to cart */}
                                <a href="cart.html" className="ad-btn">Thêm vào giỏ hàng</a>
                            </li>
                            <li>
                                <a href="javascript:;" className="svg-icon">
                                    <svg viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m256 455.515625c-7.289062 0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187 0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094 9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938 23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281 109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126 50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781 54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781 37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187 43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344 7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;" className="svg-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.095 300.095">
                                        <g>
                                            <g>
                                                <g>
                                                    <path d="M23.491,144.032c0-28.762,23.399-52.155,52.161-52.155h185.706l-46.874,46.874l14.31,14.305
                                                        l71.301-71.295L228.8,10.47L214.5,24.78l46.863,46.868H75.657c-39.912,0-72.389,32.477-72.389,72.389v7.419h20.228v-7.424H23.491
                                                        z"/>
                                                </g>
                                                <g>
                                                    <path d="M276.604,156.058c0,28.762-23.404,52.155-52.166,52.155H38.726l46.879-46.874L71.29,147.04
                                                        L0,218.335l71.295,71.29l14.299-14.31l-46.874-46.868h185.711c39.917,0,72.394-32.471,72.394-72.388v-7.419h-20.228v7.419
                                                        H276.604z"/>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
                    
    </div>
    {/* <!--======End Index2 Product single Section======--> */}
    
    {/* <!--===Products Details===--> */}
    <div className="product-detail-wrapper">
        <div className="row">
            <div className="col-lg-12 col-md-12">
                <div className="product-detail-tab">
                    <ul className="nav nav-tabs">
                        {/* Description */}
                        <li><a data-bs-toggle="tab" className="active" href="product-single.html#description">Mô tả</a></li>
                        {/* Review */}
                        <li><a data-bs-toggle="tab" href="product-single.html#review">Đánh giá</a></li>
                        {/* Additional Information */}
                        <li><a data-bs-toggle="tab" href="product-single.html#info">Thông tin bổ sung</a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="description" className="tab-pane fade show active">
                            <div className="int-tab-peragraph">
                                <p><span>Adipisicing elit sed do eiusmod</span> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut auip ex ea coimeeresremodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, suntin culpa qui ofeireereificia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaqudeie ipsa quaree abei illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                <p><span>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</span> sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesereiciunt. Neque porro quiserquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat volurewiptatereriiem
                                </p>
                            </div>
                        </div>
                        <div id="review" className="tab-pane fade">
                            <div className="fd-review-wrapper">
                                {/* There are no reviews yet. */}
                                <h3 className="review-heading">Chưa có đánh giá nào.</h3>
                                {/* Be the first to review "this product" */}
                                <h5>Hãy là người đầu tiên đánh giá "sản phẩm này"</h5>
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-block">
                                                    <input type="text" className="form_field" placeholder="Tên"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-block">
                                                    <input type="text" className="form_field" placeholder="Email"/>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-block">
                                                    <textarea placeholder="Đánh giá của bạn" className="form_field"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <a href="javascript:;" className="ad-btn">Gửi</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="info" className="tab-pane fade">
                            <ul className="additional-info">
                                <li>
                                    {/* size */}
                                    <span className="info-head">Kích cỡ -</span>
                                    4 cm x 20 cm
                                </li>
                                <li>
                                    {/* system rating */}
                                    <span className="info-head">Đánh giá hệ thống -</span>
                                    cao
                                </li>
                                <li>
                                    <span className="info-head">Màu -</span>
                                    nâu
                                </li>
                                <li>
                                    <span className="info-head">Vật liệu -</span>
                                   sofa
                                </li>
                                <li>
                                    <span className="info-head">Số mô hình -</span>
                                    GT 15014G
                                </li>
                                <li>
                                    <span className="info-head">Tên chung -</span>
                                   sáng
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!--===Products Details===--> */}
    <div className="ad-footer-btm">
        <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
    </div>
</div>
  );
  
  export default ProductSingle;