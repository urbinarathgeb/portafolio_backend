import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/db.config.js'
import ProjectImage from './projectImage.model.js';
import ProjectTechnology from './projectTech.model.js';

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
  githubURLFront: {
    type: DataTypes.STRING(255),
    validate: {
      isUrl: {
        msg: 'La URL del repositorio Frontend debe ser una URL válida'
      }
    }
  },
  githubURLBack: {
    type: DataTypes.STRING(255),
    validate: {
      isUrl: {
        msg: 'La URL del repositorio Backend debe ser una URL válida'
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
  isFrontend: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isBackend: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  caseStudy: {
    type: DataTypes.TEXT,
    validate: {
      isValidJson(value) {
        if (value) {
          try {
            JSON.parse(value);
          } catch {
            throw new Error('El caso de estudio debe ser un JSON válido');
          }
        }
      }
    }
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
  paranoid: true,
  hooks: {
    beforeDestroy: async (project, options) => {
      const { transaction } = options;
      await ProjectImage.update(
        { deletedAt: new Date() },
        { where: { projectId: project.id }, paranoid: false, transaction }
      );
      await ProjectTechnology.destroy({
        where: { projectId: project.id },
        transaction,
      });
    },
  },
});

export default Project;