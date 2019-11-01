const OccupancyInit = (sequelize, DataTypes) => {
  return sequelize.define('Occupancy', {
    rpiId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isOccupied: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: "occupancies",
    sequelize
  });
};

export default OccupancyInit;