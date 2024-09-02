import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Importer le Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Injecter le Router

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.success === 'true') {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
          this.router.navigate(['/admin-home']);
        } else if (userRole === 'parent') {
          this.router.navigate(['/parent']);
        } else if (userRole === 'employee') {
          this.router.navigate(['/employe']);
        } else {
          this.router.navigate(['/login']); // Gérer les rôles inconnus
        }
      } else {
        this.message = 'Échec de la connexion'; // Afficher un message d'erreur
        console.error('Échec de la connexion');
      }
    }, error => {
      this.message = 'Erreur lors de la connexion';
      console.error('Erreur lors de la connexion:', error);
    });
  }
}

