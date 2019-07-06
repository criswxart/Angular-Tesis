import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  LoginGuardGuard,
  AdminGuard,
  ProfesionalService,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  VerificaTokenGuard,
  UsuarioService,
  TipointerService,
  IntervencionService,
  PlanService
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    ProfesionalService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    VerificaTokenGuard,
    UsuarioService,
    TipointerService,
    IntervencionService,
    PlanService
  ],
  declarations: []
})
export class ServiceModule { }
