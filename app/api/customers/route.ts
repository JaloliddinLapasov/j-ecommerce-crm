import { NextResponse } from "next/server"

// Bu yerda ma'lumotlar bazasi bilan ishlash uchun kod bo'ladi
// Hozircha namuna ma'lumotlar

const customers = [
  {
    id: 1,
    name: "Aziza Karimova",
    email: "aziza@example.com",
    phone: "+998901234567",
    address: "Toshkent, Chilonzor tumani",
    totalOrders: 15,
    totalSpent: 1250,
    status: "VIP",
    createdAt: "2023-01-15",
  },
  // Boshqa mijozlar...
]

export async function GET() {
  return NextResponse.json(customers)
}

export async function POST(request: Request) {
  const body = await request.json()

  // Yangi mijozni ma'lumotlar bazasiga qo'shish
  const newCustomer = {
    id: customers.length + 1,
    ...body,
    totalOrders: 0,
    totalSpent: 0,
    status: "Yangi",
    createdAt: new Date().toISOString(),
  }

  customers.push(newCustomer)

  return NextResponse.json(newCustomer, { status: 201 })
}
