const Error404 = () => (
    <div>
	  <div className="loader">
	  <div className="spinner">
		<img src="../../assets/admin/images/loader.gif" alt=""/>
	  </div> 
	</div>
    {/* <!-- Main Body --> */}
    <div className="fb-main-404section">
		<div className="fb-404page">
			<img src="../../assets/admin/images/error.png" alt=""/>
			<h1>Oops... Page Not Found</h1>
			<p>Do not Worry Back To Previous Pages</p>
			<div className="fb-404btn">
				<a href="index.html" className="ad-btn">back to home</a>
			</div>
		</div>
	</div>
	{/* <!-- Color Setting --> */}
	<div id="style-switcher">
		<div>
			<ul className="colors">
				<li>
					<p className='colorchange' id='color'>
					</p>
				</li>
				<li>
					<p className='colorchange' id='color2'>
					</p>
				</li>
				<li>
					<p className='colorchange' id='color3'>
					</p>
				</li>
				<li>
					<p className='colorchange' id='color4'>
					</p>
				</li>
				<li>
					<p className='colorchange' id='color5'>
					</p>
				</li>
				<li>
					<p className='colorchange' id='style'>
					</p>
				</li>
			</ul>
		</div>
		<div className="bottom">
			<a href="error.html" className="settings">
				<i className="fa fa-cog" aria-hidden="true"></i>
			</a>
		</div>
	</div>
	</div>
  );
  
  export default Error404;