import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../Model/Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  
  categories= [
  	{value: 1, name: 'Hardware'},
  	{value: 2, name: 'Software'}
  ];

  productForm = new FormGroup({
    prodId: new FormControl('', [Validators.required]),
    name : new FormControl(),
    description : new FormControl(),
    prodCategory: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl()
  })


  constructor(private prodService:ProductService, private activatedRoute:ActivatedRoute, private route: Router, private toastr:ToastrService){}

  ngOnInit() {
  	this.activatedRoute.paramMap.subscribe(param=>{
     //console.log(param);
     let id = param.get('product_id');
	     this.prodService.prodWithId(id).subscribe((response:Product)=>{

	     	//console.log("response.prodCategory["id"] :"+response.prodCategory["id"]);

	     	this.productForm.setValue({
	     		name: response.name,
	     		description: response.description,
	     		prodId: response.prodId,
	     		price: response.price,
	     		quantity: response.quantity,
	     		prodCategory: response.prodCategory["id"]
	     	});
	     });
     });
  }

  onSubmit(product){
  	product["prodCategory"] ={
					            "id": 1,
					            "catId": "C01",
					            "type": "Hardware"
					         };
  	this.prodService.updateProduct(product).subscribe(response=>{
  		if(response){
    		this.toastr.success('Product updated successfully!');
    		this.route.navigate(['home/product-list']);
    	}else{
    		this.toastr.error('Something went wrong!');
    	}
  	});
  }

}
