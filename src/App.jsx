import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem('gastos')) ?? []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)  

  const [disponibleGlobal, setDisponibleGlobal] = useState(0)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      handleNuevoGasto()
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro){
      // Filtrar gastos por categoría
      const gastosFiltrados = gastos.filter(gasto => 
        gasto.categoria === filtro
      )
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, []) 

  const handleNuevoGastoAgregar = () => {
    setGastoEditar({})
    handleNuevoGasto()
  }

  const handleNuevoGasto = () => {
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)	
    }, 300)
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => 
          gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 300)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }
  
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setDisponibleGlobal={setDisponibleGlobal}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
          <img
            src={IconoNuevoGasto}
            alt='Icono Nuevo Gasto'
            onClick={handleNuevoGastoAgregar}
          />
        </div>
      </>
      )}

      {modal && 
      <Modal 
        setModal={setModal} 
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        disponibleGlobal={disponibleGlobal}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}
      
    </div>
  )
}

export default App
