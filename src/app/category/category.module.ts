import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { HomeCategoryComponent } from './home-category/home-category.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
