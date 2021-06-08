import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';
import { Repository } from 'src/common/data/classes/repository.class';
import { EntryNotFoundException } from 'src/common/errors/errors';
import { deleteEntityLog } from 'src/common/functions/log-message-builder';
import { Model as ModelEntity } from '../model/database/model.entity';
import { Company } from './database/company.entity';
import { IBrandRepositoryType } from './interfaces/types/brand-repository-type.interface';

@Injectable()
export class CompanyRepository extends Repository<IBrandRepositoryType> {
  constructor(
    @InjectModel(Company.name)
    private readonly brandModel: Model<Company>,
    @InjectModel(ModelEntity.name)
    private readonly modelEntityModel: Model<ModelEntity>,
  ) {
    super(brandModel, Company.name);
  }

  public async deleteEntity(
    deleteBrandInput: GetEntityByIdInput,
  ): Promise<Company> {
    try {
      this.logger.log(deleteEntityLog(Company.name, deleteBrandInput));

      const deleteObj = {
        deleted: true,
        updatedAt: new Date().toISOString(),
      };

      const result = await this.brandModel
        .findOneAndUpdate(deleteBrandInput, deleteObj, {
          useFindAndModify: false,
          new: true,
        })
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }

      await this.modelEntityModel.updateMany(
        { _id: { $in: result.models } },
        deleteObj,
      );

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}