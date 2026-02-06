import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { IfService } from 'src/app/core/services/if.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { JurnalMemorialRincianFormComponent } from '../jurnal-memorial-rincian-form/jurnal-memorial-rincian-form.component';

@Component({
  selector: 'app-jurnal-memorial-rincian',
  templateUrl: './jurnal-memorial-rincian.component.html',
  styleUrls: ['./jurnal-memorial-rincian.component.scss']
})
export class JurnalMemorialRincianComponent implements OnInit, OnChanges {
  @Input() BktmemSelected : any;
  loading: boolean;
  listdata: any[] = [];
  dataselected: any;
  userInfo: ITokenClaim;
  @ViewChild(JurnalMemorialRincianFormComponent, {static: true}) Form : JurnalMemorialRincianFormComponent;
  constructor(
    private auth: AuthenticationService,
    private service: IfService,
    private notif: NotifService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.BktmemSelected.currentValue){
      this.gets();
    }
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    const param = {
      Idbm: this.BktmemSelected.idbm
    };
    this.service.get('Bktmemdet', param).subscribe(resp => {
      if(resp.length > 0){
        this.listdata = resp;
      } else {
        this.notif.info('Data Tidak Tersedia');
      }
      this.loading = false;
    },(error) => {
      this.loading = false;
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }
  callback(data: any){
    if(data.added || data.edited){
      this.gets();
    }
  }

  subTotalD(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => {
        if(f.kdpers.trim() == 'D'){
          total += +f.nilai;
        }
      });
		}
		return total;
  }

  subTotalK(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => {
        if(f.kdpers.trim() == 'K'){
          total += +f.nilai;
        }
      });
		}
		return total;
  }

  add() {
    this.Form.title = 'Tambah Rincian';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idbm : this.BktmemSelected.idbm,
      idunit: this.BktmemSelected.idunit
    });
    if(["03", "031"].indexOf(this.BktmemSelected.idjbmNavigation.kdbm.trim()) > -1){
      this.Form.idjenisakun = "1,4,5,6";
    } else if (["11","111"].indexOf(this.BktmemSelected.idjbmNavigation.kdbm.trim()) > -1){
      this.Form.idjenisakun = "1,2,3,7,8";
    }
    this.Form.showthis = true;
  }
  update(data: any){
    console.log(data);
    this.Form.title = 'Detail';
    this.Form.mode = 'edit',
    this.Form.forms.patchValue({
      idbmdet : data.idbmdet,
      idbm : data.idbm,
      nilai: data.nilai,
      tname: data.tname,
      idrek : 1,
      kdpers : data.kdpers.trim(),
      idunit: 1,
      idjnsakun: 1
    });
    this.Form.uiRek = {kode: data.kdper, nama: data.nmper};
    this.Form.showthis = true;
  }
  delete(data: any){
    this.notif.confir({
			message: `${data.nmper} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(`Bktmemdet/${data.idbmdet}/${data.tname}`).subscribe(
					(resp) => {
						if (resp) {
              this.notif.success('Data berhasil dihapus');
              this.dataselected = null;
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
    
  }


}