import * as fs from "fs";
import { resolve } from "path/posix";
const { readFile } = fs.promises;

import Time from "../models/Time";
import TimesRepository from "./TimesRepository";
const TIMES_FILE_PATH = "./files/times.json";

export type TimeFile = {
  id: number;
  nome: string;
  estado: string;
};
export default class JSONTimesRepository implements TimesRepository {
  private timesFilePath: string;
  public constructor(timesFilePath: string) {
    if (timesFilePath)
      this.timesFilePath = timesFilePath;
    else this.timesFilePath = TIMES_FILE_PATH;
  }

  public async findAll(): Promise<Time[]> {
    try {
      const result = await readFile(this.timesFilePath);
      let times = JSON.parse(result.toString()) as TimeFile[];
      return times.map(
        ({ id, nome, estado }) => new Time(id, nome, estado));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a encontrar os times. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
  // --- Recupera um pelo seu id
  public async findById(id: number): Promise<Time> {
    // @todo
    try {
      let times = await this.findAll();
      return times.find((time: Time) => {
        if (time.getId() === id) return time;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar os times. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  // --- Atualiza um time
  public async update(updateTime: Time): Promise<void> {
    try {
      let times = await this.findAll();;
      times = times.map((time) => {
        if (time.getId() == updateTime.getId()) {
          time.setNome(updateTime.getNome());
          time.setEstado(updateTime.getEstado());
        }
        return time;
      })
      await this.save(times);
      return;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar os times. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
  public async save(times: Time[]): Promise<void> {
    const BufferDados = JSON.stringify(times);
    try {
      await fs.promises.writeFile(this.timesFilePath, BufferDados);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar os times. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
}


//function save(times: any, arg1: any) {
//  throw new Error("Function not implemented.");
//}

//function BufferDados(TIMES_FILE_PATH: string, BufferDados: any) {
//  throw new Error("Function not implemented.");
//}

