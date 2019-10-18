import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProjectBoardsComponent } from './project-boards/project-boards.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { EditProjectComponent } from './edit-project/edit-project.component';


const routes: Routes = [

    {path: 'projects', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: ProjectBoardsComponent },
            { path: 'project_update', component: UpdateProjectComponent },
            { path: 'project_details', component: ProjectDetailsComponent },
            { path: 'project_edit', component: EditProjectComponent }
        ]
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }

