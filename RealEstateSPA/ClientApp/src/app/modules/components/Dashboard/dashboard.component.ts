import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../../../shared/models/property';
import { PropertyService } from '../../../core/services/property.service';
import { MasterService } from '../../../core/services/master.service';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { State } from '../../../shared/models/state';
import { City } from '../../../shared/models/city';
import { CityService } from '../../../core/services/city.service';
import { StateService } from '../../../core/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  properties: Property[];

  selectedProperty: Property;

  types: SelectItem[];

  type: string = "-1";

  loading: boolean;

  _total: number;

  sortField: string = 'CreatedAt';

  intersection : string = '' ;

  sortOrder: number = -1;

  pageNumber: number = 0;

  pageSize: number = 12;

  states: State[];

  cities: City[];

  selectedCity: number = -1;

  groupedCities: SelectItemGroup[];

  rentValues: number[] = [0, 100];

  yearTimeout: any;

  constructor(private router: Router, private propertyService: PropertyService, private cityService: CityService, private stateService: StateService, private masterService: MasterService) {
  }

  ngOnInit() {
    this.loading = true;
    this.stateService.getStates(this.pageNumber, this.pageSize, this.sortField, 'desc')
      .subscribe(x => {
        this.states = x.result;
        this.cityService
          .getCities(this.pageNumber, this.pageSize, this.sortField, 'desc')
          .subscribe(x => { this.cities = x.result; this.BindDropdown() });
      });
    this.getTypes();
  }

  selectProperty(event: Event, item: Property) {
    if (localStorage.getItem('role') != null) {
      this.router.navigate(['/' + localStorage.getItem('role') + '/property/' + item.propertyId]);
    }
    else {
      this.router.navigate(['/login']);
    }
    // event.preventDefault();
  }

  getTypes(): void {
    this.types = [];
    this.types.push({ label: "Type (all)", value: "-1" });
    this.masterService.getTypes().subscribe(x => {
      for (let index = 0; index < x.length; index++) {
        const element = x[index];
        this.types.push({ label: element.name, value: element.typeId });
      }
    });
  }

  getProperties(): void {
    this.loading = true;
    let search ;
    if(!this.intersection || this.intersection == undefined || this.intersection == "" || this.intersection.length == 0){
      search = ' ';
    }
    else{
      search = this.intersection;
    }
    this.propertyService
      .getProperties(parseInt(this.type), this.selectedCity,search, this.rentValues, this.pageNumber, this.pageSize, this.sortField, this.sortOrder == 1 ? 'asc' : 'desc')
      .subscribe(x => (this.properties = x.result, this._total = x.count, this.loading = false));
  }

  loadData(event) {
    this.pageNumber = parseInt(event.first) / parseInt(event.rows);
    this.pageSize = event.rows;
    this.getProperties();
    //event.first = First row offset
    //event.rows = Number of rows per page
  }


  BindDropdown() {
    let result = [];
    for (let index = 0; index < this.states.length; index++) {
      let tempApplication = this.cities.filter(x => x.stateId == this.states[index].stateId);
      let subItem = [];
      for (let subIndex = 0; subIndex < tempApplication.length; subIndex++) {
        subItem[subIndex] = { label: tempApplication[subIndex].name, value: tempApplication[subIndex].cityId }
      }
      result[index] =
      {
        label: this.states[index].name, value: this.states[index].code,
        items: subItem
      };
    }
    this.groupedCities = result;
  }

  onYearChange(event) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      this.getProperties();
    }, 250);
  }

  onSortChange(event) {
    this.getProperties();
  }

  onSearch(event) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
       this.getProperties();
    }, 500);
  }

  addProperty() {
    if (localStorage.getItem('role') != null) {
      this.router.navigate(['/' + localStorage.getItem('role') + '/property']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  defaultUrl(event) {
    event.target.src = "../../../../assets/images/Default/mobile.png"
  }
}
