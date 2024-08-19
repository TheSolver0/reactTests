import { useEffect, useState, memo, forwardRef } from "react"
import { Input } from "../components/forms/Input"
import { Range } from "../components/forms/Range"
import { Checkbox } from "../components/forms/Checkbox"
import { ProductCategoryRow } from "../components/products/ProductCategoryRow"
import { ProductRow } from "../components/products/ProductRow"
import { ErrorBoundary } from "react-error-boundary"
import { motion, stagger } from "framer-motion"


const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Pea2" },
  ]

export function ExoTableauProduits()
{
  const [showStockedOnly, setShowStockedOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [range, setRange] = useState(1);
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
    const wrapperVariants = {
        hidden: {opacity: 0, y: -100},
        visible: {opacity: 1, y: 0}, 
        tap: {scale: 1.03}
    }
    return (
        <div>
            <h1>ExoTableauProduits</h1>
            <MotionSearchBar 
                search={search}
                onSearchChange={setSearch}
                showStockedOnly={showStockedOnly} 
                onStockedOnlyChange={setShowStockedOnly}
                range={range}
                onRangeChange={setRange}
                variants={wrapperVariants}
                whileTap={'tap'}
                initial={'hidden'} 
                animate={'visible'}
                style={{background: 'red'}}
            />
            <ErrorBoundary 
                FallbackComponent={AlertError}
                onReset={() => console.log('reset')}
            >
            <ProductsTable products={visibleProducts}/>
            </ErrorBoundary>

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
const SearchBar = forwardRef(({search,onSearchChange, showStockedOnly, onStockedOnlyChange, range, onRangeChange}, ref) =>
{
  
  return (
    <div className="mb-3" ref={ref}>
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
    
  );
})

const MotionSearchBar = motion(SearchBar);

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