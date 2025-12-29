import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    const products = [
      {
        name: "Daily Multi-Vitamin",
        description: "Complete daily nutrition support with essential vitamins and minerals.",
        price: 2499,
        category: "Vitamins",
        imageUrl: "https://images.unsplash.com/photo-1574688862214-7275883fe9b8?auto=format&fit=crop&q=80&w=800",
        inStock: true
      },
      {
        name: "Advanced First Aid Kit",
        description: "Comprehensive medical kit for home and travel emergencies.",
        price: 4999,
        category: "First Aid",
        imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=800",
        inStock: true
      },
      {
        name: "Hydrating Facial Cream",
        description: "Dermatologist-tested moisturizer for sensitive skin.",
        price: 1850,
        category: "Skincare",
        imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
        inStock: true
      },
      {
        name: "Pain Relief Tablets",
        description: "Fast-acting relief for headaches and muscle pain.",
        price: 899,
        category: "Medicine",
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        inStock: true
      },
      {
        name: "Vitamin C Immune Support",
        description: "High-potency Vitamin C supplement for immune health.",
        price: 1599,
        category: "Vitamins",
        imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800",
        inStock: true
      },
      {
        name: "Digital Thermometer",
        description: "Accurate and fast temperature readings for the whole family.",
        price: 1299,
        category: "First Aid",
        imageUrl: "https://images.unsplash.com/photo-1588775405975-6c820f5a9c6c?auto=format&fit=crop&q=80&w=800",
        inStock: true
      }
    ];

    for (const product of products) {
      await storage.createProduct(product);
    }
  }
}
