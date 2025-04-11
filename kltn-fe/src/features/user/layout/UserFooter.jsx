import React from 'react';
import { Link } from 'react-router-dom';

function UserFooter() {
    return (
        <footer className="site-footer style-1">

            {/* Footer Top */}
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="widget widget_about me-2">
                                <div className="footer-logo logo-white">
                                    <Link to="/"><img src="/images/logo.svg" alt="" /></Link>
                                </div>
                                <ul className="widget-address">
                                    <li>
                                        <p><span>Address</span> : 451 Wall Street, UK, London</p>
                                    </li>
                                    <li>
                                        <p><span>E-mail</span> : example@info.com</p>
                                    </li>
                                    <li>
                                        <p><span>Phone</span> : (064) 332-1233</p>
                                    </li>
                                </ul>
                                <div className="subscribe_widget">
                                    <h6 className="title fw-medium text-capitalize">subscribe to our newsletter</h6>
                                    <form className="dzSubscribe style-1" action="https://pixio.dexignzone.com/xhtml/script/mailchamp.php" method="post">
                                        <div className="dzSubscribeMsg"></div>
                                        <div className="form-group">
                                            <div className="input-group mb-0">
                                                <input name="dzEmail" required="required" type="email" className="form-control" placeholder="Your Email Address" />
                                                <div className="input-group-addon">
                                                    <button name="submit" value="Submit" type="submit" className="btn">
                                                        <i className="icon feather icon-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="widget widget_post">
                                <h5 className="footer-title">Recent Posts</h5>
                                <ul>
                                    <li>
                                        <div className="dz-media">
                                            <img src="/images/shop/product/small/1.png" alt="" />
                                        </div>
                                        <div className="dz-content">
                                            <h6 className="name"><Link to="/">Cozy Knit Cardigan Sweater</Link></h6>
                                            <span className="time">July 23, 2023</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dz-media">
                                            <img src="/images/shop/product/small/2.png" alt="" />
                                        </div>
                                        <div className="dz-content">
                                            <h6 className="name"><Link to="/">Sophisticated Swagger Suit</Link></h6>
                                            <span className="time">July 23, 2023</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dz-media">
                                            <img src="/images/shop/product/small/3.png" alt="" />
                                        </div>
                                        <div className="dz-content">
                                            <h6 className="name"><Link to="/">Athletic Mesh Sports Leggings</Link></h6>
                                            <span className="time">July 23, 2023</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-4 col-sm-4 col-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="widget widget_services">
                                <h5 className="footer-title">Our Stores</h5>
                                <ul>
                                    <li><Link to="/">New York</Link></li>
                                    <li><Link to="/">London SF</Link></li>
                                    <li><Link to="/">Edinburgh</Link></li>
                                    <li><Link to="/">Los Angeles</Link></li>
                                    <li><Link to="/">Chicago</Link></li>
                                    <li><Link to="/">Las Vegas</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-4 col-sm-4 col-6 wow fadeInUp" data-wow-delay="0.4s">
                            <div className="widget widget_services">
                                <h5 className="footer-title">Useful Links</h5>
                                <ul>
                                    <li><Link to="/">Privacy Policy</Link></li>
                                    <li><Link to="/">Returns</Link></li>
                                    <li><Link to="/">Terms & Conditions</Link></li>
                                    <li><Link to="/">Contact Us</Link></li>
                                    <li><Link to="/">Latest News</Link></li>
                                    <li><Link to="/">Our Sitemap</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-4 col-sm-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="widget widget_services">
                                <h5 className="footer-title">Footer Menu</h5>
                                <ul>
                                    <li><Link to="/">Instagram profile</Link></li>
                                    <li><Link to="/">New Collection</Link></li>
                                    <li><Link to="/">Woman Dress</Link></li>
                                    <li><Link to="/">Contact Us</Link></li>
                                    <li><Link to="/">Latest News</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Top End */}

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row fb-inner wow fadeInUp" data-wow-delay="0.1s">
                        <div className="col-lg-6 col-md-12 text-start">
                            <p className="copyright-text">© <span className="current-year">2024</span> <Link to="https://www.dexignzone.com/">DexignZone</Link> Theme. All Rights Reserved.</p>
                        </div>
                        <div className="col-lg-6 col-md-12 text-end">
                            <div className="d-flex align-items-center justify-content-center justify-content-md-center justify-content-xl-end">
                                <span className="me-3">We Accept: </span>
                                <img src="/images/footer-img.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Bottom End */}

        </footer>
    );
}

export default UserFooter;