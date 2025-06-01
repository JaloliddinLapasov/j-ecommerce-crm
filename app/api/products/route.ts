import { NextResponse } from "next/server"

// Mahsulotlar uchun API endpoint

const products = [
  {
    id: 1,
    name: "Klassik Ko'ylak",
    description: "Yumshoq paxta materialidan tayyorlangan klassik ko'ylak",
    category: "Ko'ylaklar",
    price: 45,
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Oq", "Qora", "Ko'k"],
    images: ["/placeholder.svg"],
    status: "active",
    createdAt: "2023-01-10",
  },
  // Boshqa mahsulotlar...
]

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()

  const newProduct = {
    id: products.length + 1,
    ...body,
    status: "active",
    createdAt: new Date().toISOString(),
  }

  products.push(newProduct)

  return NextResponse.json(newProduct, { status: 201 })
}
