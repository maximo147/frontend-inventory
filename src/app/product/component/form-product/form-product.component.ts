import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductResponse } from '../../interface/ProductResponse.interface';
import { ProductResponse400 } from '../../interface/ProductResponseError.interface';
import { ProductRequestSave, ProductRequestUpdate } from '../../interface/ProductRequest.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../service/product.service';
import { CategoryService } from 'src/app/category/service/category.service';
import { Datum } from 'src/app/category/interface/CategoryResponse.interface';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent {
  public formProduct!: FormGroup
  public categories: Datum[] = [];

  public ngOnInit(): void {
    this.formProduct = this._fb.group({
      name: [{value: '', disabled: false}, [Validators.required, Validators.minLength(3)]],
      price: [{value: '', disabled: false}, [Validators.required, Validators.minLength(1)]],
      quantity: [{value: '', disabled: false}, [Validators.required, Validators.minLength(1)]],
      category: [{value: '', disabled: false}, [Validators.required, Validators.minLength(1)]],
      picture: [{value: '', disabled: false}]
    })

    this.getCategories();

    if(this.data.id > 0) {
      this._productService.getById(this.data.id)
      .subscribe(
        (resp) => {
          this.formProduct.controls['name'].setValue(resp.data[0].name)
          this.formProduct.controls['price'].setValue(resp.data[0].price)
          this.formProduct.controls['quantity'].setValue(resp.data[0].quantity)
          this.formProduct.controls['category'].setValue(resp.data[0].category.id)
          this.formProduct.controls['picture'].setValue(resp.data[0].picture)
        },
        (error: ProductResponse400) => this.messageSnack(error.error.message)
      )
    }

  }

  public getCategories(): void {
    this._categoryService.getAll()
    .subscribe(
      (resp) => {
        this.categories = resp.data
        console.log(resp.data)
      },
      (error) => this.messageSnack(error)
    )
  }

  public guardar(): void {
    if(this.data.id === 0){
      const formData: FormData = new FormData();
      formData.append('name', this.formProduct.controls['name'].value)
      formData.append('price', this.formProduct.controls['price'].value)
      formData.append('quantity', this.formProduct.controls['quantity'].value)
      formData.append('picture', this.formProduct.controls['picture'].value)
      formData.append('category', this.formProduct.controls['category'].value)


      this._productService.save(formData)
      .subscribe(
        (resp: ProductResponse) => this.verificar(resp),
        (error: ProductResponse400) => this.messageSnack(error.error.message)
      )     
    }
    if(this.data.id > 0){
      const formData: FormData = new FormData();
      formData.append('id', this.data.id)
      formData.append('name', this.formProduct.controls['name'].value)
      formData.append('price', this.formProduct.controls['price'].value)
      formData.append('quantity', this.formProduct.controls['quantity'].value)
      formData.append('picture', this.formProduct.controls['picture'].value)
      formData.append('category', this.formProduct.controls['category'].value)

      this._productService.update(this.data.id, formData)
      .subscribe(
        (resp: ProductResponse) => this.verificar(resp),
        (error: ProductResponse400) => this.messageSnack(error.error.message)
      )     
    }
  }

  public verificar(resp: ProductResponse): void {
    if(resp.metadata[0].code == '201') {
      this.messageSnack("Guardado correctamente")
      this.dialogRef.close(1)
    }
    if(resp.metadata[0].code == '200') {
      this.messageSnack("Actualizado correctamente")
      this.dialogRef.close(1)
    }
    if(resp.metadata[0].code[0] == '4') {
      this.messageSnack("hubo un error al obtener categoría")
    }
  }

  public messageSnack(mensaje: string): void {
    this._snackBar.open(mensaje, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  public cancelar(): void {
    this.dialogRef.close(0)
  }

  public onFileChange(imagen: any): void {
    let file = imagen.target.files[0]
    this.formProduct.get('picture')?.setValue(file)

  }


  constructor(
    public dialogRef: MatDialogRef<FormProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) {}
}
