import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  ColumnMode
} from "@swimlane/ngx-datatable";
import {
  NgbModal
} from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export interface IPageInfo {
  page: number;
  pageSize: number;
  total: number;
  pages: number;
}
export interface ICustomerFilter {
  itemName ? : string;
  priceFrom ? : number;
  priceTo ? : number;
}
export interface order {
  ref ? : string;
  item ? : string;
  name ? : string;
  price: number;
  quantity ? : number;
  total ? : number;
}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  encapsulation: ViewEncapsulation.None,

  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  title = 'TaskProject';
  public ColumnMode = ColumnMode;
  currentLogoId: string = '';
  fileName: string = '';
  inputLogoBase64: string = '';
  customerFilter: ICustomerFilter = {
    itemName: '',
    priceFrom: 0,
    priceTo: 0
  };
  orders: order[] = [{
      ref: 'x1',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 130,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x2',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 2230,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x3',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 4430,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x4',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 220,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
    {
      ref: 'x5',
      item: '/images/picture.jpg',
      name: 'test1',
      price: 30,
      quantity: 3,
      total: 2000
    },
  ];
  orderem = this.orders;
  order: order = {
    item: '',
    name: '',
    price: 0,
    quantity: 0,
    ref: '',
    total: 0


  };

  pager: IPageInfo = {
    page: 1,
    pages: 0,
    pageSize: 10,
    total: this.orderem.length,
  };
  itemName: string = '';
  priceFrom: any;
  priceTo: any;

  constructor(

    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {}


  ngOnInit() {
    this.pager = {
      page: 1,
      pages: 0,
      pageSize: 10,
      total: this.orderem.length,
    };
    this.orderem = this.orders;
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  viewOrder(item: any, modalName: any, event: any) {
    event.target.parentElement.parentElement.parentElement.blur();
    this.order = item;
    this.modalService.open(modalName, {
      windowClass: "modal-holder",
      backdropClass: "light-blue-backdrop",
      centered: true,
      keyboard: false,
      backdrop: "static",
      size: "xl",
    });
  }

  setPage(event: any) {
    debugger;
    this.pager.page = event.offset + 1;
    let filtrationArray = this.orders
    this.orderem = filtrationArray.slice(this.pager.pageSize * (this.pager.page - 1), this.pager.pageSize * (this.pager.page + 1))

  }

  searchOrders() {
    // if(this.priceFrom== null)
    // this.priceFrom=0;
    // if(this.priceTo== null)
    // this.priceTo=0;
    debugger
    if (this.itemName != '' && (this.priceFrom != null || this.priceTo != null)) {

      this.orderem = this.orders.filter((t) => (t.name == this.itemName));
      if (this.priceFrom != null)
        this.orderem = this.orderem.filter((t) => (this.priceFrom < t.price));
      if (this.priceTo != null)
        this.orderem = this.orderem.filter((t) => (t.price < this.priceTo));
    } else if (this.itemName != '') {
      this.orderem = this.orders.filter((t) => (t.name == this.itemName));

    } else if (this.priceFrom != null && this.priceTo != null) {

      this.orderem = this.orders.filter((t) => (this.priceFrom < t.price && t.price < this.priceTo));


    } else if (this.priceFrom != null || this.priceTo != null) {
      if (this.priceFrom != null)
        this.orderem = this.orders.filter((t) => (this.priceFrom < t.price));
      if (this.priceTo != null)
        this.orderem = this.orders.filter((t) => (t.price < this.priceTo));

    }
    this.pager.total = this.orderem.length;
  }

  resetOrders() {
    this.orderem = this.orders;
    this.priceFrom = null;
    this.priceTo = null;
    this.itemName = '';
    this.pager.total = this.orderem.length;

  }

  exportAsXLSX(): void {
    let dataSource = this.orderem;
    let excelJsonData = dataSource;
    console.log(JSON.stringify(excelJsonData));
    this.exportAsExcelFile(excelJsonData, 'Order Details');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: {
        'data': worksheet
      },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  onPageSizeChanged() {

    this.pager.page = 1;
    this.orderem = this.orders;

  }

}
