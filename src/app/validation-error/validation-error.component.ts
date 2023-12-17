import { KeyValuePipe } from '@angular/common';
import { Component, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent implements DoCheck {
  @Input() maxWidth?: string;
  @Input() field?: AbstractControl<any, any>;
  @Input() errorMessages: {type: string, msg: string}[] = [];
  @Input() showOnlySingleError = true;

  validationMessages: string[] = [];
  validationMsg?: string;

  diffChecker: KeyValueDiffer<any, any>;

  constructor(private objectDiffer: KeyValueDiffers) {
    this.diffChecker = objectDiffer.find(this.field?.errors ?? {}).create();
  }

  prepareValidationMessages() {
    const fieldErrors = this.field?.errors;
    this.validationMessages = [];
    if(fieldErrors) {
      for(let err of this.errorMessages) if(fieldErrors[err.type]) {
        this.validationMessages.push(err.msg);
      }
    }
    this.validationMsg = (this.validationMessages.length > 0) ? this.validationMessages[0] : undefined;
  }

  ngDoCheck(): void {
    if(this.diffChecker.diff(this.field?.errors ?? {})) {
      this.prepareValidationMessages();
    }
  }

}