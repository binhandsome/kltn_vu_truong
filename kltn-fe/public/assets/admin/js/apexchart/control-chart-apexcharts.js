'use strict';
$(function() {
    // Gọi hàm renderRevenueChart cho từng loại biểu đồ
    renderRevenueChart('area', 'chartA');
    renderRevenueChart('area', 'chartB');
    renderRevenueChart('bar-horizontal', 'chartC');
    renderRevenueChart('bar', 'chartD');
    renderRevenueChart('bar', 'chartE');
    renderRevenueChart('bar-horizontal-stacked', 'chartF');
    renderRevenueChart('line', 'chartG');
    renderRevenueChart('line', 'chartH');
    renderRevenueChart('mixed', 'chartI');
    renderRevenueChart('radialBar', 'chartJ');
    renderRevenueChart('radar', 'chartK');
    renderRevenueChart('pie', 'chartL');
    renderRevenueChart('line', 'chartGG');
    renderRevenueChart('line', 'chartGG2');
    renderRevenueChart('line', 'chartGG3');
});

function renderRevenueChart(chartType, elementId) {
    // Dữ liệu chung
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenueData = [5000000, 6000000, 5500000, 7000000, 6500000, 8000000, 7500000, 9000000, 8500000, 10000000, 9500000, 11000000];

    // Cấu hình cơ bản
    let options = {
        chart: {
            height: chartType === 'pie' ? 360 : 350,
            type: chartType === 'bar-horizontal' ? 'bar' : chartType === 'bar-horizontal-stacked' ? 'bar' : chartType === 'mixed' ? 'line' : chartType,
            fontFamily: 'Poppins, sans-serif',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: ['#11a0fd'],
        dataLabels: { enabled: false },
        xaxis: {
            categories: months,
            labels: { style: { colors: '#10163a', fontFamily: 'Poppins, sans-serif' } }
        },
        yaxis: {
            labels: {
                style: { color: '#10163a', fontFamily: 'Poppins, sans-serif' },
                formatter: function(val) {
                    return val.toLocaleString() + " VNĐ";
                }
            }
        },
        title: {
            text: 'Doanh thu 2025',
            align: 'left',
            style: { color: '#10163a', fontFamily: 'Poppins, sans-serif' }
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val.toLocaleString() + " VNĐ";
                }
            }
        }
    };

    // Tùy chỉnh theo loại biểu đồ
    if (chartType === 'area') {
        options.stroke = { curve: 'smooth' };
        options.series = [{
            name: 'Doanh thu',
            data: revenueData
        }];
        options.subtitle = { text: 'Năm 2025', align: 'left' };
    } else if (chartType === 'bar') {
        options.plotOptions = { bar: { horizontal: false, endingShape: 'rounded', columnWidth: '55%' } };
        options.series = [{
            name: 'Doanh thu',
            data: revenueData
        }];
        options.dataLabels = {
            enabled: true,
            formatter: function(val) {
                return val.toLocaleString() + " VNĐ";
            },
            offsetY: -20,
            style: { fontSize: '12px', colors: ["#10163a"], fontFamily: 'Poppins, sans-serif' }
        };
        if (elementId === 'chartD') {
            options.xaxis.position = 'top';
            options.xaxis.labels.offsetY = -18;
            options.xaxis.axisBorder = { show: false };
            options.xaxis.axisTicks = { show: false };
            options.title.floating = true;
            options.title.offsetY = 320;
            options.title.align = 'center';
        }
    } else if (chartType === 'bar-horizontal') {
        options.plotOptions = { bar: { horizontal: true } };
        options.series = [{
            name: 'Doanh thu',
            data: revenueData
        }];
    } else if (chartType === 'bar-horizontal-stacked') {
        options.plotOptions = { bar: { horizontal: true } };
        options.series = [{
            name: 'Doanh thu',
            data: revenueData
        }];
        options.stroke = { width: 1, colors: ['#fff'] };
        options.fill = { opacity: 1 };
    } else if (chartType === 'line') {
        options.stroke = { curve: 'smooth' };
        options.series = [{
            name: 'Doanh thu',
            data: revenueData
        }];
        options.grid = { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } };
        if (elementId === 'chartH') {
            options.dataLabels = { enabled: true };
            options.markers = { size: 6 };
            options.yaxis.title = { text: 'VNĐ' };
            options.yaxis.min = 0;
            options.yaxis.max = 12000000;
        }
    } else if (chartType === 'mixed') {
        options.series = [{
            name: 'Doanh thu',
            type: 'column',
            data: revenueData
        }];
        options.stroke = { width: [0, 4] };
        options.xaxis.type = 'category';
        options.yaxis = [{
            title: { text: 'VNĐ' },
            labels: {
                style: { color: '#10163a' },
                formatter: function(val) {
                    return val.toLocaleString() + " VNĐ";
                }
            }
        }];
    } else if (chartType === 'radialBar') {
        options.plotOptions = {
            radialBar: {
                dataLabels: {
                    name: { fontSize: '28px' },
                    value: { fontSize: '18px' },
                    total: {
                        show: true,
                        label: 'Tổng doanh thu',
                        formatter: function() {
                            return '72000000 VNĐ';
                        }
                    }
                }
            }
        };
        options.series = [20, 25, 30, 25];
        options.labels = ['Sản phẩm A', 'Sản phẩm B', 'Sản phẩm C', 'Sản phẩm D'];
        options.colors = ['#1b4962', '#ffa000', '#11a0fd', '#8dbf42'];
    } else if (chartType === 'radar') {
        options.series = [{
            name: 'Doanh thu',
            data: revenueData
        }];
        options.stroke = { width: 1 };
        options.fill = { opacity: 0.4 };
        options.markers = { size: 0 };
    } else if (chartType === 'pie') {
        options.series = revenueData;
        options.labels = months;
        options.dataLabels = {
            formatter: function(val, opts) {
                return opts.w.config.series[opts.seriesIndex].toLocaleString() + " VNĐ";
            }
        };
        options.responsive = [{
            breakpoint: 480,
            options: {
                chart: { width: 200 },
                legend: { position: 'bottom' }
            }
        }];
        options.colors = ['#1b4962', '#ffa000', '#11a0fd', '#8dbf42', '#5fc5ff'];
    }

    // Render biểu đồ
    var chart = new ApexCharts(document.querySelector(`#${elementId}`), options);
    chart.render();
}