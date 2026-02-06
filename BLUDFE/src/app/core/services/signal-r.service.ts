import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class SignalRService {
	private hubConnection: signalR.HubConnection;
	private userLoginNotif = new BehaviorSubject([]);
	public _userLoginNotif = this.userLoginNotif.asObservable();
	private lockTahapInfo = new BehaviorSubject(<any>{});
	public _lockTahapInfo = this.lockTahapInfo.asObservable();
	private listTahap = new BehaviorSubject([]);
	public _listTahap = this.listTahap.asObservable();
	private refreshMenu = new BehaviorSubject(<boolean>false);
	public _refreshMenu = this.refreshMenu.asObservable();
	constructor(private http: HttpClient) {}
	connectionStatus() {
		return this.hubConnection;
	}
	startConnect = () => {
		this.hubConnection = new signalR.HubConnectionBuilder().withUrl(`${environment.socket}`).build();

		this.hubConnection
			.start()
			.then(() => console.log('Connection started'))
			.catch((err) => console.log('Error while starting connection: ' + err));
	};
	stopConnect = () => {
		if (this.hubConnection) {
			this.hubConnection
				.stop()
				.then(() => console.log('Connection Stoped'))
				.catch((err) => console.log('Error while stoping connection: ' + err));
			this.hubConnection = null;
		}
	};
	tesNotif = () => {
		this.hubConnection.on('notif', (x) => {
			console.log(x);
		});
	};
	userLogin() {
		this.hubConnection.on('user_login', (x) => {
			this.userLoginNotif.next(x);
		});
	}
	getlistTahap() {
		this.hubConnection.on('list_tahap', (x) => {
			this.setListTahap(x);
		});
	}
	getTahap(): void {
		this.http.get(`${environment.url}Tahap`).subscribe((resp) => this.setListTahap(resp));
	}
	setListTahap(data: any) {
		return this.listTahap.next(data);
	}
	lockTahap() {
		this.hubConnection.on('lock_tahap', (x) => {
			this.setNotifLock(x);
		});
	}
	setNotifLock(data: any) {
		return this.lockTahapInfo.next(data);
	}
	resetUserLogin(data: any) {
		return this.userLoginNotif.next(data);
	}
	getRefreshMenu(){
		this.hubConnection.on('refresh_menu',(x) => {
			return this.refreshMenu.next(x);
		});
	}
}
