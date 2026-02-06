import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_customEvents from 'highcharts-custom-events';
import Rupiah, { RupiahSort } from 'src/app/core/helpers/rupiah';
HC_customEvents(Highcharts);
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {
  chart: typeof Highcharts = Highcharts;
  chartUpdate: boolean = false;
  @Input() data: any;

  chartOptions = {
    title: {
      text: ''
    },

    subtitle: {
        text: ''
    },

    yAxis: {
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

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
        },
        categories: []
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        // series: {
        //     label: {
        //         connectorAllowed: false
        //     },
        //     pointStart: 2019
        // }
    },
    tooltip: {
      formatter: function () {
          let rupiah = new Rupiah(this.y);
          return `
          <b>${this.key}</b>
          <br>${this.series.name} : 
          <b>${rupiah.format}</b>
          `;
      }
    },
    series: [
      {
        name: 'Anggaran',
        data: []
      },
      {
        name: 'Realisasi',
        data: []
      }
    ],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    },
    credits: {
      enabled: false
    }
  }
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
        this.chartOptions.xAxis.categories = this.data.categories;
        this.chartOptions.series = this.data.series;
        this.chartUpdate = true;
    }
  }
}
