import faker from 'faker';

export const seedOccupancyTable = async (Occupancy) => {
    await Occupancy.create(
      {
        rpiId: faker.random.uuid(),
        timestamp: faker.date.past(),
        isOccupied: faker.random.boolean()
      },
    );
  };
  