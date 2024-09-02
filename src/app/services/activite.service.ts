import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activite } from '../components/activite/activite.model';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  private apiUrl = 'http://localhost:8086/activites';

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter une activité
  ajouterActivite(activite: Activite): Observable<Activite> {
    return this.http.post<Activite>(`${this.apiUrl}/saveActivite`, activite);
  }

  obtenirListeActivites(): Observable<Activite[]> {
    return this.http.get<Activite[]>(`${this.apiUrl}/all`);
  }
  
  deleteActivite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  updateActivite(id: number, activite: Activite): Observable<Activite> {
    return this.http.put<Activite>(`${this.apiUrl}/${id}`, activite);
  }
  
}
