import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/app.constant';
import {
  CountryRegionModel,
  CountryResponseModel,
} from 'src/app/model/data.model';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  toBeDisplayedCountryList: CountryRegionModel[] = [];
  unSortedCountryList!: Object | any;
  toBeDisplayedRegionList: CountryRegionModel[] = [];
  countryListArr: CountryRegionModel[] = [];
  formGroup!: FormGroup;
  constructor(
    private readonly commonService: CommonService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRegionList();
    this.createForm();
  }
  getRegionList() {
    this.commonService
      .get('/country')
      .subscribe((res: CountryResponseModel) => {
        if (res) {
          console.log('test');
          this.unSortedCountryList = res.data;
          let objKeys = Object.keys(this.unSortedCountryList);
          let temp: any[] = [];
          objKeys.forEach((keys) => {
            temp.push(this.unSortedCountryList[keys]);
          });
          this.countryListArr = temp;
          var unique = temp.filter(
            (
              value: CountryRegionModel,
              index: Number,
              arr: CountryRegionModel[]
            ) => {
              return (
                index ===
                arr.findIndex(
                  (obj: CountryRegionModel) => obj.region === value.region
                )
              );
            }
          );
          this.toBeDisplayedRegionList = unique;
        }
      });
  }
  fetchCountryList(event: string) {
    this.toBeDisplayedCountryList = this.countryListArr.filter(
      (data: CountryRegionModel) => {
        return data.region === event;
      }
    );
  }
  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      region: [null, [Validators.required]],
      country: [null, [Validators.required]],
    });
  }
  onSubmit(formValue: FormData) {
    console.log(formValue);
  }
}
