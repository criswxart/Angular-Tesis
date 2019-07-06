import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfesionalComponent } from './profesionales/profesional.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { TipointerComponent } from './tipointer/tipointer.component';
import { IntervencionComponent } from './intervencion/intervencion.component';
import { IntervencionesComponent } from './intervencion/intervenciones.component';
import { PlanesComponent } from './planes/planes.component';
import { PlanComponent } from './planes/plan.component';


const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard' }
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    { path: 'intervenciones', component: IntervencionesComponent, data: { titulo: 'Intervención' } },
    { path: 'intervencion/:id', component: IntervencionComponent, data: { titulo: 'Actualizar Intervención' } },

    // Mantenimientos
    {
        path: 'profesionales',
        component: ProfesionalesComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Profesionales' }
    },
    {   path: 'profesionales/crear', 
        component: ProfesionalComponent,
        canActivate: [AdminGuard], 
        data: { titulo: 'Crear Profesional' } 
    },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    { path: 'planes', component: PlanesComponent, data: { titulo: 'Mantenimiento de Planes' } },
    { path: 'planes/:id', component: PlanComponent, data: { titulo: 'Actualizar Plan' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    { path: 'tipos', component: TipointerComponent, data: { titulo: 'Tipos de intervenciones' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
    { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
    { path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'Crear Usuarios' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
