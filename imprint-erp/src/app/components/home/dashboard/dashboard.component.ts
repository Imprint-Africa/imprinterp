import { Component, OnInit } from '@angular/core';
import { faProjectDiagram, faUsers, faEdit, faShoppingCart, faDollarSign, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { SalesService } from 'src/app/shared/services/sales.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { SalesCategoryService } from 'src/app/shared/services/sales-category.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { CustomaryService } from 'src/app/shared/services/customary.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private salesService: SalesService,
    private projectsService: ProjectsService,
    private salesCategoryService: SalesCategoryService,
    private teamsService: TeamsService,
    private customService: CustomaryService,
  ) { }

  // Icons
public faProjectDiagram = faProjectDiagram;
public faUsers = faUsers;
public faEdit = faEdit;
public faShoppingCart = faShoppingCart;
public faDollarSign = faDollarSign;
public faCloudDownloadAlt = faCloudDownloadAlt;


 
radioModel: string = 'Month';
public myInterval: any;

// data Variables
public SalesCategorys: Array<any>
public Opportunitys: Array<any>
public Projects: Array<any>
public TotalProjectsRevenue
public CustomServices: Array<any>
public Teams: Array<any>



// Sales Chart Variables
public salesType: string;
public salesLabels: Array<any>;
public salesDatasets: Array<any>;
public salesOptions: any;

// Projects Chart Variables
public projectsType: string;
public projectsLabels: Array<any>;
public projectsDatasets: Array<any>;
public projectsOptions: any;

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

    window.localStorage.setItem('ActiveNav', 'dashboard');

      this.salesCategoryService.getAllSalesCategories().subscribe(
          categoryData=>{this.SalesCategorys = categoryData;

            this.salesService.getAllOppProject().subscribe(
              oppData=>{this.Opportunitys = oppData;

                this.projectsService.getAllProject().subscribe(
                  projectData=>{this.Projects = projectData;

                    this.customService.getAllServices().subscribe(
                      servicesData=>{this.CustomServices = servicesData;

                          this.teamsService.getAllTeams().subscribe(
                            teamsDate=>{this.Teams = teamsDate;
                                             
                                this.salesChartFunction();
                                this.projectsChartFunction();
                                this.revenueChartFunction();
                                this.clientsChartFunction();
                                this.targetsChartFunction();

                                this.TotalProjectsRevenue = this.Projects.reduce(function(previous, current){ return previous + current.cost}, 0)

                            },
                            error=>console.log('Error Getting Error')
                          )
                      },
                      error=>console.log('Error Getting CustomServices')
                    )   

                  },
                  error=>console.log('Error Getting Projects')
                );
              
              },
              error=>console.log('Error Getting Opportunities')
            );
          },
          error=>console.log('Error Getting SalesCategories')
          );

    
    

  }








