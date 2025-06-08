"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, Users, Package, ShoppingCart } from "lucide-react"

const salesData = [
  { month: "Yan", sales: 4000, orders: 240, customers: 120 },
  { month: "Fev", sales: 3000, orders: 180, customers: 98 },
  { month: "Mar", sales: 5000, orders: 300, customers: 150 },
  { month: "Apr", sales: 4500, orders: 270, customers: 135 },
  { month: "May", sales: 6000, orders: 360, customers: 180 },
  { month: "Iyun", sales: 5500, orders: 330, customers: 165 },
]

const productPerformance = [
  { name: "Ko'ylaklar", sales: 4500, percentage: 35, color: "#8884d8" },
  { name: "Shimlar", sales: 3200, percentage: 25, color: "#82ca9d" },
  { name: "Liboslar", sales: 2800, percentage: 22, color: "#ffc658" },
  { name: "Kurtkalar", sales: 1500, percentage: 12, color: "#ff7300" },
  { name: "Boshqalar", sales: 800, percentage: 6, color: "#00ff00" },
]

const topCustomers = [
  { name: "Jaloliddin Lapasov", orders: 15, spent: 1250, lastOrder: "2024-01-15" },
  { name: "Asadbek Matvaliyev", orders: 12, spent: 980, lastOrder: "2024-01-14" },
  { name: "Sherzod Jumayev", orders: 10, spent: 850, lastOrder: "2024-01-13" },
  { name: "Rustam Aliyev", orders: 8, spent: 720, lastOrder: "2024-01-12" },
  { name: "Ulug'bek Sobirov", orders: 7, spent: 650, lastOrder: "2024-01-11" },
]

const inventoryReport = [
  { product: "Klassik Ko'ylak", stock: 25, value: 1125, turnover: "Yaxshi" },
  { product: "Jinsi Shim", stock: 8, value: 520, turnover: "Sekin" },
  { product: "Yoz Libosi", stock: 5, value: 425, turnover: "Juda Sekin" },
  { product: "Sport Kurtka", stock: 0, value: 0, turnover: "Tugagan" },
  { product: "Rasmiy Ko'ylak", stock: 45, value: 2475, turnover: "Yaxshi" },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<any>(null)
  const [reportType, setReportType] = useState("monthly")

  const exportReport = (format: string) => {
    // Bu yerda export funksiyasi bo'ladi
    console.log(`Exporting report in ${format} format`)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Hisobotlar</h2>
        <div className="flex items-center space-x-2">
          <DatePickerWithRange />
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Davr tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Kunlik</SelectItem>
              <SelectItem value="weekly">Haftalik</SelectItem>
              <SelectItem value="monthly">Oylik</SelectItem>
              <SelectItem value="yearly">Yillik</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportReport("pdf")}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport("excel")}>
            <Download className="mr-2 h-4 w-4" />
            Excel
          </Button>
        </div>
      </div>

      {/* Asosiy Statistika */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami Sotuv</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,000</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% o'tgan oydan
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buyurtmalar</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,680</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% o'tgan oydan
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yangi Mijozlar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.1% o'tgan oydan
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'rtacha Buyurtma</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$167</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.4% o'tgan oydan
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sotuv Hisoboti</TabsTrigger>
          <TabsTrigger value="customers">Mijozlar Tahlili</TabsTrigger>
          <TabsTrigger value="products">Mahsulot Ko'rsatkichlari</TabsTrigger>
          <TabsTrigger value="inventory">Inventar Hisoboti</TabsTrigger>
          <TabsTrigger value="financial">Moliyaviy Hisobot</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Oylik Sotuv Tendensiyasi</CardTitle>
                <CardDescription>So'nggi 6 oylik sotuv ko'rsatkichlari</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Buyurtmalar va Mijozlar</CardTitle>
                <CardDescription>Oylik buyurtmalar va yangi mijozlar</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#82ca9d" />
                    <Bar dataKey="customers" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Eng Yaxshi Mijozlar</CardTitle>
              <CardDescription>Eng ko'p xarid qilgan mijozlar ro'yxati</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mijoz</TableHead>
                    <TableHead>Buyurtmalar</TableHead>
                    <TableHead>Jami Xarid</TableHead>
                    <TableHead>So'nggi Buyurtma</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.spent}</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Kategoriya bo'yicha Sotuv</CardTitle>
                <CardDescription>Mahsulot kategoriyalari bo'yicha taqsimot</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="sales"
                    >
                      {productPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eng Mashhur Mahsulotlar</CardTitle>
                <CardDescription>Sotuv bo'yicha eng yaxshi mahsulotlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productPerformance.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }}></div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${product.sales}</div>
                        <div className="text-sm text-muted-foreground">{product.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventar Holati</CardTitle>
              <CardDescription>Joriy inventar va aylanma ko'rsatkichlari</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mahsulot</TableHead>
                    <TableHead>Zaxira</TableHead>
                    <TableHead>Qiymat</TableHead>
                    <TableHead>Aylanma</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryReport.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.stock} dona</TableCell>
                      <TableCell>${item.value}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.turnover === "Yaxshi"
                              ? "default"
                              : item.turnover === "Sekin"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.turnover}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Daromad</CardTitle>
                <CardDescription>Jami daromad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$28,000</div>
                <p className="text-xs text-muted-foreground">Bu oyda</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Xarajatlar</CardTitle>
                <CardDescription>Jami xarajatlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">$18,500</div>
                <p className="text-xs text-muted-foreground">Bu oyda</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Foyda</CardTitle>
                <CardDescription>Sof foyda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">$9,500</div>
                <p className="text-xs text-muted-foreground">Bu oyda</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
