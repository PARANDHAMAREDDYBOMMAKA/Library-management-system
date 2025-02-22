/*
  Warnings:

  - The primary key for the `book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `book_id` column on the `book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `book_id` on the `issuance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "issuance" DROP CONSTRAINT "issuance_book_id_fkey";

-- AlterTable
ALTER TABLE "book" DROP CONSTRAINT "book_pkey",
DROP COLUMN "book_id",
ADD COLUMN     "book_id" SERIAL NOT NULL,
ADD CONSTRAINT "book_pkey" PRIMARY KEY ("book_id");

-- AlterTable
ALTER TABLE "issuance" DROP COLUMN "book_id",
ADD COLUMN     "book_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "issuance" ADD CONSTRAINT "issuance_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;
