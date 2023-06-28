import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: "",
    component:SidebarComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.module").then(x => x.DashboardModule)
      },
      {
        path: "category",
        loadChildren: () => import("./category/category.module").then(x => x.CategoryModule)
      },
      {
        path: "product",
        loadChildren: () => import("./product/product.module").then(x => x.ProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
