import { useEffect, useState } from "react";
import './styles/SelectorMoneda.css';
const SelectorMoneda = ({opciones, monedaBase, setSelectorMoneda})=>{
    const [monedas, setMonedas] = useState([]);
    useEffect(()=>{
        setMonedas(opciones)
    },[opciones]);
    return (
        <div className="SelectorMoneda">
            <div className="mensaje">Selector de moneda</div>
            <select value={monedaBase} onChange={(e)=>setSelectorMoneda(e.target.value)} >
                {monedas.map((el)=><option className="option" key={el} value={el}>{el}</option>)}
            </select>
        </div>
    )
}
export default SelectorMoneda;