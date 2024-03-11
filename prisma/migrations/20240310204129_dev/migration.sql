-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reseted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reseted_at" TIMESTAMP(3);
