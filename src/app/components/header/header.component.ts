import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRole: string | null = null;
  employe = false;
  admin = false;
  parent = false;


  
  constructor(private authService: AuthService) { 
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      this.admin = this.userRole === 'admin';
      this.employe = this.userRole === 'employe'; // Assuming 'employee' is the role value
      this.parent = this.userRole === 'parent'; // Assuming 'parent' is the role value
    });
  }

  ngOnInit(): void {




  }

}
