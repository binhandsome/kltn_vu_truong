import axios from "axios";
const USER_API_URL = 'http://localhost:8081/api/user';


/**
 * Xóa địa chỉ người dùng
 * @param {number|string} addressId - ID của địa chỉ cần xóa
 * @returns {Promise<string>} - Thông báo xóa thành công
 */
export const deleteAddress = async (addressId) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error("Không tìm thấy accessToken. Vui lòng đăng nhập lại.");

  const res = await fetch(`${USER_API_URL}/address/${addressId}?accessToken=${accessToken}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Xóa địa chỉ thất bại');
  }

  return await res.text(); // "Xóa địa chỉ thành công"
};

export const getUserProfileById = async (userId) => {
  const res = await axios.get(`${USER_API_URL}/getUserById/${userId}`);
  return res.data;
};
