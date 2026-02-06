import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';

import { Notification } from './topbar.model';

import { notificationItems } from './data';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import Swal from 'sweetalert2';
import { LookUbahSandiComponent } from 'src/app/shared/lookups/look-ubah-sandi/look-ubah-sandi.component';
import { PemdaService } from 'src/app/core/services/pemda.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  notificationItems: Notification[];
  languages: Array<{
    id: number,
    flag?: string,
    name: string
  }>;
  selectedLanguage: {
    id: number,
    flag?: string,
    name: string
  };

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  userInfo: ITokenClaim;
  @ViewChild(LookUbahSandiComponent,{static: true}) FormUbahPassword : LookUbahSandiComponent;
  nama_pemda: string = '';
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private pemda: PemdaService
    ) {
      this.userInfo = this.authService.getTokenInfo();
      this.pemda.get('pemdal').subscribe(resp => {
        this.nama_pemda = resp.value ? resp.value : '';
      });
    }

  ngOnInit() {
    // get the notifications
    this._fetchNotifications();
    this.openMobileMenu = false;
  }

  /**
   * Change the language
   * @param language language
   */
  changeLanguage(language) {
    this.selectedLanguage = language;
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    Swal({
			title: '',
			text: 'Keluar Aplikasi ?',
			type: 'warning',
			showCancelButton: true,
			heightAuto: false,
			confirmButtonText: 'Ya',
			cancelButtonText: 'Batal'
		}).then((result) => {
			if (result.value) {
				this.authService.logout();
        this.router.navigate(['/login']);
			} else if (result.dismiss === Swal.DismissReason.cancel) {
			}
		});
  }
  changePassword(){
    this.FormUbahPassword.forms.patchValue({
      userid: this.userInfo.nameid
    });
    this.FormUbahPassword.showThis = true;
  }

  /**
   * Fetches the notification
   * Note: For now returns the hard coded notifications
   */
  _fetchNotifications() {
    this.notificationItems = notificationItems;
  }
}
