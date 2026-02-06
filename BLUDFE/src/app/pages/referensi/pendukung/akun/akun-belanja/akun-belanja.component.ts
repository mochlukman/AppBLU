import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftrekeningService } from 'src/app/core/services/daftrekening.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { AkunBelanjaFormComponent } from './akun-belanja-form/akun-belanja-form.component';

@Component({
  selector: 'app-akun-belanja',
  templateUrl: './akun-belanja.component.html',
  styleUrls: ['./akun-belanja.component.scss']
})
export class AkunBelanjaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: IDaftrekening[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @ViewChild(AkunBelanjaFormComponent, {static: true}) Form: AkunBelanjaFormComponent;
  constructor(
    private service: DaftrekeningService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 1){
      this.get();
    }
  }
  
  ngOnInit() {
  }
  get(){
    this.loading = true;
    this.listdata = [];
    this.service._idjnsakun = '7,8';
    this.service.getByJnsakun().subscribe(resp => {
      if(resp.length > 0){
        this.listdata = [...resp];
      } else {
        this.notif.info('Data Tidak Tersedia');
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
			if(Array.isArray(error.error.error)){
				for(var i = 0; i < error.error.error; i++){
          this.notif.error(error.error.error[i]);
				}
			} else {
				this.notif.error(error.error);
			}
    });
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      this.listdata.sort((a,b) =>  (a.kdper.trim() > b.kdper.trim() ? 1 : -1));
    } else if(e.edited){
      this.listdata.map(m => {
        if(m.idrek == e.data.idrek){
          m.idrek = e.data.idrek;
          m.kdper = e.data.kdper;
          m.nmper = e.data.nmper;
          m.mtglevel = e.data.mtglevel;
          m.kdkhusus = e.data.kdkhusus;
          m.jnsrek = e.data.jnsrek;
          m.idjnsakun = e.data.idjnsakun;
          m.type = e.data.type;
          m.staktif = e.data.staktif;
          m.datecreate = e.data.datecreate;
        }
      });
      this.listdata.sort((a,b) =>  (a.kdper.trim() > b.kdper.trim() ? 1 : -1));
    }
  }
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.showThis = true;
  }
  addsub(e: IDaftrekening){
    this.Form.title = 'Tambah Sub Data';
    this.Form.mode = 'addsub';
    this.Form.forms.patchValue({
      kdper: e.kdper.trim() + 'xx.',
      mtglevel: e.mtglevel + 1,
      idjnsakun: e.idjnsakun,
      jnsrek: e.jnsrek
    });
    this.Form.showThis = true;
  }
  edit(e: IDaftrekening){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idrek: e.idrek,
      kdper: e.kdper.trim(),
      nmper: e.nmper.trim(),
      mtglevel: e.mtglevel,
      kdkhusus: e.kdkhusus,
      jnsrek: e.jnsrek,
      idjnsakun: e.idjnsakun,
      type: e.type.trim(),
      staktif: e.staktif,
    });
    this.Form.showThis = true;
  }
  delete(e: IDaftrekening){
    this.notif.confir({
    	message: `${e.nmper} Akan Dihapus ?`,
    	accept: () => {
    		this.service.delete(e.idrek).subscribe(
    			(resp) => {
    				if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.listdata = this.listdata.filter(f => f.idrek !== e.idrek);
              this.listdata.sort((a,b) =>  (a.kdper.trim() > b.kdper.trim() ? 1 : -1));
              this.dt.reset();
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
   this.loading = false;
  }
}
