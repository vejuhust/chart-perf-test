function drawCharts() {

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=analytics.csv&callback=?', function (data_csv) {
        var chartFunc = drawStaticChart;
        var chartType = "Static";
        if ($("#chartTypeStatic:checked").length) {
            chartFunc = drawStaticChart;
            chartType = "Static";
        }
        else if ($("#chartTypeDynamic:checked").length) {
            chartFunc = drawDynamicChart;
            chartType = "Dynamic";
        }
        else if ($("#chartTypeMap:checked").length) {
            chartFunc = drawMapChart;
            chartType = "Map";
        }

        var time_start = performance.now();
        var count = 0;

        $('.container').each(function( index ) {
            chartFunc($(this), data_csv);
            count = index + 1;
        });

        var time_end = performance.now();

        recordExecutionTime(chartType, count, time_end - time_start);
    });

    function recordExecutionTime(type, count, time_delta) {
        var delta = (time_delta / 1000).toFixed(3);
        var per = (time_delta / count / 1000).toFixed(3);

        var log_str = 'c:' + count +
            ', t:' + delta + 's' +
            ', p:' + per + 's';

        console.log(log_str);
        document.title = log_str;

        var table = $("#record-line");
        var tableRow = $("<tr/>");
        $("<td/>", { text: type}).appendTo(tableRow);
        $("<td/>", { text: count}).appendTo(tableRow);
        $("<td/>", { text: delta}).appendTo(tableRow);
        $("<td/>", { text: per}).appendTo(tableRow);
        tableRow.appendTo(table);
    }

    function drawMapChart(section, data_csv) {
    }

    function drawDynamicChart(section, data_csv) {
        section.highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
    };


    function drawStaticChart(section, data_csv) {
        section.highcharts({

            data: {
                csv: data_csv
            },

            title: {
                text: 'Daily visits at www.highcharts.com'
            },

            subtitle: {
                text: 'Source: Google Analytics'
            },

            xAxis: {
                tickInterval: 7 * 24 * 3600 * 1000, // one week
                tickWidth: 0,
                gridLineWidth: 1,
                labels: {
                    align: 'left',
                    x: 3,
                    y: -3
                }
            },

            yAxis: [{ // left y axis
                title: {
                    text: null
                },
                labels: {
                    align: 'left',
                    x: 3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }, { // right y axis
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {
                    text: null
                },
                labels: {
                    align: 'right',
                    x: -3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }],

            legend: {
                align: 'left',
                verticalAlign: 'top',
                y: 20,
                floating: true,
                borderWidth: 0
            },

            tooltip: {
                shared: true,
                crosshairs: true
            },

            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
                                hs.htmlExpand(null, {
                                    pageOrigin: {
                                        x: e.pageX || e.clientX,
                                        y: e.pageY || e.clientY
                                    },
                                    headingText: this.series.name,
                                    maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                        this.y + ' visits',
                                    width: 200
                                });
                            }
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },

            series: [{
                name: 'All visits',
                lineWidth: 4,
                marker: {
                    radius: 4
                }
            }, {
                name: 'New visitors'
            }]
        });
    };
};
