import TodoList from "./components/TodoList"
import './App.css'

function App() {

  return (
    <div className="App">
      <header className="app-header">
        <h1>My Awesome Todo App</h1>
        <p>This is a simple React Todo app built with Vite.</p>
      </header>
      <main>
        <TodoList />
      </main>
    </div>
  )
}

export default App
