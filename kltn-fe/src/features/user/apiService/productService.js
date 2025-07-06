const PRODUCT_API_URL = 'http://localhost:8000/api/products';

// Lấy tất cả sản phẩm có filter
export const getAllProducts = async (filterParams) => {
  const response = await fetch(`${PRODUCT_API_URL}/getAllProduct`, {
    method : 'GET',
    headers: { 'Content-Type': 'application/json' },
    // 🧠 fetch không tự serialize query params => ta phải làm thủ công
    signal: AbortSignal.timeout?.(5000), // optional timeout
  });

  const url = new URL(`${PRODUCT_API_URL}/getAllProduct`);
  Object.entries(filterParams || {}).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed with status ${res.status}`);
  }

  return await res.json(); // Trả về Page<Product>
};

// Lọc theo salesRank hoặc productType
export const filterProducts = async (params) => {
  const url = new URL(`${PRODUCT_API_URL}/filterCategories`);
  Object.entries(params || {}).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Không thể lọc sản phẩm');
  }

  return await res.json(); // Trả về ProductFilterResponse
};

// Lấy chi tiết sản phẩm theo asin
export const getProductDetail = async (asin) => {
  const res = await fetch(`${PRODUCT_API_URL}/productDetail/${asin}`);

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Không tìm thấy sản phẩm');
  }

  return await res.json(); // Trả về Product
};
