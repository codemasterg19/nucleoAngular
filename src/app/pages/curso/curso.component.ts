import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../services/cursos/cursos.service';
import { Curso } from '../../types/curso';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CartService } from '../../services/cart/cart.service';


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
  cursoAgregado = false;


  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private sanitizer: DomSanitizer,
    private cartService : CartService,
    private router: Router
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

  addToCart(){
    if(this.curso){
      this.cartService.addCurso(this.curso);
      this.cursoAgregado = true;

      setTimeout(() => {
        this.cursoAgregado = false;
      }, 2000);
    }
  }

  regresar(){
    this.router.navigate(['/cursos']);
  }

}
