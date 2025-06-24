"use client"
import { motion } from 'motion/react'

const Contact = () => {
  
  return (
    <section className="contact">
      <motion.div
        className="contact__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="contact__title">Contact</h1>
        <div className="contact__info">
          <p>
            I'm always open to new projects and collaborations. Feel free to reach out if you'd like to work together or
            just say hello.
          </p>

          <div className="contact__details">
            <div className="contact__detail">
              <h3>Email</h3>
              <a href="mailto:bchandu2988@gmail.com">bchandu2988@gmail.com</a>
            </div>

            <div className="contact__detail">
              <h3>Social</h3>
              <div className="contact__social">
                <a href="https://www.linkedin.com/in/chandanbandi/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="https://github.com/chandanbandi" target="_blank" rel="noopener noreferrer">
                  Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
