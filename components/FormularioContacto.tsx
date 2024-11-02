"use client";
import { Usuario } from "@/models/InfoUsuario";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Formulario from "./Formulario";
import InfoUsuario from "./DataList";

export default function FormularioContacto() {
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
  const [edad, setEdad] = useState<number | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isSubmited, setSubmited] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  
  const calcularEdad = (fecha: Date): number => {
    const fechaNacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  useEffect(() => {
    if (isSubmited) {
      const timer = setTimeout(() => setSubmited(false), 11000);
      return () => clearTimeout(timer);
    }
  }, [isSubmited]);

 async function cargarContactos (){
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacto`)
      const data = await res.json()

      setUsuarios(data)

      console.log(data)
    } catch (error) {
      console.error("ocurrio un error al consultar los datos"+ error)
    }

  }

    useEffect(()=>{
    cargarContactos()
  }, [])



  const registrarContactos = async () => {
    const fechaNacimientoFormat = fechaNacimiento?.toISOString().split("T")[0];
    
    try {
      let res;
      if(nombre && apellido && telefono && correo){
        if (selectedUser && selectedUser.id) {
          res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacto/${selectedUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre,
              apellido,
              correo,
              telefono,
              fechaNacimientoFormat,
              edad,
            }),
          });
        } else {
          res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contactoreg`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre,
              apellido,
              correo,
              telefono,
              fechaNacimientoFormat,
              edad,
            }),
          });
        }
    
        if (res.ok) {
          alert(selectedUser ? "Contacto actualizado exitosamente" : "Contacto creado exitosamente");
          cargarContactos();
          setNombre("");
          setApellido("");
          setCorreo("");
          setTelefono("");
          setFechaNacimiento(null);
          setEdad(null);
          setSubmited(true);
          setSelectedUser(null);
        }
      } else{
        cargarContactos()
      }
     
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = async (e:any) =>{
    e.preventDefault();
    console.log("datos de formulario:", {nombre, apellido, correo, telefono, fechaNacimiento: fechaNacimiento?.toISOString().split('T')[0], edad})
  await registrarContactos()
    
  }

  const deleteUser = async (usuario: Usuario) => {
    try {
      console.log("el id a borrar es:", usuario.id)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contactodrop/${usuario.id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        alert("Contacto eliminado exitosamente");
        cargarContactos();
      } else {
        throw new Error("Error al eliminar el contacto");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar eliminar el contacto"+error);
    }
  };

  const editingUser = (usuario: Usuario) => {
    setSelectedUser(usuario);
    setNombre(usuario.nombre);
    setApellido(usuario.apellido);
    setTelefono(usuario.telefono);
    setCorreo(usuario.correo);
    setFechaNacimiento(usuario.fechaNacimiento);
    setEdad(usuario.edad);
  };



  const camposFormulario = [
    { label: "Nombre", value: nombre, onChange: (e:any) => setNombre(e.target.value), type: "text" },
    { label: "Apellido", value: apellido, onChange: (e:any) => setApellido(e.target.value), type: "text" },
    { label: "Teléfono", value: telefono, onChange: (e:any) => setTelefono(e.target.value), type: "text" },
    { label: "Correo", value: correo, onChange: (e:any) => setCorreo(e.target.value), type: "text" },
  ];

  return (
    <>
      {isSubmited && <p className="text-green-500 text-center text-4xl">Registrado :D !!!!!!</p>}
      <form className="max-w-sm mx-auto mt-5" onSubmit={submitForm}>
        <Formulario campos={camposFormulario} />
        <div className="mb-5">
          <label htmlFor="fechaNacimiento" className="form-label">
            Fecha de Nacimiento
          </label>
          <DatePicker
            selected={fechaNacimiento}
            onChange={(date: Date | null) => {
              setFechaNacimiento(date);
              setEdad(date ? calcularEdad(date) : null);
            }}
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholderText="Selecciona tu fecha de nacimiento"
          />
        </div>

        {edad !== null && <p>Edad: {edad} años</p>}

        <InfoUsuario usuarios={usuarios} cargarContactos={cargarContactos} editUser={editingUser} deleteUser={deleteUser}/>


        <button type="submit" className="btn btn-primary">
        {selectedUser ? "Actualizar información" : "Enviar información"}
        </button>
      </form>
    </>
  );
}


