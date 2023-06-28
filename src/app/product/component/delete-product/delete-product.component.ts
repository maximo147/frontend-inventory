import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductResponse } from '../../interface/ProductResponse.interface';
import { ProductResponse400 } from '../../interface/ProductResponseError.interface';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {

  public cancel(): void {
    this.dialogRef.close(0)
  }

  public eliminar(): void {
    this._productService.delete(this.data.id)
    .subscribe(
      (resp: ProductResponse) => this.verificar(resp),
      (error: ProductResponse400) => this.messageSnack(error.error.message)
    )
  }

  public verificar(resp: ProductResponse): void {
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
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _productService: ProductService,
    private _snackBar: MatSnackBar
  ){}
}
