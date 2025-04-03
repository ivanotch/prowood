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
      name: "Oak",
      description: "European Oak WPC Indoor Panel",
      stock: 100,
      pricePerUnit: 50.0,
      category: "Indoor Wood Plastic Composite",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Oak",  
      description: "Teak Outdoor WPC Decking",
      stock: 80,
      pricePerUnit: 75.0,
      category: "Outdoor Wood Plastic Composite",
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
