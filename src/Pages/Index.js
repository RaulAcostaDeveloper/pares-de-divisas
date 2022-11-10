import { useEffect, useState } from "react";
import Header from "../Components/Header";
import DivisaVsMoneda from "../Components/DivisaVsMoneda";
import Loading from "../Components/Loading";
import SelectorMoneda from "../Components/SelectorMoneda";
import SelectorFecha from "../Components/SelectorFecha";
import './styles/Index.css';
const Index = ()=>{
    const [monedas, setMonedas] = useState({});
    const [selectorMoneda, setSelectorMoneda] = useState('USD');
    const [selectorFecha, setSelectorFecha]=useState('');
    const [nombresMoneda, setNombresMoneda] = useState([]);
    const [monedaBase, setMonedaBase] = useState('');
    const [time, setTime] = useState('');
    useEffect(()=>{//Traer por moneda
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/${selectorFecha || 'latest'}?from=${selectorMoneda}`)
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
    },[selectorFecha, selectorMoneda]);


 
    console.log(selectorFecha);
    return (
        <div>
            <Header/>
            <SelectorMoneda opciones = {nombresMoneda} monedaBase= {monedaBase} setSelectorMoneda={setSelectorMoneda}/>
            <SelectorFecha selectorFecha={selectorFecha} setSelectorFecha={setSelectorFecha}/>
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