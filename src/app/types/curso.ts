export type Curso = {
    id: string;
    titulo: string;
    descripcion: string;
    urlImagen: string;
    precio: number;
    videoUrl?: string;
    pasos?:string[];


}