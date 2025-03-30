import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Curso } from '../../types/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private collectionName = 'cursos';

  constructor(private firestore: Firestore) { }

  getCursos(): Observable<Curso[]>{
  const cursosRef = collection(this.firestore, this.collectionName);
  return collectionData(cursosRef) as Observable<Curso[]>;
  }

  getCursosById(id: string): Observable<Curso>{
    const cursoRef = doc(this.firestore, this.collectionName, id);
    return docData(cursoRef) as Observable<Curso>;
  }

  addCurso(curso: Curso) {
    const id = crypto.randomUUID();
    const cursoRef = doc(this.firestore, this.collectionName, id )
    return setDoc(cursoRef, { ...curso, id})
  }

  updateCurso(curso: Curso){
    const cursoRef = doc(this.firestore, this.collectionName, curso.id!.toString());
    return setDoc(cursoRef, curso, {merge:true});
  }

  deleteCurso(id: string){
    const cursoRef = doc(this.firestore, this.collectionName, id);
    return deleteDoc(cursoRef);
  }

}
