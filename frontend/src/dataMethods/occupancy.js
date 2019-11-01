import { times, forEach, map, sortBy, round } from 'lodash';
import moment from 'moment-timezone';
import axios from 'axios';

export const fetchOccupancyData = async () => {
  try {
    return axios.get('https://www.evantay.com/projects/dynalite/occupancynpm ').then(res => res.data)
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

export const dateDiffByHour = (dateEarlier, dateLater) => {
  // moment.toArray() here parses into [ year, month, day, hours, mins, seconds, milliseconds ]
  const dayEarlier = dateEarlier.toArray()[3]
  const dayLater = dateLater.toArray()[3]

  if (dayLater < dayEarlier) {
    return dayLater + 24 - dayEarlier;
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
    // Monday
    const day = (dateDiff(moment([2019, 10, 28, 8]).tz('Asia/Singapore'), moment(o.timestamp).tz('Asia/Singapore'))) % 7;
    days[day].push(o);
  })
  return map(days, (day) => sortBy(day, ['timestamp', 'rpiId']));
}

/**
 * Takes in occupancy batches data by hour in a week
 */
export const batchOccupancyByHour = (data) => {
  const hoursInPeriod = 24;
  const hours = times(hoursInPeriod, () => []);
  forEach(data, o => {
    const hour = (dateDiffByHour(moment([2019, 10, 28, 8]).tz('Asia/Singapore'), moment(o.timestamp).tz('Asia/Singapore'))) % 24;
    hours[hour].push(o);
  })
  return map(hours, (hour) => sortBy(hour, ['timestamp', 'rpiId']));
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
    return round(percent, 2)
  })
}