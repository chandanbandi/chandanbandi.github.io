import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/_playground.scss';
import { motion } from 'motion/react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchSketches } from '../store/sketchesSlice';

const Playground: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { sketches, loading, error } = useSelector((state: RootState) => state.sketches);

  useEffect(() => {
    dispatch(fetchSketches());
  }, [dispatch]);

  const handleImageClick = (sketch: { label: string; src: string }) => {
    const id = sketch.label.toLowerCase().replace(/\s+/g, '-');
    navigate(`/playground/${id}`);
  };

  return (
    <div className="playground">
      <motion.div
        className="playground__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="playground__imageCarousel">
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && !error && sketches && sketches.map((sketch, index) => (
            <motion.div 
              key={index} 
              className="playground__imageWrapper"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleImageClick(sketch)}
              style={{ cursor: 'pointer' }}
            >
              <img src={sketch.src} alt={sketch.label} />
              <div className="playground__imageOverlay">
                <span className="playground__imageLabel">{sketch.label}</span>
              </div>
            </motion.div>
          ))}
          {!loading && !error && sketches && sketches.map((sketch, index) => (
            <motion.div 
              key={`duplicate-${index}`} 
              className="playground__imageWrapper"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleImageClick(sketch)}
              style={{ cursor: 'pointer' }}
            >
              <img src={sketch.src} alt={sketch.label} />
              <div className="playground__imageOverlay">
                <span className="playground__imageLabel">{sketch.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Playground;
