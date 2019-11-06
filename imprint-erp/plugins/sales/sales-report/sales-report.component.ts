import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { faDiceD6, faNetworkWired} from '@fortawesome/free-solid-svg-icons';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

import { SalesService } from 'src/app/shared/services/sales.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SalesCategoryService } from 'src/app/shared/services/sales-category.service';
import { CustomaryService } from 'src/app/shared/services/customary.service';
import { UserSalesStagesService } from 'src/app/shared/services/user-sales-stages.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { CalenderEventService } from 'src/app/shared/services/calenderEvent.service';



@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.sass']
})
export class SalesReportComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private salesService: SalesService,
    private notifyService: NotificationService,
    private salesCategoryService: SalesCategoryService,
    private userSalesStageService: UserSalesStagesService,
    private customService: CustomaryService,
    private clientService: ClientService,
    private userService: UserService,
    private calenderEventService: CalenderEventService,
    private spinnerServcice: SpinnerService
  ) { }

// tslint:disable: prefer-const
// tslint:disable: object-literal-shorthand

public faDiceD6 = faDiceD6;
public faNetworkWired = faNetworkWired;

// status
public styleSectionStatus;

// data Variables
public SalesCategorys: Array<any>;
public UserSalesStages: Array<any>;
public Opportunitys: Array<any>;
public TotalExpectedRevenue: any;
public CustomServices: Array<any>;
public Teams: Array<any>;



// Chart Variables
public chartType: string;
public chartLabels: Array<any>;
public chartDatasets: Array<any>;
public chartOptions: any;


// Lables Variables
public labelGeneralsalesCategories;
public labelUserSalesStages;
public labelClients;
public labelCustomServices: Array<any>;
public labelTeams: Array<any>;


// DataSet Variables
public datasetTargetRevenue;
public datasetRevenue;
public datasetOpportunitys;
// public labelCustomServices: Array<any>
// public labelTeams: Array<any>


// Chart Data Bind
// Chart Data Bind
public backgroundColor: string;
public areaColor: string;
public areaOpacity: number;
public lineColor: string;
public pointBorderColor: string;
public displayX: boolean;
public stackedX: boolean;
public dispayGridLinesX: boolean;
public displayY: boolean;
public stackedY: boolean;
public dispayGridLinesY: boolean;
public displayLegend: boolean;
public legendPosition: string;
public legendColor: string;

public chartTypeValue: string;
public chartLablesValue: any;
public chartDatasetValue: any = [];




// Colors
public colorSuccess = getStyle('--success');
public colorPrimary = getStyle('--primary');
public colorInfo = getStyle('--info');
public colorWarning = getStyle('--warning');
public colorDark = getStyle('--dark');
public colorLight = getStyle('--light');
public colorSecondary = getStyle('--secondary');
public colorTransparent = 'transparent';

public brandPrimary = '#20a8d8';
public brandSecondary = '#c8ced3';
public brandSuccess = '#4dbd74';
public brandDanger = '#f86c6b';
public brandWarning = '#ffc107';
public brandInfo = '#63c2de';
public brandLight = '#f0f3f5';
public brandDark = '#2f353a';



