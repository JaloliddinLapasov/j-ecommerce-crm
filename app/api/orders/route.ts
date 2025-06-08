import { NextResponse } from "next/server"

// Buyurtmalar uchun API endpoint

const orders = [
  {
    id: "ORD-001",
    customerId: 1,
    customerName: "Jaloliddin Lapasov",
    items: [
      {
        productId: 1,
        productName: "Klassik Ko'ylak",
        quantity: 2,
        price: 45,
        size: "M",
        color: "Oq",
      },
    ],
    total: 90,
    status: "Yetkazildi",
    paymentStatus: "To'langan",
    paymentMethod: "Naqd",
    shippingAddress: "Toshkent, Chilonzor tumani",
    createdAt: "2024-01-15",
    deliveredAt: "2024-01-18",
  },
  // Boshqa buyurtmalar...
]

export async function GET() {
  return NextResponse.json(orders)
}

export async function POST(request: Request) {
  const body = await request.json()

  const newOrder = {
    id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
    ...body,
    status: "Tayyorlanmoqda",
    createdAt: new Date().toISOString(),
  }

  orders.push(newOrder)

  return NextResponse.json(newOrder, { status: 201 })
}
