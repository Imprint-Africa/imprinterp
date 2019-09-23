import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { faChartLine, faChartBar, faChartPie, faChartArea } from '@fortawesome/free-solid-svg-icons';

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
    private router : Router,
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

// data Variables
public SalesCategorys: Array<any>
public UserSalesStages: Array<any>
public Opportunitys: Array<any>
public TotalExpectedRevenue: any;
public CustomServices: Array<any>
public Teams: Array<any>



// Chart Variables
public chartType: string;
public chartLabels: Array<any>;
public chartDatasets: Array<any>;
public chartOptions: any;


// Lables Variables
public labelGeneralsalesCategories;
public labelUserSalesStages;
public labelClients;
public labelCustomServices: Array<any>
public labelTeams: Array<any>


// DataSet Variables
public datasetTargetRevenue;
public datasetServiceRevenue;
public datasetClientRevenue;
public datasetOpportunitys;
// public labelCustomServices: Array<any>
// public labelTeams: Array<any>


// Chart Data Bind
public backgroundColor: string;
public chartTypeValue: string;
public chartLablesValue: any;
public chartDatasetValue: any;



// Colors
public colorSuccess = getStyle('--success');
public colorPrimary = getStyle('--primary');
public colorInfo = getStyle('--info');
public colorWarning = getStyle('--warning');
public colorDark = getStyle('--dark');
public colorLight = getStyle('--light');
public colorSecondary= getStyle('--secondary');
public colorTransparent= 'transparent';

public brandPrimary = '#20a8d8';
public brandSecondary= '#c8ced3'; 
public brandSuccess= '#4dbd74';
public brandDanger= '#f86c6b'; 
public brandWarning= '#ffc107';
public brandInfo= '#63c2de'; 
public brandLight= '#f0f3f5';
public brandDark= '#2f353a';


// Sales Chart Variables
public salesType: string;
public salesLabels: Array<any>;
public salesDatasets: Array<any>;
public salesOptions: any;


// Revenue Chart Variables
public revenueType: string;
public revenueLabels: Array<any>;
public revenueDatasets: Array<any>;
public revenueOptions: any;

// Clients Chart Variables
public clientsType: string;
public clientsLabels: Array<any>;
public clientsDatasets: Array<any>;
public clientsOptions: any;

// Clients Chart Variables
public targetsType: string;
public targetsLabels: Array<any>;
public targetsDatasets: Array<any>;
public targetsOptions: any;



