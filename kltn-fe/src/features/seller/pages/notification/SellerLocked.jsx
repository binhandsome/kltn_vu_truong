import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function SellerLocked() {
  const { state } = useLocation(); // { code, message }
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0f172a'}}>
      <div style={{maxWidth:560,background:'#111827',borderRadius:16,padding:28,boxShadow:'0 20px 50px rgba(0,0,0,.35)',color:'#e5e7eb'}}>
        <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:12}}>
          <span style={{fontSize:28}}>🔒</span>
          <h2 style={{margin:0,fontWeight:700}}>Shop của bạn đang bị khóa</h2>
        </div>
        <p style={{opacity:.9,margin:'12px 0 18px'}}>
          {state?.message || 'Tài khoản SELLER của bạn đang bị khóa. Bạn chỉ có thể truy cập Dashboard trạng thái.'}
        </p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <Link to="/seller/dashboard/locked"
                style={{padding:'10px 16px',borderRadius:10,background:'#2563eb',color:'#fff',textDecoration:'none',fontWeight:600}}>
            Mở Dashboard trạng thái
          </Link>
          <Link to="/"
                style={{padding:'10px 16px',borderRadius:10,background:'#374151',color:'#fff',textDecoration:'none',fontWeight:600}}>
            Về trang chủ
          </Link>
          <a href="mailto:support@yourapp.com"
             style={{padding:'10px 16px',borderRadius:10,background:'#374151',color:'#fff',textDecoration:'none',fontWeight:600}}>
            Liên hệ Admin
          </a>
        </div>
       
      </div>
    </div>
  );
}
