function drawCharts() {

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=analytics.csv&callback=?', function (data_csv) {
        var time_start = performance.now();
        var count = 0;

        $('.container').each(function( index ) {
            draw_chart($(this), data_csv);
            count = index + 1;
        });

        var time_end = performance.now();

        recordExecutionTime(count, time_end - time_start);
    });

    function recordExecutionTime(count, time_delta) {
        var delta = (time_delta / 1000).toFixed(3);
        var per = (time_delta / count / 1000).toFixed(3);

        var log_str = 'c:' + count +
            ', t:' + delta + 's' +
            ', p:' + per + 's';

        console.log(log_str);
        document.title = log_str;

        var table = $("#record-line");
        var tableRow = $("<tr/>");
        $("<td/>", { text: count}).appendTo(tableRow);
        $("<td/>", { text: delta}).appendTo(tableRow);
        $("<td/>", { text: per}).appendTo(tableRow);
        tableRow.appendTo(table);
    }

    function draw_chart (section, data_csv) {
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
