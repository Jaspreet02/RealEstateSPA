import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AccountService } from '../../../core/services/account.service';
import { User } from '../../../shared/models/user';
import { MustMatch } from '../../../core/guards/MustMatch';

@Component({
  selector: 'app-Registration',
  templateUrl: './Registration.component.html',
  styleUrls: ['./Registration.component.css']
})
export class RegistrationComponent implements OnInit {
  errorMessage : string;
  userform: FormGroup;
  selectedUser: User;
  isLoginError: boolean = false;
  isEmailSend: boolean = false;

  constructor(private accountService : AccountService,private router : Router,private fb: FormBuilder) { }

  ngOnInit() {
    this.selectedUser = new User();
    this.userform = this.fb.group({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'phonenumber': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'gender': new FormControl('', Validators.required),
      'password':new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      'confirmpassword':new FormControl('', Validators.compose([Validators.required]))
    },
      {
        validator: MustMatch('password', 'confirmpassword')
      }
    );
  }

  OnSubmit() {
    this.accountService.userRegistration(this.selectedUser).subscribe((data: any) => {
      if (data.succeeded) {
        this.isEmailSend = true;
      }
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.errorMessage = err.error.description;
    });
  }
}
