"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route, useLocation } from "react-router-dom"
import { setTheme } from "./store/themeSlice"
import type { RootState } from "./store"
import Header from "./components/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Work from "./pages/Work"
import WorkDetails from "./pages/WorkDetails"
import Contact from "./pages/Contact"
import "./styles/index.scss"
import Playground from "./pages/Playground"
import PlaygroundDetails from "./pages/PlaygroundDetails"

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { theme } = useSelector((state: RootState) => state.theme)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000);
    dispatch(setTheme("dark"));

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Apply theme class to body
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    // Reset scroll position on route change
    window.scrollTo(0, 0)
  }, [location.pathname])


  if (isLoading) {
    return (
      <div className="loader">
        <div className="loader__content">
          <h1 className="loader__logo">CB</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<WorkDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/playground/:id" element={<PlaygroundDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
