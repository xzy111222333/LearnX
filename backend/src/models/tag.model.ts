import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Material } from './material.model';

interface TagAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

type TagCreationAttributes = Optional<TagAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
  public id!: number;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'tags'
  }
);

// 多对多关联表：material_tags
export const MaterialTag = sequelize.define('MaterialTag', {
  materialId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Material,
      key: 'id'
    }
  },
  tagId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Tag,
      key: 'id'
    }
  }
}, {
  tableName: 'material_tags',
  timestamps: false
});

// 关联关系
Material.belongsToMany(Tag, { through: MaterialTag, foreignKey: 'materialId', otherKey: 'tagId', as: 'tags' });
Tag.belongsToMany(Material, { through: MaterialTag, foreignKey: 'tagId', otherKey: 'materialId', as: 'materials' });
