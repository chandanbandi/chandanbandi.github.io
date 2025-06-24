"use client"

import { motion } from 'motion/react'
import { Canvas } from '@react-three/fiber'
import TridentBackground from '../components/TridentBackground'

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="home__canvas">
          <Canvas>
            <TridentBackground />
          </Canvas>
        </div>
        <div className="home__content">
          <motion.div
            className="home__hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="home__title">Chandan Bandi</h1>
            <p className="home__subtitle">Creative Developer & Visual Artist</p>
          </motion.div>

          <motion.div
            className="home__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>Crafting digital experiences with a focus on minimalism and elegance.</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
