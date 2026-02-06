import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {DaftrekeningService} from 'src/app/core/services/daftrekening.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {SetrapbdrbaService} from 'src/app/core/services/setrapbdrba.service';

@Component({
  selector: 'app-rba-belanja-rincian-form',
  templateUrl: './rba-belanja-rincian-form.component.html',
  styleUrls: ['./rba-belanja-rincian-form.component.scss']
})
export class RbaBelanjaRincianFormComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  loading_post: boolean;
  listdata: IDaftrekening[] = [];
  dataselected: IDaftrekening[] = [];
  userInfo: ITokenClaim;
  listExist: number[] = [];
  idrekapbd: number;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private daftrekService: DaftrekeningService,
    private auth: AuthenticationService,
    private service: SetrapbdrbaService,
    private notif: NotifService) {
    this.userInfo = this.auth.getTokenInfo();
  }

  ngOnInit() {
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    this.daftrekService.get({Kdkhusus: 1, Idjnsakun: 5}).subscribe(resp => {
      if(resp.length > 0){
        if(this.listExist.length > 0){
          this.listdata = resp.filter(f => !this.listExist.includes(f.idrek));
        } else {
          this.listdata = [...resp];
        }
      } else {
        this.msg = [];
        this.msg.push({severity: 'info', summary: 'Informasi', detail: 'Data Tidak Tersedia'});
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.msg = [];
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error; i++){
          this.msg.push({severity: 'error', summary: 'Error', detail: error.error.error[i]});
        }
      } else {
        this.msg.push({severity: 'error', summary: 'Error', detail: error.error});
      }
    });
  }
  pilih(){
    let postbody = {
      idrekapbd: this.idrekapbd,
      idrekrba: []
    };
    if(this.dataselected.length > 0){
      this.dataselected.forEach(f => {
        postbody.idrekrba.push(f.idrek);
      });
      this.loading_post = true;
      this.service.post(postbody).subscribe((resp) => {
        if (resp.ok) {
          this.callback.emit({
            added: true
          });
          this.onHide();
          this.notif.success('Input Data Berhasil');
        }
        this.loading_post = false;
      }, (error) => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
        this.loading_post = false;
      });
    }
  }
  onShow(){
    this.gets();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.dataselected = [];
    this.showThis = false;
    this.listExist = [];
    this.msg = [];
  }
}
