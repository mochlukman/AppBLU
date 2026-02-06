import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_customEvents from 'highcharts-custom-events';
import Rupiah, { RupiahSort } from 'src/app/core/helpers/rupiah';
HC_customEvents(Highcharts);
@Component({
  selector: 'app-column-rupiah-chart',
  templateUrl: './column-rupiah-chart.component.html',
  styleUrls: ['./column-rupiah-chart.component.scss']
})
export class ColumnRupiahChartComponent implements OnInit, OnChanges {
  chart: typeof Highcharts = Highcharts;
  chartUpdate: boolean = false;
  @Input() data: any;

  chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
        text: ''
    },
    plotOptions: {
        column: {
            colorByPoint: true
        }
    },
    colors: [
        '#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', 
        '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
    ],
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        labels: {
            formatter: function () {
                let rupiahSort = new RupiahSort();
                return `${rupiahSort.formatCount(this.value, true)}`;
            }
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        formatter: function () {
            let rupiah = new Rupiah(this.y);
            return `
            <b>${this.point.name}</b>
            <br>${this.series.name} : 
            <b>${rupiah.format}</b>
            `;
        }
    },
    series: [{
        name: '',
        data: [],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            formatter: function () {
                let rupiah = new Rupiah(this.y);
                return `${rupiah.format}`;
            },
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }],
    credits: {
        enabled: false
    },
  };
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes.data ? changes.data.currentValue : {};
    this.updateChart();
  }
  updateChart(){
    if(this.data){
        this.chartOptions.title.text = this.data.title ? this.data.title : 'Title Not Set';
        this.chartOptions.yAxis.title.text = this.data.ytitle ? this.data.ytitle : 'Title Not Set';
        this.chartOptions.series[0].name = this.data.name;
        this.chartOptions.series[0].data = this.data.series;
    }
    this.chartUpdate = true;
  }
}
