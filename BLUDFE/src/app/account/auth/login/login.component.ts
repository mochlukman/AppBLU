import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/services/auth.service';
import { TahunService } from 'src/app/core/services/tahun.service';
import { ITahun } from 'src/app/core/interface/itahun';
import { Title } from '@angular/platform-browser';
import { NotifService } from 'src/app/core/_commonServices/notif.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  visibelPage: boolean;
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  loading = false;
  listTahun: ITahun[] = [];
	selectedTahun: ITahun;
  intialForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleTab: Title,
    private authService: AuthenticationService,
    private tahunService: TahunService,
    private notif: NotifService) {
      this.titleTab.setTitle('SIPKD BLUD - Login');
      this.loginForm = this.formBuilder.group({
        userId: [ '', Validators.required ],
        pwd: [ '', Validators.required ],
        kdTahun: [ '', Validators.required ]
      });
      this.intialForm = this.loginForm.value;
      this.getTahun();
      localStorage.removeItem('tahun_suffix');
  }
  ngOnInit() {
    if(history.state.reload){
      this.visibelPage = false;
      window.location.reload();
    } else {
      this.visibelPage = true;
      this.authService.logout();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  getTahun(){
    this.loading = true;
    this.listTahun = [];
    this.tahunService.get().subscribe(resp => {
      if(resp.length > 0){
        this.listTahun = resp;
      } else {
        this.notif.info('Tahun Tidak Tersedia');
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      if (Array.isArray(error.error.error)) {
        for (var i = 0; i < error.error.error.length; i++) {
          this.notif.error(error.error.error[i]);
        }
      } else {
        if(error.error.hasOwnProperty('error_id') && error.error.error_id == "not_active"){
          this.notif.error(error.error.message);
        } else {
          this.notif.error(error.error);
        }
      }
    });
  }
  onChangeTahun(e: any){
    localStorage.setItem('tahun_suffix', e);
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value)
        .subscribe(
          (resp: any) => {
            this.loading = false;
            if (resp.token) {
              this.authService.storeLocal(resp);
              if(this.returnUrl == '/') this.returnUrl = '/main-page'
              this.router.navigate([ this.returnUrl ]);
            }
          },(error) => {
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
      this.notif.warning('lengkapi Form');
    }
  }
  backWeb(){
    this.router.navigate(['/landing-page'], {state: {reload: true}});
  }
  ngOnDestroy(): void {
    this.listTahun = [];
    this.loginForm.reset(this.intialForm);
    this.visibelPage = false;
  }
}
