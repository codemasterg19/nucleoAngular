import { Component } from '@angular/core';
import { Curso } from '../../types/curso';
import { CursosService } from '../../services/cursos/cursos.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {

  cursos: Curso[] = [];
  role: string = "user";

  constructor(private cursosService: CursosService, private router: Router, private userService: UsersService){}

  ngOnInit(): void {
    this.getCursos();
    this.getRole();
  }

  getCursos(){
    this.cursosService.getCursos().subscribe(cursos => {
      this.cursos = cursos
    })
  }

  deleteCursos(id: string){
    this.cursosService.deleteCurso(id)
    .then(() => { console.log("Curso Eliminado");
      this.router.navigate(['/cursos']);
    })
    .catch(err => console.log(err));
  }

  goToCurso(id: string){
    this.router.navigate(['curso',id]);
  }

  getRole(){
    this.userService.getCurrentUser()!
    .then(user =>{
      console.log(user);
      this.role = user?.["role"]
    }
    );
  }
}
