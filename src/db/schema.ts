import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core"

export const credTypeEnum = pgEnum("credType", ["passwords", "cards"])

export const credsTable = pgTable("creds", {
    id: uuid().primaryKey().defaultRandom(),
    userId: varchar().notNull(),
    credType: credTypeEnum().notNull(),
    name: varchar().notNull(),
    iv: varchar().notNull(),
    enc: varchar().notNull(),
    salt: varchar().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
})

export const shareCredsTable = pgTable("shared_creds", {
    id: uuid().primaryKey().defaultRandom(),
    credType: credTypeEnum().notNull(),
    sender: varchar().notNull(),
    credId: uuid()
        .notNull()
        .references(() => credsTable.id, { onDelete: "cascade" }),
    recipient: varchar().notNull(),
    iv: varchar().notNull(),
    enc: varchar().notNull(),
    salt: varchar().notNull(),

    createdAt: timestamp().notNull().defaultNow(),
})
