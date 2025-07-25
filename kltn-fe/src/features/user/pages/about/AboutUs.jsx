// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function AboutUs() {
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
  <section className="dz-bnr-inr dz-bnr-inr-sm bg-light">
    <div className="container">
      <div className="dz-bnr-inr-entry ">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-7">
            <div className="text-start mb-xl-0 mb-4">
              <h1>
              Hành trình thời trang của bạn bắt đầu từ đây Khám phá phong cách tại Pixio
                {/* Your Fashion Journey Starts Here Discover Style at Pixio */}
              </h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html"> 
                    Trang chủ
                      {/* Home */}
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                  Về chúng tôi
                    {/* About us */}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 ">
            <div className="about-sale  text-start">
              <div className="row">
                <div className="col-lg-5 col-md-6 col-6">
                  <div className="about-content">
                    <h2 className="title">
                      <span className="counter">50</span>+
                    </h2>
                    <p className="text">
                    Mặt hàng bán
                      {/* Items Sale */}
                    </p>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6 col-6">
                  <div className="about-content">
                    <h2 className="title">400%</h2>
                    <p className="text">
                    Lợi tức đầu tư
                      {/* Return on investment  */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="about-banner overflow-visible">
    <video autoPlay="" loop="" muted="" id="video-background">
      <source src="../../assets/user/images//background/bg-video.mp4" type="video/mp4" />
    </video>
    <div className="about-info">
      <h3 className="dz-title">
        <a href="about-me.html">
        Tại sao lại là Pixio?
          {/* why Pixio ? */}
        </a>
      </h3>
      <p className="text mb-0">
      Một thực tế đã được chứng minh từ lâu là người đọc sẽ bị phân tâm bởi nội dung dễ đọc của một trang khi nhìn vào bố cục của nó. Mục đích của việc sử dụng Lorem Ipsum là nó có sự phân bố các chữ cái gần như bình thường, trái ngược với việc sử dụng kiểu "Nội dung ở đây, nội dung ở đây", khiến nó trông giống như tiếng Anh dễ đọc. Nhiều gói xuất bản trên máy tính để bàn và trình chỉnh sửa trang web hiện nay sử dụng
        {/* It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use */}
      </p>
    </div>
  </section>
  {/*Our Mission Section*/}
  <section className="content-inner">
    <div className="container">
      <div className="row about-style2 align-items-xl-center align-items-start">
        <div className="col-lg-6 col-lg-5 col-sm-5 m-b30 sticky-top">
          <div className="about-thumb">
            <img src="../../assets/user/images//men.png" alt="" />
          </div>
        </div>
        <div className="col-lg-6 col-md-7 col-sm-7">
          <div className="about-content">
            <div className="section-head style-2 d-block">
              <h3 className="title w-100">
                Nâng tầm phong cách của bạn: Trải nghiệm thời trang độc đáo tại Pixio
                {/* Elevate Your Style: A Unique Fashion Experience at Pixio */}
              </h3>
              <p>
              Tại Untouch, chúng tôi tận tâm tạo ra một điểm đến thời trang độc quyền, vượt ra khỏi những điều bình thường. Niềm đam mê về phong cách, chất lượng và cá tính thúc đẩy sứ mệnh của chúng tôi. Bộ sưu tập của chúng tôi là sự kết hợp được tuyển chọn kỹ lưỡng giữa những thiết kế cổ điển vượt thời gian và những xu hướng mới nhất.
                {/* At Untouch, we're dedicated to creating an exclusive fashion
                destination that transcends the ordinary. Our passion for style,
                quality, and individuality drives our mission. Our collection is
                a carefully curated blend of timeless classics and the latest
                trends, */}
              </p>
              <p>
              Bên cạnh bộ sưu tập phong phú, chúng tôi cũng tận tâm đảm bảo trải nghiệm mua sắm của bạn luôn liền mạch và thú vị. Trang web của chúng tôi được thiết kế hướng đến sự tiện lợi của bạn, cung cấp các giao dịch an toàn và đội ngũ hỗ trợ khách hàng tận tâm, sẵn sàng hỗ trợ bạn trong từng bước.
                {/* In addition to our extensive collection, we're equally devoted
                to ensuring your shopping experience is seamless and enjoyable.
                Our website is designed with your convenience in mind, offering
                secure transactions and a responsive customer support team to
                assist you every step of the way. */}
              </p>
            </div>
            <div className="about-bx-detail">
              <div className="about-bx-pic radius">
                <img src="../../assets/user/images//testimonial/testimonial4.jpg" alt="" />
              </div>
              <div>
                <h6 className="name">Kenneth Fong</h6>
                <span className="position">
                CEO và người sáng lập
                  {/* Ceo and founder */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Get In Touch */}
  <section className="get-in-touch">
    <div className="m-r100 m-md-r0 m-sm-r0">
      <h3 className="dz-title mb-lg-0 mb-3">
      Bạn có thắc mắc không?
<span>Các chuyên gia của chúng tôi sẽ giúp bạn tìm ra loại cỏ phù hợp nhất</span>
        {/* Questions ?
        <span>Our experts will help find the grar that’s right for you</span> */}
      </h3>
    </div>
    <a href="contact-us-1.html" className="btn btn-light">
    Liên hệ
      {/* Get In Touch */}
    </a>
  </section>
  {/* Get In Touch End */}
  <section className="content-inner">
    <div className="container">
      <div className="row g-3 g-xl-4">
        <div
          className="col-xl-6 col-lg-8 col-md-12 col-sm-12 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="section-head ">
            <h2 className="title">
            Gặp gỡ đội ngũ sáng tạo, nhà thiết kế và chuyên gia giải quyết vấn đề đẳng cấp thế giới của chúng tôi
             {/*  Meet our team of creators, designers, and world-class problem
              solvers */}
            </h2>
            <p>
              Có rất nhiều biến thể của Lorem Ipsum,
nhưng phần lớn đã bị thay đổi ở một số hình thức, bằng cách
thêm yếu tố hài hước, hoặc sử dụng các từ ngữ ngẫu nhiên.
              {/* There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words. */}
            </p>
            <a className="btn btn-secondary me-3" href="registration.html">
              Tham gia nhóm của chúng tôi
              {/* Join Our Team */}
            </a>
          </div>
        </div>
        <div
          className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <div className="dz-team style-1 m-md-b0 m-sm-b0 m-b30">
            <div className="dz-media">
              <a href="javascript:void(0);">
                <img src="../../assets/user/images//team/pic1.jpg" alt="" />
              </a>
              <ul className="team-social-icon">
                <li>
                  <a href="https://www.facebook.com/dexignzone" target="_blank">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/dexignzone" target="_blank">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dexignzone/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dexignzone/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="our-team.html">John Doe</a>
              </h5>
              <span>CEO &amp; Nhà sáng lập</span>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="dz-team style-1 m-md-b0 m-sm-b0 m-b30">
            <div className="dz-media">
              <a href="javascript:void(0);">
                <img src="../../assets/user/images//team/pic2.jpg" alt="" />
              </a>
              <ul className="team-social-icon">
                <li>
                  <a href="https://www.facebook.com/dexignzone" target="_blank">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/dexignzone" target="_blank">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dexignzone/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dexignzone/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="our-team.html">Ivan Mathews</a>
              </h5>
              <span>iOS Developer</span>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 wow fadeInUp"
          data-wow-delay="0.4s"
        >
          <div className="dz-team style-1 m-md-b0 m-sm-b0 m-b30">
            <div className="dz-media">
              <a href="javascript:void(0);">
                <img src="../../assets/user/images//team/pic3.jpg" alt="" />
              </a>
              <ul className="team-social-icon">
                <li>
                  <a href="https://www.facebook.com/dexignzone" target="_blank">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/dexignzone" target="_blank">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dexignzone/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dexignzone/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="our-team.html">Macauley Herring </a>
              </h5>
              <span>Customer Success</span>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 wow fadeInUp"
          data-wow-delay="0.5s"
        >
          <div className="dz-team style-1 m-md-b0 m-sm-b0 m-b30">
            <div className="dz-media">
              <a href="javascript:void(0);">
                <img src="../../assets/user/images//team/pic4.jpg" alt="" />
              </a>
              <ul className="team-social-icon">
                <li>
                  <a href="https://www.facebook.com/dexignzone" target="_blank">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/dexignzone" target="_blank">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dexignzone/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dexignzone/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="our-team.html">Alya Levine</a>
              </h5>
              <span>CTO </span>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 wow fadeInUp"
          data-wow-delay="0.6s"
        >
          <div className="dz-team style-1 m-md-b0 m-sm-b0 m-b30">
            <div className="dz-media">
              <a href="javascript:void(0);">
                <img src="../../assets/user/images//team/pic5.jpg" alt="" />
              </a>
              <ul className="team-social-icon">
                <li>
                  <a href="https://www.facebook.com/dexignzone" target="_blank">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/dexignzone" target="_blank">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dexignzone/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dexignzone/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="our-team.html">Rose Hernandez </a>
              </h5>
              <span>Backend Developer</span>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 wow fadeInUp"
          data-wow-delay="0.7s"
        >
          <div className="dz-team style-1 m-md-b0 m-sm-b0 m-b30">
            <div className="dz-media">
              <a href="javascript:void(0);">
                <img src="../../assets/user/images//team/pic6.jpg" alt="" />
              </a>
              <ul className="team-social-icon">
                <li>
                  <a href="https://www.facebook.com/dexignzone" target="_blank">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/dexignzone" target="_blank">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dexignzone/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dexignzone/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="our-team.html">Elen Benitez </a>
              </h5>
              <span>Designer</span>
            </div>
          </div>
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

export default AboutUs;