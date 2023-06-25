import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { HomeCategoryComponent } from './home-category/home-category.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CategoryRoutingModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
