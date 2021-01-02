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

export class JwPaginationComponent implements OnChanges {
  @Output() changePage = new EventEmitter<number>(true);
  @Input() page = 1;
  @Input() size = 10;
  @Input() totalCount = 1;
  @Input() totalPages: number[];

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.totalCount.currentValue !== changes.totalCount.previousValue) {
      this.totalPages = Array(Math.floor(this.totalCount / this.size) + (this.totalCount % this.size > 0 ? 1 : 0)).fill(0).map((x, i) => i + 1);
    }
  }

  setPage(page: number) {
    this.page = page;
    // call change page function in parent component
    this.changePage.emit(page);
  }
}
