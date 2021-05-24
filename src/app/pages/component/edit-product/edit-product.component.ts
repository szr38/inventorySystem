import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { product } from 'src/app/shared/interface/product.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: product) {
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      quantity: [this.data.quantity, Validators.required],
      price: [this.data.price, Validators.required],
    });
  }

  ngOnInit(): void {
  }


  onSave(): void {
    this.data.name = this.form.get('name').value;
    this.data.quantity = this.form.get('quantity').value;
    this.data.price = this.form.get('price').value;
    this.dialogRef.close(this.data);
  }
}
