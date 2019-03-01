import React, { Component } from 'react';
import './App.css';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Chart extends Component {
    render() {
        if (this.props.loading) return <div className={"loading"}>Загрузка</div>;
        let data=[];
        for(let algorithm in this.props.stats) {
            data.push(
                {
                    type: "spline",
                    name: algorithm,
                    showInLegend: true,
                    dataPoints: this.props.stats[algorithm].map((item, i) => {
                        return {x: item.array_size, y: item.time}
                    })
                }
            )
        }

            const options = {
                animationEnabled: true,
                title: {
                    text: "Sorting algorithms"
                },
                axisY: {
                    title: "time(ms)",
                    includeZero: false,
                    logarithmic: this.props.logarithmic
                },
                axisX: {
                    title: "array size",
                    includeZero: false
                },
                toolTip: {
                    shared: true
                },
                data: data
            }

            return (
                <div>
                    <CanvasJSChart options={options}
                        /* onRef={ref => this.chart = ref} */
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            );

    }
}

export default Chart;
