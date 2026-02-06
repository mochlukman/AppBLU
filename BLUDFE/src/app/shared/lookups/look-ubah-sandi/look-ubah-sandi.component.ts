import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { WebUserService } from 'src/app/core/services/web-user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-look-ubah-sandi',
  templateUrl: './look-ubah-sandi.component.html',
  styleUrls: ['./look-ubah-sandi.component.scss']
})
export class LookUbahSandiComponent implements OnInit {
  showThis: boolean;
  userInfo: ITokenClaim;
  msg: Message[];
  forms: FormGroup;
  loading_post: boolean;
  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private service: WebUserService,
    private router: Router,
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.forms = this.fb.group({
      userid: ['', Validators.required],
			oldpass: ['', Validators.required],
			newpass: ['', Validators.required],
			renewpass: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  simpan(){
		if(this.forms.valid){
      this.loading_post = true;
			this.service.postSandi(this.forms.value).subscribe(resp => {
				if(resp.ok){
          this.loading_post = false; 
					this.onHide();
					Swal({
						title: 'Berhasil',
						text: 'Password Berhasil Diubah',
						type: 'success',
					}).then((result) => {
						if (result.value) {
							this.auth.logout();
              this.router.navigate(['/account/login']);
						} else if (result.dismiss === Swal.DismissReason.cancel) {
							return false;
						}
					});
				}
			}, (error) => {
        this.loading_post = false;
				this.msg = [];
				this.msg.push({severity: 'warn', summary: 'Warning', detail: error.error});
			});
		}
	}
  onHide(){
    this.msg = [];
		this.forms.reset();
		this.showThis = false;
    this.loading_post = false;
  }
}
