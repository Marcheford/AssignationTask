import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPageComponent } from './order-page/order-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [     
  { path: '', redirectTo: '/MyOrders', pathMatch: 'full' },

  {
  path: 'NewOrder',
  component: OrderPageComponent
},
{
  path: 'MyOrders',
  component: ShoppingCartComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
