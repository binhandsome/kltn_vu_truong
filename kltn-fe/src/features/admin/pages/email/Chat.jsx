const Chat = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title">Chat</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-link active">Chat</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
				<div className="row">
					<div className="col-lg-12">
						<div className="card card-body">
							<div className="inbox-msg">
								<div className="inbox-people">
								  <div className="headind-srch">
									<div className="recent-heading">
									  <h4>Recent</h4>
									</div>
									<div className="srch-bar">
									  <div className="stylish-input-group">
										<input type="text" className="search-bar"  placeholder="Search" />
										<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
											<path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
											s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
											c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
											s-17-7.626-17-17S14.61,6,23.984,6z"></path>
											</svg>
										</div>
									</div>
								  </div>
								  <div className="inbox-chat">
									<div className="chat-list">
									  <div className="chat-people">
										<div className="chat-img">
											<i className="fas fa-circle"></i>
											<img src="../../assets/admin/images/user1.png" alt=""/>
										</div>
										<div className="chat-ib">
										  <h5>Nicole james <span className="chat_date">5 hours</span></h5>
										  <p>Test, which is a new approach to have all solutions.</p>
										</div>
									  </div>
									</div>
									<div className="chat-list active-chat">
									  <div className="chat-people">
										<div className="chat-img">
											<i className="fas fa-circle inactive-green"></i>
											<img src="../../assets/admin/images/user2.png" alt=""/>
										</div>
										<div className="chat-ib">
										  <h5>Mark Wood <span className="chat_date">25 min</span></h5>
										  <p>Test, which is a new approach to have all solutions.</p>
										</div>
									  </div>
									</div>
									<div className="chat-list">
									  <div className="chat-people">
										<div className="chat-img">
											<i className="fas fa-circle"></i>
											<img src="../../assets/admin/images/user3.jpg" alt=""/>
										</div>
										<div className="chat-ib">
										  <h5>Mike Jonson <span className="chat_date">2 hours</span></h5>
										  <p>Test, which is a new approach to have all solutions.</p>
										</div>
									  </div>
									</div>
									<div className="chat-list active-chat">
									  <div className="chat-people">
										<div className="chat-img">
											<i className="fas fa-circle"></i>
											<img src="../../assets/admin/images/user1.png" alt=""/>
										</div>
										<div className="chat-ib">
										  <h5>Micky Jam <span className="chat_date">15 min</span></h5>
										  <p>Test, which is a new approach to have all solutions.</p>
										</div>
									  </div>
									</div>
									<div className="chat-list">
									  <div className="chat-people">
										<div className="chat-img">
											<i className="fas fa-circle inactive-green"></i>
											<img src="../../assets/admin/images/user4.jpg" alt=""/>
										</div>
										<div className="chat-ib">
										  <h5>Joye Gunn <span className="chat_date">10 min</span></h5>
										  <p>Test, which is a new approach to have all solutions.</p>
										</div>
									  </div>
									</div>
									<div className="chat-list">
									  <div className="chat-people">
										<div className="chat-img">
											<i className="fas fa-circle"></i>
											<img src="../../assets/admin/images/user.jpg" alt=""/>
										</div>
										<div className="chat-ib">
										  <h5>Tom Crus <span className="chat_date">2 hours</span></h5>
										  <p>Test, which is a new approach to have all solutions.</p>
										</div>
									  </div>
									</div>
									<div className="chat-list">
									  <div className="chat-people">
										<div className="chat-img">	
											<i className="fas fa-circle"></i>
											<img src="../../assets/admin/images/user2.png" alt=""/>
										</div>
										<div className="chat-ib">
										  <h5>John Doe <span className="chat_date">5 min</span></h5>
										  <p>Test, which is a new approach to have all solutions.</p>
										</div>
									  </div>
									</div>
								  </div>
								</div>
								<div className="mesgs">
									<div className="chat-list chat-list22">
									  <div className="chat-people">
										<div className="chat-img">	
											<i className="fas fa-circle"></i>
											<img src="../../assets/admin/images/user.jpg" alt=""/>
										</div>
										<div className="chat-ib">
										  <h5>Steven John</h5>
										  <p>Active Now</p>
										</div>
									  </div>
									</div>
								  <div className="msg-history">
									<div className="incoming-msg">
									  <div className="incoming-msg-img">
									  <img src="../../assets/admin/images/user.jpg" alt=""/> </div>
									  <div className="received-msg">
										<div className="received-withd-msg">
										  <p>Test which is a new approach to have all
											solutions</p>
										  <span className="time-date"> 11:01 AM    |    June 9</span></div>
									  </div>
									</div>
									<div className="outgoing-msg">
									  <div className="sent-msg">
										<p>Test which is a new approach to have all
										  solutions</p>
										<span className="time-date"> 11:01 AM    |    June 9</span> </div>
										<div className="incoming-msg-img">
											<img src="../../assets/admin/images/user1.png" alt=""/> 
										</div>
									</div>
									<div className="incoming-msg">
									  <div className="incoming-msg-img"> <img src="../../assets/admin/images/user.jpg" alt=""/> </div>
									  <div className="received-msg">
										<div className="received-withd-msg">
										  <p>Test, which is a new approach to have</p>
										  <span className="time-date"> 11:01 AM    |    Yesterday</span></div>
									  </div>
									</div>
									<div className="outgoing-msg">
									  <div className="sent-msg">
										<p>Apollo University, Delhi, India Test</p>
										<span className="time-date"> 11:01 AM    |    Today</span> </div>
										<div className="incoming-msg-img">
											<img src="../../assets/admin/images/user1.png" alt=""/> 
										</div>
									</div>
									<div className="incoming-msg">
									  <div className="incoming-msg-img"> <img src="../../assets/admin/images/user.jpg" alt=""/> </div>
									  <div className="received-msg">
										<div className="received-withd-msg">
										  <p>We work directly with our designers and suppliers,
											and sell direct to you, which means quality, exclusive
											products, at a price anyone can afford.</p>
										  <span className="time-date"> 11:01 AM    |    Today</span></div>
									  </div>
									</div>
									<div className="outgoing-msg">
									  <div className="sent-msg">
										<p>Apollo University, Delhi, India Test</p>
										<span className="time-date"> 11:01 AM    |    Today</span> </div>
										<div className="incoming-msg-img">
											<img src="../../assets/admin/images/user1.png" alt=""/> 
										</div>
									</div>
									<div className="incoming-msg">
									  <div className="incoming-msg-img"> <img src="../../assets/admin/images/user.jpg" alt=""/> </div>
									  <div className="received-msg">
										<div className="received-withd-msg">
										  <p>Test, which is a new approach to have</p>
										  <span className="time-date"> 11:01 AM    |    Yesterday</span></div>
									  </div>
									</div>
								  </div>
								  <div className="type-msg">
									<div className="input-msg-write">
									  <input type="text" className="write-msg" placeholder="Type a message" />
									  <button className="msg-send-btn" type="button">Send <i className="fab fa-telegram-plane"></i></button>
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
  
  export default Chat;