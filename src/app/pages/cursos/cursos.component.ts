import { Component } from '@angular/core';
import { Curso } from '../../types/curso';
import { CursosService } from '../../services/cursos/cursos.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {

  cursos: Curso[] = [];

  constructor(private cursosService: CursosService, private router: Router){}

  ngOnInit(): void {
    this.getCursos();
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
}
