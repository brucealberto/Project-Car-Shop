import { ErrorTypes } from '../errors/catalogs';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._car.create(obj);
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    await this.readOne(_id);
    return this._car.update(_id, obj);
  }
}
