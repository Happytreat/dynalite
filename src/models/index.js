import Sequelize from 'sequelize';
import { seedOccupancyTable } from '../seeders/occupancy';
import OccupancyModel from '../models/occupancy';
import { isProduction, DB_URI } from '../util/secrets';

/* Colours */
const cRed = '\x1b[31m';
const cYellow = '\x1b[33m';
const cBlue = '\x1b[34m';
const cReset = '\x1b[0m'; // Resets the console colour

export const sequelize = new Sequelize(DB_URI, {
    logging: false,
    dialect: "postgres",
    dialectOptions: {
      ssl: false
    }
  });

export const Occupancy = OccupancyModel(sequelize, Sequelize);

export const init = async (eraseDatabaseOnSync) => {
  console.log(`${cYellow}[db] Attempting connection to database.${cReset}`);

  try {
    await sequelize.authenticate();
  } catch (err) {
    console.error(`${cRed}[db] Unable to connect to the database: ${err}${cReset}`);
    process.exit(1);
  }
  console.log(`${cBlue}[db] Connection has been established successfully.${cReset}`);

  try {
    await sequelize.sync({ force: eraseDatabaseOnSync }).then(async () =>{
      if (!isProduction && eraseDatabaseOnSync) {
        seedOccupancyTable().then(() => console.log(`${cBlue}[db] Seeding Database completed.${cReset}`));
      }
    });
  } catch (err) {
    console.error(`${cRed}[db] Error syncing with database: ${err}${cReset}`);
    process.exit(1);
  }
  console.log(`${cBlue}[db] Database sync successful.${cReset}`);
};
