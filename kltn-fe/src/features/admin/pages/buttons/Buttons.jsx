const Buttons = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title bold">Button</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        {/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Bảng điều khiển</a>
                                    </li>
                                    {/* Nút */}
                                    <li className="breadcrumb-link active">Nút</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Default Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Default Buttons */}
                                <h4 className="card-title">Nút mặc định</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Diffrent Rounded Button use with there Class */}
                                        <p>Sử dụng nút bo tròn khác nhau với lớp của nó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn btn-primary mt-2 mr-2">Primary</button>
                                        <button type="button" className="btn btn-secondary mt-2 mr-2">Secondary</button>
                                        <button type="button" className="btn btn-success mt-2 mr-2">Success</button>
                                        <button type="button" className="btn btn-danger mt-2 mr-2">Danger</button>
                                        <button type="button" className="btn btn-warning mt-2 mr-2">Warning</button>
                                        <button type="button" className="btn btn-info mt-2 mr-2">Info</button>
                                        <button type="button" className="btn btn-light mt-2 mr-2">Light</button>
                                        <button type="button" className="btn btn-dark mt-2 mr-2">Dark</button>
                                        <button type="button" className="link btn-link mt-2 mr-2">Link</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Squer Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Squere Buttons */}
                                <h4 className="card-title">Nút vuông</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Diffrent Squre Button use with there Class */}
                                        <p>Nút Square khác nhau sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn btn-primary squer-btn mt-2 mr-2">Primary</button>
                                        <button type="button" className="btn btn-secondary squer-btn mt-2 mr-2">Secondary</button>
                                        <button type="button" className="btn btn-success squer-btn mt-2 mr-2">Success</button>
                                        <button type="button" className="btn btn-danger squer-btn mt-2 mr-2">Danger</button>
                                        <button type="button" className="btn btn-warning squer-btn mt-2 mr-2">Warning</button>
                                        <button type="button" className="btn btn-info squer-btn mt-2 mr-2">Info</button>
                                        <button type="button" className="btn btn-light squer-btn mt-2 mr-2">Light</button>
                                        <button type="button" className="btn btn-dark squer-btn mt-2 mr-2">Dark</button>
                                        <button type="button" className="link btn-link squer-btn mt-2 mr-2">Link</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Animated Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Hovered Animate Buttons */}
                                <h4 className="card-title">Các nút hoạt hình khi di chuột</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Animated Rounded Button use with there Class */}
                                        <p>Nút tròn hoạt hình sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="effect-btn btn btn-primary mt-2 mr-2">Primary</button>
                                        <button type="button" className="effect-btn btn btn-secondary mt-2 mr-2">Secondary</button>
                                        <button type="button" className="effect-btn btn btn-success mt-2 mr-2">Success</button>
                                        <button type="button" className="effect-btn btn btn-danger mt-2 mr-2">Danger</button>
                                        <button type="button" className="effect-btn btn btn-warning mt-2 mr-2">Warning</button>
                                        <button type="button" className="effect-btn btn btn-info mt-2 mr-2">Info</button>
                                        <button type="button" className="effect-btn btn btn-light mt-2 mr-2">Light</button>
                                        <button type="button" className="effect-btn btn btn-dark mt-2 mr-2">Dark</button>
                                        <button type="button" className="link btn-link mt-2 mr-2">Link</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Squer Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Hovered Squere Buttons */}
                                <h4 className="card-title">Nút hình vuông di chuột</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        <p>Nút Squere hoạt hình sử dụng với Lớp của nó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="effect-btn btn btn-primary squer-btn mt-2 mr-2">Primary</button>
                                        <button type="button" className="effect-btn btn btn-secondary squer-btn mt-2 mr-2">Secondary</button>
                                        <button type="button" className="effect-btn btn btn-success squer-btn mt-2 mr-2">Success</button>
                                        <button type="button" className="effect-btn btn btn-danger squer-btn mt-2 mr-2">Danger</button>
                                        <button type="button" className="effect-btn btn btn-warning squer-btn mt-2 mr-2">Warning</button>
                                        <button type="button" className="effect-btn btn btn-info squer-btn mt-2 mr-2">Info</button>
                                        <button type="button" className="effect-btn btn btn-light squer-btn mt-2 mr-2">Light</button>
                                        <button type="button" className="effect-btn btn btn-dark squer-btn mt-2 mr-2">Dark</button>
                                        <button type="button" className="link btn-link squer-btn mt-2 mr-2">Link</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Outline Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Outline Buttons */}
                                <h4 className="card-title">Nút phác thảo</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* No animation Simple Outline Button */}
                                        <p>Không có hoạt ảnh Nút phác thảo đơn giản</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn-outline primary-outline mt-2 mr-2">Primary</button>
                                        <button type="button" className="btn-outline secondary-outline mt-2 mr-2">Secondary</button>
                                        <button type="button" className="btn-outline success-outline mt-2 mr-2">Success</button>
                                        <button type="button" className="btn-outline danger-outline mt-2 mr-2">Danger</button>
                                        <button type="button" className="btn-outline warning-outline mt-2 mr-2">Warning</button>
                                        <button type="button" className="btn-outline info-outline mt-2 mr-2">Info</button>
                                        <button type="button" className="btn-outline light-outline mt-2 mr-2">Light</button>
                                        <button type="button" className="btn-outline dark-outline mt-2 mr-2">Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Outline Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Outline Buttons */}
                                <h4 className="card-title">Nút phác thảo</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* No animation Simple Squere Outline Button */}
                                        <p>Không có hoạt ảnh Nút phác thảo hình vuông đơn giản</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn-outline primary-outline squer-btn mt-2 mr-2">Primary</button>
                                        <button type="button" className="btn-outline secondary-outline squer-btn mt-2 mr-2">Secondary</button>
                                        <button type="button" className="btn-outline success-outline squer-btn mt-2 mr-2">Success</button>
                                        <button type="button" className="btn-outline danger-outline squer-btn mt-2 mr-2">Danger</button>
                                        <button type="button" className="btn-outline warning-outline squer-btn mt-2 mr-2">Warning</button>
                                        <button type="button" className="btn-outline info-outline squer-btn mt-2 mr-2">Info</button>
                                        <button type="button" className="btn-outline light-outline squer-btn mt-2 mr-2">Light</button>
                                        <button type="button" className="btn-outline dark-outline squer-btn mt-2 mr-2">Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Samll Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Small Buttons */}
                                <h4 className="card-title">Nút nhỏ</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Small Rounded Button use with there Class */}
                                        <p>Nút tròn nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn btn-primary mt-2 mr-2 sm-btn">Primary</button>
                                        <button type="button" className="btn btn-secondary mt-2 mr-2 sm-btn">Secondary</button>
                                        <button type="button" className="btn btn-success mt-2 mr-2 sm-btn">Success</button>
                                        <button type="button" className="btn btn-danger mt-2 mr-2 sm-btn">Danger</button>
                                        <button type="button" className="btn btn-warning mt-2 mr-2 sm-btn">Warning</button>
                                        <button type="button" className="btn btn-info mt-2 mr-2 sm-btn">Info</button>
                                        <button type="button" className="btn btn-light mt-2 mr-2 sm-btn">Light</button>
                                        <button type="button" className="btn btn-dark mt-2 mr-2 sm-btn">Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Squer Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Squere Buttons */}
                                <h4 className="card-title">Nút vuông</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Samll Squre Button use with there Class */}
                                        <p>Nút vuông nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn btn-primary squer-btn sm-btn mt-2 mr-2">Primary</button>
                                        <button type="button" className="btn btn-secondary squer-btn sm-btn mt-2 mr-2">Secondary</button>
                                        <button type="button" className="btn btn-success squer-btn sm-btn mt-2 mr-2">Success</button>
                                        <button type="button" className="btn btn-danger squer-btn sm-btn mt-2 mr-2">Danger</button>
                                        <button type="button" className="btn btn-warning squer-btn sm-btn mt-2 mr-2">Warning</button>
                                        <button type="button" className="btn btn-info squer-btn sm-btn mt-2 mr-2">Info</button>
                                        <button type="button" className="btn btn-light squer-btn sm-btn mt-2 mr-2">Light</button>
                                        <button type="button" className="btn btn-dark squer-btn sm-btn mt-2 mr-2">Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Samll Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Small Hovered Buttons */}
                                <h4 className="card-title">Các nút nhỏ được di chuột</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Small Rounded Button use with there Class */}
                                        <p>Nút tròn nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="effect-btn btn btn-primary mt-2 mr-2 sm-btn">Primary</button>
                                        <button type="button" className="effect-btn btn btn-secondary mt-2 mr-2 sm-btn">Secondary</button>
                                        <button type="button" className="effect-btn btn btn-success mt-2 mr-2 sm-btn">Success</button>
                                        <button type="button" className="effect-btn btn btn-danger mt-2 mr-2 sm-btn">Danger</button>
                                        <button type="button" className="effect-btn btn btn-warning mt-2 mr-2 sm-btn">Warning</button>
                                        <button type="button" className="effect-btn btn btn-info mt-2 mr-2 sm-btn">Info</button>
                                        <button type="button" className="effect-btn btn btn-light mt-2 mr-2 sm-btn">Light</button>
                                        <button type="button" className="effect-btn btn btn-dark mt-2 mr-2 sm-btn">Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Squer Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Squere Hovered Buttons */}
                                <h4 className="card-title">Nút di chuột hình vuông</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Samll Squre Button use with there Class */}
                                        <p>Nút vuông nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="effect-btn btn btn-primary squer-btn sm-btn mt-2 mr-2">Primary</button>
                                        <button type="button" className="effect-btn btn btn-secondary squer-btn sm-btn mt-2 mr-2">Secondary</button>
                                        <button type="button" className="effect-btn btn btn-success squer-btn sm-btn mt-2 mr-2">Success</button>
                                        <button type="button" className="effect-btn btn btn-danger squer-btn sm-btn mt-2 mr-2">Danger</button>
                                        <button type="button" className="effect-btn btn btn-warning squer-btn sm-btn mt-2 mr-2">Warning</button>
                                        <button type="button" className="effect-btn btn btn-info squer-btn sm-btn mt-2 mr-2">Info</button>
                                        <button type="button" className="effect-btn btn btn-light squer-btn sm-btn mt-2 mr-2">Light</button>
                                        <button type="button" className="effect-btn btn btn-dark squer-btn sm-btn mt-2 mr-2">Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Samll Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Small Hovered Buttons */}
                                <h4 className="card-title">Các nút nhỏ được di chuột</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Small Rounded Button use with there Class */}
                                        <p>Nút tròn nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn-outline primary-outline mt-2 mr-2 sm-btn">Primary</button>
                                        <button type="button" className="btn-outline secondary-outline mt-2 mr-2 sm-btn">Secondary</button>
                                        <button type="button" className="btn-outline success-outline mt-2 mr-2 sm-btn">Success</button>
                                        <button type="button" className="btn-outline danger-outline mt-2 mr-2 sm-btn">Danger</button>
                                        <button type="button" className="btn-outline warning-outline mt-2 mr-2 sm-btn">Warning</button>
                                        <button type="button" className="btn-outline info-outline mt-2 mr-2 sm-btn">Info</button>
                                        <button type="button" className="btn-outline light-outline mt-2 mr-2 sm-btn">Light</button>
                                        <button type="button" className="btn-outline dark-outline mt-2 mr-2 sm-btn">Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Squer Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Squere Hovered Buttons */}
                                <h4 className="card-title">Nút di chuột hình vuông</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Samll Squre Button use with there Class */}
                                        <p>Nút vuông nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn-outline primary-outline squer-btn sm-btn mt-2 mr-2">Primary</button>
                                        <button type="button" className="btn-outline secondary-outline squer-btn sm-btn mt-2 mr-2">Secondary</button>
                                        <button type="button" className="btn-outline success-outline squer-btn sm-btn mt-2 mr-2">Success</button>
                                        <button type="button" className="btn-outline danger-outline squer-btn sm-btn mt-2 mr-2">Danger</button>
                                        <button type="button" className="btn-outline warning-outline squer-btn sm-btn mt-2 mr-2">Warning</button>
                                        <button type="button" className="btn-outline info-outline squer-btn sm-btn mt-2 mr-2">Info</button>
                                        <button type="button" className="btn-outline light-outline squer-btn sm-btn mt-2 mr-2">Light</button>
                                        <button type="button" className="btn-outline dark-outline squer-btn sm-btn mt-2 mr-2">Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- icon Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Rounded Icon Buttons */}
                                <h4 className="card-title">Nút biểu tượng tròn</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Rounded Outline Button small icon use with there Class */}
                                        <p>Nút phác thảo bo tròn biểu tượng nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn-outline primary-outline mt-2 mr-2 icon-sm"><i className="far fa-star"></i></button>
                                        <button type="button" className="btn-outline secondary-outline mt-2 mr-2 icon-sm"><i className="fab fa-facebook-f"></i></button>
                                        <button type="button" className="btn-outline success-outline mt-2 mr-2 icon-sm"><i className="fab fa-linkedin-in"></i></button>
                                        <button type="button" className="btn-outline danger-outline mt-2 mr-2 icon-sm"><i className="fab fa-instagram"></i></button>
                                        <button type="button" className="btn-outline warning-outline mt-2 mr-2 icon-sm"><i className="fab fa-dribbble"></i></button>
                                        <button type="button" className="btn-outline info-outline mt-2 mr-2 icon-sm"><i className="fab fa-pinterest-p"></i></button>
                                        <button type="button" className="btn-outline dark-outline mt-2 mr-2 icon-sm"><i className="fab fa-youtube"></i></button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Rounded Outline Button large icon use with there Class */}
                                        <p>Nút phác thảo bo tròn biểu tượng lớn sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn-outline primary-outline mt-2 mr-2 icon-lg"><i className="far fa-star"></i></button>
                                        <button type="button" className="btn-outline secondary-outline mt-2 mr-2 icon-lg"><i className="fab fa-facebook-f"></i></button>
                                        <button type="button" className="btn-outline success-outline mt-2 mr-2 icon-lg"><i className="fab fa-linkedin-in"></i></button>
                                        <button type="button" className="btn-outline danger-outline mt-2 mr-2 icon-lg"><i className="fab fa-instagram"></i></button>
                                        <button type="button" className="btn-outline warning-outline mt-2 mr-2 icon-lg"><i className="fab fa-dribbble"></i></button>
                                        <button type="button" className="btn-outline info-outline mt-2 mr-2 icon-lg"><i className="fab fa-pinterest-p"></i></button>
                                        <button type="button" className="btn-outline dark-outline mt-2 mr-2 icon-lg"><i className="fab fa-youtube"></i></button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        <p>Nút tròn biểu tượng nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn btn-primary mt-2 mr-2 icon-sm"><i className="far fa-star"></i></button>
                                        <button type="button" className="btn btn-secondary mt-2 mr-2 icon-sm"><i className="fab fa-facebook-f"></i></button>
                                        <button type="button" className="btn btn-success mt-2 mr-2 icon-sm"><i className="fab fa-linkedin-in"></i></button>
                                        <button type="button" className="btn btn-danger mt-2 mr-2 icon-sm"><i className="fab fa-instagram"></i></button>
                                        <button type="button" className="btn btn-warning mt-2 mr-2 icon-sm"><i className="fab fa-dribbble"></i></button>
                                        <button type="button" className="btn btn-info mt-2 mr-2 icon-sm"><i className="fab fa-pinterest-p"></i></button>
                                        <button type="button" className="btn btn-dark mt-2 mr-2 icon-sm"><i className="fab fa-youtube"></i></button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Rounded Button Large icon use with there Class */}
                                        <p>Nút tròn Biểu tượng lớn sử dụng với Lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="effect-btn btn btn-primary mt-2 mr-2 icon-lg"><i className="far fa-star"></i></button>
                                        <button type="button" className="effect-btn btn btn-secondary mt-2 mr-2 icon-lg"><i className="fab fa-facebook-f"></i></button>
                                        <button type="button" className="effect-btn btn btn-success mt-2 mr-2 icon-lg"><i className="fab fa-linkedin-in"></i></button>
                                        <button type="button" className="effect-btn btn btn-danger mt-2 mr-2 icon-lg"><i className="fab fa-instagram"></i></button>
                                        <button type="button" className="effect-btn btn btn-warning mt-2 mr-2 icon-lg"><i className="fab fa-dribbble"></i></button>
                                        <button type="button" className="effect-btn btn btn-info mt-2 mr-2 icon-lg"><i className="fab fa-pinterest-p"></i></button>
                                        <button type="button" className="effect-btn btn btn-dark mt-2 mr-2 icon-lg"><i className="fab fa-youtube"></i></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <!-- Icon With Text Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Squere Icon Buttons */}
                                <h4 className="card-title">Nút biểu tượng hình vuông</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Squere Outline Button Small icon use with there Class */}
                                        <p>Nút phác thảo hình vuông Biểu tượng nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="squer-btn btn-outline primary-outline mt-2 mr-2 icon-sm"><i className="far fa-star"></i></button>
                                        <button type="button" className="squer-btn btn-outline secondary-outline mt-2 mr-2 icon-sm"><i className="fab fa-facebook-f"></i></button>
                                        <button type="button" className="squer-btn btn-outline success-outline mt-2 mr-2 icon-sm"><i className="fab fa-linkedin-in"></i></button>
                                        <button type="button" className="squer-btn btn-outline danger-outline mt-2 mr-2 icon-sm"><i className="fab fa-instagram"></i></button>
                                        <button type="button" className="squer-btn btn-outline warning-outline mt-2 mr-2 icon-sm"><i className="fab fa-dribbble"></i></button>
                                        <button type="button" className="squer-btn btn-outline info-outline mt-2 mr-2 icon-sm"><i className="fab fa-pinterest-p"></i></button>
                                        <button type="button" className="squer-btn btn-outline dark-outline mt-2 mr-2 icon-sm"><i className="fab fa-youtube"></i></button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Squere Outline Button large icon use with there Class */}
                                        <p>Nút phác thảo hình vuông biểu tượng lớn sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="squer-btn btn-outline primary-outline mt-2 mr-2 icon-lg"><i className="far fa-star"></i></button>
                                        <button type="button" className="squer-btn btn-outline secondary-outline mt-2 mr-2 icon-lg"><i className="fab fa-facebook-f"></i></button>
                                        <button type="button" className="squer-btn btn-outline success-outline mt-2 mr-2 icon-lg"><i className="fab fa-linkedin-in"></i></button>
                                        <button type="button" className="squer-btn btn-outline danger-outline mt-2 mr-2 icon-lg"><i className="fab fa-instagram"></i></button>
                                        <button type="button" className="squer-btn btn-outline warning-outline mt-2 mr-2 icon-lg"><i className="fab fa-dribbble"></i></button>
                                        <button type="button" className="squer-btn btn-outline info-outline mt-2 mr-2 icon-lg"><i className="fab fa-pinterest-p"></i></button>
                                        <button type="button" className="squer-btn btn-outline dark-outline mt-2 mr-2 icon-lg"><i className="fab fa-youtube"></i></button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Rounded Button small icon use with there Class */}
                                        <p>Nút tròn biểu tượng nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="squer-btn btn btn-primary mt-2 mr-2 icon-sm"><i className="far fa-star"></i></button>
                                        <button type="button" className="squer-btn btn btn-secondary mt-2 mr-2 icon-sm"><i className="fab fa-facebook-f"></i></button>
                                        <button type="button" className="squer-btn btn btn-success mt-2 mr-2 icon-sm"><i className="fab fa-linkedin-in"></i></button>
                                        <button type="button" className="squer-btn btn btn-danger mt-2 mr-2 icon-sm"><i className="fab fa-instagram"></i></button>
                                        <button type="button" className="squer-btn btn btn-warning mt-2 mr-2 icon-sm"><i className="fab fa-dribbble"></i></button>
                                        <button type="button" className="squer-btn btn btn-info mt-2 mr-2 icon-sm"><i className="fab fa-pinterest-p"></i></button>
                                        <button type="button" className="squer-btn btn btn-dark mt-2 mr-2 icon-sm"><i className="fab fa-youtube"></i></button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Rounded Button Large icon use with there Class */}
                                        <p>Nút tròn Biểu tượng lớn sử dụng với Lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="squer-btn effect-btn btn btn-primary mt-2 mr-2 icon-lg"><i className="far fa-star"></i></button>
                                        <button type="button" className="squer-btn effect-btn btn btn-secondary mt-2 mr-2 icon-lg"><i className="fab fa-facebook-f"></i></button>
                                        <button type="button" className="squer-btn effect-btn btn btn-success mt-2 mr-2 icon-lg"><i className="fab fa-linkedin-in"></i></button>
                                        <button type="button" className="squer-btn effect-btn btn btn-danger mt-2 mr-2 icon-lg"><i className="fab fa-instagram"></i></button>
                                        <button type="button" className="squer-btn effect-btn btn btn-warning mt-2 mr-2 icon-lg"><i className="fab fa-dribbble"></i></button>
                                        <button type="button" className="squer-btn effect-btn btn btn-info mt-2 mr-2 icon-lg"><i className="fab fa-pinterest-p"></i></button>
                                        <button type="button" className="squer-btn effect-btn btn btn-dark mt-2 mr-2 icon-lg"><i className="fab fa-youtube"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Samll Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Squere Button With Text icon */}
                                <h4 className="card-title">Nút vuông có biểu tượng văn bản</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Default Squere Button use with there Class */}
                                        <p>Nút Squere mặc định sử dụng với Lớp của nó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="squer-btn btn-outline primary-outline mt-2 mr-2"><i className="far fa-star mr-2"></i>Primary</button>
                                        <button type="button" className="squer-btn btn-outline secondary-outline mt-2 mr-2"><i className="far fa-address-card mr-2"></i>Secondary</button>
                                        <button type="button" className="squer-btn btn-outline success-outline mt-2 mr-2"><i className="fab fa-atlassian mr-2"></i>Success</button>
                                        <button type="button" className="squer-btn btn-outline danger-outline mt-2 mr-2"><i className="fab fa-audible mr-2"></i>Danger</button>
                                        <button type="button" className="squer-btn btn-outline warning-outline mt-2 mr-2"><i className="fas fa-ban mr-2"></i>Warning</button>
                                        <button type="button" className="squer-btn btn-outline info-outline mt-2 mr-2"><i className="far fa-calendar-times mr-2"></i>Info</button>
                                        <button type="button" className="squer-btn btn-outline dark-outline mt-2 mr-2"><i className="far fa-caret-square-up mr-2"></i>Dark</button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Small Squere Button use with there Class */}
                                        <p>Nút vuông nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="squer-btn sm-btn btn-outline primary-outline mt-2 mr-2"><i className="far fa-star mr-2"></i>Primary</button>
                                        <button type="button" className="squer-btn sm-btn btn-outline secondary-outline mt-2 mr-2"><i className="far fa-address-card mr-2"></i>Secondary</button>
                                        <button type="button" className="squer-btn sm-btn btn-outline success-outline mt-2 mr-2"><i className="fab fa-atlassian mr-2"></i>Success</button>
                                        <button type="button" className="squer-btn sm-btn btn-outline danger-outline mt-2 mr-2"><i className="fab fa-audible mr-2"></i>Danger</button>
                                        <button type="button" className="squer-btn sm-btn btn-outline warning-outline mt-2 mr-2"><i className="fas fa-ban mr-2"></i>Warning</button>
                                        <button type="button" className="squer-btn sm-btn btn-outline info-outline mt-2 mr-2"><i className="far fa-calendar-times mr-2"></i>Info</button>
                                        <button type="button" className="squer-btn sm-btn btn-outline dark-outline mt-2 mr-2"><i className="far fa-caret-square-up mr-2"></i>Dark</button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Default Squere Button use with there Class */}
                                        <p>Nút Squere mặc định sử dụng với Lớp của nó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="squer-btn btn btn-primary mt-2 mr-2"><i className="far fa-star mr-2"></i>Primary</button>
                                        <button type="button" className="squer-btn btn btn-secondary mt-2 mr-2"><i className="far fa-address-card mr-2"></i>Secondary</button>
                                        <button type="button" className="squer-btn btn btn-success mt-2 mr-2"><i className="fab fa-atlassian mr-2"></i>Success</button>
                                        <button type="button" className="squer-btn btn btn-danger mt-2 mr-2"><i className="fab fa-audible mr-2"></i>Danger</button>
                                        <button type="button" className="squer-btn btn btn-warning mt-2 mr-2"><i className="fas fa-ban mr-2"></i>Warning</button>
                                        <button type="button" className="squer-btn btn btn-info mt-2 mr-2"><i className="far fa-calendar-times mr-2"></i>Info</button>
                                        <button type="button" className="squer-btn btn btn-dark mt-2 mr-2"><i className="far fa-caret-square-up mr-2"></i>Dark</button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Small Squere Button use with there Class */}
                                        <p>Nút vuông nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="effect-btn squer-btn sm-btn btn btn-primary mt-2 mr-2"><i className="far fa-star mr-2"></i>Primary</button>
                                        <button type="button" className="effect-btn squer-btn sm-btn btn btn-secondary mt-2 mr-2"><i className="far fa-address-card mr-2"></i>Secondary</button>
                                        <button type="button" className="effect-btn squer-btn sm-btn btn btn-success mt-2 mr-2"><i className="fab fa-atlassian mr-2"></i>Success</button>
                                        <button type="button" className="effect-btn squer-btn sm-btn btn btn-danger mt-2 mr-2"><i className="fab fa-audible mr-2"></i>Danger</button>
                                        <button type="button" className="effect-btn squer-btn sm-btn btn btn-warning mt-2 mr-2"><i className="fas fa-ban mr-2"></i>Warning</button>
                                        <button type="button" className="effect-btn squer-btn sm-btn btn btn-info mt-2 mr-2"><i className="far fa-calendar-times mr-2"></i>Info</button>
                                        <button type="button" className="effect-btn squer-btn sm-btn btn btn-dark mt-2 mr-2"><i className="far fa-caret-square-up mr-2"></i>Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Squer Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Rounded Button With Text icon */}
                                <h4 className="card-title">Nút tròn có biểu tượng văn bản</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Default Rounded Button use with there Class */}
                                        <p>Nút tròn mặc định sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn-outline primary-outline mt-2 mr-2"><i className="far fa-star mr-2"></i>Primary</button>
                                        <button type="button" className="btn-outline secondary-outline mt-2 mr-2"><i className="far fa-address-card mr-2"></i>Secondary</button>
                                        <button type="button" className="btn-outline success-outline mt-2 mr-2"><i className="fab fa-atlassian mr-2"></i>Success</button>
                                        <button type="button" className="btn-outline danger-outline mt-2 mr-2"><i className="fab fa-audible mr-2"></i>Danger</button>
                                        <button type="button" className="btn-outline warning-outline mt-2 mr-2"><i className="fas fa-ban mr-2"></i>Warning</button>
                                        <button type="button" className="btn-outline info-outline mt-2 mr-2"><i className="far fa-calendar-times mr-2"></i>Info</button>
                                        <button type="button" className="btn-outline dark-outline mt-2 mr-2"><i className="far fa-caret-square-up mr-2"></i>Dark</button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Small Rounded Button use with there Class */}
                                        <p>Nút tròn nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="sm-btn btn-outline primary-outline mt-2 mr-2"><i className="far fa-star mr-2"></i>Primary</button>
                                        <button type="button" className="sm-btn btn-outline secondary-outline mt-2 mr-2"><i className="far fa-address-card mr-2"></i>Secondary</button>
                                        <button type="button" className="sm-btn btn-outline success-outline mt-2 mr-2"><i className="fab fa-atlassian mr-2"></i>Success</button>
                                        <button type="button" className="sm-btn btn-outline danger-outline mt-2 mr-2"><i className="fab fa-audible mr-2"></i>Danger</button>
                                        <button type="button" className="sm-btn btn-outline warning-outline mt-2 mr-2"><i className="fas fa-ban mr-2"></i>Warning</button>
                                        <button type="button" className="sm-btn btn-outline info-outline mt-2 mr-2"><i className="far fa-calendar-times mr-2"></i>Info</button>
                                        <button type="button" className="sm-btn btn-outline dark-outline mt-2 mr-2"><i className="far fa-caret-square-up mr-2"></i>Dark</button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Default Rounded Button use with there Class */}
                                        <p>Nút tròn mặc định sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="btn btn-primary mt-2 mr-2"><i className="far fa-star mr-2"></i>Primary</button>
                                        <button type="button" className="btn btn-secondary mt-2 mr-2"><i className="far fa-address-card mr-2"></i>Secondary</button>
                                        <button type="button" className="btn btn-success mt-2 mr-2"><i className="fab fa-atlassian mr-2"></i>Success</button>
                                        <button type="button" className="btn btn-danger mt-2 mr-2"><i className="fab fa-audible mr-2"></i>Danger</button>
                                        <button type="button" className="btn btn-warning mt-2 mr-2"><i className="fas fa-ban mr-2"></i>Warning</button>
                                        <button type="button" className="btn btn-info mt-2 mr-2"><i className="far fa-calendar-times mr-2"></i>Info</button>
                                        <button type="button" className="btn btn-dark mt-2 mr-2"><i className="far fa-caret-square-up mr-2"></i>Dark</button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="card-text">
                                        {/* Small Rounded Button use with there Class */}
                                        <p>Nút tròn nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button type="button" className="effect-btn sm-btn btn btn-primary mt-2 mr-2"><i className="far fa-star mr-2"></i>Primary</button>
                                        <button type="button" className="effect-btn sm-btn btn btn-secondary mt-2 mr-2"><i className="far fa-address-card mr-2"></i>Secondary</button>
                                        <button type="button" className="effect-btn sm-btn btn btn-success mt-2 mr-2"><i className="fab fa-atlassian mr-2"></i>Success</button>
                                        <button type="button" className="effect-btn sm-btn btn btn-danger mt-2 mr-2"><i className="fab fa-audible mr-2"></i>Danger</button>
                                        <button type="button" className="effect-btn sm-btn btn btn-warning mt-2 mr-2"><i className="fas fa-ban mr-2"></i>Warning</button>
                                        <button type="button" className="effect-btn sm-btn btn btn-info mt-2 mr-2"><i className="far fa-calendar-times mr-2"></i>Info</button>
                                        <button type="button" className="effect-btn sm-btn btn btn-dark mt-2 mr-2"><i className="far fa-caret-square-up mr-2"></i>Dark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Grouped Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Rounded Grouped Buttons */}
                                <h4 className="card-title">Các nút nhóm tròn</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Diffrent Rounded Button use with there Class */}
                                        <p>Sử dụng nút bo tròn khác nhau với lớp của nó</p>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-primary sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-primary sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-primary sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-secondary sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-secondary sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-secondary sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-warning sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-warning sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-warning sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-info sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-info sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-info sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-danger sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-danger sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-danger sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-dark sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-dark sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-dark sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Squer Grouped Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Squere Grouped Buttons */}
                                <h4 className="card-title">Nút nhóm hình vuông</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Diffrent Squre Button use with there Class */}
                                        <p>Nút Square khác nhau sử dụng với lớp đó</p>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-primary sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-primary sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-primary sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-secondary sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-secondary sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-secondary sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-warning sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-warning sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-warning sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-info sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-info sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-info sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-danger sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-danger sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-danger sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn btn-dark sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn btn-dark sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn btn-dark sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Grouped Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Rounded Grouped Buttons */}
                                <h4 className="card-title">Các nút nhóm tròn</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Diffrent Rounded Button use with there Class */}
                                        <p>Sử dụng nút bo tròn khác nhau với lớp của nó</p>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline primary-outline sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline primary-outline border-lf-0 sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline primary-outline sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline secondary-outline sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline secondary-outline border-lf-0 sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline secondary-outline sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline warning-outline sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline warning-outline border-lf-0 sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline warning-outline sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline info-outline sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline info-outline border-lf-0 sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline info-outline sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline danger-outline sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline danger-outline border-lf-0 sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline danger-outline sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group btn-group-pill mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline dark-outline sm-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline dark-outline border-lf-0 sm-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline dark-outline sm-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Squer Grouped Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Squere Grouped Buttons */}
                                <h4 className="card-title">Nút nhóm hình vuông</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Diffrent Squre Button use with there Class */}
                                        <p>Nút Square khác nhau sử dụng với lớp đó</p>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline primary-outline sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline primary-outline border-lf-0 sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline primary-outline sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline secondary-outline sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline secondary-outline border-lf-0 sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline secondary-outline sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline warning-outline sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline warning-outline border-lf-0 sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline warning-outline sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline info-outline sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline info-outline border-lf-0 sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline info-outline sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline danger-outline sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline danger-outline border-lf-0 sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline danger-outline sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                    <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                        <button className="btn-outline dark-outline sm-btn flat-btn" type="button" data-original-title="" title="">Left</button>
                                        <button className="btn-outline dark-outline border-lf-0 sm-btn flat-btn" type="button" data-original-title="" title="">Middle</button>
                                        <button className="btn-outline dark-outline sm-btn flat-btn" type="button" data-original-title="" title="">Right</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Samll Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Dropdown With Diffrent Size */}
                                <h4 className="card-title">Dropdown với kích thước khác nhau</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Small Rounded Button use with there Class */}
                                        <p>Nút tròn nhỏ sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <div className="btn-group mt-2 mr-2" role="group">
                                            <button className="lg-btn btn btn-primary dropdown-toggle" id="btn1" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-original-title="" title="">Dropdown</button>
                                            <div className="dropdown-menu" aria-labelledby="btn1" ><a className="dropdown-item" href="javascript:;" data-original-title="" title="">Dropdown link</a><a className="dropdown-item" href="javascript:;" data-original-title="" title="">Dropdown link</a></div>
                                        </div>
                                        <div className="btn-group mt-2 mr-2" role="group">
                                            <button className="btn btn-primary dropdown-toggle" id="btn2" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-original-title="" title="">Dropdown</button>
                                            <div className="dropdown-menu" aria-labelledby="btn2"><a className="dropdown-item" href="javascript:;" data-original-title="" title="">Dropdown link</a><a className="dropdown-item" href="javascript:;" data-original-title="" title="">Dropdown link</a></div>
                                        </div>
                                        <div className="btn-group mt-2 mr-2" role="group">
                                            <button className="sm-btn btn btn-primary dropdown-toggle" id="btn3" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-original-title="" title="">Dropdown</button>
                                            <div className="dropdown-menu" aria-labelledby="btn3" ><a className="dropdown-item" href="javascript:;" data-original-title="" title="">Dropdown link</a><a className="dropdown-item" href="javascript:;" data-original-title="" title="">Dropdown link</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Samll Buttons --> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                {/* Loading Buttons */}
                                <h4 className="card-title">Đang tải nút</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="card-text">
                                        {/* Loading Button use with there Class */}
                                        <p>Nút tải sử dụng với lớp đó</p>
                                    </div>
                                    <div className="dd-flex align-items-center">
                                        <button className="lg-btn btn btn-primary mt-2 mr-2" data-original-title="" title=""><i className="fa fa-spin fa-spinner mr-2"></i>Expand UP</button>
                                        <button className="btn btn-primary mt-2 mr-2" data-original-title="" title=""><i className="fa fa-spin fa-spinner mr-2"></i>Expand UP</button>
                                        <button className="sm-btn btn btn-primary mt-2 mr-2" data-original-title="" title=""><i className="fa fa-spin fa-spinner mr-2"></i>Expand UP</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div className="ad-footer-btm">
					<p>Copyright 2022 © SplashDash All Rights Reserved.</p>
				</div>
            </div>
  );
  
  export default Buttons;