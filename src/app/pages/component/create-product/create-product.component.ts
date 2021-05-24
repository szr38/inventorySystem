import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { product } from 'src/app/shared/interface/product.interface';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form: FormGroup;
  product: product = {
    id: 0,
    name: '',
    quantity: 0,
    image: 'http://dummyimage.com/100x100.png/dddddd/000000',
    price: 0,
  };

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: [, Validators.required],
      price: [, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.product.id=this.data;
    this.product.name = this.form.get('name').value;
    this.product.quantity = this.form.get('quantity').value;
    this.product.price = this.form.get('price').value;
    this.dialogRef.close(this.product);
  }

}
