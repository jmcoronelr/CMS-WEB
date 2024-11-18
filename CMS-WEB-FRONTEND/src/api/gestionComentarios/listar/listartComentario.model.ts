/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface ComentarioListarRequest{
    libroId: number;
}

/**
 * Datos retornados por el backend
 */
export type ComentarioListarResponse = {
    comentarios: ComentarioListarData[],
    totalPaginas: number,
    totalItems: number,
    paginaActual: number
}

export interface ComentarioListarData{
    id: number,
    usuarioNombre: string;
    fecha: string;
    contenido: string;
}