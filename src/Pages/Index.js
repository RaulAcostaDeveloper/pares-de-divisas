import { useEffect, useState } from "react";
import Header from "../Components/Header";
import DivisaVsMoneda from "../Components/DivisaVsMoneda";
import Loading from "../Components/Loading";
import SelectorMoneda from "../Components/SelectorMoneda";
import './styles/Index.css';
const Index = ()=>{
    const [monedas, setMonedas] = useState({});
    const [selectorMoneda, setSelectorMoneda] = useState('USD');
    const [nombresMoneda, setNombresMoneda] = useState([]);
    const [monedaBase, setMonedaBase] = useState('');
    const [time, setTime] = useState('');
    useEffect(()=>{
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?from=`+selectorMoneda)
        .then(resp => resp.json())
        .then((data) => {
            // Extrae la data del objeto y la transforma a objetos en un arreglo
            let clavesMonedas = Object.keys(data.rates);
            let valoresMonedas = Object.values(data.rates); 
            let arrTemp = [];
            for (let index = 0; index < clavesMonedas.length; index++) {
                arrTemp.push({
                    clave:clavesMonedas[index],
                    valor:valoresMonedas[index],
                })
            }
            setNombresMoneda(clavesMonedas);
            setMonedas(arrTemp);
            setMonedaBase(data.base)
            setTime(data.date);
        }).catch(e=>{
            console.log('GET Error');
            console.log(e);
        });
    },[selectorMoneda]);
    return (
        <div>
            <Header/>
            <SelectorMoneda opciones = {nombresMoneda} monedaBase= {monedaBase} setSelectorMoneda={setSelectorMoneda}/>
            {(monedas.length>0)?
                <div className="contenedorMonedas">
                    {monedas.map((moneda)=>
                        <DivisaVsMoneda
                        key={moneda.clave}
                        monedaActual={moneda.clave}
                        monedaBase={monedaBase}
                        cantidad = {moneda.valor}
                        time = {time}
                        />)}
                </div>
            :
            <Loading/>
            }
        </div>
    )
}
export default Index;