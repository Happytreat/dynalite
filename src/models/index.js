import { DB_URI } from '../util/secrets';
import { OccupancyInit } from '../models/occupancy';
import { seedOccupancyTable } from '../seeders/occupancy'; 
import Sequelize from 'sequelize';

export let sequelize;

const loadModels = async (sequelize) => {
  return OccupancyInit(sequelize, Sequelize.DataTypes);
};

let Occupancy;

export const init = async (eraseDatabaseOnSync) => {
  console.log("Attempting connection to database");

  sequelize = new Sequelize(DB_URI, {
    dialect: "postgres",
    dialectOptions: {
      ssl: false
    }
  });

  try {
    await sequelize.authenticate();
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
  console.log("Connection has been established successfully.");

  Occupancy = await loadModels(sequelize);

  try {
    await sequelize.sync({ force: eraseDatabaseOnSync }).then(async () =>{
      if (eraseDatabaseOnSync) {
        seedOccupancyTable(Occupancy).then(() => console.log("Seeding Database completed."));
      }
    });
  } catch (err) {
    console.error("Error syncing with database:", err);
    process.exit(1);
  }
  console.log("Database sync successful");
};

export default Occupancy;
