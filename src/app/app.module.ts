import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { EnfantComponent } from './components/enfant/enfant.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ParentComponent } from './components/parent/parent.component';
import { ActiviteComponent } from './components/activite/activite.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    EnfantComponent,
    HeaderComponent,
    FooterComponent,
    AdminHomeComponent,
    ParentComponent,
    ActiviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
    // Assurez-vous que EmployeService est ici
  bootstrap: [AppComponent]
})
export class AppModule { }
