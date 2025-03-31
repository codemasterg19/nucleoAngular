import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { CursoComponent } from './pages/curso/curso.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard"
import { CursoFormComponent } from './pages/curso-form/curso-form.component';
import { permissionsGuard } from './guards/permissions/permissions.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'cursos', component: CursosComponent, 
        ...canActivate(() => redirectUnauthorizedTo(["login"]))
    },
    {path: 'curso/:id', component: CursoComponent, ...canActivate(() => redirectUnauthorizedTo(["login"]))},

    {path: 'curso-form', component: CursoFormComponent}, 
    {path: 'curso-form/:id', component: CursoFormComponent}, 
    {path: 'perfil', component: PerfilComponent, canActivate: [permissionsGuard]},

    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path: '**', component: Error404Component},

];
