import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {type RootState, type AppDispatch } from '../store';
import { fetchExperiences } from '../store/experiencesSlice';
import type Project from '../models/Project';

export const useExperiences = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector((state: RootState) => state.experiences);

  useEffect(() => {
    if (projects.length === 0 && !loading) {
      dispatch(fetchExperiences());
    }
  }, [dispatch, projects.length, loading]);

  const getProjectById = (id: number): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  return {
    projects,
    loading,
    error,
    getProjectById,
  };
}; 