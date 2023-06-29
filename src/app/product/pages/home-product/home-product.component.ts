import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse } from '../../interface/ProductResponse.interface';
import { ProductService } from '../../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteProductComponent } from '../../component/delete-product/delete-product.component';
import { FormProductComponent } from '../../component/form-product/form-product.component';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css']
})
export class HomeProductComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'picture', 'category', 'actions']
  dataSource = new MatTableDataSource<any>([])
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public isAdmin: boolean = false

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.isAdmin = this._util.isAdmin()
    this._productService.getAll().subscribe(
      (resp: ProductResponse) => this.dataSource.data = resp.data,
      (error: any) => this.messageSnack("Hubo un error al obtener categorías")
    )
  }

  public buscar(e: any): void {
    const value = e.target.value
    if(value === ''){
      this.ngOnInit()
    }else{
      if(!isNaN(value)) {
        this._productService.getByIdOrName(value, value)
        .subscribe(
          (resp: ProductResponse) => this.dataSource.data = resp.data,
          (error: any) => this.messageSnack("No se encontró categorías")
        )   
      } else {
        this._productService.getByIdOrName(0, value)
        .subscribe(
          (resp: ProductResponse) => this.dataSource.data = resp.data,
          (error: any) => this.messageSnack("No se encontró categorías")
        )  
      }
      

   
    }

  }

  public messageSnack(mensaje: string): void {
    this._snackBar.open(mensaje, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  public openForm(id: number): void {
    const dialogForm = this._dialog.open(FormProductComponent, {
      data: { id }
    })
    dialogForm.afterClosed().subscribe(value => {
      if(value === 1) this.ngOnInit()
    })      
  }

  public openDelete(id: number): void {
    const dialogDelete = this._dialog.open(DeleteProductComponent, {
      data: { id }
    })
    dialogDelete.afterClosed().subscribe(value => {
      if(value === 1) this.ngOnInit()
    })
  }


  public visualizarImg(valor64: string): string {
    return 'data:image/jpg;base64, ' + valor64
  }

  public exportExcel(){
    this._productService.exportExcel()
    .subscribe(
      (resp: any) => {
        let file = new Blob([resp], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
        let fileUrl = URL.createObjectURL(file)
        var anchor = document.createElement("a")
        anchor.download = "products.xlsx"
        anchor.href = fileUrl
        anchor.click()
      },
      (error: any) => this.messageSnack("Error al exportar archivo")
    )
  }


  constructor(
    private _productService: ProductService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _util: UtilService
  ){}
}
