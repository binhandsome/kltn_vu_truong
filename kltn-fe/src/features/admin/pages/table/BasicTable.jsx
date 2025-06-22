const BasicTable = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                {/* Basic Table */}
                                <h2 className="page-title bold">Bảng cơ bản</h2>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        {/* Home */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang chủ</a>
                                    </li>
                                    {/* Table */}
                                    <li className="breadcrumb-link active">Bảng</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Table Start --> */}
                <div className="row">
                    {/* <!-- Simple Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Simple Table */}
                                <h4>Bảng đơn giản</h4>
                                {/* Add class <code>.table</code> */}
                                <p className="card-desc"> Thêm lớp <code>.table</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Dark Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Dark Table */}
                                <h4>Bảng tối</h4>
                                {/* Add class <code>.table.table-dark</code> */}
                                <p className="card-desc"> Thêm lớp <code>.table.table-dark</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-dark mb-0">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Dark Head Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Table with Dark Head */}
                                <h4>Bảng có đầu đen</h4>
                                {/* Add class <code>.table</code> with thead class <code>.thead-dark</code> */}
                                <p className="card-desc"> Thêm lớp <code>.table</code> với lớp <code>.thead-dark</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <thead className="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Light Head Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Table with Light Head */}
                                <h4>Bảng có đầu đèn</h4>
                                {/* Add class <code>.table</code> with thead class <code>.thead-light</code> */}
                                <p className="card-desc">Thêm lớp <code>.table</code> với lớp <code>.thead-light</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <thead className="thead-light">
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Striped Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Striped Table */}
                                <h4>Bảng sọc</h4>
                                {/* Add class <code>.table.table-striped</code> */}
                                <p className="card-desc"> Thêm lớp <code>.table.table-striped</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-striped mb-0">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Dark Striped Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Dark Striped Table */}
                                <h4>Bảng sọc đen</h4>
                                {/* Add class <code>.table.table-striped.table-dark</code> */}
                                <p className="card-desc"> Thêm lớp <code>.table.table-striped.table-dark</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-dark mb-0">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Bordered Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Bordered Table */}
                                <h4>Bảng có viền</h4>
                                {/* Add class <code>.table.table-bordered</code> */}
                                <p className="card-desc"> Thêm lớp <code>.table.table-bordered</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-bordered mb-0">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td colspan="2">Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Dark Bordered Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Dark Bordered Table */}
                                <h4>Bảng viền tối</h4>
                                {/* Add class <code>.table.table-bordered.table-dark</code> */}
                                <p className="card-desc"> Thêm lớp <code>.table.table-bordered.table-dark</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-dark mb-0">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td colspan="2">Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Light Table Hover Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Light Table with Hover */}
                                <h4>Bảng đèn có thể di chuyển</h4>
                                {/* Add class <code>.table.table-hover</code> */}
                                <p className="card-desc">Thêm lớp <code>.table.table-hover</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td colspan="2">Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Dark Table Hover Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Dark Table with Hover */}
                                <h4>Bảng tối với Hover</h4>
                                {/* Add class <code>.table.table-hover.table-dark</code> */}
                                <p className="card-desc"> Thêm lớp <code>.table.table-hover.table-dark</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-dark mb-0">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td colspan="2">Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Samll Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Samll Table */}
                                <h4>Bảng nhỏ</h4>
                                {/* Add class <code>.table.table-sm</code */}
                                <p className="card-desc"> Thêm lớp <code>.table.table-sm</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-sm mb-0">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td colspan="2">Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Dark Samll Table Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Dark Samll Table */}
                                <h4>Bàn nhỏ màu tối</h4>
                                {/* Add class <code>.table.table-sm.table-dark</code> */}
                                <p className="card-desc"> Thêm lớp <code>.table.table-sm.table-dark</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-sm table-dark mb-0">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                    <th scope="col">Họ</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Xử lí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td colspan="2">Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				 {/* <!-- table-responsive--> */}
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Responsive table */}
                                <h4>Bảng phản hồi</h4>
                                {/* Create responsive tables by wrapping any .table in .table-responsive to make them scroll horizontally on small devices (under 768px). */}
                                <p className="card-desc">Tạo bảng phản hồi bằng cách gói bất kỳ .table nào trong .table-responsive để khiến chúng cuộn theo chiều ngang trên các thiết bị nhỏ (dưới 768px).</p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Tiêu đề</th>
                                                    <th scope="col">Tiêu đề</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">6</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">7</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">8</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">9</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				{/* <!-- table-responsive--> */}
                {/* <!-- Colored Table Card--> */}
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Colored Table */}
                                <h4>Bảng màu</h4>
                                {/* Various Color Available with there Classes */}
                                <p className="card-desc">Có nhiều màu sắc khác nhau với các lớp học đó</p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-dark mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Tiêu đề</th>
                                                    <th scope="col">Tiêu đề</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-primary">
                                                    <th scope="row">1</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr className="bg-success">
                                                    <th scope="row">3</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr className="bg-info">
                                                    <th scope="row">5</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">6</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr className="bg-warning">
                                                    <th scope="row">7</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">8</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                                <tr className="bg-danger">
                                                    <th scope="row">9</th>
                                                    <td>Cell</td>
                                                    <td>Cell</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
  
  export default BasicTable;