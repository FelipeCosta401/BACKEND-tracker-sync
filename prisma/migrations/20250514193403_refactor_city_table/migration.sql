/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `city` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,uf]` on the table `city` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `city` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "city_name_key";

-- AlterTable
ALTER TABLE "city" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "uf" CHAR(2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "city_slug_key" ON "city"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "city_name_uf_key" ON "city"("name", "uf");
