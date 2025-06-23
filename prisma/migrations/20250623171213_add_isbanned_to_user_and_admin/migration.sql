-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;
