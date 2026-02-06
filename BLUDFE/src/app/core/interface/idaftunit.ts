import { IDafturus } from './idafturus';
import { IStruunit } from './istruunit';

export interface IDaftunit {
	idunit: number;
	idpemda: null;
	idurus: number;
	kdunit: string;
	nmunit: string;
	kdlevel: number;
	type: string;
	akrounit: null;
	alamat: string;
	telepon: null;
	staktif: number;
	datecreate: string;
	dateupdate: string;
	idurusNavigation : IDafturus,
	kdlevelNavigation : IStruunit
	combine?: string;
}
