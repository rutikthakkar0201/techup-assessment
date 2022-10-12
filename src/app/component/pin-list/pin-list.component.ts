import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { PinDataModel } from 'src/app/model/data.model';
@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss'],
})
export class PinListComponent implements OnChanges, AfterViewInit {
  displayedColumns = ['title', 'image', 'collaboratory', 'privacy'];
  dataSource!: MatTableDataSource<PinDataModel>;
  @Input() pinListData!: PinDataModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public sanitizer: DomSanitizer) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.setDataSource(this.pinListData);
  }
  setDataSource(pinListData: PinDataModel[]) {
    this.dataSource = new MatTableDataSource(pinListData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
