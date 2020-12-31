import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Property } from '../../../shared/models/property';
import { PropertyService } from '../../../core/services/property.service';
import { MasterService } from '../../../core/services/master.service';
import { CityService } from '../../../core/services/city.service';
import { StateService } from '../../../core/services/state.service';
import { AddressService } from '../../../core/services/address.service';
import { State } from '../../../shared/models/state';
import { City } from '../../../shared/models/city';
import { Address } from '../../../shared/models/address';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})

export class PropertyComponent implements OnInit {

  _propertyId: string;

  _newProperty: boolean;

  _selectedProperty: Property;

  _types: any[];

  _type: any;

  _states: State[];

  _state: State;

  _cities: City[];

  _selectedCities: City[];

  _city: City;

  _isFieldEnable : boolean = false;

  _propertyform: FormGroup;

  constructor(private addressSerice : AddressService ,private propertyService: PropertyService, private masterService: MasterService, private cityService: CityService, private stateService: StateService,
    private location: Location, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.params.subscribe(res => {
      if (res['id']) {
        this._propertyId = res.id;
        this._newProperty = false;
      }
      else {
        this._newProperty = true;
      }
    });
  }

  ngOnInit() {
    this.getTypes();
    this._propertyform = this.fb.group({
      'description': new FormControl(''),
      'rent': new FormControl('', Validators.compose([Validators.required, Validators.min(100), Validators.max(5000)])),
      'room': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'postalcode': new FormControl('', Validators.required),
      'intersection': new FormControl('', Validators.required),
      'state': new FormControl(''),
      'city': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'unitnumber': new FormControl('', Validators.required),
      'status': new FormControl('')
    });
  }

  getProperty(): void {
    if (this._newProperty) {
      this._selectedProperty = new Property();
      this._selectedProperty.room = 2;
      this._selectedProperty.rent = 100;
      this._selectedProperty.address = new Address();
    }
    else {
      this.propertyService.getProperty(this._propertyId)
        .subscribe(x => {
          this._selectedProperty = x; 
          this._type = this._types.find(t=> t.value == this._selectedProperty.typeId);
          const city = this._cities.find(c=> c.cityId == this._selectedProperty.address.cityId);
          this._state = this._states.find(s=> s.stateId == city.stateId); 
          this.bindCity(); 
          this._city = city
        });
    }
  }

  getTypes(): void {
    this._types = [];
    this.cityService.getCities(0, 10, 'CreatedAt', 'desc').subscribe(c => {
      this._cities = c.result;
      this.stateService.getStates(0, 10, 'CreatedAt', 'desc').subscribe(s => {
        this._states = s.result;
        this.masterService.getTypes().subscribe(x => {
          for (let index = 0; index < x.length; index++) {
            const element = x[index];
            this._types.push({ label: element.name, value: element.typeId });
          }; this.getProperty()
        })
      })
    });
  }

  EnableField(){
    this._isFieldEnable = false;
    if(this._type != null){
      var item = this._type.label;
      this._isFieldEnable = (item == 'Apartment') || (item == 'Condo') || (item == 'Flat');
      if(this._isFieldEnable){
        this._propertyform.get('unitnumber').setValidators([Validators.required]);
      }
      else{
        this._propertyform.get('unitnumber').setValidators(null);
      }
      this._propertyform.get('unitnumber').updateValueAndValidity();
    }
  }

  
  bindCity() {
    if (this._state != null) {
      this._city = null;      
      this._selectedCities = this._cities.filter(x => x.stateId == this._state.stateId);
    }
  }

  save() {
    console.log("workind");
    if (this._newProperty) {
      this._selectedProperty.address.cityId = this._city.cityId;
      this.addressSerice.addAddress(this._selectedProperty.address).subscribe(x=> { this._selectedProperty.addressId = x.addressId; this._selectedProperty.typeId = this._type.value ; console.log(this._selectedProperty) ;this.propertyService.addProperty(this._selectedProperty).subscribe(() => { this._selectedProperty = null; this.router.navigate(['/']) }) });
    } else {
      this.propertyService.updateProperty(this._selectedProperty).subscribe(() => { this._selectedProperty = null; this.router.navigate(['/' + localStorage.getItem('role') + '/users']); });
    }
  }

  cancel() {
    this._selectedProperty = null;
    this.location.back();
  }
}
