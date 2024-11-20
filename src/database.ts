import { Sequelize } from 'sequelize';
import { UserModel } from './user/user';
import { UniversityModel } from './university/university';
import { Subject, SubjectModel } from './subjects/subjects';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', // SQLite database file path
});

export const db = {
    sequelize,
    Sequelize,
    models: {
        User: UserModel(sequelize),
        University: UniversityModel(sequelize),
        Subject: SubjectModel(sequelize)
    },
};

db.models.User.belongsTo(db.models.University, {
    foreignKey: 'universityId',
    as: 'university',
});

db.models.University.hasMany(db.models.User, {
    foreignKey: 'universityId',
    as: 'users',
});

db.models.Subject.belongsToMany(db.models.User, { through: 'UserSubjects' })
db.models.User.belongsToMany(db.models.Subject, { through: 'UserSubjects' })
