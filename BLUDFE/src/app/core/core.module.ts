import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {TabMenuModule} from 'primeng/tabmenu';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {TreeModule} from 'primeng/tree';
import {TabViewModule} from 'primeng/tabview';
import {FieldsetModule} from 'primeng/fieldset';
import {TooltipModule} from 'primeng/tooltip';
import {SplitButtonModule} from 'primeng/splitbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import localId from '@angular/common/locales/id';
import { InputRupiahPipe } from './pipe/input-rupiah.pipe';
import { InputRupiahDirective } from './directive/input-rupiah.directive';
import { NumericDirective } from './directive/decimal.directive';
import { ViewRupiahPipe } from './pipe/view-rupiah.pipe';
import { UIModule } from '../shared/ui/ui.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import {SidebarModule} from 'primeng/sidebar';
import { HighchartsChartModule } from "highcharts-angular";
import {StepsModule} from 'primeng/steps';
import {ProgressSpinner, ProgressSpinnerModule} from 'primeng/progressspinner';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
registerLocaleData(localId, 'id');
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
		HttpClientModule,
		BreadcrumbModule,
		ButtonModule,
		DropdownModule,
		MenuModule,
		MenubarModule,
		OverlayPanelModule,
		PanelModule,
		PanelMenuModule,
		ScrollPanelModule,
		SelectButtonModule,
		SlideMenuModule,
		TabMenuModule,
		CheckboxModule,
		InputTextModule,
		ReactiveFormsModule,
		CardModule,
		TableModule,
		DialogModule,
		MessagesModule,
		ProgressBarModule,
		TreeModule,
		TabViewModule,
		TreeTableModule,
		SplitButtonModule,
		FieldsetModule,
		TooltipModule,
		FileUploadModule,
		ToastModule,
		CalendarModule,
		UIModule,
		AutoCompleteModule,
    RadioButtonModule,
		SidebarModule,
		HighchartsChartModule,
		StepsModule,
		ProgressSpinnerModule,
		DynamicDialogModule
  ],
  exports: [
    CommonModule,
		FormsModule,
		HttpClientModule,
		BreadcrumbModule,
		ButtonModule,
		DropdownModule,
		MenuModule,
		FieldsetModule,
		MenubarModule,
		OverlayPanelModule,
		PanelModule,
		PanelMenuModule,
		ScrollPanelModule,
		SelectButtonModule,
		SlideMenuModule,
		TabMenuModule,
		TreeModule,
		TreeTableModule,
		CheckboxModule,
		InputTextModule,
		SplitButtonModule,
		ReactiveFormsModule,
		CardModule,
		TableModule,
		DialogModule,
		TooltipModule,
		TabViewModule,
		MessagesModule,
		ProgressBarModule,
		InputRupiahPipe,
		InputRupiahDirective,
		NumericDirective,
		ViewRupiahPipe,
		FileUploadModule,
		ToastModule,
		CalendarModule,
		UIModule,
		AutoCompleteModule,
    RadioButtonModule,
		SidebarModule,
		HighchartsChartModule,
		StepsModule,
		ProgressSpinnerModule,
		DynamicDialogModule,
	],
	declarations: [
		InputRupiahPipe,
		InputRupiahDirective,
		NumericDirective,
		ViewRupiahPipe
	],
  providers: [ { provide: LOCALE_ID, useValue: 'id' }, ProgressSpinner, DialogService ]
})
export class CoreModule { }
