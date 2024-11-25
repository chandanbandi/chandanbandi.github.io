import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'


function App() {
  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const { clientX, clientY } = event;
      const element = document.querySelector('.bloom') as HTMLElement;
      element.style.transform = `translate3d(calc(${clientX}px - 50%), calc(${clientY}px - 50%), 0)`;
    }
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [])
  return (
    <>
      <div className='room grid h-100'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <div className="bloom"></div>
    </>
  )
}

export default App
