const BasicForm = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title">Basic Form</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-link active">Basic Form</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- From Start --> */}
                <div className="from-wrapper">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Vertical</h4>
                                    <p className="card-desc">Here are examples of form add <code>.form</code> tag with inputs.</p>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label className="col-form-label">User Name</label>
                                                <input className="form-control" type="text" placeholder="Jenny"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label">Password</label>
                                                <input className="form-control" type="password" placeholder="123456"/>
                                            </div>
                                            <div className="form-group">
                                                <div className="checkbox">
                                                    <input id="checkbox1" type="checkbox"/>
                                                    <label for="checkbox1">Remember Me</label>
                                                </div>
                                            </div>
                                            <div className="form-group mb-0">
                                                <button className="btn btn-primary" type="button">Reset</button>
                                                <input className="btn btn-light" type="submit"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Horizontal</h4>
                                    <p className="card-desc">Here are examples of form add <code>.form</code> tag with inputs.</p>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label">Username</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" type="text" placeholder="Jenny"/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label">Email</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" type="email" placeholder="example@domain.com" id="email-input"/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label">Password</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" type="password" placeholder="123456"/>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <div className="col-sm-10 offset-sm-2">
                                                    <div className="checkbox">
                                                        <input id="checkbox2" type="checkbox"/>
                                                        <label for="checkbox2">Remember Me</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <div className="col-sm-10 offset-sm-2">
                                                    <button className="btn btn-primary" type="button">reset</button>
                                                    <input className="btn btn-light" type="submit"/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Separate</h4>
                                    <p className="card-desc">Here are examples of form add <code>.separate-form</code> tag with inputs.</p>
                                </div>
                                <div className="card-body">
                                    <form className="separate-form">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h5 className="from-title mb-1">Personal Info</h5>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="member-name" className="col-form-label">Your Name</label>
                                                        <input className="form-control" type="text" placeholder="Enter Your Name" id="member-name"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="member-email" className="col-form-label">Your Email</label>
                                                        <input className="form-control" type="email" placeholder="Enter Your Email" id="member-email"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="company-name" className="col-form-label">Company Name (Optional)</label>
                                                        <input className="form-control" type="text" placeholder="Company Name" id="company-name"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="web-url" className="col-form-label">URL</label>
                                                        <input className="form-control" type="text" placeholder="Enter URL" id="web-url"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="dob" className="col-form-label">DOB</label>
                                                        <input className="form-control" type="text" placeholder="Enter DOB" id="dob"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="another-number" className="col-form-label">Contact Number</label>
                                                        <input className="form-control" type="text" placeholder="Contact Number" id="another-number"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="mt-4 mb-4"/>
                                            <h5 className="from-title mb-1">Billing Info</h5>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group s-opt">
                                                        <label for="region" className="col-form-label">Country Or Region</label>
                                                        <select className="select2 form-control select-opt" id="region">
                                                            <optgroup label="Alaskan/Hawaiian Time Zone">
                                                              <option value="AK">Alaska</option>
                                                              <option value="HI">Hawaii</option>
                                                            </optgroup>
                                                            <optgroup label="Pacific Time Zone">
                                                              <option value="CA">California</option>
                                                              <option value="NV">Nevada</option>
                                                              <option value="OR">Oregon</option>
                                                              <option value="WA">Washington</option>
                                                            </optgroup>
                                                            <optgroup label="Mountain Time Zone">
                                                              <option value="AZ">Arizona</option>
                                                              <option value="CO">Colorado</option>
                                                              <option value="ID">Idaho</option>
                                                              <option value="MT">Montana</option>
                                                              <option value="NE">Nebraska</option>
                                                              <option value="NM">New Mexico</option>
                                                              <option value="ND">North Dakota</option>
                                                              <option value="UT">Utah</option>
                                                              <option value="WY">Wyoming</option>
                                                            </optgroup>
                                                            <optgroup label="Central Time Zone">
                                                              <option value="AL">Alabama</option>
                                                              <option value="AR">Arkansas</option>
                                                              <option value="IL">Illinois</option>
                                                              <option value="IA">Iowa</option>
                                                              <option value="KS">Kansas</option>
                                                              <option value="KY">Kentucky</option>
                                                              <option value="LA">Louisiana</option>
                                                              <option value="MN">Minnesota</option>
                                                              <option value="MS">Mississippi</option>
                                                              <option value="MO">Missouri</option>
                                                              <option value="OK">Oklahoma</option>
                                                              <option value="SD">South Dakota</option>
                                                              <option value="TX">Texas</option>
                                                              <option value="TN">Tennessee</option>
                                                              <option value="WI">Wisconsin</option>
                                                            </optgroup>
                                                            <optgroup label="Eastern Time Zone">
                                                              <option value="CT">Connecticut</option>
                                                              <option value="DE">Delaware</option>
                                                              <option value="FL">Florida</option>
                                                              <option value="GA">Georgia</option>
                                                              <option value="IN">Indiana</option>
                                                              <option value="ME">Maine</option>
                                                              <option value="MD">Maryland</option>
                                                              <option value="MA">Massachusetts</option>
                                                              <option value="MI">Michigan</option>
                                                              <option value="NH">New Hampshire</option>
                                                              <option value="NJ">New Jersey</option>
                                                              <option value="NY">New York</option>
                                                              <option value="NC">North Carolina</option>
                                                              <option value="OH">Ohio</option>
                                                              <option value="PA">Pennsylvania</option>
                                                              <option value="RI">Rhode Island</option>
                                                              <option value="SC">South Carolina</option>
                                                              <option value="VT">Vermont</option>
                                                              <option value="VA">Virginia</option>
                                                              <option value="WV">West Virginia</option>
                                                            </optgroup>
                                                        </select>
                                                        <span className="sel_arrow">
                                                            <i className="fa fa-angle-down "></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group s-opt">
                                                        <label for="city" className="col-form-label">Town/City</label>
                                                        <select className="select2 form-control select-opt" id="city">
                                                              <option value="AK">Alaska</option>
                                                              <option value="HI">Hawaii</option>
                                                              <option value="CA">California</option>
                                                              <option value="NV">Nevada</option>
                                                              <option value="OR">Oregon</option>
                                                              <option value="WA">Washington</option>
                                                        </select>
                                                        <span className="sel_arrow">
                                                            <i className="fa fa-angle-down "></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="province" className="col-form-label">Province</label>
                                                        <input className="form-control" type="text" placeholder="province" id="province"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="postal" className="col-form-label">Postal</label>
                                                        <input className="form-control" type="text" placeholder="Postal" id="postal"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="mt-4 mb-4"/>
                                            <h5 className="from-title mb-1">Additional Details</h5>
                                            <div className="row">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="additional-msg" className="col-form-label">Drop Your Message</label>
                                                        <textarea className="form-control" placeholder="Additional Notes" id="additional-msg"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="checkbox">
                                                    <input id="checkbox3" type="checkbox"/>
                                                    <label for="checkbox3">Remember Me</label>
                                                </div>
                                            </div>
                                            <div className="form-group mb-0">
                                                <button className="btn btn-primary" type="button">reset</button>
                                                <input className="btn btn-danger" type="submit"/>
                                            </div>
                                        </div>
                                    </form>
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
  
  export default BasicForm;