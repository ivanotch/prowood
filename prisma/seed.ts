import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hash password for customers
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Admins
  const admin1 = await prisma.admin.create({
    data: {
      name: "John Doe",
      contact: "123456789",
      email: "admin@example.com",
      role: "SUPER_ADMIN",
      password: hashedPassword
    },
  });

  const admin2 = await prisma.admin.create({
    data: {
      name: "Ihahah hahaha",
      contact: "123456789",
      email: "admin2@example.com",
      role: "ADMIN",
      password: hashedPassword
    },
  });

  // Create Customers
  const customer1 = await prisma.customer.create({
    data: {
      name: "Alice Johnson",
      contact: "987654321",
      email: "alice@example.com",
      password: hashedPassword,
      address: "123 Main Street, City",
    },
  });

  // Create Products
  const product1 = await prisma.product.create({
    data: {
      name: "Dark Walnut",
      description: "183 x 1220mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 100,
      pricePerUnit: 265.0,
      productImage: "/SPC-DW.jpg",
      category: "Stone Plastic Composite",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Walnut",  
      description: "183 x 1220mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 265.0,
      productImage: "/SPC-W.jpg",
      category: "Stone Plastic Composite",
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Stone Gray",  
      description: "183 x 1220mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 265.0,
      productImage: "/SPC-SG.jpg",
      category: "Stone Plastic Composite",
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Ash Gray",  
      description: "183 x 1220mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 265.0,
      productImage: "SPC-AG.jpg",
      category: "Stone Plastic Composite",
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "Birch",  
      description: "183 x 1220mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 265.0,
      productImage: "/SPC-G.jpg",
      category: "Stone Plastic Composite",
    },
  });

  const product6 = await prisma.product.create({
    data: {
      name: "Oak",  
      description: "183 x 1220mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 265.0,
      productImage: "/SPC-O.jpg",
      category: "Stone Plastic Composite",
    },
  });

  //Products for WPC Indoor
  const product7 = await prisma.product.create({
    data: {
      name: "European Oak WPC",  
      description: "24mm x 169mm x 2900mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 650.0,
      productImage: "/WPC-EO.jpg",
      category: "Indoor Wood Plastic Composite",
    },
  });

  const product8 = await prisma.product.create({
    data: {
      name: "Black WPC",  
      description: "24mm x 169mm x 2900mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 650.0,
      productImage: "/WPC-BL.jpg",
      category: "Indoor Wood Plastic Composite",
    },
  });

  const product9 = await prisma.product.create({
    data: {
      name: "Walnut WPC",  
      description: "24mm x 169mm x 2900mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 650.0,
      productImage: "/WPC-W.jpg",
      category: "Indoor Wood Plastic Composite",
    },
  });

  const product10 = await prisma.product.create({
    data: {
      name: "Gray",  
      description: "24mm x 169mm x 2900mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 650.0,
      productImage: "/WPC-GRAY.jpg",
      category: "Indoor Wood Plastic Composite",
    },
  });

  const product11 = await prisma.product.create({
    data: {
      name: "Dark Walnut WPC",  
      description: "24mm x 169mm x 2900mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 650.0,
      productImage: "/WPC-DW.jpg",
      category: "Indoor Wood Plastic Composite",
    },
  });

  const product12 = await prisma.product.create({
    data: {
      name: "White Oak",  
      description: "24mm x 169mm x 2900mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 650.0,
      productImage: "/WPC-WO.jpg",
      category: "Indoor Wood Plastic Composite",
    },
  });

  //products for Outdoor WPC

  const product13 = await prisma.product.create({
    data: {
      name: "Teak Brushed Outdoor WPC",  
      description: "26 x 220 x 2900mm Premium Quality Outdoor WPC Fluted Panels. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 1500.0,
      productImage: "/WPC-OUTDOOR-TEAK.jpg",
      category: "Outdoor Wood Plastic Composite",
    },
  });

  const product14 = await prisma.product.create({
    data: {
      name: "Golden Maple Brushed Outdoor WPC",  
      description: "26 x 220 x 2900mm Premium Quality Outdoor WPC Fluted Panels. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 1500.0,
      productImage: "/WPC-OUTDOOR-GM.jpg",
      category: "Outdoor Wood Plastic Composite",
    },
  });

  const product15 = await prisma.product.create({
    data: {
      name: "European Pine Co Extrusion Outdoor WPC",  
      description: "26 x 220 x 2900mm Premium Quality Outdoor WPC Fluted Panels. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 1500.0,
      productImage: "/WPC-OUTDOOR-EP.jpg",
      category: "Outdoor Wood Plastic Composite",
    },
  });

  //products for WPC Indoor Columns

  const product16 = await prisma.product.create({
    data: {
      name: "Black Indoor WPC Columns",  
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-B.jpg",
      category: "Indoor Wood Plastic Composite Columns",
    },
  });

  const product17 = await prisma.product.create({
    data: {
      name: "Walnut Indoor WPC Columns",  
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-W.jpg",
      category: "Indoor Wood Plastic Composite Columns",
    },
  });

  const product18 = await prisma.product.create({
    data: {
      name: "Dark Walnut Indoor WPC Columns",  
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-DW.jpg",
      category: "Indoor Wood Plastic Composite Columns",
    },
  });

  const product19 = await prisma.product.create({
    data: {
      name: "White Oak Indoor WPC Columns",  
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-WO.jpg",
      category: "Indoor Wood Plastic Composite Columns",
    },
  });

  const product20 = await prisma.product.create({
    data: {
      name: "Gray Indoor WPC Columns",  
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-G.jpg",
      category: "Indoor Wood Plastic Composite Columns",
    },
  });

  const product21 = await prisma.product.create({
    data: {
      name: "European Oak Indoor WPC Columns",  
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-EO.jpg",
      category: "Indoor Wood Plastic Composite Columns",
    },
  });


  // Create Orders
  const order1 = await prisma.order.create({
    data: {
      customerId: customer1.customerId,
      approvedBy: admin1.adminId,
      address: "123 Main Street, City",
      paymentStatus: "UNPAID",
      deliveryStatus: "NOT_SHIPPED",
      modeOfPayment: "CASH",
    },
  });

  // Create Order Items
  await prisma.orderItem.createMany({
    data: [
      {
        order_id: order1.order_id,
        productId: product1.product_id,
        quantity: 2,
      },
      {
        order_id: order1.order_id,
        productId: product2.product_id,
        quantity: 1,
      },
    ],
  });

  // Create Cart Items
  await prisma.cart.create({
    data: {
      customerId: customer1.customerId,
      productId: product1.product_id,
      quantity: 3,
    },
  });
}

main()
  .then(() => {
    console.log("Database seeded successfully!");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
