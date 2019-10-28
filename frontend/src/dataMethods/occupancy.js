import { times, forEach, map, sortBy } from 'lodash';
import moment from 'moment-timezone';
import axios from 'axios';

export const fetchOccupancyData = async () => {
  try {
    return axios.get('http://localhost:8080/occupancy').then(res => res.data)
  } catch (error) {
    console.error(error)
  }
}

export const dateDiff = (dateEarlier, dateLater) => {
  // moment.toArray() here parses into [ year, month, day, hours, mins, seconds, milliseconds ]
  const dayEarlier = dateEarlier.toArray()[2]
  const dayLater = dateLater.toArray()[2]

  if (dayLater < dayEarlier) {
    return dayLater + dateEarlier.daysInMonth() - dayEarlier;
  }
  return dayLater - dayEarlier;
}


/**
 * Takes in occupancy batches data by day in a week
 */
export const batchOccupancyByDay = (data) => {
  const daysInPeriod = 7;
  const days = times(daysInPeriod, () => []);
  forEach(data, o => {
    const day = (dateDiff(moment().tz('Asia/Singapore'), moment(o.timestamp).tz('Asia/Singapore'))) % 7;
    days[day].push(o);
  })
  return map(days, (day) => sortBy(day, ['timestamp', 'rpiId']));
}

/**
 * Takes in occupancy batches can calculate percentage occupied
 */
export const exportOccupancyData = (batch) => {
  let occupied = 0
  let total = 1 
  return map(batch,  key => {
    forEach(key, o => {
      if (o.isOccupied)
        occupied += 1
      total += 1
    })
    let percent = occupied/total
    occupied = 0
    total = 1
    return percent
  })
}