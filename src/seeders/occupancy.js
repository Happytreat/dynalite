import faker from 'faker';

const createFakeOccupancy = async (Occupancy) => {
    return Occupancy.create(
        {
            rpiId: faker.random.uuid(),
            timestamp: faker.date.between('2019-10-21', '2019-10-27'),
            isOccupied: faker.random.boolean()
        }
      )
}

export const seedOccupancyTable = async (Occupancy) => {
    const numberOfData = 1000;
    const _ = Array.apply(null, Array(numberOfData)).map(function () {});
    return Promise.all(_.map(() => createFakeOccupancy(Occupancy)))
}