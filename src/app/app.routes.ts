import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { CursoComponent } from './pages/curso/curso.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { LoginComponent } from './pages/login/login.component';
import { CursoFormComponent } from './pages/curso-form/curso-form.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'cursos', component: CursosComponent},
    {path: 'curso/:id', component: CursoComponent},

    {path: 'curso-form', component: CursoFormComponent}, //crear
    {path: 'curso-form/:id', component: CursoFormComponent}, //editar

    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path: '**', component: Error404Component},

];
