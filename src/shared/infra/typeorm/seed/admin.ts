import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import AppDataSource, { createConnection } from "../../../../../ormconfig";

export async function create() {
  await createConnection();

  const id = uuidV4();
  const password = await hash("admin", 8);

  AppDataSource.query(`
        INSERT INTO USER(id, name, email, password, admin, created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `);
}

create().then(() => console.log("User admin created!"));
