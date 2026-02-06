import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class cssStyleResolver implements Resolve<any> {
	constructor() {}
	resolve(){
		return console.log(history.state);
	}
}