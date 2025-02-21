import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.member.createMany({
    data: [
      {
        mem_name: "John Doe",
        mem_phone: "1234567890",
        mem_email: "john@example.com",
      },
      {
        mem_name: "Jane Smith",
        mem_phone: "0987654321",
        mem_email: "jane@example.com",
      }
    ],
    skipDuplicates: true, // Prevents errors if records already exist
  });

  console.log("✅ Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
