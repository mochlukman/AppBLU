import { Injectable } from '@angular/core';
import { Confirmation, MessageService, ConfirmationService } from 'primeng/api';

@Injectable({
	providedIn: 'root'
})
export class NotifService {
	defaultConfirmation: Confirmation;
	constructor(private messageService: MessageService, private konfirService: ConfirmationService) {
		this.defaultConfirmation = {
			header: 'Konfirmasi',
			message: '',
			key: 'global-confirm',
			acceptLabel: 'Ya',
			rejectLabel: 'Tidak'
		};
	}
	rejectForm(confirmasi: Confirmation) {
		this.defaultConfirmation.message = 'Form Sudah Terisi, Tetap Tutup ?';
		this.defaultConfirmation.reject = confirmasi.reject;
		this.defaultConfirmation.accept = confirmasi.accept;
		return this.konfirService.confirm(this.defaultConfirmation);
	}
	confir(confirmasi: Confirmation) {
		this.defaultConfirmation.message = confirmasi.message === '' ? 'Data Akan Dihapus ?' : confirmasi.message;
    this.defaultConfirmation.header = confirmasi.header == '' ? 'Konfirmasi' : confirmasi.header;
		this.defaultConfirmation.reject = confirmasi.reject;
		this.defaultConfirmation.accept = confirmasi.accept;
    this.defaultConfirmation.rejectVisible = confirmasi.rejectVisible;
		return this.konfirService.confirm(this.defaultConfirmation);
	}
	success(message) {
		this.messageService.add({ key: 'toast-notif', severity: 'success', summary: 'Success', detail: message });
	}
	warning(message) {
		this.messageService.add({ key: 'toast-notif', severity: 'warn', summary: 'Warning', detail: message });
	}
	info(message) {
		this.messageService.add({ key: 'toast-notif', severity: 'info', summary: 'Info', detail: message });
	}
	error(message) {
		this.messageService.add({ key: 'toast-notif', severity: 'error', summary: 'Error', detail: message });
	}
}
