import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { SalesDashboardComponent } from './salesDashboard/salesDashboard.component';
import { ProjectsDashboardComponent } from './projectsDashboard/projectsDashboard.component';


const routes: Routes = [

    {path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, children: [
                { path: '', component: SalesDashboardComponent },
                { path: '', component: ProjectsDashboardComponent }] },
            // { path: 'sales_dashboard', component: SalesDashboardComponent },
            // { path: 'projects_dashboard', component: ProjectsDashboardComponent }
        ]
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

