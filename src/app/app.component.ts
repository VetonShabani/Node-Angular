import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



export class Vegtables {
  constructor(
    public name: string,
    public domestic: boolean,
    public price: number,
    public weight: string,
    public description: string,

  ) {
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mca-quiz';
  data: any;
  results: any = []
  firstTitle =0;
  totalDomestic = 0;
  totalDomesticItems = [] as any;
  totalImported = 0
  totalImportedItems = [] as any;
  baseURL = ''

  vegtable: Vegtables[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();

  }
  getData() {
    
    
    this.data = this.http.get<any>('http://localhost:3000/getData').subscribe(
      (response) => {
        this.vegtable = response.resultData
        console.log(this.data);
        
        let x = this.vegtable.sort((a, b) => (a.name > b.name ? 1 : -1));

        for (let index = 0; index < x.length; index++) {
          if (x[index].domestic == true) {
            this.totalDomestic += x[index].price
            this.totalDomesticItems.push(x[index]);
            // console.log(this.totalDomesticItems,"totalDomesticItems");


          } else {
            this.totalImported += x[index].price
            this.totalImportedItems.push(x[index]);

          }
        }
      }
    )
  }
}