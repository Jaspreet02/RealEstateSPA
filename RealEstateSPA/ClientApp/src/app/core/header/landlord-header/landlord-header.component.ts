import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landlord-header',
  templateUrl: './landlord-header.component.html',
  styleUrls: ['./landlord-header.component.css']
})
export class LandlordHeaderComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() { }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}
