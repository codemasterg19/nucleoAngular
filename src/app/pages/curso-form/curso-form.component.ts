import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule} from '@angular/forms';
import { CursosService } from '../../services/cursos/cursos.service';

import { Curso } from '../../types/curso';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.css'
})
export class CursoFormComponent {

  form: FormGroup;
  id: string = '';


  constructor ( private cursosService : CursosService, 
    private formBuilder: FormBuilder, 
    private router : Router,
    private activatedRoute: ActivatedRoute,
    
  ){

    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      urlImagen: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      videoUrl: [''],
      pasos: ['']

    });

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id'];

      if(!this.id) return;

      this.cursosService.getCursosById(this.id).subscribe(curso =>{
        this.form.patchValue(curso);
      });
    });

  }

  addCurso(){
    if(this.form.invalid) return;

    const formValue = this.form.value;
    const curso = {
      ...formValue,
      pasos: this.procesarPasos(formValue.pasos)
    }

    this.cursosService.addCurso(curso)
    .then (() => {
      this.router.navigate (['/cursos']);
    })
    .catch(err => console.log(err));
  }

  updateCursos(){
    if(this.form.invalid) return;

    const formValue = this.form.value;
    const curso = {
      id: this.id,
      ...formValue,
      pasos: this.procesarPasos(formValue.pasos)
    }


    this.cursosService.updateCurso(curso)
    .then(() => this.router.navigate(['/cursos']))
    .catch(err => console.log(err))
    
  }

  procesarPasos(input: string | string[]): string[]{
    if (Array.isArray(input)) {
      return input; 
    }
    
    return input
    .split(',')
    .map(p => p.trim())
    .filter(p => p.length >0);
  }

}
