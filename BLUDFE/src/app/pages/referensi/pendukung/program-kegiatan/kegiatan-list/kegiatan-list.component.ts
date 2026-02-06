import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IMkegiatan } from 'src/app/core/interface/imkegiatan';
import { IMpgrm } from 'src/app/core/interface/IMpgrm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MkegiatanService } from 'src/app/core/services/mkegiatan.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { KegiatanFormComponent } from './kegiatan-form/kegiatan-form.component';
@Component({
  selector: 'app-kegiatan-list',
  templateUrl: './kegiatan-list.component.html',
  styleUrls: ['./kegiatan-list.component.scss']
})
export class KegiatanListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() mpgrmSelected: IMpgrm;
  loading: boolean;
  listdata: IMkegiatan[] = [];
  userInfo: ITokenClaim;
  totalRecords: number;
  @ViewChild('dt', {static:true}) dt: any;
  @ViewChild(KegiatanFormComponent, {static: true}) Form: KegiatanFormComponent;
  constructor(
    private service: MkegiatanService,
    private notif: NotifService,
    private authServivce: AuthenticationService
  ) {
    this.userInfo = this.authServivce.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dt.reset();
  }
  ngOnInit() {
  }
  gets(event: LazyLoadEvent){
    if(this.mpgrmSelected){
      if(this.loading) this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idprgrm = this.mpgrmSelected.idprgrm;
      this.service.paging().subscribe(resp => {
        this.totalRecords = resp.totalrecords;
        this.listdata = resp.data;
        this.loading = false;
      }, error => {
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
    
  }
  callback(e: any){
    if(e.added){
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      this.listdata.map(m => {
        if(m.idkeg == e.data.idkeg){
          m.datecreate = e.data.datecreate;
          m.dateupdate = e.data.dateupdate;
          m.idkeginduk = e.data.idkeginduk;
          m.idprgrm = e.data.idprgrm;
          m.idprgrmNavigation = e.data.idprgrmNavigation;
          m.jnskeg = e.data.jnskeg;
          m.jnskegNavigation = e.data.jnskegNavigation;
          m.kdperspektif = e.data.kdperspektif;
          m.levelkeg = e.data.levelkeg;
          m.nmkegunit = e.data.nmkegunit;
          m.nukeg = e.data.nukeg;
          m.staktif = e.data.staktif;
          m.stvalid = e.data.stvalid;
          m.type = e.data.type;
        }
      });
    }
  }
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idprgrm : this.mpgrmSelected.idprgrm,
    });
    this.Form.forms.controls['type'].enable();
    this.Form.showThis = true;
  }
  addsub(e: IMkegiatan){
    this.Form.title = 'Tambah Sub Data';
    this.Form.mode = 'addsub';
    this.Form.forms.patchValue({
      idprgrm : e.idprgrm,
      nukeg : e.nukeg.trim() + 'xx.',
      levelkeg : 2,
      type : 'D',
      idkeginduk : e.idkeg,
      staktif : e.staktif,
      stvalid : e.stvalid
    });
    this.Form.showThis = true;
  }
  update(e: IMkegiatan){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idkeg : e.idkeg,
      idprgrm : e.idprgrm,
      nukeg : e.nukeg.trim(),
      nmkegunit : e.nmkegunit.trim(),
      levelkeg : e.levelkeg,
      type : e.type.trim(),
      idkeginduk : e.idkeginduk,
      staktif : e.staktif,
      stvalid : e.stvalid,
      jnskeg : e.jnskeg,
    });
    this.Form.showThis = true;
  }
  delete(e: IMkegiatan){
    this.notif.confir({
    	message: `${e.nmkegunit} Akan Dihapus ?`,
    	accept: () => {
    		this.service.delete(e.idkeg).subscribe(
    			(resp) => {
    				if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              if(this.dt) this.dt.reset();
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
    this.totalRecords = 0;
  }
}
