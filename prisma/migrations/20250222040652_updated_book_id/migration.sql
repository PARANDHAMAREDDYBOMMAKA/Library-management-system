/*
  Warnings:

  - The primary key for the `book` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "issuance" DROP CONSTRAINT "issuance_book_id_fkey";

-- AlterTable
ALTER TABLE "book" DROP CONSTRAINT "book_pkey",
ALTER COLUMN "book_id" DROP DEFAULT,
ALTER COLUMN "book_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "book_pkey" PRIMARY KEY ("book_id");
DROP SEQUENCE "book_book_id_seq";

-- AlterTable
ALTER TABLE "issuance" ALTER COLUMN "book_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "issuance" ADD CONSTRAINT "issuance_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;
