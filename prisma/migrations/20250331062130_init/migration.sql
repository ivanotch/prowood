-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAYED', 'INITIAL_DOWNPAYMENT', 'UNPAID');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('NOT_SHIPPED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- CreateEnum
CREATE TYPE "ModeOfPayment" AS ENUM ('CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'OTHER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "productImage" TEXT,
    "category" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "approvedBy" TEXT,
    "address" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "deliveryStatus" "DeliveryStatus" NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "modeOfPayment" "ModeOfPayment" NOT NULL,
    "accomplishedDate" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderItemId" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "Cart" (
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("customerId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "Admin"("adminId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
