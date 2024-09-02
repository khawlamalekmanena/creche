import { Component, OnInit } from '@angular/core';
import { ActiviteService } from 'src/app/services/activite.service';
import { Activite } from './activite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {
  activites: Activite[] = [];
  activiteModel = new Activite(0, '', '');
  selectedActivite: Activite | null = null;

  constructor(private activiteService: ActiviteService) {}

  ngOnInit(): void {
    this.loadActivites();
    
  }

  loadActivites(): void {
    this.activiteService.obtenirListeActivites().subscribe(
      (data: Activite[]) => {
        this.activites = data;
        console.log(this.activites);  // Vérifier si les données sont bien assignées
      },
      error => {
        console.error('Erreur lors de la récupération de la liste des activités : ', error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.selectedActivite) {
      this.activiteService.updateActivite(this.selectedActivite.id, this.activiteModel).subscribe(
        response => {
          this.loadActivites();
          this.resetForm();
          Swal.fire('Bravo!', 'L\'activité a été mise à jour avec succès!', 'success');
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'activité : ', error);
        }
      );
    } else {
      this.activiteService.ajouterActivite(this.activiteModel).subscribe(
        response => {
          this.loadActivites();
          this.resetForm();
          Swal.fire('Bravo!', 'L\'activité a été ajoutée avec succès!', 'success');
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'activité : ', error);
        }
      );
    }
  }

  selectActivite(activite: Activite): void {
    this.selectedActivite = activite;
    this.activiteModel = { ...activite };
  }
  
  deleteActivite(id: number): void {
    this.activiteService.deleteActivite(id).subscribe(
      () => {
        this.loadActivites();
        Swal.fire('Supprimé!', 'L\'activité a été supprimée avec succès!', 'success');
      },
      error => {
        console.error('Erreur lors de la suppression de l\'activité : ', error);
      }
    );
  }
  

  resetForm(): void {
    this.activiteModel = new Activite(0, '', '');
    this.selectedActivite = null;
  }
}