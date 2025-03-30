import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../../services/cursos/cursos.service';
import { Curso } from '../../types/curso';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent {

  curso?: Curso;
  videoUrlSeguro?: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.cursosService.getCursosById(id).subscribe(curso => {
        this.curso = curso;
        if(this.curso.videoUrl){
          this.videoUrlSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(this.curso.videoUrl);
        }
      })
    }
  }

}
