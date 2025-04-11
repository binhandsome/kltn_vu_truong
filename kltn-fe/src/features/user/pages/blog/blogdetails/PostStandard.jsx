// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function PostStandard() {
	const [hasBgClass, setHasBgClass] = useState(true); 
  
	useEffect(() => {
	  if (hasBgClass) {
		document.body.classList.add('bg');
	  } else {
		document.body.classList.remove('bg');
	  }
  
	  return () => {
		// Dọn dẹp: Xóa class khi component bị unmount
		document.body.classList.remove('bg');
	  };
	}, [hasBgClass]); // Chạy lại useEffect khi hasBgClass thay đổi
	useEffect(() => { // New useEffect for WOW.js
		const wow = new WOW.WOW();
		wow.init();
	
		return () => { // Optional cleanup function
			//wow.sync(); // sync and remove the DOM
		};
	  }, []);

  return (
    <>
      <div className="page-wraper">

        {/* Header (đã được xử lý trong App.js) */}

        <div className="page-content bg-light">
		<section className="content-inner-1 bg-img-fix">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-xl-8 col-lg-8">
						<div className="dz-blog blog-single style-1 sidebar">
							<h1 className="dz-title">The Sustainable Wardrobe A Greener Approach to Fashion</h1>
							<div className="dz-meta">
								<ul>
									<li className="post-date">17 May 2022</li>
									<li className="dz-user">
										<i className="fa-solid fa-user"></i>
										By <a href="javascript:void(0);">KK Sharma</a>
									</li>
									<li className="dz-comment">
										<i className="fa-solid fa-message"></i>
										<a href="javascript:void(0);">24 Comments</a>
									</li>
								</ul>
							</div>
							<div className="dz-media rounded">
								<img src="../../../assets/user/images/blog/detail/pic1.jpg" alt="/" />
							</div>
							<div className="dz-info">
								<div className="dz-post-text">
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
									<blockquote className="wp-block-quote is-style-default"><p>Create An Information Architecture That’s Easy To Use Way Precise Usability Considerations For Partially </p><cite>Ronald M. Spino</cite><i className="flaticon-right-quote"></i></blockquote>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
									<figure className="wp-container-5 wp-block-gallery-3 wp-block-gallery has-nested-../assets/user/images columns-3 is-cropped">
										<figure className="wp-block-image size-large"><img src="../../../assets/user/images/blog/blogpost-3/pic1.jpg" alt="/" /></figure>
										<figure className="wp-block-image size-large"><img src="../../../assets/user/images/blog/blogpost-3/pic2.jpg" alt="/" /></figure>
										<figure className="wp-block-image size-large"><img src="../../../assets/user/images/blog/blogpost-3/pic3.jpg" alt="/" /></figure>
										<figure className="wp-block-image size-large"><img src="../../../assets/user/images/blog/blogpost-3/pic4.jpg" alt="/" /></figure>
										<figure className="wp-block-image size-large"><img src="../../../assets/user/images/blog/blogpost-3/pic1.jpg" alt="/" /></figure>
									</figure>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
									
									<h3 className="dz-title">Additional information</h3>
									<p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
									
									<ul className="list-check-2 check-circle">
										<li>Sustainable Materials and Eco-Friendly Fabrics</li>
										<li>Promoting Fair Labor Practices in Fashion</li>
										<li>The Three R's in Sustainable Fashion</li>
										<li>Capsule Wardrobes Curating Timeless Style</li>
										<li>Transparency in Fashion Supply Chains</li>
										<li>Vegan and Cruelty-Free Fashion Alternatives</li>
									</ul>
									
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
								</div>
								<div className="dz-share-post meta-bottom">
									<div className="post-tags">
										<strong>Tags:</strong>
										<a href="javascript:void(0);">Dresses</a>
										<a href="javascript:void(0);">Boots</a>
										<a href="javascript:void(0);">Jewelry</a>
										<a href="javascript:void(0);">Jacket</a>
										<a href="javascript:void(0);">Coat</a>
									</div>
									<div className="dz-social-icon primary-light">
										<ul>
											<li>
												<a href="https://www.facebook.com/dexignzone">
													<i className="fab fa-facebook-f"></i>
												</a>
											</li>
											<li>
												<a href="https://www.instagram.com/dexignzone/">
													<i className="fab fa-instagram"></i>
												</a>
											</li>
											<li>
												<a href="https://twitter.com/dexignzones">
													<i className="fab fa-twitter"></i>
												</a>
											</li>
											<li>
												<a href="https://www.linkedin.com/showcase/3686700/admin/">
													<i className="fa-brands fa-linkedin-in"></i>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							
						</div>
						<div className="author-box style-1">
							<div className="author-profile-info">
								<div className="author-profile-pic">
									<img src="../../../assets/user/images/blog/profile.jpg" alt="/" />
								</div>
								<div className="author-profile-content">
									<h6 className="title">I am John Doe</h6>
									<p>We were making our way to the Rila Mountains, where we were visiting the Rila Monastery where we enjoyed scrambled eggs.</p>
									<ul className="social-icon m-b0">
										<li>
											<a href="https://www.facebook.com/dexignzone" target="_blank">
												<i className="fa-brands fa-facebook-f"></i>
											</a>
										</li>
										<li>
											<a href="https://www.instagram.com/dexignzone/" target="_blank">
												<i className="fa-brands fa-instagram"></i>
											</a>
										</li>
										<li>
											<a href="https://twitter.com/dexignzones" target="_blank">
												<i className="fa-brands fa-twitter"></i>
											</a>
										</li>
										<li>
											<a href="https://www.behance.net/dexignzone" target="_blank">
												<i className="fa-brands fa-behance"></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="dz-related-post">
							<h4 className="widget-title">Related Blogs</h4>
							<div className="row">
								<div className="col-lg-6 col-md-6 m-b30">
									<div className="dz-card style-5">
										<div className="dz-media">
											<img src="../../../assets/user/images/blog/blogpost-5/pic1.jpg" alt="/" />
										</div>
										<div className="dz-info">
											<div className="dz-meta">
												<ul>
													<li className="post-date">20 Apr 2023</li>
												</ul>
											</div>
											<h4 className="dz-title">
												<a href="blog-right-sidebar.html">Trendsetter Chronicles: Unveiling the Latest in Fashion</a>
											</h4>
											<a href="blog-right-sidebar.html" className="font-14 read-btn">Read More 
												<i className="icon feather icon-chevron-right"></i>
											</a>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-md-6 m-b30">
									<div className="dz-card style-5">
										<div className="dz-media">
											<img src="../../../assets/user/images/blog/blogpost-5/pic2.jpg" alt="/" />
										</div>
										<div className="dz-info">
											<div className="dz-meta">
												<ul>
													<li className="post-date">10 June 2023</li>
												</ul>
											</div>
											<h4 className="dz-title">
												<a href="blog-right-sidebar.html">Runway Rundown: Decoding Fashion Week’s Best Looks</a>
											</h4>
											<a href="blog-right-sidebar.html" className="font-14 read-btn">Read More 
												<i className="icon feather icon-chevron-right"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
									
							<div className="clear" id="comment-list">
								<div className="post-comments comments-area style-1 clearfix">
									<h4 className="comments-title mb-2">Comments (02)</h4>
									<p className="dz-title-text">There are many variations of passages of Lorem Ipsum available.</p>
									<div id="comment">
										<ol className="comment-list">
											<li className="comment even thread-even depth-1 comment" id="comment-2">
												<div className="comment-body">
												  <div className="comment-author vcard">
														<img src="../../../assets/user/images/profile4.jpg" alt="/" className="avatar" />
														<cite className="fn">Michel Poe</cite> 
												  </div>
											  <div className="comment-content dz-page-text">
												 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
											  </div>
											  <div className="reply">
												 <a rel="nofollow" className="comment-reply-link" href="javascript:void(0);">Reply</a>
											  </div>
										   </div>
										   <ol className="children">
											  <li className="comment byuser comment-author-w3itexpertsuser bypostauthor odd alt depth-2 comment" id="comment-3">
												 <div className="comment-body" id="div-comment-3">
													<div className="comment-author vcard">
													   <img src="../../../assets/user/images/profile3.jpg" alt="/" className="avatar" />
													   <cite className="fn">Celesto Anderson</cite>
													</div>
													<div className="comment-content dz-page-text">
													   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
													</div>
													<div className="reply">
													   <a className="comment-reply-link" href="javascript:void(0);"> Reply</a>
													</div>
												 </div>
											  </li>
										   </ol>
										</li>
										<li className="comment even thread-odd thread-alt depth-1 comment" id="comment-4">
										   <div className="comment-body" id="div-comment-4">
											  <div className="comment-author vcard">
												 <img src="../../../assets/user/images/profile2.jpg" alt="/" className="avatar" />
												 <cite className="fn">Monsur Rahman Lito</cite>
											  </div>
											  <div className="comment-content dz-page-text">
												 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
											  </div>
											  <div className="reply">
												 <a className="comment-reply-link" href="javascript:void(0);"> Reply</a>
											  </div>
										   </div>
										</li>
									 </ol>
								  </div>
								  <div className="default-form comment-respond style-1" id="respond">
									<h4 className="comment-reply-title mb-2" id="reply-title">Good Comments</h4>
									<p className="dz-title-text">There are many variations of passages of Lorem Ipsum available.</p>
									<div className="clearfix">
										<form method="post" id="comments_form" className="comment-form" novalidate>
										   <p className="comment-form-author"><input id="name" placeholder="Author" name="author" type="text" value="" /></p>
										   <p className="comment-form-email"><input id="email" required="required" placeholder="Email" name="email" type="email" value="" /></p>
										   <p className="comment-form-comment"><textarea id="comments" placeholder="Type Comment Here" className="form-control4" name="comment" cols="45" rows="3" required="required"></textarea></p>
										   <p className="col-md-12 col-sm-12 col-xs-12 form-submit">
											  <button id="submit" type="submit" className="submit btn btn-secondary btnhover3 filled">
											  Submit Now
											  </button>
										   </p>
										</form>
									</div>
								  </div>
							   </div>
							</div>
						
					</div>
					<div className="col-xl-4 col-lg-4 col-md-8 order-lg-1 order-2">
						<aside className="side-bar sticky-top mt-lg-0 mt-md-5 mt-3">
							<div className="widget">
								<h5 className="widget-title">Search</h5>
								<div className="search-bx">
									<form role="search" method="post">
										<div className="input-group">
											<input name="text" className="form-control" placeholder="Search" type="text" />
											<span className="input-group-btn">
												<button className="btn">
													<i className="icon feather icon-search"></i>
												</button>
											</span>
										</div>
									</form>
								</div>
							</div>
							<div className="widget widget_categories style-1">
								<h5 className="widget-title">Category</h5>
								<ul>
									<li className="cat-item"><a href="blog-category.html">Dresses</a> (10)</li>
									<li className="cat-item"><a href="blog-category.html">Top &amp; Blouses</a> (5)</li>
									<li className="cat-item"><a href="blog-category.html">Boots</a> (17)</li>
									<li className="cat-item"><a href="blog-category.html">Jewelry</a> (13)</li>
									<li className="cat-item"><a href="blog-category.html">Makeup</a> (06)</li> 
									<li className="cat-item"><a href="blog-category.html">Fragrances</a> (17)</li> 
									<li className="cat-item"><a href="blog-category.html">Shaving &amp; Grooming</a> (13)</li> 
									<li className="cat-item"><a href="blog-category.html">Jacket</a> (06)</li> 
									<li className="cat-item"><a href="blog-category.html">Coat</a> (22)</li> 
								</ul>
							</div>
							<div className="widget recent-posts-entry">
								<h5 className="widget-title">Latest Post</h5>
								<div className="widget-post-bx">
									<div className="widget-post clearfix">
										<div className="dz-media"> 
											<a href="post-standard.html"><img src="../../../assets/user/images/blog/recent-blog/pic1.jpg" alt="/" /></a>
										</div>
										<div className="dz-info">
											<div className="dz-meta">
												<ul>
													<li className="post-date"> 17 May 2022 </li>
												</ul>
											</div>
											<h6 className="title"><a href="post-standard.html">The Anatomy of an Effective Shopping Cart Page</a></h6>
										</div>
									</div>
									<div className="widget-post clearfix">
										<div className="dz-media"> 
											<a href="post-standard.html"><img src="../../../assets/user/images/blog/recent-blog/pic2.jpg" alt="/" /></a>
										</div>
										<div className="dz-info">
											<div className="dz-meta">
												<ul>
													<li className="post-date">17 May 2022 </li>
												</ul>
											</div>
											<h6 className="title"><a href="post-standard.html">Shopping Cart Design User-Friendly Tips and Best Practices</a></h6>
										</div>
									</div>
									<div className="widget-post clearfix">
										<div className="dz-media"> 
											<a href="post-standard.html"><img src="../../../assets/user/images/blog/recent-blog/pic3.jpg" alt="/" /></a> 
										</div>
										<div className="dz-info">
											<div className="dz-meta">
												<ul>
													<li className="post-date"> 17 May 2022 </li>
												</ul>
											</div>
											<h6 className="title"><a href="/blog/blogdetails/PostStandard">Shopping Cart Security Keeping Your Customers' Data Safe</a></h6>
										</div>
									</div>
								</div>
							</div>
							<div className="widget widget_tag_cloud">
								<h5 className="widget-title">Tags</h5>
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
						</aside>
					</div>
				</div>
			</div>
		</section>
		
	</div>

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default PostStandard;