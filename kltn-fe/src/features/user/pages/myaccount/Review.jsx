import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import WOW from 'wowjs'; 
import axios from 'axios';

function Review() {
  const [hasBgClass, setHasBgClass] = useState(true); 
  const [type, setType] = useState("Góp ý");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (hasBgClass) {
      document.body.classList.add('bg');
    }
    return () => document.body.classList.remove('bg');
  }, [hasBgClass]);

  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchUserIdAndFeedbacks = async () => {
      try {
        const resUser = await axios.get(`http://localhost:8081/api/user/findUserIdByAccessToken?accessToken=${token.replace("Bearer ", "")}`);
        const id = resUser.data;
        setUserId(id);

        const resFeedback = await axios.get(`http://localhost:8091/api/admin/feedback/by-user/${id}`);
        setFeedbacks(resFeedback.data); // Không lọc
      } catch (err) {
        console.error("Lỗi lấy feedback hoặc userId:", err);
      }
    };
    fetchUserIdAndFeedbacks();
  }, [token]);

  const handleSubmit = async () => {
    if (!message.trim()) return alert("Vui lòng nhập nội dung góp ý!");
    try {
      await axios.post("http://localhost:8081/api/user/sendFeedback", { type, message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Gửi góp ý thành công!");
      setMessage("");
      const res = await axios.get(`http://localhost:8091/api/admin/feedback/by-user/${userId}`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Gửi góp ý thất bại!");
    }
  };

  return (
    <>
      <div className="page-wraper">
        <div className="page-content bg-light">
          <div className="dz-bnr-inr bg-secondary overlay-black-light" style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}>
            <div className="container">
              <div className="dz-bnr-inr-entry">
                <h1>Đánh giá</h1>
                <nav aria-label="breadcrumb" className="breadcrumb-row">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                    <li className="breadcrumb-item">Đánh giá</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          <div className="content-inner-1">
            <div className="container">
              <div className="row">
                <aside className="col-xl-3">
                  <div className="toggle-info">
                    <h5 className="title mb-0">Tài khoản</h5>
                  </div>
                  {/* <div className="sticky-top account-sidebar-wrapper">
                    <div className="account-sidebar">
                      <div className="profile-head">
                        <div className="user-thumb">
                          <img className="rounded-circle" src="../../assets/user/images/profile4.jpg" alt="avatar" />
                        </div>
                        <h5 className="title mb-0">Bạn</h5>
                        <span className="text text-primary">user@email.com</span>
                      </div>
                    </div>
                  </div> */}
                </aside>

                <section className="col-xl-9 account-wrapper">
                  <div className="mb-4">
                    <h4>📝 Gửi phản hồi tới hệ thống</h4>
                    <div className="form-group">
                      <label>Loại phản hồi</label>
                      <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Góp ý">Góp ý</option>
                        <option value="Lỗi">Báo lỗi</option>
                      </select>
                    </div>
                    <div className="form-group mt-2">
                      <label>Nội dung</label>
                      <textarea
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Nhập nội dung góp ý hoặc báo lỗi..."
                      />
                    </div>
                    <button className="btn btn-primary mt-2" onClick={handleSubmit}>Gửi</button>
                  </div>

                  <hr />
                  <h5>📬 Phản hồi đã gửi</h5>
                  {feedbacks.length === 0 ? (
                    <p>Chưa có góp ý nào được gửi.</p>
                  ) : (
                    feedbacks.map(f => (
                      <div className="card mb-3" key={f.id}>
                        <div className="card-body">
                          <p><strong>📌 Loại:</strong> {f.type}</p>
                          <p><strong>📨 Nội dung:</strong> {f.message}</p>
                          <p>
                            <strong>✅ Phản hồi từ admin:</strong>{" "}
                            {f.replied ? f.adminReply : <em className="text-muted">Chưa có phản hồi</em>}
                          </p>
                          {f.replied && (
                            <p><small><strong>🕒 Thời gian:</strong> {new Date(f.adminReplyAt).toLocaleString()}</small></p>
                          )}
                          <span className={`badge ${f.replied ? "bg-success" : "bg-warning text-dark"}`}>
                            {f.replied ? "Đã phản hồi" : "Đang chờ phản hồi"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>
        <ScrollTopButton />
        <QuickViewModal />
      </div>
    </>
  );
}

export default Review;
