import { DataSource } from "typeorm";
import { User } from "./src/modules/accounts/entities/User";
import { Specification } from "./src/modules/cars/entities/Specification";
import { Category } from "./src/modules/cars/entities/Category";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "rentx",
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: ["./src/database/migration/*.ts"],
  entities: [User, Specification, Category],
});

export function createConnection(
  host = "database_ignite"
): Promise<DataSource> {
  return AppDataSource.initialize();
  // return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
