import { Component, OnInit } from '@angular/core';
import { AuthserviceEnfantService } from 'src/app/services/authservice.enfant.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  totalEnfants: number = 0;

  constructor(private authoserviceenfantservice: AuthserviceEnfantService) {}

  ngOnInit(): void {
    this.getTotalEnfants();
  }

  getTotalEnfants(): void {
    this.authoserviceenfantservice.compterEnfants().subscribe((total: number) => {
      this.totalEnfants = total;
    });
  }
}