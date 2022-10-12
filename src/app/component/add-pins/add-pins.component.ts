import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { Constants } from 'src/app/app.constant';
import { CustomerModel } from 'src/app/model/data.model';

@Component({
  selector: 'app-add-pins',
  templateUrl: './add-pins.component.html',
  styleUrls: ['./add-pins.component.scss'],
})
export class AddPinsComponent implements OnInit {
  imageSrc!: string;
  formGroup!: FormGroup;
  fetchedCustomerList!: CustomerModel[];
  fileUrl: string = '';
  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPinsComponent>
  ) {}
  ngOnInit(): void {
    this.fetchedCustomerList = JSON.parse(
      localStorage.getItem(Constants.customerStorageKey) || '{}'
    );
    this.createFormGroup();
  }
  public uploader: FileUploader = new FileUploader({
    disableMultipart: true,
  });

  public onFileSelected(event: EventEmitter<File[]> | any) {
    const file: File = event[0];
    this.fileUrl = event[0].name;

    this.readBase64(file).then((imgSrcData: any) => {
      if (imgSrcData) {
        this.imageSrc = imgSrcData;
      }
    });
  }
  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required]],
      collaboratory: [null, [Validators.required]],
      privacy: [null, [Validators.required]],
    });
  }
  onSubmit(formGroup: FormData) {
    console.log(formGroup);
  }
  getFormValue(formGroup: FormData) {
    this.dialogRef.close({
      ...formGroup,
      imagePreviewUrl: this.imageSrc,
      fileUrl: this.fileUrl,
    });
  }
  readBase64(file: any): Promise<any> | any {
    if (file) {
      var reader = new FileReader();
      var future = new Promise((resolve, reject) => {
        reader.addEventListener(
          'load',
          function () {
            resolve(reader.result);
          },
          false
        );

        reader.addEventListener(
          'error',
          function (event) {
            reject(event);
          },
          false
        );

        reader.readAsDataURL(file);
      });
      return future;
    }
  }
}

//file upload function
