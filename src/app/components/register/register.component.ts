import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  ngOnInit(): void {
  }


  registrationForm: FormGroup; // FormGroup pour gérer le formulaire
  selectedRole: any; // Pour suivre le rôle sélectionné
  IsAlert: boolean = false; // Contrôle de l'affichage de l'alerte
  IsSuccessAlert: boolean = false; // Contrôle de l'affichage de l'alerte de succès

  constructor(
    private fb: FormBuilder, // FormBuilder pour créer le formulaire
    private inscriptionService: AuthService, // Service d'inscription

  ) {
    // Initialisation du formulaire
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required],
      fidelite: [''],  // Champ spécifique pour parent
      salaire: [''],   // Champ spécifique pour employé
      poste: ['']      // Champ spécifique pour employé
    });

}

  // Soumission du formulaire
  onSubmit() {
    const formData = this.registrationForm.value;
    this.inscriptionService.inscrireUtilisateur(formData).subscribe(
      (response) => {
      
      },
      (error) => {
       
      }
    );
  }

  // Changement de rôle
  onRoleChange(event: any) {
    this.selectedRole = event.target.value;
  }

}
