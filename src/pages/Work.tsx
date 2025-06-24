"use client"

import { motion } from 'motion/react'
import { Link } from "react-router-dom"
import { useExperiences } from '../hooks/useExperiences'

const Work = () => {
  const { projects, loading, error } = useExperiences();

  if (loading) {
    return (
      <section className="work">
        <div className="work__content">
          <h1 className="work__title">Work</h1>
          <div className="work__loading">Loading experiences...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="work">
        <div className="work__content">
          <h1 className="work__title">Work</h1>
          <div className="work__error">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="work">
      <motion.div
        className="work__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="work__title">Work</h1>

        <div className="work__grid">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="work__item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: project.id * 0.1 }}
            >
              <Link to={`/work/${project.id}`} className="work__item-link">
                <div className="work__item-image">
                  {project.hasVideo ? (
                    <video src={project.screens[0].src} autoPlay muted loop playsInline />
                  ) : (
                    <img src={project.thumbnail} alt={project.company} />
                  )}
                </div>
                <div className="work__item-info">
                  <h2 className="work__item-title">{project.company}</h2>
                  <div className="work__item-meta">
                    <span className="work__item-year">{project.year}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Work
