import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ViewEncapsulation } from '@angular/core';
import { User } from '../../../shared/models/user';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-oldlogin',
  templateUrl: './oldlogin.component.html',
  styleUrls: ['./oldlogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OldLoginComponent implements OnInit {
  errorMessage : string;
  isLoginError : boolean = false; 
  selectedUser: User; 
  userform: FormGroup;

  constructor(private accountService : AccountService,private router : Router,private fb: FormBuilder) { }

  ngOnInit() {    
    this.selectedUser = new User();
    this.userform = this.fb.group({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'phonenumber': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([Validators.required,Validators.email])),
      'gender': new FormControl('', Validators.required),
      'status': new FormControl('')
    });
  }

  OnSubmit(userName,password){
     this.accountService.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('role',data.role);
      this.router.navigate(['/' + data.role + '/runDetails']);
    },
    (err : HttpErrorResponse)=>{
      this.errorMessage = err.error.error_description;
      this.isLoginError = true;
    });
  }
}
