import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { InvoiceBoardComponent } from './invoice-board/invoice-board.component';

const routes: Routes = [

    {path: 'invoice', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: InvoiceBoardComponent }
        ]
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
