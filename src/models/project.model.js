import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/db.config.js'

class Project extends Model {
}

Project.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El título es obligatorio'
      }
    }
  },
  subtitle: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El subtítulo es obligatorio'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La descripción es obligatoria'
      }
    }
  },
  imagePreview: {
    type: DataTypes.STRING(255)
  },
  githubURL: {
    type: DataTypes.STRING(255),
    validate: {
      isUrl: {
        msg: 'La URL de GitHub debe ser una URL válida'
      }
    }
  },
  deployURL: {
    type: DataTypes.STRING(255),
    validate: {
      isUrl: {
        msg: 'La URL de deploy debe ser una URL válida'
      }
    }
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El ID de usuario debe ser un número entero'
      }
    }
  }
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects',
  timestamps: true,
  underscored: true,
  paranoid: true
});

export default Project;