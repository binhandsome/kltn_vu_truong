import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function SellerPending() {
  const { state } = useLocation();
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0f172a'}}>
      <div style={{maxWidth:560,background:'#111827',borderRadius:16,padding:28,boxShadow:'0 20px 50px rgba(0,0,0,.35)',color:'#e5e7eb'}}>
        <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:12}}>
          <span style={{fontSize:28}}>⏳</span>
          <h2 style={{margin:0,fontWeight:700}}>Shop đang chờ duyệt</h2>
        </div>
        <p style={{opacity:.9,margin:'12px 0 18px'}}>
          {state?.message || 'Yêu cầu đăng ký/chỉnh sửa Shop của bạn đang được xét duyệt.'}
        </p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <Link to="/seller/dashboard/locked"
                style={{padding:'10px 16px',borderRadius:10,background:'#2563eb',color:'#fff',textDecoration:'none',fontWeight:600}}>
            Xem trạng thái
          </Link>
          <Link to="/"
                style={{padding:'10px 16px',borderRadius:10,background:'#374151',color:'#fff',textDecoration:'none',fontWeight:600}}>
            Về trang chủ
          </Link>
        </div>
    
      </div>
    </div>
  );
}
