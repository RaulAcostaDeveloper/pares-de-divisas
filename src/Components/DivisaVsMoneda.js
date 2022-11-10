import { useEffect, useState } from 'react';
import './styles/DivisaVsMoneda.css';
const DivisaVsMoneda = ({monedaBase, monedaActual, cantidad, time})=>{
    const [multiplicador, setMultiplicador] = useState(1);
    const [cantidadMoneda, setCantidadMoneda] = useState(0);
    useEffect(()=>{
        setCantidadMoneda(multiplicador * cantidad);
    },[multiplicador, cantidad]);
    return (
        <div className="divisaVsMoneda">
            <div className='cantidades'>
                <input value={multiplicador} onChange={(e)=>setMultiplicador(e.target.value)}/>
                <b className='nombreDivisa'>{monedaBase}</b> son {cantidadMoneda}<b className='nombreDivisa'>{monedaActual}</b>
            </div>
            <div className='time'>
                {time}
            </div>
        </div>
    )
}
export default DivisaVsMoneda;