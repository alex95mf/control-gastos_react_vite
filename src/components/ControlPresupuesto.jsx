import { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
    gastos,
    setGastos, 
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto,
    setDisponibleGlobal
  }) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  
  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => 
      gasto.cantidad + total, 0)

    const totalDisponible = presupuesto - totalGastado

    // Calcular porcentaje gastado
    const nuevoPorcentaje = 
      ( ((presupuesto - totalDisponible) / presupuesto * 100)
        .toFixed(2) )    
   
    setDisponible(totalDisponible)
    setGastado(totalGastado)
    setDisponibleGlobal(totalDisponible)

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000);

  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  const handleResetApp = () => {
    // const resultado = confirm('¿Está seguro de que desea reiniciar los datos?')
    confirmAlert({
      title: 'Confirmar',
      message: '¿Está seguro de que desea reiniciar los datos?',
      buttons:[
        {
          label: 'Aceptar',
          onClick: () => reiniciarDatos()
        },
        {
          label: 'Cancelar',
          onClick: () => {}
        }
      ]
    })
    // if(resultado){
    //   setPresupuesto(0)
    //   setGastos([])
    //   setIsValidPresupuesto(false)
    // }    
  }

  const reiniciarDatos = () => {
    setPresupuesto(0)
    setGastos([])
    setIsValidPresupuesto(false)
    console.log('Reiniciado')
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: '#3B82F6'
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className='contenido-presupuesto'>
        <button 
          className='reset-app' 
          type='button' 
          onClick={handleResetApp}>
          Reiniciar Datos
        </button>
        <p>
          <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>{formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>{formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto