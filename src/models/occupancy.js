export const OccupancyInit = (sequelize, DataTypes) => {
  const Occupancy = sequelize.define('Occupancy', {
    rpiId: DataTypes.STRING,
    isOccupied: DataTypes.BOOLEAN,
    timestamp: DataTypes.DATE,
  }, {});
  Occupancy.associate = function(models) {
    // associations can be defined here
  };
  
  Occupancy.init(
    {
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
    }
  );
  return Occupancy;
};