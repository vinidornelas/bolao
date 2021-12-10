import { EntityRepository, Repository } from "typeorm";
import { ITimeRepository } from "./ITimeRepository";
import { Time } from "../models/TimeEntity";


@EntityRepository(Time)
export class TimeRepository extends Repository<Time> implements ITimeRepository {
  findAll(): Promise<Time[]> {
    return this.find();
  }
}