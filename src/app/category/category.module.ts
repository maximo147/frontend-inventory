import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { HomeCategoryComponent } from './pages/home-category/home-category.component';
import { MaterialModule } from '../material/material.module';
import { FormCategoryComponent } from './component/form-category/form-category.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeCategoryComponent,
    FormCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
