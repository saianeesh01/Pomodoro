import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Add a new schedule
export const addSchedule = async (scheduleData) => {
  return await axios.post(`${API_BASE_URL}/schedule`, scheduleData);
};

// Get scheduled Pomodoro sessions
export const getSchedule = async (email) => {
  return await axios.get(`${API_BASE_URL}/schedule/${email}`);
};
