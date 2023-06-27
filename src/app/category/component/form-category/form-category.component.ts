import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CategoryService } from '../../service/category.service';
import { CategoryResponse } from '../../interface/CategoryResponse.interface';
import { CategoryResponse400 } from '../../interface/CategoryResponseError.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryRequestUpdate } from '../../interface/CategoryRequest.interface';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit {
  public formCategory!: FormGroup

  public ngOnInit(): void {
    this.formCategory = this._fb.group({
      name: [{value: '', disabled: false}, [Validators.required, Validators.minLength(3)]],
      description: [{value: '', disabled: false}, [Validators.required, Validators.minLength(3)]]
    })

    if(this.data.id > 0) {
      this._categoryService.getById(this.data.id)
      .subscribe(resp => {
        this.formCategory.controls['name'].setValue(resp.data[0].name)
        this.formCategory.controls['description'].setValue(resp.data[0].description)
      })
    }

  }

  public guardar(): void {
    if(this.data.id === 0){
      this._categoryService.save(this.formCategory.value)
      .subscribe(
        (resp: CategoryResponse) => this.verificar(resp),
        (error: CategoryResponse400) => this.messageSnack(error.error.message)
      )     
    }
    if(this.data.id > 0){
      const categoryUpdate: CategoryRequestUpdate = {
        id: this.data.id,
        name: this.formCategory.controls['name'].value,
        description: this.formCategory.controls['description'].value
      }
      this._categoryService.update(this.data.id, categoryUpdate)
      .subscribe(
        (resp: CategoryResponse) => this.verificar(resp),
        (error: CategoryResponse400) => this.messageSnack(error.error.message)
      )     
    }
  }

  public verificar(resp: CategoryResponse): void {
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

  constructor(
    public dialogRef: MatDialogRef<FormCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _categoryService: CategoryService
  ) {}
}


