const API_ORDER_URL = 'http://localhost:8086/api/orders';

// Lấy chi tiết 1 đơn hàng theo ID
export const getOrderDetails = async (orderId) => {
    const token = localStorage.getItem("accessToken");
  
    const response = await fetch(`http://localhost:8086/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }
  
    return await response.json();
  };
  