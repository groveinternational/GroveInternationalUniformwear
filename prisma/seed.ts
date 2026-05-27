import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'Shirts', slug: 'shirts', image: '/school-shirt.png' },
    { name: 'Trousers', slug: 'trousers', image: null },
    { name: 'Blazers', slug: 'blazers', image: null },
    { name: 'Sportswear', slug: 'sportswear', image: null },
    { name: 'Accessories', slug: 'accessories', image: null },
    { name: 'Winterwear', slug: 'winterwear', image: null },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { image: category.image },
      create: category,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
