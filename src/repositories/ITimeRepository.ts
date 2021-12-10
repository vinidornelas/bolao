import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Time } from "../models/TimeEntity";
import { UpdateResult } from "typeorm";

export interface ITimeRepository {
    findAll(): Promise<Time[]>;
    save(time: Time): Promise<Time>;
    update(id: number, Time: QueryDeepPartialEntity<Time>): Promise<UpdateResult>;
}
