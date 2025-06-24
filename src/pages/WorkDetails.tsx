"use client"

import { motion } from 'motion/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useExperiences } from '../hooks/useExperiences'

const WorkDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  
  const { loading, error, getProjectById } = useExperiences();
  const project = getProjectById(Number(id));

  if (loading) {
    return (
      <section className="work-details">
        <div className="work-details__content">
          <div className="work-details__loading">Loading project details...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="work-details">
        <div className="work-details__content">
          <div className="work-details__error">Error: {error}</div>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="work-details">
        <div className="work-details__content">
          <div className="work-details__error">Project not found</div>
        </div>
      </section>
    );
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isAutoplay && !project.hasVideo) {
      interval = setInterval(() => {
        setCurrentScreen((prev) => (prev + 1) % project.screens.length);
      }, 3000); // Change screen every 3 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoplay, project.hasVideo, project.screens.length]);

  const handleScreenChange = (index: number) => {
    setCurrentScreen(index);
    setIsAutoplay(false); // Stop autoplay when user manually changes screen
  }

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
  }

  return (
    <section className="work-details">
      <motion.div
        className="work-details__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <button
          className="work-details__back-button"
          onClick={() => navigate('/work')}
        >
          ← Back to Work
        </button>

        <div className="work-details__header">
          <h1 className="work-details__title">{project.company}</h1>
          <span className="work-details__year">{project.year}</span>
        </div>

        <p className="work-details__description">{project.details}</p>

        <div className="work-details__screens">
          <motion.div
            key={currentScreen}
            className="work-details__current-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {project.hasVideo ? (
              <video
                src={project.screens[currentScreen].src}
                controls
                autoPlay
                className="work-details__video"
              />
            ) : (
              <>
                <img
                  src={project.screens[currentScreen].src}
                  alt={project.screens[currentScreen].alt}
                  className="work-details__image"
                />
                <button 
                  className="work-details__autoplay-button"
                  onClick={toggleAutoplay}
                >
                  {isAutoplay ? '⏸️ Pause' : '▶️ Play'}
                </button>
              </>
            )}
          </motion.div>
          {!project.hasVideo && (
            <div className="work-details__thumbnails">
              {project.screens.map((screen, index) => (
                <motion.div
                  key={screen.id}
                  className={`work-details__thumbnail ${currentScreen === index ? 'active' : ''}`}
                  onClick={() => handleScreenChange(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    className="work-details__thumbnail-image"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default WorkDetails 