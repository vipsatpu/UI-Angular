import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {

   
    
   productForm = new FormGroup({
    prodId: new FormControl('', [Validators.required]),
    name : new FormControl(),
    description : new FormControl(),
    prodCategory: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl()
  });

  categories= [
  	{value: 1, name: 'Hardware'},
  	{value: 2, name: 'Software'}
  ];

  constructor(private prodService : ProductService, private route: Router, private toastr: ToastrService) { }

  ngOnInit() {
  	
  }

  onSubmit(product){
    
    product["prodCategory"] ={
					            "id": 1,
					            "catId": "C01",
					            "type": "Software"
					         };
    //console.log("product :"+JSON.stringify(product["prodCategory"]));
    this.prodService.createProduct(product).subscribe(response=>{
    	console.log("response :"+response);
    	if(response){
    		this.toastr.success('Product added successfully!');
    		this.route.navigate(['home/product-list']);
    	}else{
    		this.toastr.error('Something went wrong!');
    	}
    });
  }
}
