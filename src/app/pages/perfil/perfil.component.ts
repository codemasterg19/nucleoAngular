import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  userData: any = null;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser()?.then(user => {
      this.userData = user;
    });
  }
}
