import { useTodos } from "../hooks/useTodos"
import { m } from "framer-motion";


export function ExoTodoApp()
{
    const {showCompleted, visibleTodos, toggleFilter, toggleTodo, removeTodo, clearCompleted} = useTodos()

    return (
        <div>
            <h1>ExoTodoApp</h1>
            <div>
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
                <m.li
                    key={todo.name}
                    layout
                >
                    <input 
                    type="checkbox"
                    onChange={() => toggleTodo(todo)}
                    checked={todo.checked}
                    />
                    {todo.name}
                   <i 
                    className="fa-solid fa-square-minus" 
                    onClick={() => removeTodo(todo)}
                    style={{color:'red', paddingLeft:'1em'}}
                    ></i>
                </m.li>
                ) )}
            </ul>
            <button 
                type="button"
                className="btn btn-danger"
                onClick={clearCompleted}
            >Supprimer les taches accomplies</button>
            </div>
            
        </div>
    )
}