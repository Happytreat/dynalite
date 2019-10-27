import axios from 'axios';

export const fetchOccupancyData = async () => {
  try {
    return axios.get('http://localhost:8080/occupancy').then(res => res.data)
  } catch (error) {
    console.error(error)
  }
}