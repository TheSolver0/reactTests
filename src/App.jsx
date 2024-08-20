import { createBrowserRouter, defer, Link, NavLink, Outlet, RouterProvider, useNavigation, useRouteError } from "react-router-dom"
import {Home} from "../src/pages/Home"
import {ExoApi} from "../src/pages/ExoApi"
import {ExoBlog} from "../src/pages/ExoBlog"
import {ExoTableauProduits} from "../src/pages/ExoTableauProduits"
import {ExoTodoApp} from "../src/pages/ExoTodoApp"
import logo from './assets/Images/web-programming.png';
import { Spinner } from "./components/Spinner"

import { useState } from "react";
import React from 'react';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root/>,
       errorElement: <PageError/>,
       children: [
         {
           path: '',
           element: <Home/>
         },
         {
           path: 'exoapi',
           element: <ExoApi/>
         },
         {
           path: 'exoblog',
           element: <div className="row">
             <aside className="col-3">
               <h2>Sidebar</h2>
             </aside>
             <main className="col-9">
               <Outlet/>
             </main>
           </div>,
           children: [
             {
               path: '',
               element: <ExoBlog />,
               loader: () => {
                 const posts = fetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_delay=2000')
                               .then(r => r.json())
                 return defer(
                   {
                     posts
                   }
                 )
               } 
             },
             {
               path: ':id',
                // element: <Single/>
             }
           ]
         },
         {
           path: 'exotableauproduits',
           element: <ExoTableauProduits/>
         },
         {
           path: 'exotodoapp',
           element: <ExoTodoApp/>
         }
       ]
     },
    
   ]
 )
 function PageError ()
 {
   const error = useRouteError();

   return (
     <div>
       Une erreur est servenue
       <p>{error?.error?.toString() ??error.toString()}</p>
     </div>
   )
 }
 function Root()
 {

   const {state} = useNavigation()

   return (
     <>
       <header>
         <nav className="navbar navbar-expand-lg bg-body-tertiary">
           <div className="container-fluid">
             <NavLink className="navbar-brand" to="/"><img src={logo} className="img-fluid rounded" style={{width: '50px',}}/></NavLink>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                 <li className="nav-item">
                   <NavLink className="nav-link active" aria-current="page" to="">Home</NavLink>
                 </li>
                
                 <li className="nav-item dropdown">
                   <NavLink className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Exos
                   </NavLink>
                   <ul className="dropdown-menu">
                     <li><NavLink className="dropdown-item" to="exotableauproduits">Tableau de produits</NavLink></li>
                     <li><hr className="dropdown-divider" /></li>
                     <li><NavLink className="dropdown-item" to="exoapi">Insertion d'api</NavLink></li>
                     <li><hr className="dropdown-divider" /></li>
                     <li><NavLink className="dropdown-item" to="exotodoapp">Todo app</NavLink></li>
                     <li><hr className="dropdown-divider" /></li>
                     <li><NavLink className="dropdown-item" to="exoblog">Blog </NavLink></li>
                   </ul>
                 </li>
              
               </ul>
               <form className="d-flex" role="search">
                 <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                 <button className="btn btn-outline-success" type="submit">Search</button>
               </form>
             </div>
           </div>
         </nav>
     </header>
     <div className="container my-8 mx-3">
       {state === 'loading' ? <Spinner/> : <Outlet/>}
       {/* <Outlet/> */}
     </div>

     </>
   )
 }

export function App() {

  //  const [n, setN] = useState(0)

  //  const increment = () => setN(n => n + 1)

return <RouterProvider router={router}/>
//  return (
//    <div>
//      <p>
//        Compteur : {n}
//      </p>
//      <p>
//        <button onClick={increment}>Incrementer</button>
//      </p>
//    </div>
//  )
}

export default App
