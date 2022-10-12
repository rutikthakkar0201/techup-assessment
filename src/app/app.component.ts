import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Constants } from './app.constant';
import { AddCustomerComponent } from './component/add-customer/add-customer.component';
import { AddPinsComponent } from './component/add-pins/add-pins.component';
import { CustomerModel, PinDataModel } from './model/data.model';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pinsLists: PinDataModel[];
  customers: CustomerModel[];
  constructor(
    public dialog: MatDialog,
    private readonly commonService: CommonService
  ) {
    this.pinsLists = JSON.parse(
      localStorage.getItem(Constants.pinsStorageKey) || '[]'
    );
    this.customers = JSON.parse(
      localStorage.getItem(Constants.customerStorageKey) || '[]'
    );
    if (!this.pinsLists || !this.pinsLists.length) {
      this.commonService.get('/pins').subscribe((pinData: PinDataModel[]) => {
        localStorage.setItem(Constants.pinsStorageKey, JSON.stringify(pinData));
        this.pinsLists = pinData;
      });
    }
    if (!this.customers || !this.customers.length) {
      this.commonService.get('/customer').subscribe((pinData) => {
        localStorage.setItem(
          Constants.customerStorageKey,
          JSON.stringify(pinData)
        );
      });
    }
  }
  openDialog(value: string) {
    if (value === 'addCustomer') {
      const dialogRef = this.dialog.open(AddCustomerComponent, {
        width: '750px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          let currentCutomerList: Object[] = JSON.parse(
            localStorage.getItem(Constants.customerStorageKey) || '[]'
          );
          if (currentCutomerList && currentCutomerList.length) {
            currentCutomerList.push(result);
          } else {
            currentCutomerList = [];
            currentCutomerList.push(result);
          }
          localStorage.setItem(
            Constants.customerStorageKey,
            JSON.stringify(currentCutomerList)
          );
        }
      });
    } else {
      const dialogRef = this.dialog.open(AddPinsComponent, {
        width: '750px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          let pinsList: PinDataModel[] = JSON.parse(
            localStorage.getItem(Constants.pinsStorageKey) || '[]'
          );
          if (pinsList && pinsList.length) {
            pinsList.push(result);
          } else {
            pinsList = [];
            pinsList.push(result);
          }
          localStorage.setItem(
            Constants.pinsStorageKey,
            JSON.stringify(pinsList)
          );
          this.pinsLists = pinsList;
        }
      });
    }
  }
}
