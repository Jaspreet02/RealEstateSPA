import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'jw-pagination',
  template: `<ul *ngIf="totalPages && totalPages.length" class="pagination">
    <li [ngClass]="{disabled:page === 1}" class="page-item first-item">
        <a (click)="setPage(1)" class="page-link">First</a>
    </li>
    <li [ngClass]="{disabled:page === 1}" class="page-item previous-item">
        <a  (click)="setPage(page - 1)" class="page-link">Previous</a>
    </li>
    <li *ngFor="let item of totalPages" [ngClass]="{active:page === item}" class="page-item number-item">
        <a (click)="setPage(item)" class="page-link">{{item}}</a>
    </li>
    <li [ngClass]="{disabled:page === totalPages.length}" class="page-item next-item">
        <a (click)="setPage(page + 1)" class="page-link">Next</a>
    </li>
    <li [ngClass]="{disabled:page === totalPages.length}" class="page-item last-item">
        <a (click)="setPage(totalPages.length)" class="page-link">Last</a>
    </li>
</ul>`,
  styles: ['.page-item .page-link { cursor: pointer; }']
})

export class JwPaginationComponent implements OnInit {
  @Output() changePage = new EventEmitter<number>(true);
  @Input() page = 1;
  @Input() size = 10;
  @Input() totalCount = 0;
  @Input() totalPages: number[];

  ngOnInit() {
    // set page if items array isn't empty
    this.totalPages = Array(Math.round(this.totalCount / this.size)).fill(0).map((x, i) => i + 1);
    if (this.totalPages && this.totalPages.length) {
      this.setPage(this.page);
    }
  }

  //ngOnChanges(changes: SimpleChanges) {
  //  console.log(changes);
  //  // reset page if items array has changed
  //  if (changes.totalPages.currentValue !== changes.totalPages.previousValue) {
  //    this.setPage(this.initialPage);
  //  }
  //}

  setPage(page: number) {
    this.page = page;
    // call change page function in parent component
    this.changePage.emit(page);
  }
}
