import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enfant } from '../components/enfant/enfant.model';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceEnfantService {
  private apiUrl = 'http://localhost:8086/enfants';

  constructor(private http: HttpClient) {}

  ajouterEnfant(enfant: Enfant): Observable<Enfant> {
    return this.http.post<Enfant>(`${this.apiUrl}/saveEnfant`, enfant);
  }

  obtenirListeEnfants(): Observable<Enfant[]> {
    return this.http.get<Enfant[]>(this.apiUrl);
  }

  compterEnfants(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  updateEnfant(id: number, enfant: Enfant): Observable<Enfant> {
    return this.http.put<Enfant>(`${this.apiUrl}/${id}`, enfant);
  }

  deleteEnfant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
