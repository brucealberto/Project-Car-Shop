import { Request, Response } from 'express';
import { ErrorTypes } from '../errors/catalogs';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<ICar | null>) {
    const dataBaseId = await this._service.readOne(req.params.id);
    if (!dataBaseId) throw new Error(ErrorTypes.ObjectNotFound);
    await this._service.delete(req.params.id);
    return res.status(204).json();
  }
}
