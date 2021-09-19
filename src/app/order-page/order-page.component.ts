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

export interface product {
  item ? : string;
  name ? : string;
  price: number;
  id ? : number;
}

export interface order {
  id ? : number;
  item ? : string;
  name ? : string;
  price: number;
  quantity: number;
  total: number;
}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  encapsulation: ViewEncapsulation.None,

  styleUrls: ['./order-page.component.css']
})


export class OrderPageComponent implements OnInit {
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
  products: product[] = [{
      price: 100,
      id: 9,
      item: '/images/picture.jpg',
      name: 'item 1'
    },
    {
      id: 1,
      price: 550,
      item: '/images/picture.jpg',
      name: 'item 2'
    },

    {
      id: 2,
      price: 12300,
      item: '/images/picture.jpg',
      name: 'item 3'
    },
    {
      id: 3,
      price: 140,
      item: '/images/picture.jpg',
      name: 'item 4'
    },
    {
      id: 4,
      price: 10,
      item: '/images/picture.jpg',
      name: 'item 5'
    },
    {
      id: 5,
      price: 101230,
      item: '/images/picture.jpg',
      name: 'item 6'
    },
    {
      id: 6,
      price: 1030,
      item: '/images/picture.jpg',
      name: 'item 7'
    },
    {
      id: 7,
      price: 30,
      item: '/images/picture.jpg',
      name: 'item 8'
    },
    {
      id: 8,
      price: 12330,
      item: '/images/picture.jpg',
      name: 'item 9'
    }
  ];
  productsList = this.products;
  totalPrice: number = 0;
  orders: order[] = [];
  orderem = this.orders;
  orderList: order[] = [];
  order: order = {
    item: '',
    name: '',
    price: 0,
    quantity: 0,
    id: 0,
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
  ) {

  }


  ngOnInit() {
    this.pager = {
      page: 1,
      pages: 0,
      pageSize: 10,
      total: this.orderem.length,
    };
    this.orderem = this.orders;
  }
  resetOBJ() {
    this.order = {
      item: '',
      name: '',
      price: 0,
      quantity: 0,
      id: 0,
      total: 0


    };

  }
  addItem(event: any, item: any) {
    if (event.target.checked) {

      this.order = {
        price: item.price,
        quantity: 1,
        item: item.item,
        name: item.name,
        total: item.price,
        id: item.id,
      }
      this.orderem.push(this.order);
      this.orderem = [...this.orderem];

    } else {
      this.removeItem(item)
    }
    this.resetOBJ()
    this.updateTotalPrice()

  }

  removeItem(item: any) {
    this.orderem = this.orderem.filter(order => order.id !== item.id);
    this.updateTotalPrice()
  }

  updateTotalPrice() {
    this.totalPrice = 0;
    this.orderem.forEach(obj => {
      this.totalPrice = this.totalPrice + obj.total

    });

  }

  onQuantityChange(event: any, item: any) {
    for (let i in this.orderem) {
      if (this.orderem[i].id == item.id) {
        this.orderem[i].quantity = event.target.value;
        this.orderem[i].total = this.orderem[i].price * this.orderem[i].quantity
        this.orderem = [...this.orderem];

        break;
      }
    }
    this.updateTotalPrice()

  }

  closeModal() {
    this.modalService.dismissAll();
  }



  setPage(event: any) {
    debugger;
    this.pager.page = event.offset + 1;
    let filtrationArray = this.orders
    this.orderem = filtrationArray.slice(this.pager.pageSize * (this.pager.page - 1), this.pager.pageSize * (this.pager.page + 1))

  }


  onPageSizeChanged() {

    this.pager.page = 1;
    this.orderem = this.orders;

  }

}
