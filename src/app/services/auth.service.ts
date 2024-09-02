import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8086/auth'; // URL de base de l'API
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  userRole$ = this.userRoleSubject.asObservable();
  private currentUser: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  inscrireUtilisateur(registerDto: any): Observable<any> {
    const registerUrl = `${this.baseUrl}/registre`; // URL pour l'inscription
    return this.http.post(registerUrl, registerDto);
  }

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`; // URL pour la connexion
    return this.http.post<any>(loginUrl, { email, password })
      .pipe(
        tap((response: any) => {
          if (response.success === 'true') {
            const userRole = response.role;
            this.userRoleSubject.next(userRole);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('authenticatedUser', JSON.stringify(response));
            this.currentUser = email; // Stocker l'utilisateur connecté (si nécessaire)

            // Redirection basée sur le rôle de l'utilisateur
            if (userRole === 'admin') {
              this.router.navigate(['/admin-home']);
            } else if (userRole === 'parent') {
              this.router.navigate(['/parent-home']);
            } else {
              this.router.navigate(['/employee-home']);
            }
          }
        })
      );
  }

  getRole(): Observable<string | null> {
    return this.userRole$; // Retourner directement l'observable de userRoleSubject
  }
}