salesChartFunction(){

  this.salesType = 'line';

  this.salesLabels = this.SalesCategorys.filter(()=>{return true}).map((e)=>{return e.name});
  
  this.salesDatasets = [{
      label: 'Opportunty',
      data: this.SalesCategorys.filter(()=>{return true}).map((e)=>{return e.totalLeads}),
      backgroundColor: 'transparent',
      borderColor: 'white',
      borderWidth: 0.5,
      pointBackgroundColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointBorderColor: 'white',
      pointHoverBorderColor: getStyle('--dark')
    }];
  
  this.salesOptions = { 
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
          display: false,
          gridLines: {
              drawBorder: false,
              display: false
          },
          stacked: true,
          ticks: {
              beginAtZero: true
          }
      }],
      xAxes: [{
          display: false,
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






projectsChartFunction(){

  this.projectsType = 'line';

  this.projectsLabels = this.CustomServices.filter(()=>{return true}).map((e)=>{return e.serviceName});

  let ourData = [];

  this.projectsLabels.forEach(service=>{
    let getNumber = this.Projects.filter(project=>{
        return project.projectName === service ? true : false
    }).map(e=>{return e}).length;

    ourData.push(getNumber);
  });
  
  this.projectsDatasets = [{
      label: 'Clients',
      data: ourData,
      backgroundColor: 'transparent',
      borderColor: 'white',
      borderWidth: 0.5,
      pointBackgroundColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointBorderColor: 'white',
      pointHoverBorderColor: getStyle('--dark')
    }];
  
  this.projectsOptions = { 
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
          display: false,
          gridLines: {
              drawBorder: false,
              display: false
          },
          stacked: true,
          ticks: {
              beginAtZero: true
          }
      }],
      xAxes: [{
          display: false,
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
//--






revenueChartFunction(){

  this.revenueType = 'line';

  this.revenueLabels = this.CustomServices.filter(()=>{return true}).map((e)=>{return e.serviceName});

  let ourData = [];

  this.projectsLabels.forEach(service=>{
    let getProjects = this.Projects.filter(project=>{
        return project.projectName === service ? true : false
    }).map(e=>{return e});

    let getTotalRevenue = getProjects.reduce(function(previous, current){ return previous + current.cost}, 0)

    ourData.push(getTotalRevenue);
  });
  
  
  this.revenueDatasets = [{
      label: 'Revenue',
      data: ourData,
      backgroundColor: 'transparent',
      borderColor: 'white',
      borderWidth: 0.5,
      pointBackgroundColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointBorderColor: 'white',
      pointHoverBorderColor: getStyle('--dark')
    }];
  
  this.revenueOptions = { 
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
          display: false,
          gridLines: {
              drawBorder: false,
              display: false
          },
          stacked: true,
          ticks: {
              beginAtZero: true
          }
      }],
      xAxes: [{
          display: false,
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
// ---


clientsChartFunction(){

  this.clientsType = 'bar';

  // Get Get Clients
  let getOurClients =  this.Projects.filter(()=>{ return true}).map(e=>{return e.clientName});

  this.clientsLabels = Array.from(new Set(getOurClients));

  let ourData = [];

  this.clientsLabels.forEach(client=>{
    let getProjects = this.Projects.filter(project=>{
        return project.clientName === client ? true : false
    }).map(e=>{return e});

    let getTotalRevenue = getProjects.reduce(function(previous, current){ return previous + current.cost}, 0)

    ourData.push(getTotalRevenue);
  });
  
  
  this.clientsDatasets = [{
      label: 'Revenue',
      data: ourData,
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'white',
      borderWidth: 0.5,
      hoverBackgroundColor: 'rgba(255,255,255,.2)',
      hoverBorderColor: getStyle('--dark')
    }];
  
  this.clientsOptions = { 
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
          display: false,
          gridLines: {
              drawBorder: false,
              display: false
          },
          stacked: true,
          ticks: {
              beginAtZero: true
          }
      }],
      xAxes: [{
          display: false,
          stacked: true,
          gridLines: {
              drawBorder: true,
              display: false
          },
          ticks: {
            beginAtZero: true
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
// --







targetsChartFunction(){

  this.targetsType = 'line';


  this.targetsLabels = this.CustomServices.filter(()=>{return true}).map((e)=>{return e.serviceName});

  let ourProjectNumberData = [];

  this.targetsLabels.forEach(service=>{
    let getNumber = this.Projects.filter(project=>{
        return project.projectName === service ? true : false
    }).map(e=>{return e}).length;

    ourProjectNumberData.push(getNumber);
  });
  

  let ourProjectRevenueData = [];

  this.targetsLabels.forEach(service=>{
    let getProjects = this.Projects.filter(project=>{
        return project.projectName === service ? true : false
    }).map(e=>{return e});

    let getTotalRevenue = getProjects.reduce(function(previous, current){ return previous + current.cost}, 0)

    ourProjectRevenueData.push(getTotalRevenue);
  });


  let ourTargetRevenueData = this.CustomServices.filter(()=>{return true}).map((e)=>{return e.targetRevenue});
  
  this.targetsDatasets = [

    {
      label: 'Total Rev',
      data: ourProjectRevenueData,
      backgroundColor: hexToRgba(getStyle('--success'), 70),
      borderColor: getStyle('--light'),
      borderWidth: 1,
      pointBackgroundColor: 'transparent',
      pointHoverBackgroundColor: getStyle('--primary'),
      pointBorderColor: getStyle('--primary'),
      pointHoverBorderColor: getStyle('--dark')
    },
    {
      label: 'Target Rev',
      data: ourTargetRevenueData,
      backgroundColor: hexToRgba(getStyle('--info'), 70),
      borderColor: getStyle('--dark'),
      borderWidth: 1,
      pointBackgroundColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointBorderColor: getStyle('--primary'),
      pointHoverBorderColor: getStyle('--dark')
    }
  
  
  ];
  
  this.targetsOptions = { 
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
      padding: 10,
    },
    tooltips: {
      enabled: true
    },
    scales: {
      yAxes: [{
          display: true,
          gridLines: {
              drawBorder: false,
              display: false
          },
          stacked: false,
          ticks: {
              beginAtZero: false
          }
      }],
      xAxes: [{
          display: true,
          stacked: false,
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








// On Destroy
ngOnDestroy(){
  clearInterval(this.myInterval);
}



// === end
}
// ======









