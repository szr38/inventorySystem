import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { CreateProductComponent } from './component/create-product/create-product.component';
import { DeleteProductComponent } from './component/delete-product/delete-product.component';



@NgModule({
  declarations: [InventoryComponent, EditProductComponent, CreateProductComponent, DeleteProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
