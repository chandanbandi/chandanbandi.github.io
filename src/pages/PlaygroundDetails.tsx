import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchSketches } from '../store/sketchesSlice';

const PlaygroundDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { sketches, loading, error } = useSelector((state: RootState) => state.sketches);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchSketches());
  }, [dispatch]);

  useEffect(() => {
    if (sketches && id) {
      const index = sketches.findIndex(sketch => sketch.label.toLowerCase().replace(/\s+/g, '-') === id);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [sketches, id]);

  const handleClose = () => {
    navigate('/playground');
  };

  const handlePrevious = () => {
    if (sketches) {
      const newIndex = currentIndex === 0 ? sketches.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      const newId = sketches[newIndex].label.toLowerCase().replace(/\s+/g, '-');
      navigate(`/playground/${newId}`);
    }
  };

  const handleNext = () => {
    if (sketches) {
      const newIndex = currentIndex === sketches.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      const newId = sketches[newIndex].label.toLowerCase().replace(/\s+/g, '-');
      navigate(`/playground/${newId}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, sketches]);

  if (loading) {
    return (
      <div className="playground-details">
        <div className="playground-details__loading">Loading...</div>
      </div>
    );
  }

  if (error || !sketches || currentIndex >= sketches.length) {
    return (
      <div className="playground-details">
        <div className="playground-details__error">
          <h2>Error</h2>
          <p>{error || 'Sketch not found'}</p>
          <button onClick={handleClose} className="playground-details__close-btn">
            Back to Playground
          </button>
        </div>
      </div>
    );
  }

  const currentSketch = sketches[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="playground-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="playground-details__content">
          <button 
            className="playground-details__close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>

          <div className="playground-details__image-container">
            <motion.img
              key={currentSketch.src}
              src={currentSketch.src}
              alt={currentSketch.label}
              className="playground-details__image"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="playground-details__info">
            <h2 className="playground-details__title">{currentSketch.label}</h2>
            <p className="playground-details__description">
              {currentSketch.description}
            </p>
          </div>

          <div className="playground-details__navigation">
            <button 
              className="playground-details__nav-btn playground-details__nav-btn--prev"
              onClick={handlePrevious}
              aria-label="Previous sketch"
            >
              ‹
            </button>
            
            <div className="playground-details__counter">
              {currentIndex + 1} / {sketches.length}
            </div>
            
            <button 
              className="playground-details__nav-btn playground-details__nav-btn--next"
              onClick={handleNext}
              aria-label="Next sketch"
            >
              ›
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaygroundDetails; 