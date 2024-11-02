import { FormularioProps } from '@/models/Formulario';
import React from 'react'

export default function Formulario({ campos }: FormularioProps) {
    return (
      <>
        {campos.map((campo, index) => (
          <div key={index} className="mb-5">
            <label className="form-label">{campo.label}</label>
            <input
              type={campo.type}
              className="form-control"
              value={campo.value}
              onChange={campo.onChange}
            />
          </div>
        ))}
      </>
    );
  }