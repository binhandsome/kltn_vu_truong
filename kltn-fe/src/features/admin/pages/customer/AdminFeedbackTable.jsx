import React, { useEffect, useState } from "react";
import axios from "axios";

const PAGE_SIZE = 10;

const AdminFeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:8091/api/admin/feedback/all");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy phản hồi", err);
    }
  };

  const handleReplySubmit = async () => {
    if (!reply.trim()) return alert("Vui lòng nhập nội dung phản hồi");
    try {
      await axios.put(
        `http://localhost:8091/api/admin/feedback/reply/${selectedFeedback.id}`,
        reply,
        {
          headers: { "Content-Type": "text/plain" }
        }
      );
      alert("✅ Gửi phản hồi thành công!");
      setReply("");
      setSelectedFeedback(null);
      fetchFeedbacks();
    } catch (err) {
      console.error("❌ Gửi phản hồi thất bại", err);
      alert("Lỗi khi gửi phản hồi");
    }
  };

  // Tính toán dữ liệu phân trang
  const totalPages = Math.ceil(feedbacks.length / PAGE_SIZE);
  const paginatedFeedbacks = feedbacks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // CSS modal inline
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    zIndex: 999
  };

  const modalContentStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "500px",
    zIndex: 1000,
    boxShadow: "0 0 15px rgba(0,0,0,0.3)"
  };

  return (
    <div className="main-content">
      <div className="row">
        <div className="col-xl-12">
          <div className="card table-card">
            <div className="card-header pb-0">
              <h4>📨 Phản hồi từ người dùng</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-styled mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Người dùng</th>
                      <th>Loại</th>
                      <th>Nội dung</th>
                      <th>Phản hồi</th>
                      <th>Thời gian</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFeedbacks.map((fb, idx) => (
                      <tr key={fb.id}>
                        <td>{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                        <td>{fb.userId}</td>
                        <td>{fb.type}</td>
                        <td>{fb.message}</td>
                        <td>
                          {fb.adminReply ? (
                            fb.adminReply
                          ) : (
                            <span className="text-danger">Chưa phản hồi</span>
                          )}
                        </td>
                        <td>{new Date(fb.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => {
                              setSelectedFeedback(fb);
                              setReply(fb.adminReply || "");
                            }}
                          >
                            {fb.adminReply ? "Sửa" : "Phản hồi"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {feedbacks.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center text-muted">
                          Không có phản hồi nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Phân trang */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                  >
                    Trang trước
                  </button>
                  <span>
                    Trang {currentPage} / {totalPages}
                  </span>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Trang sau
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal phản hồi */}
      {selectedFeedback && (
        <>
          <div style={modalOverlayStyle} onClick={() => setSelectedFeedback(null)} />
          <div style={modalContentStyle}>
            <h5>Phản hồi người dùng #{selectedFeedback.userId}</h5>
            <p><strong>Góp ý:</strong> {selectedFeedback.message}</p>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Nhập nội dung phản hồi..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="mt-2 d-flex justify-content-end gap-2">
              <button className="btn btn-secondary me-2" onClick={() => setSelectedFeedback(null)}>
                Đóng
              </button>
              <button className="btn btn-success" onClick={handleReplySubmit}>
                {selectedFeedback.adminReply ? "Cập nhật phản hồi" : "Gửi phản hồi"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminFeedbackTable;
