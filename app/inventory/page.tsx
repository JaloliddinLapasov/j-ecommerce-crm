"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Minus,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Package,
  RefreshCw,
  FileText,
  Edit,
} from "lucide-react"

const inventoryItems = [
  {
    id: 1,
    name: "Klassik Ko'ylak",
    sku: "KK-001",
    category: "Ko'ylaklar",
    currentStock: 25,
    minStock: 10,
    maxStock: 100,
    unitPrice: 45,
    totalValue: 1125,
    supplier: "Elegant Wear",
    location: "Ombor A-1",
    lastUpdated: "2024-01-15",
    status: "Yaxshi",
  },
  {
    id: 2,
    name: "Jinsi Shim",
    sku: "JS-002",
    category: "Shimlar",
    currentStock: 8,
    minStock: 15,
    maxStock: 80,
    unitPrice: 65,
    totalValue: 520,
    supplier: "Denim World",
    location: "Ombor B-2",
    lastUpdated: "2024-01-14",
    status: "Kam",
  },
  {
    id: 3,
    name: "Yoz Libosi",
    sku: "YL-003",
    category: "Liboslar",
    currentStock: 5,
    minStock: 12,
    maxStock: 60,
    unitPrice: 85,
    totalValue: 425,
    supplier: "Summer Styles",
    location: "Ombor A-3",
    lastUpdated: "2024-01-13",
    status: "Juda Kam",
  },
  {
    id: 4,
    name: "Sport Kurtka",
    sku: "SK-004",
    category: "Kurtkalar",
    currentStock: 0,
    minStock: 8,
    maxStock: 40,
    unitPrice: 120,
    totalValue: 0,
    supplier: "Sport Wear Co",
    location: "Ombor C-1",
    lastUpdated: "2024-01-12",
    status: "Tugagan",
  },
  {
    id: 5,
    name: "Rasmiy Ko'ylak",
    sku: "RK-005",
    category: "Ko'ylaklar",
    currentStock: 45,
    minStock: 20,
    maxStock: 120,
    unitPrice: 55,
    totalValue: 2475,
    supplier: "Business Attire",
    location: "Ombor A-2",
    lastUpdated: "2024-01-16",
    status: "Yaxshi",
  },
]

