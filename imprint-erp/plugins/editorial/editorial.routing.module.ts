import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProjTaskTeamComponent } from './proj-task-team/proj-task-team.component';
import { CustomServiceEditComponent } from './custom-service-edit/custom-service-edit.component';


const routes: Routes = [

    {path: '', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: "editorial", component: ProjTaskTeamComponent },
            { path: "custom_service_edit", component: CustomServiceEditComponent }
        ]
    },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EditorialRoutingModule { }
