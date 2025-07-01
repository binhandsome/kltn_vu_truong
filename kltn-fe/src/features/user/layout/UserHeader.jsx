import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../assets/user/images/logo.svg';
import { logout } from '../apiService/authService';
import WOW from 'wowjs';
import { authFetch } from '../apiService/authFetch';


  function UserHeader() {
  const [user,  setUser]  = useState(null);
  const [color, setColor] = useState('#000');
const API_URL = 'http://localhost:8081/api/auth';

  /* -------- lấy user -------- */
  const fetchUser = useCallback(async () => {
    try {
      const res  = await authFetch(`${API_URL}/me`);
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  }, []);

  /* mount + mỗi khi token được refresh */
  useEffect(() => {
    fetchUser();

    const onRefresh = () => fetchUser();
    const onLogout  = () => setUser(null);
    window.addEventListener('tokenRefreshed', onRefresh);
    window.addEventListener('loggedOut',      onLogout);
    return () => {
      window.removeEventListener('tokenRefreshed', onRefresh);
      window.removeEventListener('loggedOut',      onLogout);
    };
  }, [fetchUser]);

  /* WOW.js chỉ 1 lần */
  useEffect(() => { new WOW.WOW({ live: false }).init(); }, []);

    return (
        <header className="site-header mo-left header">
  {/* Main Header */}
  <div className="sticky-header main-bar-wraper navbar-expand-lg">
    <div className="main-bar clearfix">
      <div className="container-fluid clearfix d-lg-flex d-block">
        {/* Website Logo */}
        <div className="logo-header logo-dark me-md-5">
          <a href="/user">
            <img src="../../assets/user/images/logo.svg" alt="logo" />
          </a>
        </div>
        {/* Nav Toggle Button */}
        <button
          className="navbar-toggler collapsed navicon justify-content-end"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
        {/* Main Nav */}
        <div
          className="header-nav w3menu navbar-collapse collapse justify-content-start"
          id="navbarNavDropdown"
        >
          <div className="logo-header logo-dark">
            <a href="index.html">
              <img src="../../assets/user/../../assets/user/images/logo.svg" alt="" />
            </a>
          </div>
          <ul className=" nav navbar-nav">
            <li className="has-mega-menu sub-menu-down auto-width menu-left">
              <a href="/user">
                <span>Home</span>
                <i className="fas fa-chevron-down tabindex" />
              </a>
              <div className="mega-menu ">
                <ul className="demo-menu mb-0">
                  <li>
                    <a href="index.html">
                      <img src="../../assets/user/images/demo/demo-1.png" alt="/" />
                      <span className="menu-title">01 Home Page</span>
                    </a>
                  </li>
                  <li>
                    <a href="index-2.html">
                      <img src="../../assets/user/images/demo/demo-2.png" alt="/" />
                      <span className="menu-title">02 Home Page</span>
                    </a>
                  </li>
                  <li>
                    <a href="index-3.html">
                      <img src="../../assets/user/images/demo/demo-3.png" alt="/" />
                      <span className="menu-title">03 Home Page</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="has-mega-menu sub-menu-down">
              <a href="/user/shop/shopWithCategory">
                <span>Shop</span>
                <i className="fas fa-chevron-down tabindex" />
              </a>
              <div className="mega-menu shop-menu">
                <ul>
                  <li className="side-left">
                  <ul>
                                                    <li><a href="/user/shop/shopWithCategory" className="menu-title">Shop</a>
                                                        <ul>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shop/shopStandard'}>Shop Standard</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shop/shopList'}>Shop List</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shop/shopWithCategory'}>Shop</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shop/shopFiltersTopBar'}>Shop Filters Top Bar</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shop/shopSideBar'}>Shop Sidebar</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shop/shopStyle1'}>Shop Style 1</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shop/shopStyle2'}>Shop Style 2</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/productstructure/productDetail'} className="menu-title">Product Structure</a>
                                                        <ul>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/productstructure/productDetail'}>Default</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/productstructure/productDetail'}>Thumbnail</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/productstructure/productDetail'}>Grid Media</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/productstructure/productDetail'}>Carousel</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/productstructure/productDetail'}>Full Width</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/shoppages/wishList'} className="menu-title">Shop Pages</a>
                                                        <ul>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shoppages/wishList'}>Wishlist</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shoppages/cart'}>Cart</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shoppages/checkout'}>Checkout</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shoppages/compare'}>Compare</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/shoppages/orderTracking'}>Order Tracking</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/auth/login'}>Login</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/auth/registration'}>Registration</a></li>
                                                            <li><a href="#" onClick={() => window.location.href = '/user/auth/forgetPassword'}>Forget Password <div className="badge badge-sm rounded badge-animated">New</div></a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="month-deal">
                                                        <div className="clearfix me-3">
                                                            <h3>Deal of the month</h3>
                                                            <p className="mb-0">Yes! Send me exclusive offers, personalised, and unique gift ideas, tips for shopping on Pixio <Link to="/" className="dz-link-2">View All Products</Link></p>
                                                        </div>
                                                        <div className="sale-countdown">
                                                            <div className="countdown text-center">
                                                                <div className="date">
                                                                    <span className="time days text-primary"></span>
                                                                    <span className="work-time">Days</span>
                                                                </div>
                                                                <div className="date">
                                                                    <span className="time hours text-primary"></span>
                                                                    <span className="work-time">Hours</span>
                                                                </div>
                                                                <div className="date">
                                                                    <span className="time mins text-primary"></span>
                                                                    <span className="work-time">Minutess</span>
                                                                </div>
                                                                <div className="date">
                                                                    <span className="time secs text-primary"></span>
                                                                    <span className="work-time">Second</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                  </li>
                  <li className="side-right">
                    <div className="adv-media">
                      <img src="../../assets/user/images/adv-1.png" alt="/" />
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="has-mega-menu sub-menu-down auto-width">
              <a href="/user/blog/blogdetails/postStandard">
                <span>Blog</span>
                <i className="fas fa-chevron-down tabindex" />
              </a>
              <div className="mega-menu">
              <ul>
                                            <li>
                                                <a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'} className="menu-title">Blog Dark Style</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog 2 Column</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog 2 Column Sidebar</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog 3 Column</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog Half Image</a></li>
                                                </ul>
                                                <a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'} className="menu-title">Blog Light Style</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog 2 Column</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog 2 Column Sidebar</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog Half Image</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog Exclusive</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'} className="menu-title">Blog Sidebar</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog left Sidebar</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog Right Sidebar</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog Both Sidebar</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog Wide Sidebar</a></li>
                                                </ul>
                                                <a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'} className="menu-title">Blog Page</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog Archive</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Author</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog Category</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Blog Tag</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'} className="menu-title">Blog Details</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Standard</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Left Sidebar</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Header Image</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Slide Show</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Side Image</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Gallery</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Gallery Alternative</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Open Gutenberg</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Link</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Audio</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/blog/blogdetails/postStandard'}>Post Video</a></li>
                                                </ul>
                                            </li>
                                            <li className="post-menu">
                                                <Link to="/" className="menu-title">Recent Posts</Link>
                                                <div className="widget widget_post pt-2">
                                                    <ul>
                                                        <li>
                                                            <div className="dz-media">
                                                                <img src="/assets/user/images/shop/product/small/1.png" alt="" />
                                                            </div>
                                                            <div className="dz-content">
                                                                <h6 className="name"><Link to="/">Cozy Knit Cardigan Sweater</Link></h6>
                                                                <span className="time">July 23, 2023</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="dz-media">
                                                                <img src="/assets/user/images/shop/product/small/2.png" alt="" />
                                                            </div>
                                                            <div className="dz-content">
                                                                <h6 className="name"><Link to="/">Sophisticated Swagger Suit</Link></h6>
                                                                <span className="time">July 23, 2023</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="dz-media">
                                                                <img src="/assets/user/images/shop/product/small/3.png" alt="" />
                                                            </div>
                                                            <div className="dz-content">
                                                                <h6 className="name"><Link to="/">Athletic Mesh Sports Leggings</Link></h6>
                                                                <span className="time">July 23, 2023</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="dz-media">
                                                                <img src="/assets/user/images/shop/product/small/4.png" alt="" />
                                                            </div>
                                                            <div className="dz-content">
                                                                <h6 className="name"><Link to="/">Satin Wrap Party Blouse</Link></h6>
                                                                <span className="time">July 23, 2023</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
              </div>
            </li>
            <li className="has-mega-menu sub-menu-down auto-width">
              <a href="javascript:void(0);">
                <span>Post Layout</span>
                <i className="fas fa-chevron-down tabindex" />
              </a>
              <div className="mega-menu">
                <ul>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">
                      Post Types
                    </a>
                    <ul>
                      <li>
                        <a href="post-text.html">
                          Text Post{" "}
                          <div className="badge badge-sm rounded badge-animated">
                            New
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="post-image.html">
                          Image Post{" "}
                          <div className="badge badge-sm rounded badge-animated">
                            New
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="post-video.html">Video Post</a>
                      </li>
                      <li>
                        <a href="post-link.html">Link Post</a>
                      </li>
                      <li>
                        <a href="post-audio.html">Audio Post</a>
                      </li>
                      <li>
                        <a href="post-quote.html">Post Quote</a>
                      </li>
                      <li>
                        <a href="post-tutorial.html">
                          Tutorial Post{" "}
                          <div className="badge badge-sm rounded badge-animated">
                            New
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="post-cateloge.html">
                          Cateloge Post{" "}
                          <div className="badge badge-sm rounded badge-animated">
                            New
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">
                      Multiple Media
                    </a>
                    <ul>
                      <li>
                        <a href="post-banner.html">Banner</a>
                      </li>
                      <li>
                        <a href="post-slide-show.html">Slider</a>
                      </li>
                      <li>
                        <a href="post-gallery.html">Gallery</a>
                      </li>
                      <li>
                        <a href="post-status.html">
                          Status Slider{" "}
                          <div className="badge badge-sm rounded badge-animated">
                            New
                          </div>
                        </a>
                      </li>
                    </ul>
                    <a href="javascript:void(0);" className="menu-title">
                      Post Layout Type
                    </a>
                    <ul>
                      <li>
                        <a href="post-standard.html">Standard Post</a>
                      </li>
                      <li>
                        <a href="post-corner.html">Corner Post</a>
                      </li>
                      <li>
                        <a href="post-side.html">
                          Side Post{" "}
                          <div className="badge badge-sm rounded badge-animated">
                            New
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">
                      Side Bar
                    </a>
                    <ul>
                      <li>
                        <a href="post-left-sidebar.html">Left Sidebar</a>
                      </li>
                      <li>
                        <a href="post-right-sidebar.html">Right Sidebar</a>
                      </li>
                      <li>
                        <a href="post-both-sidebar.html">Both Sidebar</a>
                      </li>
                      <li>
                        <a href="post-no-sidebar.html">No Sidebar</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="has-mega-menu sub-menu-down">
              <a href="/user/portfolio/portfolioTiles">
                <span>Portfolio</span>
                <i className="fas fa-chevron-down tabindex" />
              </a>
              <div className="mega-menu portfolio-menu">
              <ul>
                                            <li className="side-left">
                                                <ul className="portfolio-nav-link">
                                                    <li>
                                                        <a href="#" onClick={() => window.location.href = '/user/portfolio/portfolioTiles'}>
                                                            <img src="/assets/user/images/portfolio/icons/portfolio-tiles.svg" alt="/" />
                                                            <span>Portfolio Tiles</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="/assets/user/images/portfolio/icons/collage-style-1.svg" alt="/" />
                                                            <span>Collage Style 1</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="/assets/user/images/portfolio/icons/collage-style-2.svg" alt="/" />
                                                            <span>Collage Style 2</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="/assets/user/images/portfolio/icons/masonry-grid.svg" alt="/" />
                                                            <span>Masonry Grid</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="/assets/user/images/portfolio/icons/cobble-style-1.svg" alt="/" />
                                                            <span>Cobble Style 1</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="/assets/user/images/portfolio/icons/cobble-style-2.svg" alt="/" />
                                                            <span>Cobble Style 2</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="/assets/user/images/portfolio/icons/portfolio-thumbs-slider.svg" alt="/" />
                                                            <span>Portfolio Thumbs Slider</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="/assets/user/images/portfolio/icons/portfolio-film-strip.svg" alt="/" />
                                                            <span>Portfolio Film Strip</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="/assets/user/images/portfolio/icons/carousel-showcase.svg" alt="/" />
                                                            <span>Carousel Showcase</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="/assets/user/images/portfolio/icons/portfolio-split-slider.svg" alt="/" />
                                                            <span>Portfolio Split Slider</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="side-right line-left">
                                                <a href="#" onClick={() => window.location.href = '/user/portfolio/portfolioDetails/portfolioDetails1'} className="menu-title">Portfolio Details</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/portfolio/portfolioDetails/portfolioDetails1'}>Portfolio Details 1</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/portfolio/portfolioDetails/portfolioDetails2'}>Portfolio Details 2</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/portfolio/portfolioDetails/portfolioDetails3'}>Portfolio Details 3</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/portfolio/portfolioDetails/portfolioDetails4'}>Portfolio Details 4</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/portfolio/portfolioDetails/portfolioDetails5'}>Portfolio Details 5</a></li>
                                                </ul>
                                            </li>
                                        </ul>
              </div>
            </li>
            <li className="has-mega-menu sub-menu-down wide-width">
              <a href="/user/about/aboutUs">
                <span>Pages</span>
                <i className="fas fa-chevron-down tabindex" />
              </a>
              <div className="mega-menu">
              <ul>
                                            <li>
                                                <a href="#" onClick={() => window.location.href = '/user/about/aboutUs'} className="menu-title">Pages</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/about/aboutUs'}>About Us</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/aboutMe'}>About Me</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/pricingTable'}>Pricing Table</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/ourGiftVouchers'}>Our Gift Vouchers</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/whatWeDo'}>What We Do</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/faqs1'}>Faqs 1</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/faqs2'}>Faqs 2</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/ourTeam'}>Our Team</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => window.location.href = '/user/pages/contactUs'} className="menu-title">Contact Us</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/contactUs1'}>Contact Us 1</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/contactUs2'}>Contact Us 2</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/contactUs3'}>Contact Us 3</a></li>
                                                </ul>
                                                <a href="#" onClick={() => window.location.href = '/user/pages/webPages'} className="menu-title">Web Pages</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/error4041'}>Error 404 1</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/error4042'}>Error 404 2</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/comingSoon'}>Coming Soon</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/underConstruction'}>Under Construction</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => window.location.href = '/user/pages/bannerStyle'} className="menu-title">Banner Style</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/bannerWithBgColor'}>Banner with BG Color</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/bannerWithImage'}>Banner with Image</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/bannerWithVideo'}>Banner with Video</a></li>
                                                    <li><Link to="/">Banner with Kanbern</Link></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/bannerSmall'}>Banner Small</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/bannerMedium'}>Banner Medium</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/bannerLarge'}>Banner Large</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => window.location.href = '/user/pages/headerStyle'} className="menu-title">Header Style</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/headerStyle1'}>Header Style 1</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/headerStyle2'}>Header Style 2</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/headerStyle3'}>Header Style 3</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/headerStyle4'}>Header Style 4</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/headerStyle5'}>Header Style 5</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/headerStyle6'}>Header Style 6</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/headerStyle7'}>Header Style 7</a></li>
                                                    <li className="w3menulink"><a href="#" onClick={() => window.location.href = '/user/pages/menuStyles'}>Menu Styles</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => window.location.href = '/user/pages/footerStyle'} className="menu-title">Footer Style</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/footerStyle1'}>Footer Style 1</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/footerStyle2'}>Footer Style 2</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/footerStyle3'}>Footer Style 3</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/footerStyle4'}>Footer Style 4</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/footerStyle5'}>Footer Style 5</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/footerStyle6'}>Footer Style 6</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/pages/footerStyle7'}>Footer Style 7</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => window.location.href = '/user/myaccount/dashboard'} className="menu-title">Dashboard</a>
                                                <ul>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/myaccount/dashboard'}>Dashboard</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/myaccount/orders'}>Orders</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/myaccount/ordersDetails'}>Orders Details</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/myaccount/ordersConfimation'}>Orders Confirmation</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/myaccount/download'}>Downloads</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/myaccount/returnRequest'}>Return Request</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/myaccount/returnRequestDetail'}>Return Request Detail</a></li>
                                                    <li><a href="#" onClick={() => window.location.href = '/user/myaccount/returnRequestConfirmed'}>Return Request Confirmed</a></li>
                                                </ul>
                                            </li>
                                        </ul>
              </div>
            </li>
            <li className="sub-menu-down">
                                    <a href="#" onClick={() => window.location.href = '/user/myaccount/dashboard'}><span>My Account</span> <div className="badge badge-sm rounded badge-animated">New</div><i className="fas fa-chevron-down tabindex"></i></a>
                                    <ul className="sub-menu">
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/dashboard'}>Dashboard</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/orders'}>Orders</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/ordersDetails'}>Orders Details</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/ordersConfimation'}>Orders Confirmation</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/download'}>Downloads</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/returnRequest'}>Return Request</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/returnRequestDetail'}>Return Request Detail</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/returnRequestConfirmed'}>Return Request Confirmed</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/profile'}>Profile</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/address'}>Address</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/shippingMethods'}>Shipping methods</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/paymentMethods'}>Payment Methods</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/review'}>Review</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/billingAddress'}>Billing address</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/shippingAddress'}>Shipping address</a></li>
                                        <li><a href="#" onClick={() => window.location.href = '/user/myaccount/cancellationRequests'}>Cancellation Requests</a></li>
                                    </ul>
                                </li>
          </ul>
          <div className="dz-social-icon">
            <ul>
              <li>
                <a
                  className="fab fa-facebook-f"
                  target="_blank"
                  href="https://www.facebook.com/dexignzone"
                />
              </li>
              <li>
                <a
                  className="fab fa-twitter"
                  target="_blank"
                  href="https://twitter.com/dexignzones"
                />
              </li>
              <li>
                <a
                  className="fab fa-linkedin-in"
                  target="_blank"
                  href="https://www.linkedin.com/showcase/3686700/admin/"
                />
              </li>
              <li>
                <a
                  className="fab fa-instagram"
                  target="_blank"
                  href="https://www.instagram.com/dexignzone/"
                />
              </li>
            </ul>
          </div>
        </div>
        {/* EXTRA NAV */}
        <div className="extra-nav">
          <div className="extra-cell">
            <ul className="header-right">
            {user ? (
  <>
    <li className="nav-item login-link">
      <a className="nav-link" href="/user/myaccount/dashboard">
        {user.username}
      </a>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          logout(); // gọi API logout
          window.dispatchEvent(new Event('loggedOut')); // cập nhật state
        }}
      >
        Logout
      </a>
    </li>
  </>
) : (
  <li className="nav-item login-link">
    <a className="nav-link" href="/user/auth/login">
      Login / Register
    </a>
  </li>
)}

             
              <li className="nav-item search-link">
                <a
                  className="nav-link"
                  href="javascript:void(0);"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasTop"
                  aria-controls="offcanvasTop"
                >
                  <i className="iconly-Light-Search" />
                </a>
              </li>
              <li className="nav-item wishlist-link">
                <a
                  className="nav-link"
                  href="javascript:void(0);"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <i className="iconly-Light-Heart2" />
                </a>
              </li>
              <li className="nav-item cart-link">
                <a
                  href="javascript:void(0);"
                  className="nav-link cart-btn"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <i className="iconly-Broken-Buy" />
                  <span className="badge badge-circle">5</span>
                </a>
              </li>
              <li className="nav-item filte-link">
                <a
                  href="javascript:void(0);"
                  className="nav-link filte-btn"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasLeft"
                  aria-controls="offcanvasLeft"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 30 13"
                    fill="none"
                  >
                    <rect y={11} width={30} height={2} fill="black" />
                    <rect width={30} height={2} fill="black" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Main Header End */}
  {/* SearchBar */}
  <div
    className="dz-search-area dz-offcanvas offcanvas offcanvas-top"
    tabIndex={-1}
    id="offcanvasTop"
  >
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    >
      ×
    </button>
    <div className="container">
      <form className="header-item-search">
        <div className="input-group search-input">
          <select className="default-select">
            <option>All Categories</option>
            <option>Clothes</option>
            <option>UrbanSkirt</option>
            <option>VelvetGown</option>
            <option>LushShorts</option>
            <option>Vintage</option>
            <option>Wedding</option>
            <option>Cotton</option>
            <option>Linen</option>
            <option>Navy</option>
            <option>Urban</option>
            <option>Business Meeting</option>
            <option>Formal</option>
          </select>
          <input
            type="search"
            className="form-control"
            placeholder="Search Product"
          />
          <button className="btn" type="button">
            <i className="iconly-Light-Search" />
          </button>
        </div>
        <ul className="recent-tag">
          <li className="pe-0">
            <span>Quick Search :</span>
          </li>
          <li>
            <a href="shop-list.html">Clothes</a>
          </li>
          <li>
            <a href="shop-list.html">UrbanSkirt</a>
          </li>
          <li>
            <a href="shop-list.html">VelvetGown</a>
          </li>
          <li>
            <a href="shop-list.html">LushShorts</a>
          </li>
        </ul>
      </form>
      <div className="row">
        <div className="col-xl-12">
          <h5 className="mb-3">You May Also Like</h5>
          <div className="swiper category-swiper2">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="shop-card">
                  <div className="dz-media ">
                    <img src="../../assets/user/images/shop/product/1.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <h6 className="title">
                      <a href="shop-list.html">SilkBliss Dress</a>
                    </h6>
                    <h6 className="price">$40.00</h6>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="shop-card">
                  <div className="dz-media ">
                    <img src="../../assets/user/images/shop/product/3.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <h6 className="title">
                      <a href="shop-list.html">GlamPants</a>
                    </h6>
                    <h6 className="price">$30.00</h6>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="shop-card">
                  <div className="dz-media ">
                    <img src="../../assets/user/images/shop/product/4.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <h6 className="title">
                      <a href="shop-list.html">ComfyLeggings</a>
                    </h6>
                    <h6 className="price">$35.00</h6>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="shop-card">
                  <div className="dz-media ">
                    <img src="../../assets/user/images/shop/product/2.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <h6 className="title">
                      <a href="shop-list.html">ClassicCapri</a>
                    </h6>
                    <h6 className="price">$20.00</h6>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="shop-card">
                  <div className="dz-media ">
                    <img src="../../assets/user/images/shop/product/5.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <h6 className="title">
                      <a href="shop-list.html">DapperCoat</a>
                    </h6>
                    <h6 className="price">$70.00</h6>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="shop-card">
                  <div className="dz-media ">
                    <img src="../../assets/user/images/shop/product/6.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <h6 className="title">
                      <a href="shop-list.html">ComfyLeggings</a>
                    </h6>
                    <h6 className="price">$45.00</h6>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="shop-card">
                  <div className="dz-media ">
                    <img src="../../assets/user/images/shop/product/7.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <h6 className="title">
                      <a href="shop-list.html">DenimDream Jeans</a>
                    </h6>
                    <h6 className="price">$40.00</h6>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="shop-card">
                  <div className="dz-media ">
                    <img src="../../assets/user/images/shop/product/4.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <h6 className="title">
                      <a href="shop-list.html">SilkBliss Dress</a>
                    </h6>
                    <h6 className="price">$60.00</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* SearchBar */}
  {/* Sidebar cart */}
  <div
    className="offcanvas dz-offcanvas offcanvas offcanvas-end "
    tabIndex={-1}
    id="offcanvasRight"
  >
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    >
      ×
    </button>
    <div className="offcanvas-body">
      <div className="product-description">
        <div className="dz-tabs">
          <ul className="nav nav-tabs center" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="shopping-cart"
                data-bs-toggle="tab"
                data-bs-target="#shopping-cart-pane"
                type="button"
                role="tab"
                aria-controls="shopping-cart-pane"
                aria-selected="true"
              >
                Shopping Cart
                <span className="badge badge-light">5</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="wishlist"
                data-bs-toggle="tab"
                data-bs-target="#wishlist-pane"
                type="button"
                role="tab"
                aria-controls="wishlist-pane"
                aria-selected="false"
              >
                Wishlist
                <span className="badge badge-light">2</span>
              </button>
            </li>
          </ul>
          <div className="tab-content pt-4" id="dz-shopcart-sidebar">
            <div
              className="tab-pane fade show active"
              id="shopping-cart-pane"
              role="tabpanel"
              aria-labelledby="shopping-cart"
              tabIndex={0}
            >
              <div className="shop-sidebar-cart">
                <ul className="sidebar-cart-list">
                  <li>
                    <div className="cart-widget">
                      <div className="dz-media me-3">
                        <img src="../../assets/user/images/shop/shop-cart/pic1.jpg" alt="" />
                      </div>
                      <div className="cart-content">
                        <h6 className="title">
                          <a href="product-thumbnail.html">
                            Sophisticated Swagger Suit
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <div className="btn-quantity light quantity-sm me-3">
                            <input
                              type="text"
                              defaultValue={1}
                              name="demo_vertical2"
                            />
                          </div>
                          <h6 className="dz-price mb-0">$50.00</h6>
                        </div>
                      </div>
                      <a href="javascript:void(0);" className="dz-close">
                        <i className="ti-close" />
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="cart-widget">
                      <div className="dz-media me-3">
                        <img src="../../assets/user/images/shop/shop-cart/pic2.jpg" alt="" />
                      </div>
                      <div className="cart-content">
                        <h6 className="title">
                          <a href="product-thumbnail.html">
                            Cozy Knit Cardigan Sweater
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <div className="btn-quantity light quantity-sm me-3">
                            <input
                              type="text"
                              defaultValue={1}
                              name="demo_vertical2"
                            />
                          </div>
                          <h6 className="dz-price mb-0">$40.00</h6>
                        </div>
                      </div>
                      <a href="javascript:void(0);" className="dz-close">
                        <i className="ti-close" />
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="cart-widget">
                      <div className="dz-media me-3">
                        <img src="../../assets/user/images/shop/shop-cart/pic3.jpg" alt="" />
                      </div>
                      <div className="cart-content">
                        <h6 className="title">
                          <a href="product-thumbnail.html">
                            Athletic Mesh Sports Leggings
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <div className="btn-quantity light quantity-sm me-3">
                            <input
                              type="text"
                              defaultValue={1}
                              name="demo_vertical2"
                            />
                          </div>
                          <h6 className="dz-price  mb-0">$65.00</h6>
                        </div>
                      </div>
                      <a href="javascript:void(0);" className="dz-close">
                        <i className="ti-close" />
                      </a>
                    </div>
                  </li>
                </ul>
                <div className="cart-total">
                  <h5 className="mb-0">Subtotal:</h5>
                  <h5 className="mb-0">300.00$</h5>
                </div>
                <div className="mt-auto">
                  <div className="shipping-time">
                    <div className="dz-icon">
                      <i className="flaticon flaticon-ship" />
                    </div>
                    <div className="shipping-content">
                      <h6 className="title pe-4">
                        Congratulations , you've got free shipping!
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar progress-animated border-0"
                          style={{ width: "75%" }}
                          role="progressbar"
                        >
                          <span className="sr-only">75% Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="shop-checkout.html"
                    className="btn btn-outline-secondary btn-block m-b20"
                  >
                    Checkout
                  </a>
                  <a
                    href="shop-cart.html"
                    className="btn btn-secondary btn-block"
                  >
                    View Cart
                  </a>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="wishlist-pane"
              role="tabpanel"
              aria-labelledby="wishlist"
              tabIndex={0}
            >
              <div className="shop-sidebar-cart">
                <ul className="sidebar-cart-list">
                  <li>
                    <div className="cart-widget">
                      <div className="dz-media me-3">
                        <img src="../../assets/user/images/shop/shop-cart/pic1.jpg" alt="" />
                      </div>
                      <div className="cart-content">
                        <h6 className="title">
                          <a href="product-thumbnail.html">
                            Sophisticated Swagger Suit
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <h6 className="dz-price  mb-0">$50.00</h6>
                        </div>
                      </div>
                      <a href="javascript:void(0);" className="dz-close">
                        <i className="ti-close" />
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="cart-widget">
                      <div className="dz-media me-3">
                        <img src="../../assets/user/images/shop/shop-cart/pic2.jpg" alt="" />
                      </div>
                      <div className="cart-content">
                        <h6 className="title">
                          <a href="product-thumbnail.html">
                            Cozy Knit Cardigan Sweater
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <h6 className="dz-price  mb-0">$40.00</h6>
                        </div>
                      </div>
                      <a href="javascript:void(0);" className="dz-close">
                        <i className="ti-close" />
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="cart-widget">
                      <div className="dz-media me-3">
                        <img src="../../assets/user/images/shop/shop-cart/pic3.jpg" alt="" />
                      </div>
                      <div className="cart-content">
                        <h6 className="title">
                          <a href="product-thumbnail.html">
                            Athletic Mesh Sports Leggings
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <h6 className="dz-price  mb-0">$65.00</h6>
                        </div>
                      </div>
                      <a href="javascript:void(0);" className="dz-close">
                        <i className="ti-close" />
                      </a>
                    </div>
                  </li>
                </ul>
                <div className="mt-auto">
                  <a
                    href="shop-wishlist.html"
                    className="btn btn-secondary btn-block"
                  >
                    Check Your Favourite
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Sidebar cart */}
  {/* Sidebar finter */}
  <div
    className="offcanvas dz-offcanvas offcanvas offcanvas-end "
    tabIndex={-1}
    id="offcanvasLeft"
  >
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    >
      ×
    </button>
    <div className="offcanvas-body">
      <div className="product-description">
        <div className="widget widget_search">
          <div className="form-group">
            <div className="input-group">
              <input
                name="dzSearch"
                required="required"
                type="search"
                className="form-control"
                placeholder="Search Product"
              />
              <div className="input-group-addon">
                <button
                  name="submit"
                  value="Submit"
                  type="submit"
                  className="btn"
                >
                  <i className="icon feather icon-search" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="widget">
          <h6 className="widget-title">Price</h6>
          <div className="price-slide range-slider">
            <div className="price">
              <div className="range-slider style-1">
                <div id="slider-tooltips" className="mb-3" />
                <span className="example-val" id="slider-margin-value-min" />
                <span className="example-val" id="slider-margin-value-max" />
              </div>
            </div>
          </div>
        </div>
        <div className="widget">
          <h6 className="widget-title">Color</h6>
          <div className="d-flex align-items-center flex-wrap color-filter ps-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel1"
                defaultValue="#000000"
                aria-label="..."
                defaultChecked=""
              />
              <span />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel2"
                defaultValue="#9BD1FF"
                aria-label="..."
              />
              <span />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel3"
                defaultValue="#21B290"
                aria-label="..."
              />
              <span />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel4"
                defaultValue="#FEC4C4"
                aria-label="..."
              />
              <span />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel5"
                defaultValue="#FF7354"
                aria-label="..."
              />
              <span />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel6"
                defaultValue="#51EDC8"
                aria-label="..."
              />
              <span />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel7"
                defaultValue="#B77CF3"
                aria-label="..."
              />
              <span />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel8"
                defaultValue="#FF4A76"
                aria-label="..."
              />
              <span />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel9"
                defaultValue="#3E68FF"
                aria-label="..."
              />
              <span />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabe20"
                defaultValue="#7BEF68"
                aria-label="..."
              />
              <span />
            </div>
          </div>
        </div>
        <div className="widget">
          <h6 className="widget-title">Size</h6>
          <div className="btn-group product-size">
            <input
              type="radio"
              className="btn-check"
              name="btnradio1"
              id="btnradio11"
              defaultChecked=""
            />
            <label className="btn" htmlFor="btnradio11">
              4
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio1"
              id="btnradio21"
            />
            <label className="btn" htmlFor="btnradio21">
              6
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio1"
              id="btnradio31"
            />
            <label className="btn" htmlFor="btnradio31">
              8
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio1"
              id="btnradio41"
            />
            <label className="btn" htmlFor="btnradio41">
              10
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio1"
              id="btnradio51"
            />
            <label className="btn" htmlFor="btnradio51">
              12
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio1"
              id="btnradio61"
            />
            <label className="btn" htmlFor="btnradio61">
              14
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio1"
              id="btnradio71"
            />
            <label className="btn" htmlFor="btnradio71">
              16
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio1"
              id="btnradio81"
            />
            <label className="btn" htmlFor="btnradio81">
              18
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio1"
              id="btnradio91"
            />
            <label className="btn" htmlFor="btnradio91">
              20
            </label>
          </div>
        </div>
        <div className="widget widget_categories">
          <h6 className="widget-title">Category</h6>
          <ul>
            <li className="cat-item cat-item-26">
              <a href="blog-category.html">Dresses</a> (10)
            </li>
            <li className="cat-item cat-item-36">
              <a href="blog-category.html">Top &amp; Blouses</a> (5)
            </li>
            <li className="cat-item cat-item-43">
              <a href="blog-category.html">Boots</a> (17)
            </li>
            <li className="cat-item cat-item-27">
              <a href="blog-category.html">Jewelry</a> (13)
            </li>
            <li className="cat-item cat-item-40">
              <a href="blog-category.html">Makeup</a> (06)
            </li>
            <li className="cat-item cat-item-40">
              <a href="blog-category.html">Fragrances</a> (17)
            </li>
            <li className="cat-item cat-item-40">
              <a href="blog-category.html">Shaving &amp; Grooming</a> (13)
            </li>
            <li className="cat-item cat-item-43">
              <a href="blog-category.html">Jacket</a> (06)
            </li>
            <li className="cat-item cat-item-36">
              <a href="blog-category.html">Coat</a> (22)
            </li>
          </ul>
        </div>
        <div className="widget widget_tag_cloud">
          <h6 className="widget-title">Tags</h6>
          <div className="tagcloud">
            <a href="blog-tag.html">Vintage </a>
            <a href="blog-tag.html">Wedding</a>
            <a href="blog-tag.html">Cotton</a>
            <a href="blog-tag.html">Linen</a>
            <a href="blog-tag.html">Navy</a>
            <a href="blog-tag.html">Urban</a>
            <a href="blog-tag.html">Business Meeting</a>
            <a href="blog-tag.html">Formal</a>
          </div>
        </div>
        <a
          href="javascript:void(0);"
          className="btn btn-sm font-14 btn-secondary btn-sharp"
        >
          RESET
        </a>
      </div>
    </div>
  </div>
  {/* filter sidebar */}
</header>

    );
}

export default UserHeader;