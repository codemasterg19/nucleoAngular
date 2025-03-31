import { Injectable } from '@angular/core';
import { Curso } from '../../types/curso';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cursos: Curso[] = [];

  private cartVisible = false;

  constructor() { }

  addCurso(curso: Curso) {
    this.cursos.push(curso);
  }

  removeCurso(curso: Curso) {
    const index = this.cursos.indexOf(curso);
    if (index !== -1) {
      this.cursos.splice(index, 1);
    }
  }

  getTotal(){
    return this.cursos.reduce((total, curso) => total + curso.precio, 0);
  }

  getCursos(){
    return this.cursos;
  }

  isCartVisible() {
    return this.cartVisible;
  }

  showCart() {
    this.cartVisible = true;
  }

  hideCart() {
    this.cartVisible = false;
  }

}
