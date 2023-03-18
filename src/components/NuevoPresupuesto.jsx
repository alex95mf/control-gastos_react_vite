import React from 'react'
import { useState, useRef } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
  }) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if(!presupuesto || (presupuesto < 0)){
      setMensaje('No es un presupuesto válido')
      return
    }

    setMensaje('')
    setIsValidPresupuesto(true)
  }

  const inputRef = useRef(null);

  const handleInputFocus = () => {
    inputRef.current.select();
  };


  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label>Definir Presupuesto</label>
          <input
            className='nuevo-presupuesto'
            type='number'
            placeholder='Agrega tu presupuesto'
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
            ref={inputRef}
            onFocus={handleInputFocus}
          />
        </div>
        <input
          type='submit'
          value='Agregar'
        />
        {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto