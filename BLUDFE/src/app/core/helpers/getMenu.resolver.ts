import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { IMenu } from '../interface/imenu';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class getMenuResolver implements Resolve<IMenu[]> {
	constructor(private service: MenuService, private authService: AuthenticationService) {}
	resolve(): Observable<IMenu[]> {
		let tokenInfo = this.authService.getTokenInfo();
		return this.service.get(tokenInfo.GroupId);
	}
}