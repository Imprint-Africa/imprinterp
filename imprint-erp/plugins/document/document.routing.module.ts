import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { DocumentBoardComponent } from './document-board/document-board.component';
import { DocumentPadComponent } from './document-pad/document-pad.component';

const routes: Routes = [

    {path: 'document', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DocumentBoardComponent },
            { path: 'pad_document', component: DocumentPadComponent },
        ]
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
