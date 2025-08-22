"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create ENUM type first
    await queryInterface.sequelize.query(
      "CREATE TYPE \"enum_Tasks_status\" AS ENUM('to do', 'in progress', 'done');"
    );

    await queryInterface.createTable("Tasks", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("to do", "in progress", "done"),
        defaultValue: "to do",
      },
      position: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Add indexes for performance
    await queryInterface.addIndex("Tasks", ["userId"], {
      name: "tasks_user_id_index",
    });

    await queryInterface.addIndex("Tasks", ["position"], {
      name: "tasks_position_index",
    });

    await queryInterface.addIndex("Tasks", ["status"], {
      name: "tasks_status_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Tasks_status";'
    );
  },
};
