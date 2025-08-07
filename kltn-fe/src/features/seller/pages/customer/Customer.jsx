import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Modal, Box, Typography, Button, Rating, Avatar, Chip,TextField } from "@mui/material";

import axios from 'axios';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
function Customer() {
    const [openParent, setOpenParent] = React.useState(false);
    const [openChild, setOpenChild] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [listItemOrder, setListItemOrder] = useState([]);
    const [listEvaluate, setListEvaluate] = useState([]);
    const [message, setMessage] = useState('');
      const [reply, setReply] = useState(listEvaluate.commentByEvaluate || '');
  const [previewImg, setPreviewImg] = React.useState(null);

  const handleReply = (evaluateId) => {
    handleReplyCommentBySeller(evaluateId);
    console.log('Đã gửi phản hồi:', reply);
  };
    const handleOpenParent = (item) => {
        setSelectedItem(item);
        getAllEvalueByItem(item.orderItemId);
        console.log('itemselected', item);
        setOpenParent(true);
    }
    const handleCloseParent = () => {
        setSelectedItem([]);
        setOpenParent(false);
    }
    const handleOpenChild = () => setOpenChild(true);
    const handleCloseChild = () => setOpenChild(false);
    const URL_SELLER = "http://localhost:8089/api/seller";
    const getAllOrderItem = async () => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`${URL_SELLER}/getAllOrderItem`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setListItemOrder(response.data);
            console.log('fjkabfkasb', response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllOrderItem();
    }, []);
    const getAllEvalueByItem = async (orderItemId) => {
                const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`${URL_SELLER}/getAllEvaluateByOrderItem`, {
                params: {
                    orderItemId,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            setListEvaluate(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('error', error);
        }
    }
    const handleReplyCommentBySeller = async(evaluateId) => {
                        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.put(`${URL_SELLER}/updateCommentBySeller`, null , {
                params: {
                    evaluateId, 
                    commentBySeller: reply,
                },
                     headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            console.log('bfsajhfasbfas', response.data);
            setMessage(response.data);
        }catch(error) {
            console.log('fsafasfsa', error);
        }
    }



    return (
        <>
            <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box ad-title-box-use">
                                {/* Customers */}
                                <h4 className="page-title">Đánh Giá</h4>
                            </div>
                            <div className="ad-breadcrumb">
                                <ul>
                                    <li>
                                        <div className="ad-user-btn">
                                            <input className="form-control" type="text" placeholder="Search Here..." id="text-input" />
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
                                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
												s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
												c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
												s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                                            </svg>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div>
                                {/* Modal cha */}
                     <Modal open={openParent} onClose={handleCloseParent} aria-labelledby="comment-modal-title">
      <Box sx={style}>
        <Typography id="comment-modal-title" variant="h6" fontWeight={600} mb={1}>
          Đánh giá sản phẩm
        </Typography>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          ASIN: <strong>{listEvaluate?.productAsin}</strong>
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <Rating value={listEvaluate?.rating || 0} readOnly />
          <Chip
            label={listEvaluate?.status === 0 ? "Chưa trả lời" : "Đã Trả Lời"}
            size="small"
            color={listEvaluate?.status === 0 ? "Chưa Trả Lời" : "default"}
            sx={{ ml: 2 }}
          />
        </Box>

       <Box
  sx={{
    backgroundColor: "#f9f9f9",
    borderLeft: "4px solid #1976d2",
    borderRadius: 2,
    p: 2,
    mb: 2,
    position: "relative",
  }}
>
  <Typography
    variant="body2"
    sx={{
      whiteSpace: "pre-wrap",
      color: "#333",
      fontStyle: listEvaluate?.comment ? "normal" : "italic",
      pl: 3,
    }}
  >
    {listEvaluate?.comment || "Không có nội dung"}
  </Typography>
</Box>

  {(() => {
   try {
    const images = JSON.parse(listEvaluate?.imgEvaluate || "[]");

    return (
      <>
        {images.length > 0 && (
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`evaluate-img-${idx}`}
                onClick={() => setPreviewImg(img)}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            ))}
          </Box>
        )}

        {/* Modal hiển thị ảnh to */}
        <Modal open={!!previewImg} onClose={() => setPreviewImg(null)}>
          <Box
            onClick={() => setPreviewImg(null)}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "rgba(0,0,0,0.8)",
              zIndex: 9999,
              cursor: "zoom-out",
            }}
          >
            <img
              src={previewImg}
              alt="Preview"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
            />
          </Box>
        </Modal>
      </>
    );
  } catch {
    return null;
  }
})()}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            {listEvaluate.createdAt ? new Date(listEvaluate.createdAt).toLocaleString() : "Chưa xác định thời gian"}
          </Typography>
        </Box>
 <Box mt={3}>
      <Typography variant="subtitle2" gutterBottom fontWeight={600}>
        Seller trả lời
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={4}
        placeholder="Nhập phản hồi của seller tại đây..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        variant="outlined"
        sx={{
          backgroundColor: '#fafafa',
          borderRadius: 2,
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />
<p>{message.message}</p>
      <Box textAlign="right">
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleReply(listEvaluate.evaluteId)}
          disabled={!reply.trim()}
        >
          Trả lời
        </Button>
      </Box>
    </Box>
        <Box mt={3} textAlign="right">
          <Button onClick={handleCloseParent} variant="contained" color="primary">
            Đóng
          </Button>
        </Box>
      </Box>
    </Modal>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Table Start --> */}
                <div className="row">
                    {/* <!-- Styled Table Card--> */}
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                {/* Customers List */}
                                <h4>Đánh Giá Của Khách Hàng</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-styled mb-0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    {/* Username */}
                                                    <th>Sản Phẩm</th>
                                                    {/* Phone / Email */}
                                                    <th>Giá</th>
                                                    {/* Address */}
                                                    <th>Số Lượng</th>
                                                    {/* Rating */}
                                                    <th>Màu Sắc</th>
                                                    {/* Wallet Balance */}
                                                    <th>Kích cở</th>
                                                    {/* Joining Date */}
                                                    <th>Trạng Thái</th>
                                                    {/* Action */}
                                                    <th>Xem Đánh Giá</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listItemOrder.map((item, index) => (
                                                    <tr>
                                                        <td >
                                                            <div className="checkbox">
                                                                <input id="checkbox55" type="checkbox" />
                                                                <label for="checkbox55"></label>
                                                            </div>
                                                        </td>
                                                        <td style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                                                            <img
                                                                src={
                                                                    item.productThumbnail.startsWith('http')
                                                                        ? item.productThumbnail
                                                                        : item.productThumbnail.endsWith('.jpg')
                                                                            ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${item.productThumbnail}`
                                                                            : `/uploads/${item.productThumbnail}`
                                                                }
                                                                alt="product"
                                                                style={{
                                                                    width: "24px",
                                                                    height: "24px",
                                                                    borderRadius: "50%",
                                                                    objectFit: "cover",
                                                                    marginRight: "8px",
                                                                    verticalAlign: "middle",
                                                                }}
                                                            />
                                                            <span style={{ display: "inline-block", verticalAlign: "middle", maxWidth: "300px", whiteSpace: "normal", wordBreak: "break-word" }}>
                                                                {item.productTitle}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            ${item.unitPrice}
                                                        </td>
                                                        <td>{item.quantity}</td>
                                                        <td>
                                                            <label className="mb-0">{item.color}</label>
                                                        </td>
                                                        <td>{item?.size}</td>
                                                        <td style={{ color: item.isEvaluate === 1 ? 'green' : 'gray', fontWeight: 'bold' }}>
                                                            {item.isEvaluate === 1 ? "Đã đánh giá" : "Chưa đánh giá"}
                                                        </td>
                                                        <td className="relative">
                                                            <Button
                                                                variant="contained"
                                                                sx={{
                                                                    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                                                                    borderRadius: '50px',
                                                                    padding: '10px 30px',
                                                                    fontWeight: 'bold',
                                                                    textTransform: 'none',
                                                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                                                                    '&:hover': {
                                                                        background: 'linear-gradient(135deg, #5f0fa3 0%, #1a60e7 100%)',
                                                                        boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.25)',
                                                                    },
                                                                }}
                                                                onClick={(e) => handleOpenParent(item)}
                                                            >
                                                                Xem Đánh Giá
                                                            </Button>

                                                        </td>
                                                    </tr>
                                                ))}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <nav className="d-inline-block">
                                        <ul className="pagination mb-0 ">
                                            <li className="page-item disabled ">
                                                <a className="page-link" href="javascript:void(0);" tabIndex="-1"><i className="fas fa-chevron-left"></i></a>
                                            </li>
                                            <li className="page-item active "><a className="page-link " href="javascript:void(0); ">1</a></li>
                                            <li className="page-item ">
                                                <a className="page-link " href="javascript:void(0); ">2</a>
                                            </li>
                                            <li className="page-item "><a className="page-link " href="javascript:void(0); ">3</a></li>
                                            <li className="page-item ">
                                                <a className="page-link " href="javascript:void(0); "><i className="fas fa-chevron-right "></i></a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="ad-footer-btm">
                    <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
                </div>
            </div>
        </>

    );
}


export default Customer;