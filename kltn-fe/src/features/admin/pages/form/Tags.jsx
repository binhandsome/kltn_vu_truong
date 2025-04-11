const Tags = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title">Tags</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-link active">Tags</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- From Start --> */}
                <div className="from-wrapper">

                    <div className="row">
                        {/* <!-- Allow Case Sensitive --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Allow Case Sensitive</h4>
                                    <p className="card-desc">Default <code>case-sensitive</code> is <code>false</code>. Set it to <code>true</code> to allow case sensitive.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="case-sensitive form-control tagging" data-tags-input-name="case-sensitive">
                                            <div className="tag">
                                                India
                                                <input type="hidden" name="case-sensitive[]" value="India"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Disable "close" Character --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Disable "close" Character</h4>
                                    <p className="card-desc">Default close char is <code>"×"</code>. Pass empty string <code>close-char:""</code> To remove close char.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="close-char form-control tagging" data-tags-input-name="close-char">
                                            <div className="tag">
                                                General
                                                <input type="hidden" name="close-char[]" value="General"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Remove tag on delete Button --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Remove tag on delete Button</h4>
                                    <p className="card-desc">Default close char is <code>"×"</code>. Pass empty string <code>close-char:""</code> To remove close char.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="deleted form-control tagging" data-tags-input-name="deleted">
                                            <div className="tag">
                                                Bags
                                                <input type="hidden" name="deleted[]" value="Bags"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Remove tag on delete Button --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Remove tag on delete Button</h4>
                                    <p className="card-desc">Default you can edit the tag you just deleted from the tag box. set it <code>deleted:false</code> to avoid that.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="deleted form-control tagging" data-tags-input-name="deleted">
                                            <div className="tag">
                                                Bags
                                                <input type="hidden" name="deleted[]" value="Bags"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Allow Duplicate Tag --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Allow Duplicate Tag</h4>
                                    <p className="card-desc">Default duplicate tags are not allowed, set <code>duplicated:false</code> to allow duplicates.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="duplicated form-control tagging" data-tags-input-name="duplicated">
                                            <div className="tag">
                                                Repeated
                                                <input type="hidden" name="duplicated[]" value="Repeated"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Disable "Enter" Button  --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Disable "Enter" Button </h4>
                                    <p className="card-desc">Default Enter key add a new tag, set it <code>no-enter:true</code> to avoid that.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="no-enter form-control tagging" data-tags-input-name="no-enter">
                                            <div className="tag">
                                                Repeated
                                                <input type="hidden" name="no-enter[]" value="Repeated"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Enable "Comma" --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Enable "Comma"</h4>
                                    <p className="card-desc">Default Comma key add a new tag, set it <code>no-comma:true</code> to avoid that.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="no-comma form-control tagging" data-tags-input-name="no-comma">
                                            <div className="tag">
                                                Repeated
                                                <input type="hidden" name="no-comma[]" value="Repeated"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Tag With Tagging Area --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Tag With Tagging Area</h4>
                                    <p className="card-desc">Default No Input Fiels Show, set it <code>type-zone-class</code></p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="type-zone-class form-control tagging" data-tags-input-name="type-zone-class">
                                            <div className="tag">
                                                Repeated
                                                <input type="hidden" name="type-zone-class[]" value="Repeated"/>
                                            </div>
                                            <input className="tagging-area" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Reset Tags --> */}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Reset Tags</h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="row align-items-center">
                                            <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-12">
                                                <div className="reset-box form-control tagging" data-tags-input-name="reset-box">
                                                    <div className="tag">
                                                        artist, video
                                                        <input type="hidden" name="reset-box[]" value="artist, video"/>
                                                    </div>
                                                    <div className="tag">
                                                        Blogs
                                                        <input type="hidden" name="reset-box[]" value="Blogs"/>
                                                    </div>
                                                    <input className="type-zone" contenteditable="true"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <button className="btn btn-primary squer-btn reset-tagging" type="button">Reset</button>
                                            </div>
                                        </div>
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
  
  export default Tags;