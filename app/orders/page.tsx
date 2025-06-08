"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Eye, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  customer: string
  date: string
  total: string
  status: string
  items: number
  paymentStatus: string
  shippingAddress?: string
  notes?: string
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Jaloliddin Lapasov",
    date: "2024-01-15",
    total: "$125.00",
    status: "Yetkazildi",
    items: 3,
    paymentStatus: "To'langan",
    shippingAddress: "Toshkent, Chilonzor tumani",
    notes: "Tezkor yetkazib berish so'ralgan",
  },
  {
    id: "ORD-002",
    customer: "Asadbek Matvaliyev",
    date: "2024-01-14",
    total: "$89.50",
    status: "Yo'lda",
    items: 2,
    paymentStatus: "To'langan",
    shippingAddress: "Toshkent, Yunusobod tumani",
  },
  {
    id: "ORD-003",
    customer: "Sherzod Jumayev",
    date: "2024-01-13",
    total: "$156.75",
    status: "Tayyorlanmoqda",
    items: 4,
    paymentStatus: "Kutilmoqda",
    shippingAddress: "Samarqand, Markaz tumani",
  },
  {
    id: "ORD-004",
    customer: "Ulug'bek Sobirov",
    date: "2024-01-12",
    total: "$67.25",
    status: "Bekor qilingan",
    items: 1,
    paymentStatus: "Qaytarilgan",
    shippingAddress: "Buxoro, Markaz tumani",
    notes: "Mijoz tomonidan bekor qilingan",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null)
  const { toast } = useToast()

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Yetkazildi":
        return "default"
      case "Yo'lda":
        return "secondary"
      case "Tayyorlanmoqda":
        return "outline"
      case "Bekor qilingan":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "To'langan":
        return "default"
      case "Kutilmoqda":
        return "secondary"
      case "Qaytarilgan":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order)
    setIsEditDialogOpen(true)
  }

  const handleViewOrder = (order: Order) => {
    setViewingOrder(order)
    setIsViewDialogOpen(true)
  }

  const handleUpdateOrder = () => {
    if (!editingOrder) return

    setOrders(orders.map((o) => (o.id === editingOrder.id ? editingOrder : o)))
    setIsEditDialogOpen(false)
    setEditingOrder(null)

    toast({
      title: "Muvaffaqiyat",
      description: "Buyurtma ma'lumotlari yangilandi.",
    })
  }

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter((o) => o.id !== orderId))

    toast({
      title: "Muvaffaqiyat",
      description: "Buyurtma o'chirildi.",
    })
  }

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))

    toast({
      title: "Muvaffaqiyat",
      description: `Buyurtma holati "${newStatus}" ga o'zgartirildi.`,
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Buyurtmalar</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buyurtmalar Ro'yxati</CardTitle>
          <CardDescription>Barcha buyurtmalarni kuzating va boshqaring.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buyurtma ID yoki mijoz ismini qidirish..."
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
                <SelectItem value="Tayyorlanmoqda">Tayyorlanmoqda</SelectItem>
                <SelectItem value="Yo'lda">Yo'lda</SelectItem>
                <SelectItem value="Yetkazildi">Yetkazildi</SelectItem>
                <SelectItem value="Bekor qilingan">Bekor qilingan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buyurtma ID</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Mahsulotlar</TableHead>
                <TableHead>Jami</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>To'lov</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items} ta</TableCell>
                  <TableCell className="font-semibold">{order.total}</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(value) => handleUpdateStatus(order.id, value)}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tayyorlanmoqda">Tayyorlanmoqda</SelectItem>
                        <SelectItem value="Yo'lda">Yo'lda</SelectItem>
                        <SelectItem value="Yetkazildi">Yetkazildi</SelectItem>
                        <SelectItem value="Bekor qilingan">Bekor qilingan</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditOrder(order)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Buyurtmani o'chirish</AlertDialogTitle>
                            <AlertDialogDescription>
                              Haqiqatan ham {order.id} buyurtmasini o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteOrder(order.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              O'chirish
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Buyurtma Tafsilotlari</DialogTitle>
            <DialogDescription>Buyurtma haqida to'liq ma'lumot</DialogDescription>
          </DialogHeader>
          {viewingOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Buyurtma ID</Label>
                  <p className="text-sm text-muted-foreground">{viewingOrder.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Mijoz</Label>
                  <p className="text-sm text-muted-foreground">{viewingOrder.customer}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Sana</Label>
                  <p className="text-sm text-muted-foreground">{viewingOrder.date}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Jami summa</Label>
                  <p className="text-sm text-muted-foreground font-semibold">{viewingOrder.total}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={getStatusColor(viewingOrder.status)} className="mt-1">
                    {viewingOrder.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">To'lov holati</Label>
                  <Badge variant={getPaymentStatusColor(viewingOrder.paymentStatus)} className="mt-1">
                    {viewingOrder.paymentStatus}
                  </Badge>
                </div>
              </div>
              {viewingOrder.shippingAddress && (
                <div>
                  <Label className="text-sm font-medium">Yetkazib berish manzili</Label>
                  <p className="text-sm text-muted-foreground">{viewingOrder.shippingAddress}</p>
                </div>
              )}
              {viewingOrder.notes && (
                <div>
                  <Label className="text-sm font-medium">Izohlar</Label>
                  <p className="text-sm text-muted-foreground">{viewingOrder.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Yopish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Buyurtmani Tahrirlash</DialogTitle>
            <DialogDescription>Buyurtma ma'lumotlarini yangilang.</DialogDescription>
          </DialogHeader>
          {editingOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-customer" className="text-right">
                  Mijoz
                </Label>
                <Input
                  id="edit-customer"
                  value={editingOrder.customer}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-total" className="text-right">
                  Jami summa
                </Label>
                <Input
                  id="edit-total"
                  value={editingOrder.total}
                  onChange={(e) => setEditingOrder({ ...editingOrder, total: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editingOrder.status}
                  onValueChange={(value) => setEditingOrder({ ...editingOrder, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tayyorlanmoqda">Tayyorlanmoqda</SelectItem>
                    <SelectItem value="Yo'lda">Yo'lda</SelectItem>
                    <SelectItem value="Yetkazildi">Yetkazildi</SelectItem>
                    <SelectItem value="Bekor qilingan">Bekor qilingan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-payment" className="text-right">
                  To'lov holati
                </Label>
                <Select
                  value={editingOrder.paymentStatus}
                  onValueChange={(value) => setEditingOrder({ ...editingOrder, paymentStatus: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To'langan">To'langan</SelectItem>
                    <SelectItem value="Kutilmoqda">Kutilmoqda</SelectItem>
                    <SelectItem value="Qaytarilgan">Qaytarilgan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Manzil
                </Label>
                <Textarea
                  id="edit-address"
                  value={editingOrder.shippingAddress || ""}
                  onChange={(e) => setEditingOrder({ ...editingOrder, shippingAddress: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">
                  Izohlar
                </Label>
                <Textarea
                  id="edit-notes"
                  value={editingOrder.notes || ""}
                  onChange={(e) => setEditingOrder({ ...editingOrder, notes: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleUpdateOrder}>Yangilash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