ngOnInit() {

      this.salesCategoryService.getAllSalesCategories().subscribe(
          categoryData => {this.SalesCategorys = categoryData;

                           this.salesService.getAllOppProject().subscribe(
              oppData => {this.Opportunitys = oppData;

                          this.customService.getAllServices().subscribe(
                      servicesData => {
                        this.CustomServices = servicesData;

                        this.TotalExpectedRevenue = this.Opportunitys.reduce((previous, current) => previous + current.revenue, 0);

                        this.areaColor = this.brandInfo;
                        this.areaOpacity = 50;
                        this.lineColor = this.brandLight;
                        this.pointBorderColor = this.brandDark;

                        this.settingData().then(() => {
                                  this.chartTypeValue = 'line';
                                  this.backgroundColor = this.brandPrimary;
                                  this.chartLablesValue = this.labelCustomServices;
                                  this.chartDatasetValue = [ ...this.chartDatasetValue, this.datasetRevenue ];
                                  this.displayX = true;
                                  this.stackedX = false;
                                  this.dispayGridLinesX = false;
                                  this.displayY = true;
                                  this.stackedY = false;
                                  this.dispayGridLinesY = false;
                                  this.displayLegend = false;
                                  this.legendPosition = 'top';
                                  this.legendColor = this.brandDark;

                                  // console.log(this.chartDatasetValue)
                                  this.chartFunction();
                                }).catch(() => {
                                  console.log('error in settingData function');
                                });


                      },
                      error => console.log('Error Getting CustomServices')
                    );
              },
              error => console.log('Error Getting Opportunities')
            );
          },
          error => console.log('Error Getting SalesCategories')
          );

  }



  settingData() {
    return new Promise((resolve, reject) => {
    // Chart Lables
    this.labelGeneralsalesCategories = this.SalesCategorys.filter(() => true).map((e) => e.name);

    let getOurClients =  this.Opportunitys.filter(() => true).map(e => e.clientName);
    this.labelClients = Array.from(new Set(getOurClients));
    this.labelCustomServices = this.CustomServices.filter(() => true).map((e) => e.serviceName);


    let ourTargetRevenueData = this.CustomServices.filter(() => true).map((e) => e.targetRevenue);
    this.datasetTargetRevenue = {
        label: 'Target Rev',
        data: ourTargetRevenueData,
        backgroundColor: hexToRgba(this.areaColor, this.areaOpacity),
        borderColor: this.lineColor,
        borderWidth: 1,
        pointBackgroundColor: 'transparent',
        pointHoverBackgroundColor: 'transparent',
        pointBorderColor: this.pointBorderColor,
        pointHoverBorderColor: getStyle('--dark')
      };


    this.datasetOpportunitys = {
        label: 'Opportunty',
        data: this.SalesCategorys.filter(() => true).map((e) => e.totalLeads),
        backgroundColor: hexToRgba(this.areaColor, this.areaOpacity),
        borderColor: this.lineColor,
        borderWidth: 1,
        pointBackgroundColor: 'transparent',
        pointHoverBackgroundColor: 'transparent',
        pointBorderColor: this.pointBorderColor,
        pointHoverBorderColor: getStyle('--dark')

    };


    let serviceData = [];
    this.labelCustomServices.forEach(service => {
      let getOpp = this.Opportunitys.filter(project => {

          return project.projectName === service ? true : false;

      }).map(e => e);

      let getTotalRevenue = getOpp.reduce((previous, current) => previous + current.revenue, 0);
      serviceData.push(getTotalRevenue);
    });

    this.datasetRevenue = {
        label: 'Revenue',
        data: serviceData,
        backgroundColor: hexToRgba(this.areaColor, this.areaOpacity),
        borderColor: this.lineColor,
        borderWidth: 1,
        pointBackgroundColor: 'transparent',
        pointHoverBackgroundColor: 'transparent',
        pointBorderColor: this.pointBorderColor,
        pointHoverBorderColor: getStyle('--dark')
      };



    resolve();

  }); //

  }//








  chartFunction() {

    this.chartType = this.chartTypeValue; // bar, horizontalBar, pie, line, doughnut, radar, polarArea


    this.chartLabels = this.chartLablesValue;

    this.chartDatasets = this.chartDatasetValue;

    this.chartOptions = {
      title: {
        display: false,
        text: 'Sales',
        fontSize: 25
      },
      legend: {
        display: this.displayLegend,
        position: this.legendPosition,
        labels: {
              fontColor: this.legendColor
            }
      },
      layout: {
        padding: 10
      },
      tooltips: {
          enabled: true
      },
      scales: {
        yAxes: [{
            display: this.displayY,
            stacked: this.stackedY,
            gridLines: {
                drawBorder: true,
                display: this.dispayGridLinesY
            },

            ticks: {
                beginAtZero: true
            }
        }],
        xAxes: [{
            display: this.displayX,
            stacked: this.stackedX,
            gridLines: {
                drawBorder: true,
                display: this.dispayGridLinesX
            },
            ticks: {
              beginAtZero: false
            }
        }]
      },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
          datalabels: {
              anchor: 'end',
              align: 'top',
              formatter: Math.round,
              font: { weight: 'bold'}
          }
      }
    };

  }





    changeChartType(chartType) {
        this.chartTypeValue = chartType;
        this.chartFunction();
    }


  // Labels
  setLabelCustomServices() {
      this.chartLablesValue = this.labelCustomServices;
      this.chartFunction();
  }

  setLabelSalesStages() {
    this.chartLablesValue = this.labelGeneralsalesCategories;
    this.chartFunction();
  }

  setLabelClients() {
    this.chartLablesValue = this.labelClients;
    this.chartFunction();
  }

  // Dataset
  setDatasetOpportunitys() {
    return this.chartDatasetValue.indexOf(this.datasetOpportunitys) === -1 ?
        (this.chartDatasetValue = [ ...this.chartDatasetValue, this.datasetOpportunitys ], this.chartFunction()) : '';
  }

  setDatasetRevenue() {
    return this.chartDatasetValue.indexOf(this.datasetRevenue) === -1 ?
        (this.chartDatasetValue = [ ...this.chartDatasetValue, this.datasetRevenue ], this.chartFunction()) : '';
  }

  setDatasetTargetRevenue() {
    return this.chartDatasetValue.indexOf(this.datasetTargetRevenue) === -1 ?
      (this.chartDatasetValue = [ ...this.chartDatasetValue, this.datasetTargetRevenue ], this.chartFunction()) : '';
  }


  removeDatasetOpportunitys() {
    this.chartDatasetValue = this.chartDatasetValue.filter(element => element !== this.datasetOpportunitys); this.chartFunction();
  }

  removeDatasetRevenue() {
    this.chartDatasetValue = this.chartDatasetValue.filter(element => element !== this.datasetRevenue), this.chartFunction();
  }

  removeDatasetTargetRevenue() {
  this.chartDatasetValue = this.chartDatasetValue.filter(element => element !== this.datasetRevenue), this.chartFunction();
  }

  removeAllDataSets() {
    this.chartDatasetValue = []; this.chartFunction();
  }



  // Styling Functions
  bgToPrimary() {this.backgroundColor = this.brandPrimary; }
  bgToInfo() {this.backgroundColor = this.brandInfo; }
  bgToWarning() {this.backgroundColor = this.brandWarning; }
  bgToSuccess() {this.backgroundColor = this.brandSuccess; }
  bgToDanger() {this.backgroundColor = this.brandDanger; }
  bgToLight() {this.backgroundColor = this.brandLight; }
  bgToSecondary() {this.backgroundColor = this.brandSecondary; }

  areaToPrimary() {this.areaColor = this.brandPrimary; this.settingData().then(() => {} ); }
  areaToInfo() { this.areaColor = this.brandInfo;  this.settingData().then(() => {} ); }
  areaToWarning() {this.areaColor = this.brandWarning;  this.settingData().then(() => {} ); }
  areaToSuccess() {this.areaColor = this.brandSuccess;  this.settingData().then(() => {} ); }
  areaToDanger() {this.areaColor = this.brandDanger; this.settingData().then(() => {} ); }
  areaToLight() {this.areaColor = this.brandLight; this.settingData().then(() => {}); }
  areaToSecondary() {this.areaColor = this.brandSecondary; this.settingData().then(() => {}); }

  areaOpacityChanged() { this.settingData().then(() => {this.chartFunction(); }); }

  lineToPrimary() {this.lineColor = this.colorPrimary; this.settingData().then(() => {}); }
  lineToInfo() { this.lineColor = this.colorInfo;  this.settingData().then(() => {} ); }
  lineToWarning() {this.lineColor = this.brandWarning;  this.settingData().then(() => {}); }
  lineToSuccess() {this.lineColor = this.brandSuccess;  this.settingData().then(() => {}); }
  lineToDanger() {this.lineColor = this.brandDanger; this.settingData().then(() => {}); }
  lineToLight() {this.lineColor = this.brandLight; this.settingData().then(() => {}); }
  lineToSecondary() {this.lineColor = this.brandSecondary; this.settingData().then(() => {}); }

  pointToPrimary() {this.pointBorderColor = this.colorPrimary; this.settingData().then(() => {}); }
  pointToInfo() { this.pointBorderColor = this.colorInfo;  this.settingData().then(() => {}); }
  pointToWarning() {this.pointBorderColor = this.brandWarning;  this.settingData().then(() => {}); }
  pointToSuccess() {this.pointBorderColor = this.brandSuccess;  this.settingData().then(() => {}); }
  pointToDanger() {this.pointBorderColor = this.brandDanger; this.settingData().then(() => {}); }
  pointToLight() {this.pointBorderColor = this.brandLight; this.settingData().then(() => {}); }
  pointToSecondary() {this.pointBorderColor = this.brandSecondary; this.settingData().then(() => {}); }

  displayYaxis() { this.displayY = !this.displayY; this.chartFunction(); }
  stackedYaxis() { this.stackedY = !this.stackedY ; this.chartFunction(); }
  linegridYaxis() { this.dispayGridLinesY = !this.dispayGridLinesY; this.chartFunction(); }

  displayXaxis() {this.displayX = !this.displayX; this.chartFunction(); }
  stackedXaxis() { this.stackedX = !this.stackedX ; this.chartFunction(); }
  linegridXaxis() {this.dispayGridLinesY = !this.dispayGridLinesY ; this.chartFunction(); }

  displayLegendFunction() {this.displayLegend = !this.displayLegend ; this.chartFunction(); }
  displayLegendTop() {this.legendPosition = 'top'; this.chartFunction(); }
  displayLegendRight() {this.legendPosition = 'right'; this.chartFunction(); }
  displayLegendBottom() {this.legendPosition = 'bottom'; this.chartFunction(); }
  displayLegendLeft() {this.legendPosition = 'left'; this.chartFunction(); }

  legendToPrimary() {this.legendColor = this.brandPrimary; this.chartFunction(); }
  legendToInfo() {this.legendColor = this.brandInfo; this.chartFunction(); }
  legendToWarning() {this.legendColor = this.brandWarning; this.chartFunction(); }
  legendToSuccess() {this.legendColor = this.brandSuccess; this.chartFunction(); }
  legendToDanger() {this.legendColor = this.brandDanger; this.chartFunction(); }
  legendToLight() {this.legendColor = this.brandLight; this.chartFunction(); }
  legendToSecondary() {this.legendColor = this.brandSecondary; this.chartFunction(); }



}// End of Class SalesReportComponent
