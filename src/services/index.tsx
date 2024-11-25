import axios from "axios";

export const getAllExperiences = async () => {
    const URL = "https://chandanbandi.github.io/db.json";
    const response = await axios.get(URL);
    return response.data.experiences;
};