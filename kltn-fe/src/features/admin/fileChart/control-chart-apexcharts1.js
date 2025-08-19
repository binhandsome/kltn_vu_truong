'use strict';
$(function() {
    // Call renderRevenueChart for each chart type
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

async function renderRevenueChart(chartType, elementId) {
    // Month names for mapping
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Fetch data from the API
    let revenueData = [];
    let months = monthNames;

    try {
    const accessToken = localStorage.getItem('accessToken'); // Lấy token từ localStorage

    const response = await fetch('http://localhost:8765/api/admin/orders/getRevenueByAdmin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Gửi token qua header
        },
    });

    const apiData = await response.json();

    // Initialize revenueData with zeros for all 12 months
    revenueData = new Array(12).fill(0);

    // Map API data to the corresponding months
    apiData.forEach(item => {
        const monthIndex = item.month - 1; // API months are 1-based, arrays are 0-based
        if (monthIndex >= 0 && monthIndex < 12) {
            revenueData[monthIndex] = item.revenue;
        }
    });
} catch (error) {
    console.error('Error fetching revenue data:', error);
    // Fallback to empty data if API fails
    revenueData = new Array(12).fill(0);
}

    // Modern and cohesive color palette
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    // Base configuration with enhanced styling
    let options = {
        chart: {
            height: chartType === 'pie' ? 380 : 360,
            type: chartType === 'bar-horizontal' ? 'bar' : chartType === 'bar-horizontal-stacked' ? 'bar' : chartType === 'mixed' ? 'line' : chartType,
            fontFamily: 'Inter, sans-serif',
            toolbar: { show: true, tools: { download: true, selection: false, zoom: false, zoomin: false, zoomout: false, pan: false } },
            zoom: { enabled: false },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            },
            background: '#F8F8F8',
            dropShadow: {
                enabled: chartType !== 'pie' && chartType !== 'radialBar',
                top: 2,
                left: 2,
                blur: 5,
                opacity: 0.1
            }
        },
        colors: colors,
        dataLabels: { enabled: false },
        xaxis: {
            categories: months,
            labels: {
                style: {
                    colors: '#1F2937',
                    fontSize: '12px',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif'
                }
            },
            axisBorder: { color: '#E5E7EB' },
            axisTicks: { color: '#E5E7EB' }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#1F2937',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif'
                },
                formatter: function(val) {
                    return val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
                }
            },
            title: {
                text: 'Revenue',
                style: { color: '#1F2937', fontSize: '14px', fontWeight: 600 }
            }
        },
      title: {
    text: `2025 Revenue Overview - Total: ${revenueData.reduce((sum, val) => sum + val, 0)
        .toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}`,
    align: 'left',
    style: {
        color: '#1F2937',
        fontSize: '18px',
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif'
    }
},

        subtitle: {
            text: 'Monthly Performance',
            align: 'left',
            offsetY: 25,
            style: {
                color: '#6B7280',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
            }
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function(val) {
                    return val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
                }
            },
            style: {
                fontFamily: 'Inter, sans-serif'
            }
        },
        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 4
        }
    };

    // Chart-specific customizations
    if (chartType === 'area') {
        options.series = [{ name: 'Revenue', data: revenueData }];
        options.stroke = { curve: 'smooth', width: 3 };
        options.fill = {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0.9,
                opacityFrom: 0.7,
                opacityTo: 0.4,
                stops: [0, 90, 100]
            }
        };
        options.markers = { size: 4, hover: { size: 6 } };
    } else if (chartType === 'bar') {
        options.plotOptions = {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 4,
                borderRadiusApplication: 'end'
            }
        };
        options.series = [{ name: 'Revenue', data: revenueData }];
        options.dataLabels = {
            enabled: true,
            formatter: function(val) {
                return val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
            },
            offsetY: -25,
            style: { fontSize: '12px', colors: ['#1F2937'], fontWeight: 500 }
        };
        if (elementId === 'chartD') {
            options.xaxis.position = 'top';
            options.xaxis.labels.offsetY = -20;
            options.xaxis.axisBorder = { show: false };
            options.xaxis.axisTicks = { show: false };
            options.title.offsetY = 340;
            options.title.align = 'center';
            options.title.floating = true;
        }
    } else if (chartType === 'bar-horizontal') {
        options.plotOptions = { bar: { horizontal: true, borderRadius: 4 } };
        options.series = [{ name: 'Revenue', data: revenueData }];
        options.dataLabels = {
            enabled: true,
            formatter: function(val) {
                return val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
            },
            style: { fontSize: '12px', colors: ['#1F2937'] }
        };
    } else if (chartType === 'bar-horizontal-stacked') {
        options.plotOptions = { bar: { horizontal: true, borderRadius: 4 } };
        options.series = [{ name: 'Revenue', data: revenueData }];
        options.stroke = { width: 1, colors: ['#ffffff'] };
        options.fill = { opacity: 1 };
    } else if (chartType === 'line') {
        options.stroke = { curve: 'smooth', width: 3 };
        options.series = [{ name: 'Revenue', data: revenueData }];
        options.markers = { size: 5, hover: { size: 7 } };
        options.grid = { row: { colors: ['#F9FAFB', 'transparent'], opacity: 0.5 } };
        if (elementId === 'chartH') {
            options.dataLabels = {
                enabled: true,
                formatter: function(val) {
                    return val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
                },
                style: { fontSize: '12px', colors: ['#1F2937'] }
            };
            options.yaxis.min = 0;
            options.yaxis.max = Math.max(...revenueData) * 1.3;
        }
    } else if (chartType === 'mixed') {
        options.series = [
            { name: 'Revenue', type: 'column', data: revenueData },
            { name: 'Trend', type: 'line', data: revenueData }
        ];
        options.stroke = { width: [0, 3] };
        options.colors = [colors[0], colors[1]];
        options.yaxis = [
            {
                title: { text: 'Revenue ($)' },
                labels: {
                    formatter: function(val) {
                        return val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
                    }
                }
            },
            {
                opposite: true,
                title: { text: 'Trend' }
            }
        ];
    } else if (chartType === 'radialBar') {
        options.plotOptions = {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: { background: '#F3F4F6', strokeWidth: '97%' },
                dataLabels: {
                    name: { fontSize: '22px', fontWeight: 600 },
                    value: { fontSize: '16px', color: '#1F2937' },
                    total: {
                        show: true,
                        label: 'Total Revenue',
                        fontSize: '18px',
                        color: '#1F2937',
                        formatter: function() {
                            const total = revenueData.reduce((sum, val) => sum + val, 0);
                            return total.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
                        }
                    }
                }
            }
        };
        options.series = revenueData.slice(0, 4);
        options.labels = months.slice(0, 4);
        options.colors = colors.slice(0, 4);
    } else if (chartType === 'radar') {
        options.series = [{ name: 'Revenue', data: revenueData }];
        options.stroke = { width: 2, color: colors[0] };
        options.fill = { opacity: 0.3 };
        options.markers = { size: 4, colors: ['#ffffff'], strokeColors: colors[0], strokeWidth: 2 };
        options.yaxis.show = false;
    } else if (chartType === 'pie') {
        options.series = revenueData;
        options.labels = months;
        options.chart.height = 400;
        options.dataLabels = {
            enabled: true,
            formatter: function(val, opts) {
                return opts.w.config.series[opts.seriesIndex].toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
            },
            style: { fontSize: '14px', fontWeight: 500 }
        };
        options.legend = {
            position: 'bottom',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            labels: { colors: '#1F2937' }
        };
        options.responsive = [{
            breakpoint: 480,
            options: {
                chart: { height: 300 },
                legend: { position: 'bottom' }
            }
        }];
        options.colors = colors;
    }

    // Render the chart
    var chart = new ApexCharts(document.querySelector(`#${elementId}`), options);
    chart.render();
}