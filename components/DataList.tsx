"use client"
import { InfoUsuarioLista } from '@/models/InfoUsuario'

export default function InfoUsuario({ usuarios, editUser, deleteUser}: InfoUsuarioLista) {


  return (
    <div className="mt-5">
    <h2>Lista de Usuarios Registrados</h2>
    <table className="table">
      <thead>
        <tr>
        <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Fecha de Nacimiento</th>
          <th>Edad</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellido}</td>
            <td>{usuario.telefono}</td>
            <td>{usuario.correo}</td>
            <td>{usuario.fechaNacimiento ? usuario.fechaNacimiento.toString() : ''}</td>
            <td>{usuario.edad}</td>
            <td>
            <button onClick={() => editUser(usuario)} className="btn btn-secondary">Editar</button>
            <button onClick={() => deleteUser(usuario)} className="btn btn-danger">Eliminar</button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
