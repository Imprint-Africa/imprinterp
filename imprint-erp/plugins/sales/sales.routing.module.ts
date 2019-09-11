import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { SalesBoardComponent } from './sales-board/sales-board.component';
import { SalesEditComponent } from './sales-edit/sales-edit.component';

const routes: Routes = [

    {path: 'sales', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: "", component: SalesBoardComponent },
            { path: "sales_edit", component: SalesEditComponent },
        ]
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
