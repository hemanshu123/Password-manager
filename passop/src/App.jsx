import './App.css'
import Foter from './components/Foter'
import Manager from './components/Manager'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <Navbar/>
    <div className='min-h-[84vh]'>
    <Manager/>
    </div>
    <Foter/>
    </>
  )
}

export default App
