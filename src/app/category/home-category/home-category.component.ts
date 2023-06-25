import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../service/category.service';
import { CategoryResponse, Datum } from '../interface/CategoryResponse.interface';

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
    this._categoryService.getAll().subscribe((resp: CategoryResponse) => {
      this.categories = resp.data
      this.dataSource.data = resp.data
    })
  }



  constructor(
    private _categoryService: CategoryService
  ){}

}
