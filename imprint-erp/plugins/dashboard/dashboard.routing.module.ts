import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [

    {path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: "", component: DashboardComponent }
        ]
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