const inventoryMovements = [
  {
    id: 1,
    productName: "Klassik Ko'ylak",
    sku: "KK-001",
    type: "Kirish",
    quantity: 20,
    reason: "Yangi yetkazib berish",
    date: "2024-01-15",
    user: "Admin",
  },
  {
    id: 2,
    productName: "Jinsi Shim",
    sku: "JS-002",
    type: "Chiqish",
    quantity: -7,
    reason: "Sotuv",
    date: "2024-01-14",
    user: "Sotuvchi",
  },
  {
    id: 3,
    productName: "Yoz Libosi",
    sku: "YL-003",
    type: "Chiqish",
    quantity: -3,
    reason: "Sotuv",
    date: "2024-01-13",
    user: "Sotuvchi",
  },
  {
    id: 4,
    productName: "Sport Kurtka",
    sku: "SK-004",
    type: "Chiqish",
    quantity: -2,
    reason: "Sotuv",
    date: "2024-01-12",
    user: "Sotuvchi",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("")
  const [adjustmentReason, setAdjustmentReason] = useState("")

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const lowStockItems = inventoryItems.filter((item) => item.currentStock <= item.minStock)
  const outOfStockItems = inventoryItems.filter((item) => item.currentStock === 0)
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Yaxshi":
        return "default"
      case "Kam":
        return "secondary"
      case "Juda Kam":
        return "destructive"
      case "Tugagan":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Yaxshi":
        return <TrendingUp className="h-4 w-4" />
      case "Kam":
      case "Juda Kam":
        return <TrendingDown className="h-4 w-4" />
      case "Tugagan":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Inventar Boshqaruvi</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Inventar Qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Inventar Qo'shish</DialogTitle>
                <DialogDescription>Yangi mahsulot inventarini qo'shing.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product" className="text-right">
                    Mahsulot
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Mahsulot tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kk-001">Klassik Ko'ylak</SelectItem>
                      <SelectItem value="js-002">Jinsi Shim</SelectItem>
                      <SelectItem value="yl-003">Yoz Libosi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Miqdor
                  </Label>
                  <Input id="quantity" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reason" className="text-right">
                    Sabab
                  </Label>
                  <Textarea id="reason" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Saqlash</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Yangilash
          </Button>
        </div>
      </div>

      {/* Statistika Kartalari */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami Inventar Qiymati</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Barcha mahsulotlar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kam Mahsulotlar</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Qayta buyurtma kerak</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tugagan Mahsulotlar</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Zudlik bilan to'ldirish kerak</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami Mahsulot Turlari</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Faol mahsulotlar</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventar Ro'yxati</TabsTrigger>
          <TabsTrigger value="movements">Inventar Harakatlari</TabsTrigger>
          <TabsTrigger value="alerts">Ogohlantirishlar</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventar Ro'yxati</CardTitle>
              <CardDescription>Barcha mahsulotlarning joriy inventar holati.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Mahsulot nomi yoki SKU qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha statuslar</SelectItem>
                    <SelectItem value="Yaxshi">Yaxshi</SelectItem>
                    <SelectItem value="Kam">Kam</SelectItem>
                    <SelectItem value="Juda Kam">Juda Kam</SelectItem>
                    <SelectItem value="Tugagan">Tugagan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mahsulot</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Kategoriya</TableHead>
                    <TableHead>Joriy Zaxira</TableHead>
                    <TableHead>Min/Max</TableHead>
                    <TableHead>Qiymat</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joylashuv</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{item.currentStock}</span>
                          <span className="text-muted-foreground">dona</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {item.minStock} / {item.maxStock}
                        </span>
                      </TableCell>
                      <TableCell>${item.totalValue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(item.status)} className="flex items-center space-x-1">
                          {getStatusIcon(item.status)}
                          <span>{item.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedItem(item)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Inventar Tuzatish</DialogTitle>
                                <DialogDescription>
                                  {selectedItem?.name} uchun inventar miqdorini tuzating.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Joriy:</Label>
                                  <span className="col-span-3 font-semibold">{selectedItem?.currentStock} dona</span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="adjustment" className="text-right">
                                    Tuzatish
                                  </Label>
                                  <Input
                                    id="adjustment"
                                    type="number"
                                    placeholder="+10 yoki -5"
                                    value={adjustmentQuantity}
                                    onChange={(e) => setAdjustmentQuantity(e.target.value)}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="adjustmentReason" className="text-right">
                                    Sabab
                                  </Label>
                                  <Textarea
                                    id="adjustmentReason"
                                    placeholder="Tuzatish sababi..."
                                    value={adjustmentReason}
                                    onChange={(e) => setAdjustmentReason(e.target.value)}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Tuzatishni Saqlash</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventar Harakatlari</CardTitle>
              <CardDescription>So'nggi inventar o'zgarishlari tarixi.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mahsulot</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Tur</TableHead>
                    <TableHead>Miqdor</TableHead>
                    <TableHead>Sabab</TableHead>
                    <TableHead>Sana</TableHead>
                    <TableHead>Foydalanuvchi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="font-medium">{movement.productName}</TableCell>
                      <TableCell>{movement.sku}</TableCell>
                      <TableCell>
                        <Badge variant={movement.type === "Kirish" ? "default" : "secondary"}>
                          {movement.type === "Kirish" ? (
                            <Plus className="h-3 w-3 mr-1" />
                          ) : (
                            <Minus className="h-3 w-3 mr-1" />
                          )}
                          {movement.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={movement.quantity > 0 ? "text-green-600" : "text-red-600"}>
                          {movement.quantity > 0 ? "+" : ""}
                          {movement.quantity}
                        </span>
                      </TableCell>
                      <TableCell>{movement.reason}</TableCell>
                      <TableCell>{movement.date}</TableCell>
                      <TableCell>{movement.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingDown className="h-5 w-5 text-orange-500" />
                  <span>Kam Mahsulotlar</span>
                </CardTitle>
                <CardDescription>Qayta buyurtma qilish kerak bo'lgan mahsulotlar.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-orange-600">{item.currentStock} dona</p>
                        <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Tugagan Mahsulotlar</span>
                </CardTitle>
                <CardDescription>Zudlik bilan to'ldirish kerak bo'lgan mahsulotlar.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {outOfStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg border-red-200"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">0 dona</p>
                        <p className="text-xs text-muted-foreground">Tugagan</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
