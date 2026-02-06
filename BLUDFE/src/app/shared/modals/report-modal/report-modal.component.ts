import { indoKalender } from 'src/app/core/local';
import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Message } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent implements OnInit {
  showThis: boolean;
  msg: Message[];
  forms: FormGroup;
  indoKalender: any;
  useTgl: boolean;
  useHal: boolean;

  @Output() callBack = new EventEmitter();
  constructor(private fb: FormBuilder) {
    this.indoKalender = indoKalender;
    this.forms = this.fb.group({
      cetak: [Boolean, Validators.required],
      TGL: new Date(),
      halaman: 1
    });
  }

  ngOnInit() {}
  change(){
    this.forms.patchValue({
      cetak: true,
      TGL: this.forms.value.TGL !== null ? new Date(this.forms.value.TGL).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) : null,
    });
    this.callBack.emit(this.forms.value);
    this.onHide();
  }
  onShow(){}
  onHide(){
    this.forms.reset();
    this.forms.patchValue({
      TGL: new Date(),
      halaman: 1,
    });
    this.showThis = false;
    this.msg = [];
  }

}