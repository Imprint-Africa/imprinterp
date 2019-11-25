import { Component, OnInit, OnDestroy } from '@angular/core';
import { faProjectDiagram, faUsers, faEdit, faShoppingCart, faDollarSign, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { SalesService } from 'src/app/shared/services/sales.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { SalesCategoryService } from 'src/app/shared/services/sales-category.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { CustomaryService } from 'src/app/shared/services/customary.service';


@Component({
    selector: 'app-projects-dashboard',
    templateUrl: './projectsDashboard.component.html',
    styleUrls: ['./projectsDashboard.component.sass']
  })
export class ProjectsDashboardComponent implements OnInit {






ngOnInit() {

}


}// End of class ProjectsDashboardComponent
