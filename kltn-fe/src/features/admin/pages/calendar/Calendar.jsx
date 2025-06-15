import React, { useEffect, useRef } from 'react';

const Calendar = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    // Giả lập tạo lịch JS thuần
    const calendarElement = calendarRef.current;

    const today = new Date();
    calendarElement.innerHTML = `
      <div style="padding: 10px; border: 1px solid #ccc;">
        <strong>Date:</strong> ${today.toDateString()}
        <br />
        <button id="next-day">Next Day</button>
      </div>
    `;

    const button = calendarElement.querySelector('#next-day');
    button.addEventListener('click', () => {
      today.setDate(today.getDate() + 1);
      calendarElement.querySelector('strong').textContent = `Date: ${today.toDateString()}`;
    });

    return () => {
      button.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="main-content">
          <div className="row">
            <div className="col xl-12">
              <div className="page-title-wrapper">
                <div className="page-title-box">
                  <h4 className="page-title">Calendar</h4>
                </div>
                <div className="breadcrumb-list">
                  <ul>
                    <li className="breadcrumb-link">
                      <a href="index.html">
                        <i className="fas fa-home mr-2" />
                        Dashboard
                      </a>
                    </li>
                    <li className="breadcrumb-link active">Calendar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card table-card">
                <div className="card-body">
                  <div ref={calendarRef} />
                </div>
              </div>
            </div>
          </div>

          <div className="ad-footer-btm">
            <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
