import axios from "axios";

export const getAllSketches = async () => {
    const URL = `${import.meta.env.VITE_API_URL}sketches.json`;
    const response = await axios.get(URL);
    return response.data.skills;
};