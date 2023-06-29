import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductResponse } from 'src/app/product/interface/ProductResponse.interface';
import { ProductService } from 'src/app/product/service/product.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  public myDona !: any;
  public myBar !: any;
  public labels: string[] = []
  public quantities: number[] = []

  ngOnInit(): void {
    this._productService.getAll().subscribe(
      (resp: ProductResponse) => {
        console.log("PRODUCTS: ", resp)
        resp.data.map((x: any) => {
          this.labels.push(x.name)
          this.quantities.push(x.quantity)
        })
        this.createMyBar()
        this.createMyDona()
      }
    )

  }


  public createMyBar() {

    this.myBar = new Chart("canvas-bar", {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Productos',
          data: this.quantities
        }]
      }
    });
  }

  public createMyDona() {

    this.myDona = new Chart("canvas-doughnut", {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Productos',
          data: this.quantities
        }]
      }
    });
  }


  constructor(
    private _productService: ProductService
  ) { }

}
