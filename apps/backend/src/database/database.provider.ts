import { Provider } from "@nestjs/common";
import Database = require("better-sqlite3");
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

export const DRIZZLE = "DRIZZLE";

export type DrizzleDB = BetterSQLite3Database<typeof schema>;

export const DatabaseProvider: Provider = {
	provide: DRIZZLE,
	useFactory: () => {
		const sqlite = new Database("db/data.db");
		sqlite.pragma("journal_mode = WAL");
		const db = drizzle(sqlite, { schema });
		return db;
	},
};
