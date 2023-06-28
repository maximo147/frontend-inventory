import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { HomeProductComponent } from './pages/home-product/home-product.component';
import { DeleteProductComponent } from './component/delete-product/delete-product.component';
import { FormProductComponent } from './component/form-product/form-product.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeProductComponent,
    DeleteProductComponent,
    FormProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ProductRoutingModule,

  ]
})
export class ProductModule { }