ngOnInit() {

      this.salesCategoryService.getAllSalesCategories().subscribe(
          categoryData=>{this.SalesCategorys = categoryData;

            this.salesService.getAllOppProject().subscribe(
              oppData=>{this.Opportunitys = oppData;

                    this.customService.getAllServices().subscribe(
                      servicesData=>{this.CustomServices = servicesData;

                        this.userSalesStageService.getUserStages(localStorage.getItem('loggedUserID')).subscribe(
                            userSalesstagesData=>{
                                this.UserSalesStages = userSalesstagesData;
                                this.settingData()
                                
                                this.backgroundColor = this.brandInfo;
                                this.chartTypeValue = 'line';
                                this.chartLablesValue = this.labelClients;
                                this.chartDatasetValue = this.datasetClientRevenue;

                                this.chartFunction();
    
                                this.TotalExpectedRevenue = this.Opportunitys.reduce(function(previous, current){ return previous + current.cost}, 0)

                            }, 
                            error=>{
                                console.log('Error Getting User sales stages')
                            }

                        )
                      },
                      error=>console.log('Error Getting CustomServices')
                    )   
              },
              error=>console.log('Error Getting Opportunities')
            );
          },
          error=>console.log('Error Getting SalesCategories')
          );

  }



  settingData(){

    // Chart Lables
    this.labelGeneralsalesCategories = this.SalesCategorys.filter(()=>{return true}).map((e)=>{return e.name});
    this.labelUserSalesStages = this.UserSalesStages.filter(()=>{return true}).map((e)=>{return e.name});


    let getOurClients =  this.Opportunitys.filter(()=>{ return true}).map(e=>{return e.clientName});
    this.labelClients = Array.from(new Set(getOurClients));
    this.labelCustomServices = this.CustomServices.filter(()=>{return true}).map((e)=>{return e.serviceName});


    let ourTargetRevenueData = this.CustomServices.filter(()=>{return true}).map((e)=>{return e.targetRevenue});
    this.datasetTargetRevenue = [{
        label: 'Target Rev',
        data: ourTargetRevenueData,
        backgroundColor: hexToRgba(getStyle('--info'), 70),
        borderColor: getStyle('--dark'),
        borderWidth: 1,
        pointBackgroundColor: 'transparent',
        pointHoverBackgroundColor: 'transparent',
        pointBorderColor: getStyle('--primary'),
        pointHoverBorderColor: getStyle('--dark')
      }]


    this.datasetOpportunitys = [{
        label: 'Opportunty',
        data: this.UserSalesStages.filter(()=>{return true}).map((e)=>{return e.totalLeads}),
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 0.5,
        pointBackgroundColor: 'transparent',
        pointHoverBackgroundColor: 'transparent',
        pointBorderColor: 'white',
        pointHoverBorderColor: getStyle('--dark')
      
    }]


    let serviceData = []; 
    this.labelUserSalesStages.forEach(service=>{
      let getOpp = this.Opportunitys.filter(project=>{
          return project.projectName === service ? true : false
      }).map(e=>{return e});
  
      let getTotalRevenue = getOpp.reduce(function(previous, current){ return previous + current.cost}, 0)
  
      serviceData.push(getTotalRevenue);
    });
      
    this.datasetServiceRevenue = [{
        label: 'Revenue',
        data: serviceData,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 0.5,
        pointBackgroundColor: 'transparent',
        pointHoverBackgroundColor: 'transparent',
        pointBorderColor: 'white',
        pointHoverBorderColor: getStyle('--dark')
      }];


    let clientData = [];  
    this.labelClients.forEach(client=>{
        let getOpps = this.Opportunitys.filter(project=>{
            return project.clientName === client ? true : false
        }).map(e=>{return e});
    
        let getTotalRevenue = getOpps.reduce(function(previous, current){ return previous + current.cost}, 0)
    
        clientData.push(getTotalRevenue);
    });
           
    this.datasetClientRevenue = [{
        label: 'Revenue',
        data: clientData,
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'white',
        borderWidth: 0.5,
        hoverBackgroundColor: 'rgba(255,255,255,.2)',
        hoverBorderColor: getStyle('--dark')
        }];


  }// 








  chartFunction(){

    this.chartType = this.chartTypeValue; // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  
    
    this.chartLabels = this.chartLablesValue;
    
    this.chartDatasets = this.chartDatasetValue;
    
    this.chartOptions = { 
      title:{
        display: false,
        text: 'Sales',
        fontSize: 25
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
              fontColor: '#00e676'
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
            display: true,
            stacked: true,
            gridLines: {
                drawBorder: true,
                display: true
            },
            
            ticks: {
                beginAtZero: true
            }
        }],
        xAxes: [{
            display: true,
            stacked: true,
            gridLines: {
                drawBorder: true,
                display: false
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
    }
    
  }
  




    changeChartType(chartType){
        this.chartTypeValue = chartType
        this.chartFunction();
    }
    setLabelGeneralsalesCategories(){
        this.chartLablesValue = this.labelGeneralsalesCategories;
        this.chartFunction();
    }
    setLabelUserSalesStages(){
        this.chartLablesValue = this.labelUserSalesStages;
        this.chartFunction();
    }
    setLabelClients(){
        this.chartLablesValue = this.labelClients;
        this.chartFunction();
    }
    setLabelCustomServices(){
        this.chartLablesValue = this.labelCustomServices;
        this.chartFunction();
    }

    setDatasetTargetRevenue(){
        this.chartDatasetValue = this.datasetTargetRevenue;
        this.chartFunction();
    }

    setDatasetOpportunitys(){
        this.chartDatasetValue = this.datasetOpportunitys;
        this.chartFunction();
    }

    setDatasetClientRevenue(){
        this.chartDatasetValue = this.datasetClientRevenue;
        this.chartFunction();
    }

    // setDatasetServiceRevenue(){
    //     this.chartDatasetValue = this.datasetServiceRevenue;
    //     this.chartFunction();
    // }

  
  
  
}// End of Class SalesReportComponent