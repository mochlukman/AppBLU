import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SshrekService } from 'src/app/core/services/sshrek.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { SharedSshMappingRekFormComponent } from './shared-ssh-mapping-rek-form/shared-ssh-mapping-rek-form.component';

@Component({
  selector: 'app-shared-ssh-mapping-rek',
  templateUrl: './shared-ssh-mapping-rek.component.html',
  styleUrls: ['./shared-ssh-mapping-rek.component.scss']
})
export class SharedSshMappingRekComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  @Input() sshselected : any;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  @ViewChild(SharedSshMappingRekFormComponent, {static: true}) Form : SharedSshMappingRekFormComponent;
  constructor(
    private service: SshrekService,
    private authSerive: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authSerive.getTokenInfo();
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sshselected) {
      this.gets();
    }
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    this.service.gets(this.sshselected.idssh).subscribe(resp => {
      this.listdata = resp;
      this.loading = false;
    },(error) => {
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
  callback(e: any){
    if(e.added){
      this.gets();
    }
  }
  add(){
    this.Form.title = 'Tambah Rekening';
    this.Form.forms.patchValue({
      idssh: this.sshselected.idssh,
      kdssh: this.sshselected.kdssh
    });
    this.Form.showThis = true;
  }
  delete(e: any){
    this.notif.confir({
    	message: `${e.idrekNavigation.kdper} - ${e.idrekNavigation.nmper} Akan Dihapus ?`,
    	accept: () => {
    		this.service.delete(e.idsshrek).subscribe(
    			(resp) => {
    				if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.gets();
    				}
    			}, (error) => {
            if(Array.isArray(error.error.error)){
              for(var i = 0; i < error.error.error.length; i++){
                this.notif.error(error.error.error[i]);
              }
            } else {
              this.notif.error(error.error);
            }
          });
    	},
    	reject: () => {
    		return false;
    	}
    });
  }
  ngOnDestroy(): void {
    this.listdata = [];
  }
}
