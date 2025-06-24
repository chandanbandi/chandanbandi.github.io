import axios from "axios";

export const getAllExperiences = async () => {
    const URL = `${import.meta.env.VITE_API_URL}experiences.json`;
    const response = await axios.get(URL);
    return response.data.experiences;
};