"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { fetchSkills } from '../store/skillsSlice'

const About = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { skills, loading, error } = useSelector((state: RootState) => state.skills)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    dispatch(fetchSkills())
  }, [dispatch])

  if (loading) return <div>Loading skills...</div>
  if (error) return <div>Error: {error}</div>
  if (!skills.length) return <div>No skills found.</div>

  return (
    <section className="about">
      <motion.div
        className="about__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="about__title">About</h1>

        <div className="about__text">
          <p>
            I'm a creative developer and designer with a passion for creating beautiful, functional digital experiences.
            My work focuses on the intersection of design and technology, with a minimalist approach that emphasizes
            clarity and purpose.
          </p>

          <p>
            With expertise in front-end development, interaction design, and visual aesthetics, I help brands and
            individuals express their unique identity through thoughtful digital solutions.
          </p>
        </div>

        <div className="about__skills">
          <h2 className="about__subtitle">Skills</h2>
          <div className="about__skills-tabs">
            {skills.map((skill, idx) => (
              <button
                key={skill.label}
                className={`about__skills-tab${activeTab === idx ? ' about__skills-tab--active' : ''}`}
                onClick={() => setActiveTab(idx)}
                type="button"
                aria-selected={activeTab === idx}
                tabIndex={0}
              >
                {skill.label}
              </button>
            ))}
          </div>
          <div className="about__skills-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={skills[activeTab].label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="about__skills-content"
              >
                <h3 className="about__skills-label">{skills[activeTab].label}</h3>
                <p className="about__skills-desc">{skills[activeTab].description}</p>
                <h3 className="about__skills-tools">Tools</h3>
                <ul className="about__skills-list">
                  {skills[activeTab].screens.map((tool) => (
                    <li key={tool}>
                      <img src={`${tool}`} alt={skills[activeTab].label} className="about__skill-image" />
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
