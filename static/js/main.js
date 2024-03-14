// 取得主繪製區域
const chart1 = echarts.init(document.getElementById('main'));
const chart2 = echarts.init(document.getElementById('six'));
const chart3 = echarts.init(document.getElementById('county'));

$("#update").click(
    () => {
        drawPM25();
    });

// select選擇option時的監聽
$("#select_county").change(() => {
    // val=>value(選擇option value)
    county = $("#select_county").val();
    // console.log(county);
    drawCounty(county);
});

window.onresize = function () {
    chart1.resize();
    chart2.resize();
    chart3.resize();
};



// 呼叫後端資料跟繪製
drawPM25();
// 取得後端資料


function drawCounty(county) {
    chart3.showLoading();
    $.ajax(
        {
            url: `/county-pm25-data/${county}`,
            type: "GET",
            dataType: "json",
            success: (result) => {
                drawChart(chart3, county, "PM2.5", result["site"], result["pm25"], "#ffb6c1")
                chart3.hideLoading();
            },
            error: () => {
                alert("讀取資料失敗，請稍後再試")
                chart3.hideLoading();
            }
        }

    )

}




function drawSix() {
    chart2.showLoading();
    $.ajax(
        {
            url: "/six-pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                drawChart(chart2, "六都PM2.5平均值", "PM2.5", result["site"], result["pm25"], "#40e0d0")
                chart2.hideLoading();
            },
            error: () => {
                alert("讀取資料失敗，請稍後再試")
                chart2.hideLoading();
            }
        }

    )
}



function drawPM25() {
    chart1.showLoading();
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {

                $("#pm25_high_site").text(result["highest"]["site"]);
                $("#pm25_high_value").text(result["highest"]["pm25"]);
                $("#pm25_low_site").text(result["lowest"]["site"]);
                $("#pm25_low_value").text(result["lowest"]["pm25"]);

                // document.querySelector("#pm25_high_site").innerText = result["highest"]["site"]
                // document.querySelector("#pm25_high_value").innerText = result["highest"]["pm25"]
                // document.querySelector("#pm25_low_site").innerText = result["lowest"]["site"]
                // document.querySelector("#pm25_low_value").innerText = result["lowest"]["pm25"]

                // console.log(result);
                // 繪製對應區塊並給予必要參數
                drawChart(chart1, result["datetime"], "PM2.5", result["site"], result["pm25"], "#e9967a")
                chart1.hideLoading();

                this.setTimeout(() => {
                    // 繪製六都
                    drawSix();
                    drawCounty("彰化縣");
                }, 1000);

            },
            error: () => {
                alert("讀取資料失敗，請稍後再試")
                chart1.hideLoading();
            }
        }
    )
}

function drawChart(chart, title, legend, xData, yData, color = '#a90000') {
    let option = {
        title: {
            text: title
        },
        tooltip: {},
        legend: {
            data: [legend]
        },
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [
            {
                name: legend,
                type: 'bar',
                data: yData,
                itemStyle: {
                    color: color
                }
            }
        ]
    };

    chart.setOption(option);

}

