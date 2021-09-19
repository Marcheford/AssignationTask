import { Component, OnInit, ViewEncapsulation } from '@angular/core';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    ) { }


  ngOnInit() {
 
  }

 

}
