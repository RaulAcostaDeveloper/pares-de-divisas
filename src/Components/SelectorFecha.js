import './styles/SelectorFecha.css';
const SelectorFecha =({selectorFecha, setSelectorFecha})=>{
    return (
        <div className="SelectorFecha">
            <div className="mensaje">Selector de fecha</div>
            <input 
                type={'date'} 
                value={selectorFecha} 
                onChange={(e)=> setSelectorFecha(e.target.value)}
                min={'1999-01-04'}
                max={new Date().toISOString().split("T")[0]}
            />
        </div>
    )
}
export default SelectorFecha;