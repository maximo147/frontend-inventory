import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCategoryComponent } from './home-category/home-category.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "listado",
        component: HomeCategoryComponent
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
export class CategoryRoutingModule { }
