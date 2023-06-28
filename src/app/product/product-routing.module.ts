import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductComponent } from './pages/home-product/home-product.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "listado",
        component: HomeProductComponent
      },
      {
        path: "**",
        redirectTo: "listado"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
