import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductReviewManagement = () => {
    const { asin } = useParams();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [replyTexts, setReplyTexts] = useState({});
    const [loading, setLoading] = useState(false);
    const [editingReplyId, setEditingReplyId] = useState(null);
const [editReplyText, setEditReplyText] = useState("");
    const token = localStorage.getItem("accessToken");

  
    const fetchReviews = async () => {
      if (!asin) return;
      if (!token) {
        alert("Vui lòng đăng nhập.");
        return navigate("/seller/comments");
      }
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8089/api/seller/reviews`, {
          params: { asin },
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy bình luận:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          alert("Không có quyền. Đăng nhập lại.");
          navigate("/seller/authentication/login");
        }
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (!asin) {
        alert("ASIN thiếu.");
        navigate("/seller/comments");
      } else {
        fetchReviews();
      }
    }, [asin]);
  

  const handleReplyChange = (reviewId, value) => {
    setReplyTexts((prev) => ({ ...prev, [reviewId]: value }));
  };

  const handleSubmitReply = async (reviewId) => {
    const reply = (replyTexts[reviewId] || "").trim();
    if (!reply) return;

    try {
      await axios.post(
        `http://localhost:8089/api/seller/reviews/${reviewId}/reply`,
        {
          productAsin: asin,
          comment: reply,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // reload reviews để hiện phản hồi mới
      await fetchReviews();
      setReplyTexts((prev) => ({ ...prev, [reviewId]: "" }));
    } catch (err) {
      console.error("Lỗi khi reply:", err);
      alert("Không thể phản hồi. Kiểm tra quyền hoặc thử lại.");
    }
  };
  const handleUpdateReply = async (reviewId) => {
    if (!editReplyText.trim()) return alert("Nội dung không được để trống.");
  
    try {
      await axios.put(
        `http://localhost:8089/api/seller/reviews/${reviewId}/reply`,
        {
          productAsin: asin,
          comment: editReplyText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingReplyId(null);
      await fetchReviews();
    } catch (err) {
      console.error("Lỗi khi cập nhật phản hồi:", err);
      alert("Không thể cập nhật phản hồi.");
    }
  };
  
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá bình luận này?")) return;
  
    try {
      await axios.delete(`http://localhost:8089/api/seller/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchReviews();
    } catch (err) {
      console.error("Lỗi khi xoá bình luận:", err);
      alert("Không thể xoá bình luận. Vui lòng thử lại.");
    }
  };

  return (
    <div className="main-content">
      <div className="page-title-wrapper">
        <h4 className="page-title">💬 Bình luận sản phẩm: {asin}</h4>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => navigate("/seller/comments")}
        >
          ← Quay lại danh sách
        </button>
      </div>

      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <div className="card table-card">
          <div className="card-header">
            <h4>Danh sách bình luận gốc</h4>
          </div>
          <div className="card-body">
            {reviews.filter((r) => !r.parentId).length === 0 && (
              <div className="text-muted">Chưa có bình luận nào.</div>
            )}
            {reviews
              .filter((r) => !r.parentId)
              .map((parent) => (
                <div
                  key={parent.reviewId}
                  className="mb-4 border rounded p-3"
                  style={{ backgroundColor: "#f9f9f9" }}
                >
                  <div className="d-flex align-items-start">
                    <img
                      src={
                        parent.avatar ||
                        "/assets/user/images/default-avatar.png"
                      }
                      alt={parent.username}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: 12,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                    <div className="d-flex justify-content-between">
  <div>
    <strong>{parent.username}</strong>{" "}
    <span className="text-warning">
      {Array.from({ length: parent.rating || 0 }, (_, i) => (
        <i key={i} className="fas fa-star"></i>
      ))}
    </span>
  </div>
  <div className="d-flex align-items-center gap-2">
    <span className="text-muted">
      {new Date(parent.createdAt).toLocaleString("vi-VN")}
    </span>
    <button
      className="btn btn-sm btn-outline-danger"
      onClick={() => handleDeleteReview(parent.reviewId)}
    >
      <i className="fas fa-trash"></i> Xoá
    </button>
  </div>
</div>

                      <p className="mt-2">{parent.comment}</p>

                      {/* Seller reply if exists */}
                      {parent.sellerReply ? (
                        <div
                          className="mt-3 p-2 border rounded"
                          style={{ backgroundColor: "#e8f0ff" }}
                        >
                          <div className="small text-secondary mb-1">
                            Phản hồi từ cửa hàng
                          </div>
                          <div className="d-flex align-items-start">
                            <img
                              src={
                                parent.sellerReply.avatar ||
                                "/assets/user/images/default-avatar.png"
                              }
                              alt={parent.sellerReply.username}
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: 8,
                              }}
                            />
                            <div>
                              <div>
                                <strong>{parent.sellerReply.username}</strong>{" "}
                                <span className="badge bg-secondary ms-1">
                                  Cửa hàng
                                </span>
                              </div>
                              {editingReplyId === parent.sellerReply.reviewId ? (
  <div>
    <textarea
      className="form-control mb-2"
      rows={2}
      value={editReplyText}
      onChange={(e) => setEditReplyText(e.target.value)}
    />
    <div className="d-flex gap-2">
      <button
        className="btn btn-sm btn-success"
        onClick={() => handleUpdateReply(parent.sellerReply.reviewId)}
      >
        💾 Lưu
      </button>
      <button
        className="btn btn-sm btn-secondary"
        onClick={() => setEditingReplyId(null)}
      >
        ✖ Huỷ
      </button>
    </div>
  </div>
) : (
  <>
    <p className="mb-1">{parent.sellerReply.comment}</p>
    <button
      className="btn btn-sm btn-light border"
      onClick={() => {
        setEditingReplyId(parent.sellerReply.reviewId);
        setEditReplyText(parent.sellerReply.comment);
      }}
    >
      ✏️ Sửa phản hồi
    </button>
  </>
)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // reply form
                        <div className="mt-3">
                          <textarea
                            className="form-control mb-2"
                            placeholder="Nhập phản hồi của cửa hàng..."
                            value={replyTexts[parent.reviewId] || ""}
                            onChange={(e) =>
                              handleReplyChange(parent.reviewId, e.target.value)
                            }
                            rows={2}
                          />
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleSubmitReply(parent.reviewId)}
                          >
                            Gửi phản hồi
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="ad-footer-btm">
        <p>© 2025 Quản lý bình luận</p>
      </div>
    </div>
  );
};

export default ProductReviewManagement;
