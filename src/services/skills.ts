import axios from "axios";

export const getAllSkills = async () => {
    const URL = `${import.meta.env.VITE_API_URL}skills.json`;
    const response = await axios.get(URL);
    return response.data.skills;
};