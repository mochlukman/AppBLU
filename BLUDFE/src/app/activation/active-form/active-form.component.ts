import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {TahunService} from 'src/app/core/services/tahun.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {ActivationService} from 'src/app/core/services/activation.service';

@Component({
  selector: 'app-active-form',
  templateUrl: './active-form.component.html',
  styleUrls: ['./active-form.component.scss']
})
export class ActiveFormComponent implements OnInit, OnDestroy {
  activationForm: FormGroup;
  loading = false;
  intialForm: any;
  cpuid: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notif: NotifService,
    private activationService: ActivationService)
    {
      this.activationForm = this.formBuilder.group({
        serial: [ '', Validators.required ]
      });
      this.intialForm = this.activationForm.value;
    }

  ngOnInit() {
    this.getCPUID();
  }
  getCPUID() {
    this.activationService.getCPUID().subscribe((resp: any) => {
      if(resp.status){
        this.cpuid = resp.message;
      }
    }, (error) => {
      console.log(error);
      this.loading = false;
      if (Array.isArray(error.error.error)) {
        for (var i = 0; i < error.error.error.length; i++) {
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }
  onSubmit() {
    if (this.activationForm.valid) {
      this.loading = true;
      this.activationService.post(this.activationForm.value)
        .subscribe(
          (resp: any) => {
            this.loading = false;
            if(resp.body.status){
              this.notif.confir({message: `${resp.body.message}`, accept:() => {
                  this.router.navigate([ 'login' ]);
                }, header: 'Sukses', rejectVisible: false});
            }
          },(error) => {
            console.log(error);
            this.loading = false;
            if (Array.isArray(error.error.error)) {
              for (var i = 0; i < error.error.error.length; i++) {
                this.notif.error(error.error.error[i]);
              }
            } else {
              this.notif.error(error.error);
            }
          }
        );
    } else {
      this.notif.warning('Masukan SERIAL');
    }
  }
  ngOnDestroy(): void {
    this.activationForm.reset(this.intialForm)
  }
}
