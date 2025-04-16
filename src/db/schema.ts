import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core"

export const passwordsTable = pgTable("passwords", {
    id: uuid().primaryKey().defaultRandom(),
    userId: varchar().notNull(),
    name: varchar().notNull(),
    iv: varchar().notNull(),
    enc: varchar().notNull(),
    salt: varchar().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
})

export const cardsTable = pgTable("cards", {
    id: uuid().primaryKey().defaultRandom(),
    userId: varchar().notNull(),
    name: varchar().notNull(),
    iv: varchar().notNull(),
    enc: varchar().notNull(),
    salt: varchar().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
})

export const credTypeEnum = pgEnum("cred_type", ["passwords", "cards"])

export const shareCredsTable = pgTable("shared_creds", {
    id: uuid().primaryKey().defaultRandom(),
    credType: credTypeEnum().notNull(),
    sender: varchar().notNull(),
    recipient: varchar().notNull(),
    iv: varchar().notNull(),
    enc: varchar().notNull(),
    salt: varchar().notNull(),

    createdAt: timestamp().notNull().defaultNow(),
})
