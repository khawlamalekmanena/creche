import { Component, OnInit } from '@angular/core';
import { AuthserviceEnfantService } from 'src/app/services/authservice.enfant.service';
import Swal from 'sweetalert2';
import { Enfant } from './enfant.model';

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.css']
})
export class EnfantComponent implements OnInit {
  enfants: Enfant[] = []; // Liste des enfants
  filteredEnfants: Enfant[] = []; // Liste des enfants filtrés
  enfantModel = new Enfant(0, '', '', new Date(), new Date(), 0, '', '');
  selectedEnfant: Enfant | null = null;
  nombreEnfants: number = 0;
  searchTerm: string = ''; // Terme de recherche
 

  constructor(private authServiceEnfant: AuthserviceEnfantService) {}

  ngOnInit(): void {
    this.loadEnfants(); // Load list and count of children on initialization
  }

  loadEnfants(): void {
    this.authServiceEnfant.obtenirListeEnfants().subscribe(
      (data: Enfant[]) => {
        this.enfants = data;
        this.filteredEnfants = data; // Initialiser la liste filtrée avec tous les enfants
      },
      
      error => {
        console.error('Erreur lors de la récupération de la liste des enfants : ', error);
      }
    );

    this.authServiceEnfant.compterEnfants().subscribe(
      (count: number) => {
        console.log('Nombre d\'enfants:', count); // Add this line to debug
        this.nombreEnfants = count;
      },
      error => {
        console.error('Erreur lors du comptage des enfants : ', error);
      }
    );
  }
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredEnfants = [...this.enfants]; // Si aucun terme de recherche, affiche tous les enfants
    } else {
      this.filteredEnfants = this.enfants.filter(enfant =>
        enfant.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        enfant.prenom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
 
  onSubmit(): void {
    if (this.selectedEnfant) {
      this.authServiceEnfant.updateEnfant(this.selectedEnfant.id, this.enfantModel).subscribe(
        response => {
          this.loadEnfants(); // Re-fetch the list and count of children
          this.resetForm();
          Swal.fire({
            title: 'Bravo!',
            text: 'L\'enfant a été mis à jour avec succès!',
            icon: 'success'
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'enfant : ', error);
        }
      );
    } else {
      this.authServiceEnfant.ajouterEnfant(this.enfantModel).subscribe(
        response => {
          this.loadEnfants(); // Re-fetch the list and count of children
          this.resetForm();
          Swal.fire({
            title: 'Bravo!',
            text: 'L\'enfant a été ajouté avec succès!',
            icon: 'success'
          });
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'enfant : ', error);
        }
      );
    }
  }

  selectEnfant(enfant: Enfant): void {
    this.selectedEnfant = enfant;
    this.enfantModel = { ...enfant };
  }

  updateEnfant(): void {
    if (this.selectedEnfant) {
      this.authServiceEnfant.updateEnfant(this.selectedEnfant.id, this.enfantModel).subscribe(
        response => {
          this.loadEnfants(); // Re-fetch the list and count of children
          this.resetForm();
          Swal.fire({
            title: 'Bravo!',
            text: 'L\'enfant a été mis à jour avec succès!',
            icon: 'success'
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'enfant : ', error);
        }
      );
    }
  }

  deleteEnfant(id?: number): void {
    if (id) {
      this.authServiceEnfant.deleteEnfant(id).subscribe(
        () => {
          this.loadEnfants(); // Re-fetch the list and count of children
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'enfant a été supprimé avec succès!',
            icon: 'success'
          });
        },
        error => {
          console.error('Erreur lors de la suppression de l\'enfant : ', error);
        }
      );
    }
  }

  resetForm(): void {
    this.enfantModel = new Enfant(0, '', '', new Date(), new Date(), 0, '', '');
    this.selectedEnfant = null;
  }
}