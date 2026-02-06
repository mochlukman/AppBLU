import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Rupiah from 'src/app/core/helpers/rupiah';
import * as Highcharts from 'highcharts';
import HC_customEvents from 'highcharts-custom-events';
HC_customEvents(Highcharts);
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() ytitle: string = '';
  @Input() data: any;
  chart: typeof Highcharts = Highcharts;
  chartUpdate: boolean = false;
  chartOptions = {   
    chart: {
      type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [],
        title: {
            text: null
        },
        labels: {
          step: 1,
          align: 'left',
          reserveSpace: true
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Nilai APB',
            align: 'high'
        },
        labels: {
            overflow: 'justify',
            formatter: function (){
              let rupiah = new Rupiah(this.value);
              return rupiah.format;
            }
        }
    },
    tooltip: {
        valueSuffix: '',
        formatter: function () {
          let rupiah = new Rupiah(this.y);
          return `
            <b>${this.x}</b> : 
            <br>
            <b>${this.series.name} - ${rupiah.format}</b>
            `;
        }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                  let rupiah = new Rupiah(this.y);
                  return rupiah.format;
              }
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [
      {
        name: 'Pendapatan',
        data: []
      },
      {
        name: 'Perencanaan',
        data: []
      },
      {
        name: 'RBA',
        data: []
      },
      {
        name: 'Pembiayaan',
        data: []
      }
    ]
  };
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.title = changes.title ? changes.title.currentValue : this.title;
    this.data = changes.data ? changes.data.currentValue : [];
    this.ytitle = changes.ytitle ? changes.ytitle.currentValue : 'Title Not Set';
    this.updateChart(this.title, this.data);
  }
  updateChart(title: string, data: any){
    this.chartOptions.title.text = title;
    this.chartOptions.yAxis.title.text = this.ytitle;
    if(this.data){
      this.chartOptions.xAxis.categories = this.data.categories;
      this.chartOptions.series = this.data.series;
    }
    this.chartUpdate = true;
  }
}
