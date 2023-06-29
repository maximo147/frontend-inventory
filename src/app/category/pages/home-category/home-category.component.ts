import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../service/category.service';
import { CategoryResponse, Datum } from '../../interface/CategoryResponse.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormCategoryComponent } from '../../component/form-category/form-category.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteCategoryComponent } from '../../component/delete-category/delete-category.component';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.css']
})

export class HomeCategoryComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'description', 'actions']
  dataSource = new MatTableDataSource<any>([])
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categories !: Datum[];
  isAdmin: boolean = false


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    console.log(this._util.getRoles())
    console.log(this._util.isAdmin())
    this.isAdmin = this._util.isAdmin()
    this._categoryService.getAll().subscribe(
      (resp: CategoryResponse) => this.dataSource.data = resp.data,
      (error: any) => this.messageSnack("Hubo un error al obtener categorías")
    )
  }

  public buscar(e: any): void {
    const value = e.target.value
    if(value === ''){
      this.ngOnInit()
    }else{
      if(!isNaN(value)) {
        this._categoryService.getByIdOrName(value, value)
        .subscribe(
          (resp: CategoryResponse) => this.dataSource.data = resp.data,
          (error: any) => this.messageSnack("No se encontró categorías")
        )   
      } else {
        this._categoryService.getByIdOrName(0, value)
        .subscribe(
          (resp: CategoryResponse) => this.dataSource.data = resp.data,
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
    const dialogForm = this._dialog.open(FormCategoryComponent, {
      data: { id }
    })
    dialogForm.afterClosed().subscribe(value => {
      if(value === 1) this.ngOnInit()
    })      
  }

  public openDelete(id: number): void {
    const dialogDelete = this._dialog.open(DeleteCategoryComponent, {
      data: { id }
    })
    dialogDelete.afterClosed().subscribe(value => {
      if(value === 1) this.ngOnInit()
    })
  }

  public exportExcel(){
    this._categoryService.exportExcel()
    .subscribe(
      (resp: any) => {
        let file = new Blob([resp], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
        let fileUrl = URL.createObjectURL(file)
        var anchor = document.createElement("a")
        anchor.download = "categories.xlsx"
        anchor.href = fileUrl
        anchor.click()
      },
      (error: any) => this.messageSnack("Error al exportar archivo")
    )
  }


  constructor(
    private _categoryService: CategoryService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _util: UtilService
  ){}
}