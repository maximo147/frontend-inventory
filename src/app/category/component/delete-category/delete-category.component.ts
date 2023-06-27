import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../service/category.service';
import { CategoryResponse } from '../../interface/CategoryResponse.interface';
import { CategoryResponse400 } from '../../interface/CategoryResponseError.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {

  public cancel(): void {
    this.dialogRef.close(0)
  }

  public eliminar(): void {
    this._categoryService.delete(this.data.id)
    .subscribe(
      (resp: CategoryResponse) => this.verificar(resp),
      (error: CategoryResponse400) => this.messageSnack(error.error.message)
    )
  }

  public verificar(resp: CategoryResponse): void {
    if(resp.metadata[0].code == '200') {
      this.messageSnack("Eliminado correctamente")
      this.dialogRef.close(1)
    }
    if(resp.metadata[0].code[0] == '4') {
      this.messageSnack("Hubo un error al eliminar categoría")
    }
  }

  public messageSnack(mensaje: string): void {
    this._snackBar.open(mensaje, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ){}

}
