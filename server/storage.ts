import { db } from "./db";
import {
  products,
  contactMessages,
  type Product,
  type InsertProduct,
  type InsertContactMessage,
  type ContactMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  // Seed method
  createProduct(product: InsertProduct): Promise<Product>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contact] = await db.insert(contactMessages).values(message).returning();
    return contact;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
}

export const storage = new DatabaseStorage();
