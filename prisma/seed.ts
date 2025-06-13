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
      isVerified: true,
    },
  });

  // Create Address for Customer
  const address1 = await prisma.address.create({
    data: {
      street: "123 Main Street",
      apartment: "Apt 101",
      city: "Metroville",
      region: "Metro Region",
      country: "Countryland",
      zipCode: "12345",
      customerId: customer1.customerId,
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
      productImage: "/SPC-AG.jpg",
      category: "Stone Plastic Composite",
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "Birch",
      description: "183 x 1220mm Premium Quality SPC Flooring. Water Resistant, Scratch Resistant, and Low Maintenance",
      stock: 80,
      pricePerUnit: 265.0,
      productImage: "/SPC-B.jpg",
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
      category: "Indoor Columns Wood Plastic Composite",
    },
  });

  const product17 = await prisma.product.create({
    data: {
      name: "Walnut Indoor WPC Columns",
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-W.jpg",
      category: "Indoor Columns Wood Plastic Composite",
    },
  });

  const product18 = await prisma.product.create({
    data: {
      name: "Dark Walnut Indoor WPC Columns",
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-DW.jpg",
      category: "Indoor Columns Wood Plastic Composite",
    },
  });

  const product19 = await prisma.product.create({
    data: {
      name: "White Oak Indoor WPC Columns",
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-WO.jpg",
      category: "Indoor Columns Wood Plastic Composite",
    },
  });

  const product20 = await prisma.product.create({
    data: {
      name: "Gray Indoor WPC Columns",
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-G.jpg",
      category: "Indoor Columns Wood Plastic Composite",
    },
  });

  const product21 = await prisma.product.create({
    data: {
      name: "European Oak Indoor WPC Columns",
      description: "50 x 100 x 2900mm Premium Quality Indoor WPC Columns. Water Resistant, Fire Resistant, and Durable",
      stock: 80,
      pricePerUnit: 800.0,
      productImage: "/COLUMN-EO.jpg",
      category: "Indoor Columns Wood Plastic Composite",
    },
  });


  // Create Orders
  const order1 = await prisma.order.create({
    data: {
      customerId: customer1.customerId,
      approvedBy: admin1.adminId,
      addressId: address1.id,
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

  // Helper: Random date within current or last month
  function getRandomDateInMonth(monthOffset = 0) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() - monthOffset; // 0 = this month, 1 = last month

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const randomTimestamp = firstDay.getTime() + Math.random() * (lastDay.getTime() - firstDay.getTime());
    return new Date(randomTimestamp);
  }

  // Add more customers
  const customer2 = await prisma.customer.create({
    data: {
      name: "Bob Smith",
      contact: "111222333",
      email: "bob@example.com",
      password: hashedPassword,
      isVerified: true,
    },
  });
  const customer3 = await prisma.customer.create({
    data: {
      name: "Carol Davis",
      contact: "444555666",
      email: "carol@example.com",
      password: hashedPassword,
      isVerified: true,
    },
  });

  // Add more addresses for new customers
  const address2 = await prisma.address.create({
    data: {
      street: "456 Elm Street",
      city: "Metroville",
      region: "Metro Region",
      country: "Countryland",
      zipCode: "54321",
      customerId: customer2.customerId,
    },
  });
  const address3 = await prisma.address.create({
    data: {
      street: "789 Oak Avenue",
      city: "Metroville",
      region: "Metro Region",
      country: "Countryland",
      zipCode: "67890",
      customerId: customer3.customerId,
    },
  });

  // Collect product IDs
  const products = await prisma.product.findMany();

  // Helper: Get N random products
  function getRandomProducts(n = 2) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  const customers = [
    { id: customer1.customerId, addressId: address1.id },
    { id: customer2.customerId, addressId: address2.id },
    { id: customer3.customerId, addressId: address3.id },
  ];

  // Generate 6 orders — 3 from this month, 3 from last month
  for (let i = 0; i < 6; i++) {
    const isLastMonth = i < 3;
    const randomDate = getRandomDateInMonth(isLastMonth ? 1 : 0);
    const customer = customers[i % customers.length];
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        approvedBy: admin2.adminId,
        addressId: customer.addressId,
        paymentStatus: "PAYED",
        deliveryStatus: "DELIVERED",
        modeOfPayment: "CASH",
        createdAt: randomDate,
        accomplishedDate: randomDate,
        deliveryDate: new Date(randomDate.getTime() + 2 * 24 * 60 * 60 * 1000),
      },
    });

    // Add 2-3 random items
    const orderItems = getRandomProducts(2 + (i % 2)).map((product) => ({
      order_id: order.order_id,
      productId: product.product_id,
      quantity: 1 + Math.floor(Math.random() * 3),
      createdAt: randomDate,
    }));

    await prisma.orderItem.createMany({ data: orderItems });
  }

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
