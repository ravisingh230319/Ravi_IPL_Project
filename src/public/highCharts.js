//This function is used to view chart for the number of matches played per year for all the years in IPL.
function plotMatchesWonPerYear() {
    fetch('./output/matchesPerYear.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const matchPerYear = [];
            for (let year in data) {
                matchPerYear.push([year, data[year]]);
            }
            viewHighCharts(matchPerYear, 'Matches Played', 'chart-1', 'Matches Played Per Year', 'Year', 'Number Of Matches Played');
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
}
plotMatchesWonPerYear();

//This function is used to view chart for the number of matches won per team per year in IPL.
function plotMatchesWonPerTeamPerYear() {
    fetch("./output/matchesWonPerTeamPerYear.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let seriesArray = [];
            let seriesObject = {};
            let categoryArray = [];
            for (const [year, yearObj] of Object.entries(data)) {
                categoryArray.push(year);
                for (const [team, matchesWon] of Object.entries(yearObj)) {
                    if (seriesObject.hasOwnProperty(team)) {
                        seriesObject[team]['data'].push(matchesWon);
                    } else {
                        seriesObject[team] = {name: '', data: []};
                        seriesObject[team]['name']=team;
                        seriesObject[team]['data'].push(matchesWon);
                    }
                }
            }

            for (const [teamName, objData] of Object.entries(seriesObject)) {
                seriesArray.push(objData);
            }
            Highcharts.chart("chart-2", {
                chart: {
                    type: "column",
                },
                title: {
                    text: "Matches Won Per Each Team In Each Year",
                },
                xAxis: {
                    categories: categoryArray,
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Matches Won",
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: "bold",
                            color: // theme
                                (Highcharts.defaultOptions.title.style &&
                                 Highcharts.defaultOptions.title.style
                                .color) || "grey",
                        },
                    },
                },
                legend: {
                    align: "right",
                    x: -4,
                    verticalAlign: "top",
                    y: 40,
                    floating: true,
                    backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || "white",
                    borderColor: "#CCC",
                    borderWidth: 1,
                    shadow: false,
                },
                tooltip: {
                    headerFormat: "<b>{point.x}</b><br/>",
                    pointFormat:
                        "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
                },
                plotOptions: {
                    column: {
                        stacking: "normal",
                        dataLabels: {
                            enabled: true,
                        },
                    },
                },
                series: seriesArray,
            });
        })
        .catch((err) => {
            console.log("error: " + err);
        });
}
plotMatchesWonPerTeamPerYear();

//This function is used to view chart for the extra runs conceded per team in the year 2016.
function plotExtraRunsPerTeam() {
    fetch("./output/extraRunsPerTeam2016.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const extaRuns = [];
            for (let extra_runs in data) {
                extaRuns.push([extra_runs, data[extra_runs]]);
            }
            viewHighCharts(extaRuns, 'Extra Runs Conceded In 2016', 'chart-3', 'Extra Runs Conceded Per Team In 2016', 'Team', 'Extra Runs Conceded');
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
}
plotExtraRunsPerTeam();

//This function is used to view chart for the top 10 economical bowlers in the year 2015.
function plotTop10EconomicalBowlers2015() {
    fetch('./output/top10EconomicalBowlers2015.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const economicalBowlers = [];
            for (let economy in data) {
                economicalBowlers.push([economy, Number(data[economy])]);
            }
            viewHighCharts(economicalBowlers, 'Bowler Economy Rate', 'chart-4', 'Top 10 Economical Bowlers In 2015', 'Bowler Name', 'Economy Rate');
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
}
plotTop10EconomicalBowlers2015();

//This function is used to call highchart to view chart for problem1, problem2 and problem4 whose diagrams are similar.
function viewHighCharts(seriesArray, seriesName, chartId, chartTitle, xAxisTitle, yAxisTitle) {
    Highcharts.setOptions({
        chart: {
            borderWidth: 3,
            plotBackgroundColor: "rgba(255, 255, 255, 0.5)",
            plotShadow: true,
            plotBorderWidth: 1,
        },
    });
    Highcharts.chart(chartId, {
        chart: {
            type: "column",
        },
        title: {
            text: chartTitle,
        },

        xAxis: {
            type: "category",
            title: {
                text: xAxisTitle,
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: yAxisTitle,
            },
        },
        series: [{
                name: seriesName,
                data: seriesArray,
            },
        ],
    });
}
