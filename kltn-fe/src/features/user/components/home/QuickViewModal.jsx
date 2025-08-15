// src/pages/components/home/QuickViewModal.jsx
import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";

const img300 = (f) => {
  if (!f) return "/assets/images/placeholder.png";
  const s = String(f);
  return s.startsWith("http")
    ? s
    : `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${s}`;
};
const img60 = (f) => {
  if (!f) return "/assets/images/placeholder.png";
  const s = String(f);
  return s.startsWith("http")
    ? s
    : `https://res.cloudinary.com/dj3tvavmp/image/upload/w_60,h_60/imgProduct/IMG/${s}`;
};
const money = (n) =>
  Number(n || 0).toLocaleString("en-US", { style: "currency", currency: "USD" });

// ✨ helper format số đã bán: 1.2k / 3.4M ...
const formatSold = (n) => {
  const x = Number(n || 0);
  if (x >= 1_000_000) return (x / 1_000_000).toFixed(x % 1_000_000 ? 1 : 0) + "M";
  if (x >= 1_000) return (x / 1_000).toFixed(x % 1_000 ? 1 : 0) + "k";
  return String(x);
};

function QuickViewModal({
  product,
  soldCount,
  onAdd,
  onToggleWishlist,
  inWishlist = false,
  quantity = 1,
  setQuantity,
  availableStock = null,
  triggerToast,
  requireSelection = true,

  // controlled từ Home:
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}) {
  // ========= Evaluate: load & tính sao =========
  const [evalAvg, setEvalAvg] = useState(0);
  const [evalCount, setEvalCount] = useState(0);

  useEffect(() => {
       let cancel = false;
     const asin = product?.asin;
       if (!asin) { setEvalAvg(0); setEvalCount(0); return; }
       axios
         .post(`${API_PRODUCT}/api/products/evaluates/summary`, [asin])
         .then(({ data }) => {
            const s = data?.[asin] || {};
            if (!cancel) {
              setEvalAvg(Number(s.avg || 0));
              setEvalCount(Number(s.count || 0));
            }
          })
          .catch(() => { if (!cancel) { setEvalAvg(0); setEvalCount(0); } });
        return () => { cancel = true; };
      }, [product?.asin]);

  const roundedStars = useMemo(() => Math.round(evalAvg || 0), [evalAvg]);

  // ========= chuẩn hoá mảng size & color =========
  const normSizes = useMemo(
    () =>
      (product?.sizes || []).map((s) => ({
        sizeId: Number(s.sizeId ?? s.size_id ?? s.id),
        sizeName: s.sizeName ?? s.name ?? s.label ?? String(s.sizeId ?? s.size_id ?? s.id),
        _raw: s,
      })),
    [product]
  );

  const normColors = useMemo(() => {
    try {
      const arr = product?.colorAsin ? JSON.parse(product.colorAsin) : [];
      return arr.map((c) => ({
        colorId: Number(c.colorId ?? c.color_id ?? c.id),
        name_color: c.name_color ?? c.name ?? c.label ?? "",
        code_color: c.code_color ?? c.code ?? "#000",
        _raw: c,
      }));
    } catch {
      return [];
    }
  }, [product]);

  const priceAfter = useMemo(() => {
    if (!product) return "0.00";
    const base = Number(product.productPrice || 0);
    const percent = Number(product.percentDiscount || 0);
    return (base - (base * percent) / 100).toFixed(2);
  }, [product]);

  // ✨ số lượng đã bán (snapshot)
  const resolvedSold = useMemo(() => {
    if (soldCount != null && Number.isFinite(Number(soldCount))) return Number(soldCount);
    const raw = product?.soldCount ?? product?.orderCount ?? product?.orders ?? 0;
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }, [soldCount, product]);

  const sizeStyles = `
    .product-size .btn { border-radius:50%; width:40px; height:40px; padding:0;
      text-align:center; line-height:40px; border:1px solid #000; font-weight:600;
      background:#fff; color:#000; transition:.2s; }
    .product-size .btn-check:checked + .btn { background:#000; color:#fff; border-color:#000; }
    .product-size .btn:hover { background:#f0f0f0; }
  `;

  const handleAdd = () => {
    if (requireSelection && product) {
      if (normSizes.length > 0 && !selectedSize)
        return triggerToast?.("⚠️ Vui lòng chọn size.", "error");
      if (normColors.length > 0 && !selectedColor)
        return triggerToast?.("⚠️ Vui lòng chọn màu.", "error");
    }
    onAdd?.(quantity || 1, {
      size: selectedSize ? { sizeId: selectedSize.sizeId, sizeName: selectedSize.sizeName } : null,
      color: selectedColor ? { colorId: selectedColor.colorId, name_color: selectedColor.name_color } : null,
    });
  };
// Evaluate
// dưới các import/const khác
const API_PRODUCT = process.env.REACT_APP_API_PRODUCT || "http://localhost:8083";

// ⭐ vẽ sao theo phần thập phân (giống trang category)
const StarRating = ({ value = 0 }) => (
  <ul className="dz-rating me-2" style={{ display:'flex', gap:2 }}>
    {[0,1,2,3,4].map(i => {
      const fill = Math.max(0, Math.min(1, value - i));
      return (
        <li key={i} style={{ position:'relative', width:16, height:16 }}>
          <i className="flaticon-star-1" style={{ color:'#ddd' }} />
          <i className="flaticon-star-1"
             style={{
               color:'#f5a623',
               position:'absolute', left:0, top:0,
               width: `${fill*100}%`, overflow:'hidden'
             }} />
        </li>
      );
    })}
  </ul>
);
  return (
    <div className="modal quick-view-modal fade" id="exampleModal" tabIndex={-1} aria-hidden="true">
      <style>{sizeStyles}</style>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i className="icon feather icon-x" />
          </button>

          <div className="modal-body">
            <div className="row g-xl-4 g-3">
              {/* LEFT */}
              <div className="col-xl-6 col-md-6">
                <div className="dz-product-detail mb-0">
                  <div className="swiper-btn-center-lr">
                    <div className="swiper quick-modal-swiper2">
                      <div className="swiper-wrapper" id="lightgallery">
                        {product && (
                          <div className="swiper-slide">
                            <div className="dz-media DZoomImage">
                              <a
                                className="mfp-link lg-item"
                                href={img300(product.productThumbnail)}
                                data-src={img300(product.productThumbnail)}
                              >
                                <i className="feather icon-maximize dz-maximize top-right" />
                              </a>
                              <img src={img300(product.productThumbnail)} alt={product?.productTitle || "product"} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="swiper quick-modal-swiper thumb-swiper-lg thumb-sm swiper-vertical">
                      <div className="swiper-wrapper">
                        {product && (
                          <div className="swiper-slide">
                            <img src={img60(product.productThumbnail)} alt={product?.productTitle || "product"} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="col-xl-6 col-md-6">
                <div className="dz-product-detail style-2 ps-xl-3 ps-0 pt-2 mb-0">
                  <div className="dz-content">
                    <div className="dz-content-footer">
                      <div className="dz-content-start">
                        {Number(product?.percentDiscount || 0) > 0 && (
                          <span className="badge bg-secondary mb-2">
                            Giảm {product.percentDiscount}%
                          </span>
                        )}
                        <h4 className="title mb-1">
                          {product ? (
                            <a href={`/user/productstructure/ProductDetail?asin=${product.asin}`}>
                              {product.productTitle}
                            </a>
                          ) : (
                            "—"
                          )}
                        </h4>

                        {/* ✨ RATING từ Evaluate (status=1) */}
                        <div className="review-num d-flex align-items-center">
   <StarRating value={evalAvg} />
   {evalCount > 0 ? (
     <>
       <span className="text-secondary me-2">{evalAvg.toFixed(1)} sao</span>
       <a href={`/user/productstructure/ProductDetail?asin=${product?.asin}`}>
         ({evalCount} lượt đánh giá)
       </a>
     </>
   ) : (
    <span className="text-muted">Chưa có đánh giá</span>
   )}
+ </div>
                        {/* /RATING */}
                      </div>
                    </div>

                    <p className="para-text">{product?.productTitle || ""}</p>

                    {/* GIÁ + SỐ LƯỢNG + ĐÃ BÁN */}
                    <div className="meta-content m-b20 d-flex align-items-end flex-wrap gap-3">
                      <div className="me-3">
                        <span className="form-label">Giá</span>{" "}
                        {product ? (
                          <span className="price">
                            {money(priceAfter)}{" "}
                            {Number(product.percentDiscount || 0) > 0 && (
                              <del>{money(product.productPrice)}</del>
                            )}
                          </span>
                        ) : (
                          <span className="price">N/A</span>
                        )}
                      </div>

                      <div className="btn-quantity light me-0">
                        <label className="form-label fw-bold">Số lượng</label>
                        <div className="input-group">
                          <button
                            className="btn btn-dark rounded-circle p-0"
                            style={{ width: 40, height: 40 }}
                            onClick={() => {
                              if ((quantity || 1) > 1) setQuantity?.((q) => Math.max(1, (q || 1) - 1));
                              else triggerToast?.("⚠️ Số lượng tối thiểu là 1", "error");
                            }}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            min={1}
                            value={quantity || 1}
                            onChange={(e) => {
                              const v = parseInt(e.target.value, 10);
                              let next = Number.isNaN(v) ? 1 : Math.max(1, v);
                              if (availableStock !== null) next = Math.min(next, availableStock);
                              setQuantity?.(next);
                            }}
                            className="form-control text-center"
                          />

                          <button
                            className="btn btn-dark rounded-circle p-0"
                            style={{ width: 40, height: 40 }}
                            onClick={() => {
                              if (availableStock !== null && (quantity || 1) >= availableStock)
                                triggerToast?.(`❌ Chỉ còn ${availableStock} sản phẩm có sẵn`, "error");
                              else setQuantity?.((q) => (q || 1) + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="ms-0">
                        <span className="form-label fw-bold">Đã bán:</span>{" "}
                        <span>{formatSold(resolvedSold)}</span>
                      </div>
                    </div>

                    {/* MÀU */}
                    {normColors.length > 0 && (
                      <div className="mb-3">
                        <label className="form-label fw-bold">Màu sắc</label>
                        <div className="d-flex align-items-center flex-wrap gap-2">
                          {normColors.map((c, idx) => {
                            const id = `colorModal-${c.colorId}-${idx}`;
                            const active =
                              (selectedColor?.colorId ?? selectedColor?.color_id ?? selectedColor?.id) ===
                              c.colorId;
                            return (
                              <div className="form-check" key={id}>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="colorModal"
                                  id={id}
                                  checked={!!active}
                                  onChange={() => setSelectedColor?.(c)}
                                />
                                <label
                                  className="btn"
                                  htmlFor={id}
                                  style={{
                                    backgroundColor: c.code_color,
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    border: active ? "2px solid #000" : "1px solid #ccc",
                                    cursor: "pointer",
                                    padding: 0,
                                  }}
                                  title={c.name_color}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <p className="form-label mt-1">Đã chọn: {selectedColor?.name_color || "—"}</p>
                      </div>
                    )}

                    {/* SIZE */}
                    <div className="d-block mb-3">
                      <label className="form-label fw-bold">Kích thước</label>
                      <div className="btn-group flex-wrap product-size m-0" role="group">
                        {normSizes.length > 0 ? (
                          normSizes.map((s, i) => {
                            const id = `sizeModal-${s.sizeId}-${i}`;
                            const active =
                              (selectedSize?.sizeId ?? selectedSize?.size_id ?? selectedSize?.id) === s.sizeId;
                            return (
                              <React.Fragment key={id}>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="sizeModal"
                                  id={id}
                                  value={s.sizeId}
                                  checked={!!active}
                                  onChange={() => setSelectedSize?.(s)}
                                />
                                <label className="btn m-1" htmlFor={id}>
                                  {s.sizeName}
                                </label>
                              </React.Fragment>
                            );
                          })
                        ) : (
                          <p>Không có kích thước nào</p>
                        )}
                      </div>
                    </div>

                    {/* TỒN KHO */}
                    {availableStock !== null && (
                      <div className="mb-3">
                        <label className="form-label fw-bold d-flex align-items-center">
                          Tồn kho: <span className="ms-2">({availableStock} sản phẩm)</span>
                        </label>
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="cart-btn">
                      <button className="btn btn-secondary text-uppercase" onClick={handleAdd} disabled={!product}>
                        Add To Cart
                      </button>
                      <button
                        className="btn btn-md btn-outline-secondary btn-icon"
                        onClick={onToggleWishlist}
                        disabled={!product}
                      >
                        <i className={`icon feather ${inWishlist ? "icon-heart-on" : "icon-heart"}`} />
                        {inWishlist ? " Bỏ yêu thích" : " Thêm vào yêu thích"}
                      </button>
                    </div>

                    {/* META */}
                    <div className="dz-info mb-0">
                      {product && (
                        <ul>
                          <li>
                            <strong>SKU:</strong>
                          </li>
                          <li>{product.asin}</li>
                        </ul>
                      )}
                      <ul>
                        <li>
                          <strong>Danh mục:</strong>
                        </li>
                        {product?.salesRank && (
                          <li>
                            <a href={`/user/shop/shopWithCategory?salesRank=${product.salesRank}`}>
                              {product.salesRank}
                              {product?.productType ? "," : ""}
                            </a>
                          </li>
                        )}
                        {product?.productType && (
                          <li>
                            <a href={`/user/shop/shopWithCategory?productType=${product.productType}`}>
                              {product.productType}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                    {/* /META */}
                  </div>
                </div>
              </div>
              {/* /RIGHT */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
