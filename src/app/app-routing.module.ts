import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EnfantComponent } from './components/enfant/enfant.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ParentComponent } from './components/parent/parent.component';
import { ActiviteComponent } from './components/activite/activite.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection vers la page de connexion par défaut
  { path: 'home', component: HomeComponent }, // Route pour la page d'accueil
  { path: 'register', component: RegisterComponent }, // Route pour la page d'inscription
  { path: 'login', component: LoginComponent }, // Route pour la page de connexion
  { path: 'liste-enfants', component: EnfantComponent }, // Route pour la liste des enfants
  { path: 'enfant', component: EnfantComponent }, // Route pour le formulaire d'enfant
  { path: 'admin-home', component: AdminHomeComponent } ,// Route pour la page d'accueil admin,
  {path:'parent', component: ParentComponent},
  { path: 'gestion-enfants', component: EnfantComponent },
  {path: 'gestion-activite', component:ActiviteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
