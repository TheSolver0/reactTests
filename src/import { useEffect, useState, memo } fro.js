import { useEffect, useState, memo } from "react"
import { createPortal } from "react-dom"
// import "./style.css"
import { Input } from "./components/forms/Input"
import { Range } from "./components/forms/Range"
import { NavBar } from "./components/navs/NavBar"
import { Checkbox } from "./components/forms/Checkbox"
import { ProductCategoryRow } from "./components/products/ProductCategoryRow"
import { ProductRow } from "./components/products/ProductRow"
import { useIncrement } from "./hooks/useIncrement"
import { useDocumentTitle } from "./hooks/useDocumentTitle"
import { useFetch } from "./hooks/useFetch"
import { ErrorBoundary } from "react-error-boundary"
import { useTodos } from "./hooks/useTodos"

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Pea2" },
]


function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [range, setRange] = useState(1)
  const [timer, setTimer] = useState(5)
  const [secondsLeft, setSecondsLeft] = useState(timer)
  const visibleProducts = PRODUCTS.filter( product => 
  {
    if (showStockedOnly && !product.stocked)
    {
      return false
    }

    if (search && !product.name.includes(search))
    {
      return false
    }
    if (range && parseInt(product.price.substring(1))>range)
    {
    
      return false
    }
    
    return true
  }
  )

  const handleChange = (v) => {
    setTimer(v)
    setSecondsLeft(v)

  }

  useEffect(() => {
    const duration = setInterval(() => {
      setSecondsLeft(v =>{
        if (v<=1)
        {
          clearInterval(duration)
          return 0
        }
        return v - 1
      })
    },1000)

    return () => {
      clearInterval(duration)
    }

  },[timer])


const {v,incr,decr} = useIncrement(0)
useDocumentTitle('')
const {loading,data, errors} = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_delay=2000')
 
const {showCompleted, visibleTodos, toggleFilter, toggleTodo, removeTodo, clearCompleted} = useTodos()
  

return (
  <div>
    <NavBar/>
  <div className="container my-3">
    <SearchBar 
      search={search}
      onSearchChange={setSearch}
      showStockedOnly={showStockedOnly} 
      onStockedOnlyChange={setShowStockedOnly}
      range={range}
      onRangeChange={setRange}
    />
    <ErrorBoundary 
      FallbackComponent={AlertError}
      onReset={() => console.log('reset')}
    >
      <ProductsTable products={visibleProducts}/>
    </ErrorBoundary>

    <Timer
      timer={timer}
      onTimerChange={handleChange}
      secondsLeft={secondsLeft}
    />
    {v}
    <br />
    <button onClick={incr} className="btn btn-primary">Incrementer</button>
    <button onClick={decr} className="btn btn-warning">Decrementer</button>
  </div>

  <div>

    contenu API: {loading && <span>Chargement...</span>}
    {data &&
    <ul>{data.map(post => (<li key={post.id}>{post.title}</li>))}</ul>}
  </div>
  <InfoMemo/>

  <p>
    <input 
      type="checkbox"
      id="todos"
      onChange={toggleFilter}
      checked = {showCompleted}
    /> 
    <label htmlFor="todos">Afficher les tâches accomplies</label>
  </p>
  <ul>
    {visibleTodos.map(todo => 
    (
       <li
          key={todo.name}
       >
        <input 
          type="checkbox"
          onChange={() => toggleTodo(todo)}
          checked={todo.checked}
        />
        {todo.name}
        <button 
          className="btn btn-danger"
          onClick={() => removeTodo(todo)}
        >Supprimer</button>
       </li>
    ) )}
  </ul>
  <button 
    type="button"
    className="btn btn-danger"
    onClick={clearCompleted}
  >Supprimer les taches accomplies</button>
  </div>
  )
}

function AlertError ({error, resetErrorBoundary})
{
  return (
    <div className="alert alert-danger">
      {error.toString()}
      <button 
        className="btn btn-secondary"
        onClick={resetErrorBoundary}
      >
        Reset
      </button>
    </div>
  )
}

function SearchBar({search,onSearchChange, showStockedOnly, onStockedOnlyChange, range, onRangeChange})
{
  
  return (
    <div className="mb-3">
      <Input 
        placeholder="Rechercher..."
        onChange= {onSearchChange}
        value={search}
      />
      <Checkbox 
        id="stocked"
        checked={showStockedOnly}
        onChange={onStockedOnlyChange}
        label="N'afficher que les produits en stock"
      />
      <Range
        id={range}
        min= {1}
        max= {5}
        label="Filtrer en fonction du prix"
        onChange={onRangeChange}
      />
    </div>
    
  )
}
function ProductsTable({products})
{
  const rows = []
  let lastCategory = null
  for(let product of products)
  {
    if(product.category !== lastCategory)
    {
      rows.push(<ProductCategoryRow key={product.category} name={product.category}/>)
    }
    lastCategory = product.category
    rows.push(<ProductRow product={product} key={product.name}/>)
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
              <th>Nom</th>
              <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
            
      </table>
    </>
  )
}
function Timer({secondsLeft, timer, onTimerChange})
{
  return (
  <div className="vstack gap-2">
  <Input
    id={timer}
    value={timer}
    placeholder='Timer...'
    onChange={onTimerChange}
  />
  <label htmlFor={timer}>Décompte : {secondsLeft}</label>
  </div>
  )
}
const InfoMemo = memo(function Info() 
{
  console.log('info','render')
  return (
    <div className="alert alert-info">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi magni mollitia fugit nobis molestiae cumque est vel voluptates tempora doloremque voluptatem nesciunt maxime explicabo dolor, inventore voluptas iste ea reiciendis.
    </div>
  )
})
function Modal()
{
  return(
    createPortal (
      <div style={
        {
          position: 'absolute',
          top: 0,
          right: 0,
          padding: 0,
          border: 'solid 1px grey',
          background: '#FFF',
          display: 'none'
      }}>
          Je suis un modal
      </div>
    , document.body)
    
  )
}

export default App
