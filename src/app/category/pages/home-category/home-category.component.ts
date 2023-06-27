import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../service/category.service';
import { CategoryResponse, Datum } from '../../interface/CategoryResponse.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormCategoryComponent } from '../../component/form-category/form-category.component';
import { CategoryResponse400 } from '../../interface/CategoryResponseError.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this._categoryService.getAll().subscribe(
      (resp: CategoryResponse) => this.dataSource.data = resp.data,
      (error: any) => this.messageSnack("Hubo un error al obtener categorías")
    )
  }

  public messageSnack(mensaje: string): void {
    this._snackBar.open(mensaje, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  public openForm(): void {
    const dialogForm = this._dialog.open(FormCategoryComponent)
    dialogForm.afterClosed().subscribe(value => {
      if(value === 1) {
        this.ngOnInit()
      }
    })
  }



  constructor(
    private _categoryService: CategoryService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}
}