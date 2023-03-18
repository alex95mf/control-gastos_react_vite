import { useState, useEffect, useRef } from "react"
import Mensaje from "./Mensaje"
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto,
    disponibleGlobal,
    gastoEditar,
    setGastoEditar
  }) => {

  const [mensaje, setMensaje] = useState('')

  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState(0)
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }else{
      setNombre('')
      setCantidad(0)
      setCategoria('')
      setId('')
      setFecha('')
    }
  }, [])

  const ocultarModal = () => {   
    setAnimarModal(false)

    setGastoEditar({})

    setTimeout(() => {
      setModal(false)
    }, 300)
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    if([ nombre, cantidad, categoria ].includes('')){
      setMensaje('Todos los campos son obligatorios')

      setTimeout(() => {
        setMensaje('')
      }, 3000);
      return
    }
    if(cantidad <= 0){
      setMensaje('Ingrese una cantidad válida (mayor a cero)')

      setTimeout(() => {
        setMensaje('')
      }, 3000);
      return
    }
    // if(cantidad > disponibleGlobal){
    //   setMensaje('No tiene suficiente presupuesto disponible para este gasto')

    //   setTimeout(() => {
    //     setMensaje('')
    //   }, 3000);
    //   return
    // }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }

  const inputRef = useRef(null);

  const handleInputFocus = () => {
    inputRef.current.select();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
          src={CerrarBtn}
          alt="Cerrar Modal"
          onClick={ocultarModal}
        />
      </div>
      <form 
        onSubmit={handleSubmit} 
        className={`formulario ${animarModal ? 'animar' : 'cerrar' }`}>
        <legend>{Object.keys(gastoEditar).length > 0 ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}        
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Agrega el nombre del Gasto"
            value={nombre}
            onChange={e => {setNombre(e.target.value)}}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Valor</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Agrega la cantidad del Gasto"
            value={cantidad}
            onChange={e => {setCantidad(Number(e.target.value))}}
            ref={inputRef}
            onFocus={handleInputFocus}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select id="categoria" 
            value={categoria} 
            onChange={e => {setCategoria(e.target.value)}}>
              <option value={''}>-- Seleccione --</option>
              <option value='ahorro'>Ahorro</option>
              <option value='comida'>Comida</option>
              <option value='casa'>Casa</option>
              <option value='gastos'>Gastos</option>
              <option value='ocio'>Ocio</option>
              <option value='salud'>Salud</option>
              <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={Object.keys(gastoEditar).length > 0 ? 'Guardar Cambios' : 'Agregar Gasto'}
        />
      </form>
    </div>
  )
}

export default Modal