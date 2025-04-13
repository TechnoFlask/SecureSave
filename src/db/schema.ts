import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core"

export const passwordsTable = pgTable("passwords", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    username: varchar().notNull(),
    password: varchar().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
})

export const cardsTable = pgTable("cards", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    holderName: varchar().notNull(),
    cardNumber: varchar().notNull(),
    cvv: varchar().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
})
