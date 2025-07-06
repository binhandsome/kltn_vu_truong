// src/pages/common/HomePage.js
import React, { useEffect,useRef, useState } from 'react';
import Select from 'react-select'; 
import { Helmet } from 'react-helmet'; 
// import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js
import axios from 'axios';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

function ShopStandard({products }) {
	const [hasBgClass, setHasBgClass] = useState(true); 
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const maxPagesToShow = 10; // Hiển thị tối đa 10 trang mỗi lần
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categoryTree, setCategoryTree] = useState({});
  const [expandedNodes, setExpandedNodes] = useState({});
  const [seeMoreStates, setSeeMoreStates] = useState({});
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const priceOptions = [
    { label: "Dưới $50", min: 0, max: 50 },
    { label: "$50 – $100", min: 50, max: 100 },
    { label: "$100 – $200", min: 100, max: 200 },
    { label: "Trên $200", min: 200, max: 1000000 },
  ];
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

const colorOptions = colors.map((c) => ({
  value: c.code_color,
  label: c.name_color || c.code_color,
  color: c.code_color,
}));
 const inputRef = useRef(null); 

  const fetchProducts = async (page, size) => {
    try {
      const response = await axios.get('http://localhost:8083/api/products/getAllProduct', {
        params: {
          page: page,
          size: size,
        },
      });
      setFilteredProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    }catch (error) {
      console.error('khong tim thay product', error);
    }
  };
  // useEffect(() => {
  //   fetchProducts(currentPage, pageSize);
  // }, [currentPage, pageSize]);
    const handleChange = (e) => {
  const value = e.target.value;
  const parsed = parseInt(value);
  if (isNaN(parsed) || parsed < 1) {
    setQuantity(1); 
  } else {
    setQuantity(parsed);
  }
};
useEffect(() => {
  if (!isFiltering) {
    fetchProducts(currentPage, pageSize);
  }
}, [currentPage, pageSize, isFiltering]);

  const scrollToFilterWrapper = () => {
    const filterWrapper = document.querySelector('.filter-wrapper');
    if (filterWrapper) {
      filterWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Xử lý chuyển trang và cuộn lên
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  }
  
  const handlePageChangeProduct = (event) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    scrollToFilterWrapper();
  }

  // Tính toán phạm vi trang hiển thị
  const getPageRange = () => {
    const startPage = Math.floor(currentPage / maxPagesToShow) * maxPagesToShow;
    const endPage = Math.min(startPage + maxPagesToShow, totalPages);
    return [...Array(endPage - startPage).keys()].map((i) => startPage + i);
  };
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
 const imageWrapperStyle = {
    width: '600px',
    height: '450px'
  };
// Gọi API lấy màu
useEffect(() => {
  const fetchColors = async () => {
    try {
      const res = await axios.get('http://localhost:8083/api/colors/getAll');
      setColors(res.data || []);
    } catch (err) {
      console.error('Lỗi khi fetch màu:', err);
    }
  };
  fetchColors();
}, []);
useEffect(() => {
  const fetchSizes = async () => {
    try {
      const res = await axios.get('http://localhost:8083/api/sizes/getAll');
      setSizes(res.data || []);
    } catch (err) {
      console.error('Lỗi khi fetch size:', err);
    }
  };
  fetchSizes();
}, []);
 // Gọi API lấy category phân cấp
 useEffect(() => {
  const fetchCategoryTree = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/categories/hierarchy");
      const tree = buildCategoryTree(res.data);
      setCategoryTree(tree);
    } catch (err) {
      console.error("Lỗi khi fetch category:", err);
    }
  };

  fetchCategoryTree();
}, []);
// Chuyen category thanh tree
const buildCategoryTree = (flatData) => {
  const root = {};

  Object.entries(flatData).forEach(([path, count]) => {
    const parts = path.split(' > ');
    let current = root;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = { __count: 0, __children: {} };
      }

      if (index === parts.length - 1) {
        current[part].__count = count;
      }

      current = current[part].__children;
    });
  });

  return root;
};
// Quan ly trang thai mo rong
const toggleNode = (path) => {
  setExpandedNodes((prev) => ({
    ...prev,
    [path]: !prev[path],
  }));
};

