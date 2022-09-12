import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: ["./src/database/migration/*.ts"],
  entities: [],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
