import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model'
import { workerFakeApi } from './server.fake';

export const LIBRO_ENDPOINTS = {
  listarLibros: 'http://127.0.0.1:8000/api/listar-libro'
}
/**
 * Listado de libros por defecto
 */
export const MOCK_LIBROS: LibroListarData[] = [
  {
    "id": 2,
    "titulo": "LIBRO_ Guardado",
    "fecha": "2024-10-18T16:38:37.324064Z",
    "author": 2,
    "categoria": 1,
    "estado": "Guardado",
    "contenido": "<p>sdsdsds</p>",
    "categoriaNombre": "CTG1",
    "autorNombre": "admin2",
    "vistas": 10,
    "likes": 5
  },
  {
    "id": 3,
    "titulo": "LIBRO_ En Revision",
    "fecha": "2024-10-18T16:38:37.324064Z",
    "author": 2,
    "categoria": 1,
    "estado": "En Revision",
    "contenido": "<p>sdsdsds</p>",
    "categoriaNombre": "CTG1",
    "autorNombre": "admin2",
    "vistas": 2,
    "likes": 4
  },
  {
    "id": 4,
    "titulo": "LIBRO_ Rechazado",
    "fecha": "2024-10-18T16:38:37.324064Z",
    "author": 2,
    "categoria": 1,
    "estado": "Rechazado",
    "contenido": "<p>sdsdsds</p>",
    "categoriaNombre": "CTG1",
    "autorNombre": "admin2",
    "vistas": 1,
    "likes": 2
  },
  {
    "id": 5,
    "titulo": "LIBRO_ Publicado",
    "fecha": "2024-10-18T16:38:37.324064Z",
    "author": 2,
    "categoria": 1,
    "estado": "Publicado",
    "contenido": "<p>sdsdsds</p>",
    "categoriaNombre": "CTG1",
    "autorNombre": "admin2",
    "vistas": 0,
    "likes": 3
  }
]

/**
 * Retorna el listado de libros y información acerca del listado
 * @returns 
 */
export function mockLibros(){

    return {
        mockLibros: MOCK_LIBROS,
        cantidad: MOCK_LIBROS.length,
        cantidadGuardados: 1,
        cantidadEnRevision: 1,
        cantidadPublicados: 1,
        cantidadRechazados: 1,

        libroConMasLike: MOCK_LIBROS.reduce((acc, libro) =>  acc?.likes < libro?.likes ? libro  : acc  , {} as LibroListarData ), 
        totalMeGustas:  MOCK_LIBROS.reduce((acc, libro) =>  acc + libro?.likes ,0),
        totalVistas:  MOCK_LIBROS.reduce((acc, libro) =>  acc + libro?.vistas ,0)
    }
}