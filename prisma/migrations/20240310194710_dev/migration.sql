/*
  Warnings:

  - Added the required column `verification_token` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verification_token` to the `CompanyUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verification_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "verification_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CompanyUser" ADD COLUMN     "verification_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verification_token" TEXT NOT NULL;