// Render category long nhau
const renderCategoryTree = (tree, parentPath = '', level = 0) => {
  return (
    <ul style={{ listStyle: 'none', paddingLeft: level * 20, margin: 0, maxWidth: '240px' }}>
      {Object.entries(tree).map(([name, { __count, __children }]) => {
        const path = parentPath ? `${parentPath} > ${name}` : name;
        const isExpanded = expandedNodes[path];
        const hasChildren = Object.keys(__children).length > 0;

        const totalChildren = Object.entries(__children);
        const visibleCount = seeMoreStates[path] || 5;
        const visibleChildren = isExpanded ? totalChildren.slice(0, visibleCount) : [];

        return (
          <li key={path} style={{ textAlign: 'left', marginBottom: '4px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: level === 0 ? '600' : 'normal',
              }}
            >
              {/* Mũi tên để mở rộng */}
              {hasChildren && (
                <span
                  style={{ cursor: 'pointer', marginRight: 6 }}
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn click vào tên category
                    setExpandedNodes((prev) => ({
                      ...prev,
                      [path]: !prev[path],
                    }));
                  }}
                >
                  {isExpanded ? '▼' : '▶'}
                </span>
              )}

              {/* Tên category để lọc */}
              <span
                onClick={() => setSelectedCategory(path)}
                title={name}
                style={{
                  cursor: 'pointer',
                  display: 'inline-block',
                  maxWidth: '160px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  verticalAlign: 'middle',
                }}
              >
                {name}
              </span>
              &nbsp;<span>({__count})</span>
            </div>

            {/* Children */}
            {hasChildren && isExpanded && (
              <>
                <ul style={{ listStyle: 'none', paddingLeft: 20, margin: 0 }}>
                  {visibleChildren.map(([childName, childData]) =>
                    renderCategoryTree({ [childName]: childData }, path, level + 1)
                  )}
                </ul>

                {/* See more */}
                {totalChildren.length > visibleCount && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSeeMoreStates((prev) => ({
                        ...prev,
                        [path]: (prev[path] || 5) + 5,
                      }));
                    }}
                    style={{
                      cursor: 'pointer',
                      color: '#007bff',
                      border: '1px solid #007bff',
                      borderRadius: '5px',
                      padding: '3px 8px',
                      marginTop: '6px',
                      width: 'fit-content',
                      fontSize: '0.85rem',
                      background: '#f9f9f9',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      textAlign: 'center',
                    }}
                  >
                    See more
                  </div>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
// Lọc
const handleApplyFilter = async () => {
  try {
    const min = selectedPriceRange?.min ?? 0;
    const max = selectedPriceRange?.max ?? 1000000;

    const body = {
      search: searchKeyword || null,
      colors: selectedColor ? [selectedColor] : [],
      sizes: selectedSize ? [selectedSize] : [],
      categories: selectedCategory ? [selectedCategory] : [],
      minPrice: min,
      maxPrice: max,
      sortBy: 'lowToHigh',
      page: currentPage,
      size: pageSize,
    };

    const res = await axios.post('http://localhost:8083/api/products/filter', body);
    setFilteredProducts(res.data.content || []);
    setTotalPages(res.data.totalPages || 1);
  } catch (err) {
    console.error("❌ Lỗi khi lọc sản phẩm:", err);
  }
};



// useEffect(() => {
//   handleApplyFilter();
// }, [selectedColor, selectedSize, selectedCategory, priceRange, searchKeyword, currentPage]);

// Ham lay gia tu slider
const getPriceRangeFromSlider = () => {
  const slider = document.getElementById("slider-tooltips2");
  if (slider && slider.noUiSlider) {
    const [min, max] = slider.noUiSlider.get().map(parseFloat);
    return { min, max };
  }
  return null;
};
// Reset filter
const handleResetFilter = () => {
  setSelectedColor(null);
  setSelectedSize(null);
  setSelectedCategory(null);
  setSearchKeyword("");
  setSelectedPriceRange(null); // ✅ reset khoảng giá
  setCurrentPage(0);
};


// ✅ Lọc sản phẩm khi có bất kỳ filter nào được chọn
useEffect(() => {
  const hasAnyFilter =
    selectedColor !== null ||
    selectedSize !== null ||
    selectedCategory !== null ||
    selectedPriceRange !== null ||
    searchKeyword.trim() !== "";

  if (hasAnyFilter) {
    setIsFiltering(true);
    handleApplyFilter();
  } else {
    setIsFiltering(false);
    fetchProducts(currentPage, pageSize);
  }
}, [
  selectedColor,
  selectedSize,
  selectedCategory,
  selectedPriceRange,
  searchKeyword,
  currentPage,
  pageSize,
]);


  return (
    <>
      <div className="page-wraper">
        {/* Header (đã được xử lý trong App.js) */}
        <div className="page-content bg-light">
  {/*Banner Start*/}
  <div
    className="dz-bnr-inr bg-secondary overlay-black-light"
    style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}
  >
    <div className="container">
      <div className="dz-bnr-inr-entry">
        <h1>Shop Standard</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Shop Standard</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {/*Banner End*/}
  <section className="content-inner-3 pt-3 z-index-unset">
    <div className="container-fluid">
      <div className="row">
        <div className="col-20 col-xl-3">
          <div className="sticky-xl-top">
            <a href="javascript:void(0);" className="panel-close-btn">
              <svg
                width={35}
                height={35}
                viewBox="0 0 51 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37.748 12.5L12.748 37.5"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.748 12.5L37.748 37.5"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <div className="shop-filter mt-xl-2 mt-0">
              <aside>
                <div className="d-flex align-items-center justify-content-between m-b30">
                  <h6 className="title mb-0 fw-normal d-flex">
                    <i className="flaticon-filter me-3" />
                    Filter
                  </h6>
                </div>
                <div className="widget widget_search">
                  <div className="form-group">
                    <div className="input-group">
                    <input
  name="dzSearch"
  required="required"
  type="search"
  className="form-control"
  placeholder="Search Product"
  value={searchKeyword}
  onChange={(e) => setSearchKeyword(e.target.value)}
/>
                      <div className="input-group-addon">
                      <button
  name="submit"
  value="Submit"
  type="button"
  className="btn"
  onClick={handleApplyFilter}
>
  <i className="icon feather icon-search" />
</button>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget">
  <h6 className="widget-title">Khoảng giá</h6>
  <div className="price-checkbox-list">
    {priceOptions.map((option, index) => (
      <div key={index} style={{ marginBottom: "4px" }}>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={
              selectedPriceRange?.min === option.min &&
              selectedPriceRange?.max === option.max
            }
            onChange={() => {
              const isSame =
                selectedPriceRange?.min === option.min &&
                selectedPriceRange?.max === option.max;
              setSelectedPriceRange(isSame ? null : { min: option.min, max: option.max });
            }}
            style={{ marginRight: 8 }}
          />
          {option.label}
        </label>
      </div>
    ))}
  </div>
</div>

                <div className="widget">
  <h6 className="widget-title">Color</h6>
  <div style={{ zIndex: 9999, position: 'relative' }}>
  <Select
  options={colors.map((c, idx) => ({
    value: c.codeColor || `unknown-${idx}`,
    label: c.nameColor || c.codeColor || `Màu ${idx + 1}`,
  }))}
  placeholder="Chọn màu..."
  isClearable
  onChange={(option) => setSelectedColor(option?.value || null)}
  styles={{
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    control: (base) => ({
      ...base,
      minHeight: '36px',
      fontSize: '14px',
    }),
  }}
/>
  </div>
</div>

<div className="widget">
  <h6 className="widget-title">Size</h6>
  <div className="btn-group product-size">
    {sizes.map((size, idx) => (
      <React.Fragment key={idx}>
        <input
          type="radio"
          className="btn-check"
          name="btnradio1"
          id={`btnradio-size-${idx}`}
          value={size}
          onClick={() => setSelectedSize(size)}
        />
        <label className="btn" htmlFor={`btnradio-size-${idx}`}>
          {size}
        </label>
      </React.Fragment>
    ))}
  </div>
</div>
<div className="widget widget_categories" style={{ maxWidth: '300px', overflow: 'hidden' }}>
  <h6 className="widget-title">Category</h6>
  {renderCategoryTree(categoryTree)}
</div>
                {/* <div className="widget widget_tag_cloud">
                  <h6 className="widget-title">Tags</h6>
                  <div className="tagcloud">
                    <a href="blog-tag.html">Vintage </a>
                    <a href="blog-tag.html">Wedding</a>
                    <a href="blog-tag.html">Cotton</a>
                    <a href="blog-tag.html">Linen</a>
                    <a href="blog-tag.html">Navy</a>
                    <a href="blog-tag.html">Urban</a>
                    <a href="blog-tag.html">Business Meeting</a>
                    <a href="blog-tag.html">Formal</a>
                  </div>
                </div> */}
                <div style={{marginTop: '16px' }}>
  <button
    onClick={handleResetFilter}
    style={{
      padding: '8px 16px',
      backgroundColor: '#fff',
      color: '#000',
      border: '1px solid #000',
      borderRadius: '4px',
      cursor: 'pointer',
    }}
  >
    RESET
  </button>
</div>
              </aside>
            </div>
          </div>
        </div>
        <div className="col-80 col-xl-9">
          <div className="filter-wrapper">
            <div className="filter-left-area">
              {/* <ul className="filter-tag">
                <li>
                  <a href="javascript:void(0);" className="tag-btn">
                    Dresses
                    <i className="icon feather icon-x tag-close" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="tag-btn">
                    Tops
                    <i className="icon feather icon-x tag-close" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="tag-btn">
                    Outerwear
                    <i className="icon feather icon-x tag-close" />
                  </a>
                </li>
              </ul> */}
              <span>Showing 1–5 Of 50 Results</span>
            </div>
            <div className="filter-right-area">
              <a href="javascript:void(0);" className="panel-btn me-2">
                <svg
                  className="me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  width={20}
                  height={20}
                >
                  <g id="Layer_28" data-name="Layer 28">
                    <path d="M2.54,5H15v.5A1.5,1.5,0,0,0,16.5,7h2A1.5,1.5,0,0,0,20,5.5V5h2.33a.5.5,0,0,0,0-1H20V3.5A1.5,1.5,0,0,0,18.5,2h-2A1.5,1.5,0,0,0,15,3.5V4H2.54a.5.5,0,0,0,0,1ZM16,3.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z" />
                    <path d="M22.4,20H18v-.5A1.5,1.5,0,0,0,16.5,18h-2A1.5,1.5,0,0,0,13,19.5V20H2.55a.5.5,0,0,0,0,1H13v.5A1.5,1.5,0,0,0,14.5,23h2A1.5,1.5,0,0,0,18,21.5V21h4.4a.5.5,0,0,0,0-1ZM17,21.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5v-2a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5Z" />
                    <path d="M8.5,15h2A1.5,1.5,0,0,0,12,13.5V13H22.45a.5.5,0,1,0,0-1H12v-.5A1.5,1.5,0,0,0,10.5,10h-2A1.5,1.5,0,0,0,7,11.5V12H2.6a.5.5,0,1,0,0,1H7v.5A1.5,1.5,0,0,0,8.5,15ZM8,11.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z" />
                  </g>
                </svg>
                Filter
              </a>
              <div className="form-group">
                <select className="default-select">
                  <option>Latest</option>
                  <option>Popularity</option>
                  <option>Average rating</option>
                  <option>Latest</option>
                  <option>Low to high</option>
                  <option>high to Low</option>
                </select>
              </div>
              <div className="form-group Category">
                <select className="default-select" value={pageSize} onChange={handlePageChangeProduct}>
                  <option value={20}>Products</option>
                  <option value={32}>32 Products</option>
                  <option value={44}>44 Products</option>
                  <option value={60}>60 Products</option>
                  <option value={72}>72 Products</option>
                  <option value={84}>84 Products</option>
                </select>
              </div>
              <div className="shop-tab">
                <ul className="nav" role="tablist" id="dz-shop-tab">
                  <li className="nav-item" role="presentation">
                    <a
                      href="shop-standard.html#tab-list-list"
                      className="nav-link active"
                      id="tab-list-list-btn"
                      data-bs-toggle="pill"
                      data-bs-target="#tab-list-list"
                      role="tab"
                      aria-controls="tab-list-list"
                      aria-selected="true"
                    >
                      <svg
                        width={512}
                        height={512}
                        viewBox="0 0 512 512"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_121_190)">
                          <path
                            d="M42.667 373.333H96C119.564 373.333 138.667 392.436 138.667 416V469.333C138.667 492.898 119.564 512 96 512H42.667C19.103 512 0 492.898 0 469.333V416C0 392.436 19.103 373.333 42.667 373.333Z"
                            fill="black"
                          />
                          <path
                            d="M42.667 186.667H96C119.564 186.667 138.667 205.77 138.667 229.334V282.667C138.667 306.231 119.564 325.334 96 325.334H42.667C19.103 325.333 0 306.231 0 282.667V229.334C0 205.769 19.103 186.667 42.667 186.667Z"
                            fill="black"
                          />
                          <path
                            d="M42.667 0H96C119.564 0 138.667 19.103 138.667 42.667V96C138.667 119.564 119.564 138.667 96 138.667H42.667C19.103 138.667 0 119.564 0 96V42.667C0 19.103 19.103 0 42.667 0Z"
                            fill="black"
                          />
                          <path
                            d="M230.565 373.333H468.437C492.682 373.333 512.336 392.436 512.336 416V469.333C512.336 492.897 492.682 512 468.437 512H230.565C206.32 512 186.666 492.898 186.666 469.333V416C186.667 392.436 206.32 373.333 230.565 373.333Z"
                            fill="black"
                          />
                          <path
                            d="M230.565 186.667H468.437C492.682 186.667 512.336 205.77 512.336 229.334V282.667C512.336 306.231 492.682 325.334 468.437 325.334H230.565C206.32 325.334 186.666 306.231 186.666 282.667V229.334C186.667 205.769 206.32 186.667 230.565 186.667Z"
                            fill="black"
                          />
                          <path
                            d="M230.565 0H468.437C492.682 0 512.336 19.103 512.336 42.667V96C512.336 119.564 492.682 138.667 468.437 138.667H230.565C206.32 138.667 186.666 119.564 186.666 96V42.667C186.667 19.103 206.32 0 230.565 0Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_121_190">
                            <rect width={512} height={512} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      href="shop-standard.html#tab-list-column"
                      className="nav-link"
                      id="tab-list-column-btn"
                      data-bs-toggle="pill"
                      data-bs-target="#tab-list-column"
                      role="tab"
                      aria-controls="tab-list-column"
                      aria-selected="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: "new 0 0 512 512" }}
                        xmlSpace="preserve"
                        width={512}
                        height={512}
                      >
                        <g>
                          <path d="M85.333,0h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,234.667,0,196.462,0,149.333v-64C0,38.205,38.205,0,85.333,0z" />
                          <path d="M362.667,0h64C473.795,0,512,38.205,512,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,38.205,315.538,0,362.667,0z" />
                          <path d="M85.333,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,512,0,473.795,0,426.667v-64C0,315.538,38.205,277.333,85.333,277.333z" />
                          <path d="M362.667,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64C512,473.795,473.795,512,426.667,512h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,315.538,315.538,277.333,362.667,277.333z" />
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      href="shop-standard.html#tab-list-grid"
                      className="nav-link"
                      id="tab-list-grid-btn"
                      data-bs-toggle="pill"
                      data-bs-target="#tab-list-grid"
                      role="tab"
                      aria-controls="tab-list-grid"
                      aria-selected="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_2"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: "new 0 0 512 512" }}
                        xmlSpace="preserve"
                        width={512}
                        height={512}
                      >
                        <g>
                          <path d="M42.667,373.333H96c23.564,0,42.667,19.103,42.667,42.667v53.333C138.667,492.898,119.564,512,96,512H42.667   C19.103,512,0,492.898,0,469.333V416C0,392.436,19.103,373.333,42.667,373.333z" />
                          <path d="M416,373.333h53.333C492.898,373.333,512,392.436,512,416v53.333C512,492.898,492.898,512,469.333,512H416   c-23.564,0-42.667-19.102-42.667-42.667V416C373.333,392.436,392.436,373.333,416,373.333z" />
                          <path d="M42.667,186.667H96c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.103,42.667-42.667,42.667H42.667   C19.103,325.333,0,306.231,0,282.667v-53.333C0,205.769,19.103,186.667,42.667,186.667z" />
                          <path d="M416,186.667h53.333c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.102,42.667-42.667,42.667H416   c-23.564,0-42.667-19.103-42.667-42.667v-53.333C373.333,205.769,392.436,186.667,416,186.667z" />
                          <path d="M42.667,0H96c23.564,0,42.667,19.103,42.667,42.667V96c0,23.564-19.103,42.667-42.667,42.667H42.667   C19.103,138.667,0,119.564,0,96V42.667C0,19.103,19.103,0,42.667,0z" />
                          <path d="M229.333,373.333h53.333c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.103,42.667-42.667,42.667h-53.333   c-23.564,0-42.667-19.102-42.667-42.667V416C186.667,392.436,205.769,373.333,229.333,373.333z" />
                          <path d="M229.333,186.667h53.333c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.103,42.667-42.667,42.667h-53.333   c-23.564,0-42.667-19.103-42.667-42.667v-53.333C186.667,205.769,205.769,186.667,229.333,186.667z" />
                          <path d="M229.333,0h53.333c23.564,0,42.667,19.103,42.667,42.667V96c0,23.564-19.103,42.667-42.667,42.667h-53.333   c-23.564,0-42.667-19.103-42.667-42.667V42.667C186.667,19.103,205.769,0,229.333,0z" />
                          <path d="M416,0h53.333C492.898,0,512,19.103,512,42.667V96c0,23.564-19.102,42.667-42.667,42.667H416   c-23.564,0-42.667-19.103-42.667-42.667V42.667C373.333,19.103,392.436,0,416,0z" />
                        </g>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 tab-content shop-" id="pills-tabContent">
              <div
                className="tab-pane fade "
                id="tab-list-list"
                role="tabpanel"
                aria-labelledby="tab-list-list-btn"
              >
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xxxl-6">
                    <div className="dz-shop-card style-2">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/1.png" alt="image" />
                      </div>
                      <div className="dz-content">
                        <div className="dz-header">
                          <div>
                            <h4 className="title mb-0">
                              <a href="shop-list.html">
                                Sophisticated Swagger Suit
                              </a>
                            </h4>
                            <ul className="dz-tags">
                              <li>
                                <a href="shop-with-category.html">
                                  Accessories,
                                </a>
                              </li>
                              <li>
                                <a href="shop-with-category.html">Sunglasses</a>
                              </li>
                            </ul>
                          </div>
                          <div className="review-num">
                            <ul className="dz-rating">
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                            </ul>
                            <span>
                              <a href="javascript:void(0);"> 250 Review</a>
                            </span>
                          </div>
                        </div>
                        <div className="dz-body">
                          <div className="dz-rating-box">
                            <div>
                              <p className="dz-para">
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has.
                              </p>
                            </div>
                          </div>
                          <div className="rate">
                            <div className="d-flex align-items-center mb-xl-3 mb-2">
                              <div className="meta-content m-0">
                                <span className="price-name">Price</span>
                                <span className="price">$40.00</span>
                              </div>
                            </div>
                            <div className="d-flex">
                              <a
                                href="shop-cart.html"
                                className="btn btn-secondary btn-md btn-icon"
                              >
                                <i className="icon feather icon-shopping-cart d-md-none d-block" />
                                <span className="d-md-block d-none">
                                  Add to cart
                                </span>
                              </a>
                              <div className="bookmark-btn style-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="favoriteCheck1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="favoriteCheck1"
                                >
                                  <i className="fa-solid fa-heart" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xxxl-6">
                    <div className="dz-shop-card style-2">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/2.png" alt="image" />
                      </div>
                      <div className="dz-content">
                        <div className="dz-header">
                          <div>
                            <h4 className="title mb-0">
                              <a href="shop-list.html">
                                Cozy Knit Cardigan Sweater
                              </a>
                            </h4>
                            <ul className="dz-tags">
                              <li>
                                <a href="shop-with-category.html">
                                  Accessories,
                                </a>
                              </li>
                              <li>
                                <a href="shop-with-category.html">Sunglasses</a>
                              </li>
                            </ul>
                          </div>
                          <div className="review-num">
                            <ul className="dz-rating">
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                            </ul>
                            <span>
                              <a href="javascript:void(0);"> 650 Review</a>
                            </span>
                          </div>
                        </div>
                        <div className="dz-body">
                          <div className="dz-rating-box">
                            <div>
                              <p className="dz-para">
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has.
                              </p>
                            </div>
                          </div>
                          <div className="rate">
                            <div className="d-flex align-items-center mb-xl-3 mb-2">
                              <div className="meta-content">
                                <span className="price-name">Price</span>
                                <span className="price">$94.00</span>
                              </div>
                            </div>
                            <div className="d-flex">
                              <a
                                href="shop-cart.html"
                                className="btn btn-secondary btn-md btn-icon"
                              >
                                <i className="icon feather icon-shopping-cart d-md-none d-block" />
                                <span className="d-md-block d-none">
                                  Add to cart
                                </span>
                              </a>
                              <div className="bookmark-btn style-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="favoriteCheck2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="favoriteCheck2"
                                >
                                  <i className="fa-solid fa-heart" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xxxl-6">
                    <div className="dz-shop-card style-2">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/3.png" alt="image" />
                      </div>
                      <div className="dz-content">
                        <div className="dz-header">
                          <div>
                            <h4 className="title mb-0">
                              <a href="shop-list.html">
                                Classic Denim Skinny Jeans
                              </a>
                            </h4>
                            <ul className="dz-tags">
                              <li>
                                <a href="shop-with-category.html">
                                  Accessories,
                                </a>
                              </li>
                              <li>
                                <a href="shop-with-category.html">Sunglasses</a>
                              </li>
                            </ul>
                          </div>
                          <div className="review-num">
                            <ul className="dz-rating">
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                            </ul>
                            <span>
                              <a href="javascript:void(0);"> 458 Review</a>
                            </span>
                          </div>
                        </div>
                        <div className="dz-body">
                          <div className="dz-rating-box">
                            <div>
                              <p className="dz-para">
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has.
                              </p>
                            </div>
                          </div>
                          <div className="rate">
                            <div className="d-flex align-items-center mb-xl-3 mb-2">
                              <div className="meta-content">
                                <span className="price-name">Price</span>
                                <span className="price">$35.00</span>
                              </div>
                            </div>
                            <div className="d-flex">
                              <a
                                href="shop-cart.html"
                                className="btn btn-secondary btn-md btn-icon"
                              >
                                <i className="icon feather icon-shopping-cart d-md-none d-block" />
                                <span className="d-md-block d-none">
                                  Add to cart
                                </span>
                              </a>
                              <div className="bookmark-btn style-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="favoriteCheck3"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="favoriteCheck3"
                                >
                                  <i className="fa-solid fa-heart" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xxxl-6">
                    <div className="dz-shop-card style-2">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/4.png" alt="image" />
                      </div>
                      <div className="dz-content">
                        <div className="dz-header">
                          <div>
                            <h4 className="title mb-0">
                              <a href="shop-list.html">
                                Athletic Mesh Sports Leggings
                              </a>
                            </h4>
                            <ul className="dz-tags">
                              <li>
                                <a href="shop-with-category.html">
                                  Accessories,
                                </a>
                              </li>
                              <li>
                                <a href="shop-with-category.html">Sunglasses</a>
                              </li>
                            </ul>
                          </div>
                          <div className="review-num">
                            <ul className="dz-rating">
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                            </ul>
                            <span>
                              <a href="javascript:void(0);"> 630 Review</a>
                            </span>
                          </div>
                        </div>
                        <div className="dz-body">
                          <div className="dz-rating-box">
                            <div>
                              <p className="dz-para">
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has.
                              </p>
                            </div>
                          </div>
                          <div className="rate">
                            <div className="d-flex align-items-center mb-xl-3 mb-2">
                              <div className="meta-content">
                                <span className="price-name">Price</span>
                                <span className="price">$25.00</span>
                              </div>
                            </div>
                            <div className="d-flex">
                              <a
                                href="shop-cart.html"
                                className="btn btn-secondary btn-md btn-icon"
                              >
                                <i className="icon feather icon-shopping-cart d-md-none d-block" />
                                <span className="d-md-block d-none">
                                  Add to cart
                                </span>
                              </a>
                              <div className="bookmark-btn style-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="favoriteCheck4"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="favoriteCheck4"
                                >
                                  <i className="fa-solid fa-heart" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xxxl-6">
                    <div className="dz-shop-card style-2">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/5.png" alt="image" />
                        <div className="product-tag">
                          <span className="badge badge-secondary">Sale</span>
                        </div>
                      </div>
                      <div className="dz-content">
                        <div className="dz-header">
                          <div>
                            <h4 className="title mb-0">
                              <a href="shop-list.html">
                                Vintage Denim Overalls Shorts
                              </a>
                            </h4>
                            <ul className="dz-tags">
                              <li>
                                <a href="shop-with-category.html">
                                  Accessories,
                                </a>
                              </li>
                              <li>
                                <a href="shop-with-category.html">Sunglasses</a>
                              </li>
                            </ul>
                          </div>
                          <div className="review-num">
                            <ul className="dz-rating">
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                            </ul>
                            <span>
                              <a href="javascript:void(0);"> 520 Review</a>
                            </span>
                          </div>
                        </div>
                        <div className="dz-body">
                          <div className="dz-rating-box">
                            <div>
                              <p className="dz-para">
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has.
                              </p>
                            </div>
                          </div>
                          <div className="rate">
                            <div className="d-flex align-items-center mb-xl-3 mb-2">
                              <div className="meta-content">
                                <span className="price-name">Price</span>
                                <span className="price">$45.00</span>
                              </div>
                            </div>
                            <div className="d-flex">
                              <a
                                href="shop-cart.html"
                                className="btn btn-secondary btn-md btn-icon"
                              >
                                <i className="icon feather icon-shopping-cart d-md-none d-block" />
                                <span className="d-md-block d-none">
                                  Add to cart
                                </span>
                              </a>
                              <div className="bookmark-btn style-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="favoriteCheck5"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="favoriteCheck5"
                                >
                                  <i className="fa-solid fa-heart" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xxxl-6">
                    <div className="dz-shop-card style-2">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/6.png" alt="image" />
                      </div>
                      <div className="dz-content">
                        <div className="dz-header">
                          <div>
                            <h4 className="title mb-0">
                              <a href="shop-list.html">
                                Satin Wrap Party Blouse
                              </a>
                            </h4>
                            <ul className="dz-tags">
                              <li>
                                <a href="shop-with-category.html">
                                  Accessories,
                                </a>
                              </li>
                              <li>
                                <a href="shop-with-category.html">Sunglasses</a>
                              </li>
                            </ul>
                          </div>
                          <div className="review-num">
                            <ul className="dz-rating">
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                            </ul>
                            <span>
                              <a href="javascript:void(0);"> 256 Review</a>
                            </span>
                          </div>
                        </div>
                        <div className="dz-body">
                          <div className="dz-rating-box">
                            <div>
                              <p className="dz-para">
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has.
                              </p>
                            </div>
                          </div>
                          <div className="rate">
                            <div className="d-flex align-items-center mb-xl-3 mb-2">
                              <div className="meta-content">
                                <span className="price-name">Price</span>
                                <span className="price">$70.00</span>
                              </div>
                            </div>
                            <div className="d-flex">
                              <a
                                href="shop-cart.html"
                                className="btn btn-secondary btn-md btn-icon"
                              >
                                <i className="icon feather icon-shopping-cart d-md-none d-block" />
                                <span className="d-md-block d-none">
                                  Add to cart
                                </span>
                              </a>
                              <div className="bookmark-btn style-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="favoriteCheck6"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="favoriteCheck6"
                                >
                                  <i className="fa-solid fa-heart" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xxxl-6">
                    <div className="dz-shop-card style-2">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/7.png" alt="image" />
                        <div className="product-tag">
                          <span className="badge badge-secondary">Sale</span>
                        </div>
                      </div>
                      <div className="dz-content">
                        <div className="dz-header">
                          <div>
                            <h4 className="title mb-0">
                              <a href="shop-list.html">
                                Plaid Wool Winter Coat
                              </a>
                            </h4>
                            <ul className="dz-tags">
                              <li>
                                <a href="shop-with-category.html">
                                  Accessories,
                                </a>
                              </li>
                              <li>
                                <a href="shop-with-category.html">Sunglasses</a>
                              </li>
                            </ul>
                          </div>
                          <div className="review-num">
                            <ul className="dz-rating">
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                            </ul>
                            <span>
                              <a href="javascript:void(0);"> 776 Review</a>
                            </span>
                          </div>
                        </div>
                        <div className="dz-body">
                          <div className="dz-rating-box">
                            <div>
                              <p className="dz-para">
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has.
                              </p>
                            </div>
                          </div>
                          <div className="rate">
                            <div className="d-flex align-items-center mb-xl-3 mb-2">
                              <div className="meta-content">
                                <span className="price-name">Price</span>
                                <span className="price">$75.00</span>
                              </div>
                            </div>
                            <div className="d-flex">
                              <a
                                href="shop-cart.html"
                                className="btn btn-secondary btn-md btn-icon"
                              >
                                <i className="icon feather icon-shopping-cart d-md-none d-block" />
                                <span className="d-md-block d-none">
                                  Add to cart
                                </span>
                              </a>
                              <div className="bookmark-btn style-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="favoriteCheck7"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="favoriteCheck7"
                                >
                                  <i className="fa-solid fa-heart" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xxxl-6">
                    <div className="dz-shop-card style-2">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/8.png" alt="image" />
                      </div>
                      <div className="dz-content">
                        <div className="dz-header">
                          <div>
                            <h4 className="title mb-0">
                              <a href="shop-list.html">
                                Water-Resistant Windbreaker Jacket
                              </a>
                            </h4>
                            <ul className="dz-tags">
                              <li>
                                <a href="shop-with-category.html">
                                  Accessories,
                                </a>
                              </li>
                              <li>
                                <a href="shop-with-category.html">Sunglasses</a>
                              </li>
                            </ul>
                          </div>
                          <div className="review-num">
                            <ul className="dz-rating">
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li className="star-fill">
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                              <li>
                                <i className="flaticon-star-1" />
                              </li>
                            </ul>
                            <span>
                              <a href="javascript:void(0);"> 255 Review</a>
                            </span>
                          </div>
                        </div>
                        <div className="dz-body">
                          <div className="dz-rating-box">
                            <div>
                              <p className="dz-para">
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has.
                              </p>
                            </div>
                          </div>
                          <div className="rate">
                            <div className="d-flex align-items-center mb-xl-3 mb-2">
                              <div className="meta-content">
                                <span className="price-name">Price</span>
                                <span className="price">$36.00</span>
                              </div>
                            </div>
                            <div className="d-flex">
                              <a
                                href="shop-cart.html"
                                className="btn btn-secondary btn-md btn-icon"
                              >
                                <i className="icon feather icon-shopping-cart d-md-none d-block" />
                                <span className="d-md-block d-none">
                                  Add to cart
                                </span>
                              </a>
                              <div className="bookmark-btn style-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="favoriteCheck8"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="favoriteCheck8"
                                >
                                  <i className="fa-solid fa-heart" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="tab-list-column"
                role="tabpanel"
                aria-labelledby="tab-list-column-btn"
              >
                <div className="row gx-xl-4 g-3 mb-xl-0 mb-md-0 mb-3">
                  <div className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/1.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Cozy Knit Cardigan Sweater
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/2.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Sophisticated Swagger Suit
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/3.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Classic Denim Skinny Jeans
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/4.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Athletic Mesh Sports Leggings
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/5.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Vintage Denim Overalls Shorts
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/6.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">Satin Wrap Party Blouse</a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/7.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">Plaid Wool Winter Coat</a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/8.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Water-Resistant Windbreaker Jacket
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/9.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">Comfy Lounge Jogger Pants</a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade active show"
                id="tab-list-grid"
                role="tabpanel"
                aria-labelledby="tab-list-grid-btn"
              >
                <div className="row gx-xl-4 g-3">
                   {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            
            <div key={product.asin} className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
              <div className="shop-card style-1">
                <div className="dz-media">
                  <img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${product.productThumbnail}`} alt="image" />
                  <div className="shop-meta">
                    <a
                      className="btn btn-secondary btn-md btn-rounded"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <i className="fa-solid fa-eye d-md-none d-block" />
                      <span className="d-md-block d-none">Quick View</span>
                    </a>
                    <div className="btn btn-primary meta-icon dz-wishicon">
                      <i className="icon feather icon-heart dz-heart" />
                      <i className="icon feather icon-heart-on dz-heart-fill" />
                    </div>
                    <div className="btn btn-primary meta-icon dz-carticon">
                      <i className="flaticon flaticon-basket" />
                      <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                    </div>
                  </div>
                </div>
                <div className="dz-content">
                  <h5 className="title">
                    <a href={`/user/productstructure/ProductDetail?asin=${product.asin}`}>{product.productTitle}</a>
                  </h5>
                  <h5 className="price">${((product.productPrice) - ((product.productPrice * product.percentDiscount / 100)) ) .toFixed(2)}</h5>
                </div>
                <div className="product-tag">
                  <span className="badge">Get {product.percentDiscount}% Off</span>
                </div>
              </div>
            </div>
            
          ))
        ) : (
          'khong co gi het'
                  )}
           <div className="modal quick-view-modal fade"
  id="exampleModal"
  tabIndex={-1}
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        <i className="icon feather icon-x" />
      </button>
      <div className="modal-body">
        <div className="row g-xl-4 g-3">
          <div className="col-xl-6 col-md-6">
            <div className="dz-product-detail mb-0">
              <div className="swiper-btn-center-lr">
                <div className="swiper quick-modal-swiper2">
                  <div className="swiper-wrapper" id="lightgallery">
                    
                    {selectedProduct !== null && (
     <div className="swiper-slide">
                      <div className="dz-media DZoomImage">
                        <a
                          className="mfp-link lg-item"
                          href={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${selectedProduct.productThumbnail}`}
                          data-src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${selectedProduct.productThumbnail}`}
                        >
                          <i className="feather icon-maximize dz-maximize top-right" />
                        </a>
                        <img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${selectedProduct.productThumbnail}`} alt="image" />
                      </div>
                    </div>
)}
     {/* {selectedProduct !== null && (
     <div className="swiper-slide">
                      <div className="dz-media DZoomImage">
                        <a
                          className="mfp-link lg-item"
                          href={selectedProduct.productThumbnail}
                          data-src={selectedProduct.productThumbnail}
                        >
                          <i className="feather icon-maximize dz-maximize top-right" />
                        </a>
                        <img src={selectedProduct.productThumbnail} style={{ width: '100%', height: '500px' }} alt="image" />
                      </div>
                    </div>
)}     {selectedProduct !== null && (
     <div className="swiper-slide">
                      <div className="dz-media DZoomImage">
                        <a
                          className="mfp-link lg-item"
                          href={selectedProduct.productThumbnail}
                          data-src={selectedProduct.productThumbnail}
                        >
                          <i className="feather icon-maximize dz-maximize top-right" />
                        </a>
                        <img src={selectedProduct.productThumbnail} style={{ width: '100%', height: '500px' }} alt="image" />
                      </div>
                    </div>
)} */}
                    {/* <div className="swiper-slide">
                      <div className="dz-media DZoomImage">
                        <a
                          className="mfp-link lg-item"
                          href="../../assets/user/images//products/lady-2.png"
                          data-src="../../assets/user/images//products/lady-2.png"
                        >
                          <i className="feather icon-maximize dz-maximize top-right" />
                        </a>
                        <img src="../../assets/user/images//products/lady-2.png" alt="image" />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="dz-media DZoomImage">
                        <a
                          className="mfp-link lg-item"
                          href="../../assets/user/images//products/lady-3.png"
                          data-src="../../assets/user/images//products/lady-3.png"
                        >
                          <i className="feather icon-maximize dz-maximize top-right" />
                        </a>
                        <img src="../../assets/user/images//products/lady-3.png" alt="image" />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="swiper quick-modal-swiper thumb-swiper-lg thumb-sm swiper-vertical">
                  <div className="swiper-wrapper">
                         {selectedProduct !== null && (
                          selectedProduct.images.map((image, index) => (
 <div className="swiper-slide">
                      <img
                        src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_60,h_60/imgProduct/IMG/${image.imageData}`}
                        alt="image"
                      />
                    </div>
                          ))

                   
                         )}
                          {/* {selectedProduct !== null && (

                    <div className="swiper-slide">
                      <img
                        src={selectedProduct.productThumbnail}
                        alt="image"
                        style={{ width: '100%', height: '50px' }}
                      />
                    </div>
                         )}  */}
                         {/* {selectedProduct !== null && (

                    <div className="swiper-slide">
                      <img
                        src={selectedProduct.productThumbnail}
                        alt="image"
                        style={{ width: '100%', height: '50px' }}
                      />
                    </div>
                         )} */}
                    {/* <div className="swiper-slide">
                      <img
                        src="../../assets/user/images//products/thumb-img/lady-2.png"
                        alt="image"
                      />
                    </div>
                    <div className="swiper-slide">
                      <img
                        src="../../assets/user/images//products/thumb-img/lady-3.png"
                        alt="image"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-6">
            <div className="dz-product-detail style-2 ps-xl-3 ps-0 pt-2 mb-0">
              
              <div className="dz-content">
           

                <div className="dz-content-footer">
                  <div className="dz-content-start">
                                                {selectedProduct !== null && (

                    <span className="badge bg-secondary mb-2">
                      SALE {selectedProduct.percentDiscount}% Off
                    </span>
                       )}
                    <h4 className="title mb-1">
                            {selectedProduct !== null && (
                      <a href=  {`/user/productstructure/ProductDetail?asin=${selectedProduct.asin}`}>{selectedProduct.productTitle}</a>
                            )}
                    </h4>
                    <div className="review-num">
                      <ul className="dz-rating me-2">
                        <li className="star-fill">
                          <i className="flaticon-star-1" />
                        </li>
                        <li className="star-fill">
                          <i className="flaticon-star-1" />
                        </li>
                        <li className="star-fill">
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                      </ul>
                      <span className="text-secondary me-2">4.7 Rating</span>
                      <a href="javascript:void(0);">(5 customer reviews)</a>
                    </div>
                  </div>
                </div>
                <p className="para-text">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has.
                </p>
                <div className="meta-content m-b20 d-flex align-items-end">
                  <div className="me-3">
                    <span className="form-label">Price</span>
                                            {selectedProduct !== null && (

                   									<span className="price">${((selectedProduct.productPrice * quantity) - ((selectedProduct.productPrice * selectedProduct.percentDiscount / 100) * quantity) ) .toFixed(2)} <del>${(selectedProduct.productPrice * quantity).toFixed(2)}</del></span>

                                            )}
                  </div>
       <div className="btn-quantity light me-0">
    <label className="form-label fw-bold">Quantity</label>
    <div className="input-group">
<button
  className="btn btn-dark rounded-circle p-0"
  style={{
    width: '40px',
    height: '40px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    minWidth: 'unset',      // ép bỏ min-width của Bootstrap
    flex: '0 0 auto'         // ngăn input-group ép dãn
  }}
  onClick={() => setQuantity(q => Math.max(1, q - 1))}
>
  -
</button>
      <input
        type="text"
        min="1"
        value={quantity}
        onChange={handleChange}
        className="form-control text-center"
      />
      <button
  className="btn btn-dark rounded-circle p-0"
  style={{
    width: '40px',
    height: '40px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    minWidth: 'unset',      // ép bỏ min-width của Bootstrap
    flex: '0 0 auto'         // ngăn input-group ép dãn
  }}
  onClick={() => setQuantity(q => Math.max(1, q + 1))}
>+</button>
    </div>
  </div>
                </div>
                <div className=" cart-btn">
                  <a
                    href="shop-cart.html"
                    className="btn btn-secondary text-uppercase"
                  >
                    Add To Cart
                  </a>
                  <a
                    href="shop-wishlist.html"
                    className="btn btn-md btn-outline-secondary btn-icon"
                  >
                    <svg
                      width={19}
                      height={17}
                      viewBox="0 0 19 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.24805 16.9986C8.99179 16.9986 8.74474 16.9058 8.5522 16.7371C7.82504 16.1013 7.12398 15.5038 6.50545 14.9767L6.50229 14.974C4.68886 13.4286 3.12289 12.094 2.03333 10.7794C0.815353 9.30968 0.248047 7.9162 0.248047 6.39391C0.248047 4.91487 0.755203 3.55037 1.67599 2.55157C2.60777 1.54097 3.88631 0.984375 5.27649 0.984375C6.31552 0.984375 7.26707 1.31287 8.10464 1.96065C8.52734 2.28763 8.91049 2.68781 9.24805 3.15459C9.58574 2.68781 9.96875 2.28763 10.3916 1.96065C11.2292 1.31287 12.1807 0.984375 13.2197 0.984375C14.6098 0.984375 15.8885 1.54097 16.8202 2.55157C17.741 3.55037 18.248 4.91487 18.248 6.39391C18.248 7.9162 17.6809 9.30968 16.4629 10.7792C15.3733 12.094 13.8075 13.4285 11.9944 14.9737C11.3747 15.5016 10.6726 16.1001 9.94376 16.7374C9.75136 16.9058 9.50417 16.9986 9.24805 16.9986ZM5.27649 2.03879C4.18431 2.03879 3.18098 2.47467 2.45108 3.26624C1.71033 4.06975 1.30232 5.18047 1.30232 6.39391C1.30232 7.67422 1.77817 8.81927 2.84508 10.1066C3.87628 11.3509 5.41011 12.658 7.18605 14.1715L7.18935 14.1743C7.81021 14.7034 8.51402 15.3033 9.24654 15.9438C9.98344 15.302 10.6884 14.7012 11.3105 14.1713C13.0863 12.6578 14.6199 11.3509 15.6512 10.1066C16.7179 8.81927 17.1938 7.67422 17.1938 6.39391C17.1938 5.18047 16.7858 4.06975 16.045 3.26624C15.3152 2.47467 14.3118 2.03879 13.2197 2.03879C12.4197 2.03879 11.6851 2.29312 11.0365 2.79465C10.4585 3.24179 10.0558 3.80704 9.81975 4.20255C9.69835 4.40593 9.48466 4.52733 9.24805 4.52733C9.01143 4.52733 8.79774 4.40593 8.67635 4.20255C8.44041 3.80704 8.03777 3.24179 7.45961 2.79465C6.811 2.29312 6.07643 2.03879 5.27649 2.03879Z"
                        fill="black"
                      />
                    </svg>
                    Add To Wishlist
                  </a>
                </div>
                <div className="dz-info mb-0">
                                {selectedProduct !== null && (

                  <ul><li><strong>SKU:</strong></li><li>{selectedProduct.asin}</li></ul>
                      )}
                  <ul>
                    <li>
                      <strong>Categories:</strong>
                    </li>
        {selectedProduct !== null && (
  <>
    <li>
      <a href={`/user/shop/shopWithCategory?salesRank=${selectedProduct.salesRank}`}>
        {selectedProduct.salesRank}
        {selectedProduct.productType && ','}
      </a>
    </li>

    {selectedProduct.productType && (
      <li>
        <a href={`/user/shop/shopWithCategory?productType=${selectedProduct.productType}`}>{selectedProduct.productType}</a>
      </li>
    )}
  </>
)}
                    {/* <li>
                      <a href="shop-standard.html">Swimwear,</a>
                    </li>
                    <li>
                      <a href="shop-standard.html">Summer,</a>
                    </li>
                    <li>
                      <a href="shop-standard.html">Clothing</a>
                    </li> */}
                  </ul>
                  {selectedProduct?.sizes?.length > 0 && (
  <ul>
    <li><strong>Sizes:</strong></li>
    {selectedProduct.sizes.map((sizeObj, index) => (
      <li key={index}>{sizeObj.sizeName}</li>
    ))}
  </ul>
)}
                  <div className="dz-social-icon">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.facebook.com/dexignzone"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://twitter.com/dexignzones"
                        >
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.youtube.com/@dexignzone1723"
                        >
                          <i className="fa-brands fa-youtube" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.linkedin.com/showcase/3686700/admin/"
                        >
                          <i className="fa-brands fa-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.instagram.com/dexignzone/"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

                  {/* <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/2.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Sophisticated Swagger Suit
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/3.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Classic Denim Skinny Jeans
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/4.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Athletic Mesh Sports Leggings
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/5.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Vintage Denim Overalls Shorts
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/6.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">Satin Wrap Party Blouse</a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/7.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">Plaid Wool Winter Coat</a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/8.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Water-Resistant Windbreaker Jacket
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/9.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">Comfy Lounge Jogger Pants</a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/10.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Stylish Fedora Hat Collection
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/11.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Suede Ankle Booties Collection
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/12.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                       <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Suede Ankle Booties Collection
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/12.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div> <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Suede Ankle Booties Collection
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/12.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div> <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Suede Ankle Booties Collection
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/12.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                       <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Suede Ankle Booties Collection
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                    <div className="shop-card style-1">
                      <div className="dz-media">
                        <img src="../../assets/user/images/shop/product/12.png" alt="image" />
                        <div className="shop-meta">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-secondary btn-md btn-rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-eye d-md-none d-block" />
                            <span className="d-md-block d-none">
                              Quick View
                            </span>
                          </a>
                          <div className="btn btn-primary meta-icon dz-wishicon">
                            <i className="icon feather icon-heart dz-heart" />
                            <i className="icon feather icon-heart-on dz-heart-fill" />
                          </div>
                          <div className="btn btn-primary meta-icon dz-carticon">
                            <i className="flaticon flaticon-basket" />
                            <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <a href="shop-list.html">
                            Hiking Outdoor Gear Collection
                          </a>
                        </h5>
                        <h5 className="price">$80</h5>
                      </div>
                      <div className="product-tag">
                        <span className="badge ">Get 20% Off</span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row page mt-0">
            <div className="col-md-6">
              <p className="page-text">Showing 1–5 Of 50 Results</p>
            </div>
          <div className="col-md-6">
        <nav aria-label="Product Pagination">
          <ul className="pagination style-1">
            {/* Nút Previous */}
            <li className="page-item">
              <a
                className={`page-link ${currentPage === 0 ? 'disabled' : ''}`}
               
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </a>
            </li>
            {/* Các số trang trong phạm vi */}
            {getPageRange().map((page) => (
              <li className="page-item" key={page}>
                <a
                  className={`page-link ${page === currentPage ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page + 1}
                </a>
              </li>
            ))}
            {/* Nút Next */}
            <li className="page-item">
              <a
                className={`page-link next ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
      </div>
    </>
  );
}

export default ShopStandard;