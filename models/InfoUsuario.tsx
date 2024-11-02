export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    fechaNacimiento: Date | null;
    edad: number;
  }
  
export interface InfoUsuarioLista {
    usuarios: Usuario[];
    cargarContactos: () => Promise<void>;
    editUser: (usuario: Usuario) => void;
    deleteUser: (usuario: Usuario) => void;
  }