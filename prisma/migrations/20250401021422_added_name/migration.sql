/*
  Warnings:

  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ModeOfPayment" ADD VALUE 'GCASH';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "name" TEXT NOT NULL;
