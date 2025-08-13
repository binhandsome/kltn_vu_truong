export function getApiMessage(err, fallback = 'Đã có lỗi xảy ra.') {
  const data = err?.response?.data;
  if (typeof data === 'string') return data;
  if (data?.message) return data.message;
  return err?.message ?? fallback;
}
export function getApiCode(err) {
  return err?.response?.data?.code ?? null;
}
