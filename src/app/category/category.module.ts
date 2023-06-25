import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { HomeCategoryComponent } from './home-category/home-category.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HomeCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CategoryRoutingModule,
  ]
})
export class CategoryModule { }
