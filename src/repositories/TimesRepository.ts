import Time from "../models/Time";


export default interface TimesRepository {
  findAll(): Promise<Time[]>;
  findById(id: number): Promise<Time>;
  update(time: Time): Promise<void>;
  save(time: Time[]): Promise<void>;
}
