"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  category: string
  price: string
  stock: number
  size: string
  color: string
  image: string
  status: string
  description?: string
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Klassik Ko'ylak",
    category: "Ko'ylaklar",
    price: "$45",
    stock: 25,
    size: "S, M, L, XL",
    color: "Oq, Qora, Yashil",
    image: "/placeholder.svg?height=100&width=100",
    status: "Mavjud",
    description: "Yumshoq paxta materialidan tayyorlangan klassik ko'ylak",
  },
  {
    id: 2,
    name: "JinsiDAn Shimlar",
    category: "Shimlar",
    price: "$65",
    stock: 15,
    size: "28, 30, 32, 34, 36",
    color: "Ko'k, Qora",
    image: "/placeholder.svg?height=100&width=100",
    status: "Mavjud",
    description: "Yuqori sifatli jinsi materialdan tayyorlangan shim",
  },
  {
    id: 3,
    name: "Yoz Libosi",
    category: "Liboslar",
    price: "$85",
    stock: 8,
    size: "S, M, L",
    color: "Pushti, Sariq, Yashil",
    image: "/placeholder.svg?height=100&width=100",
    status: "Kam",
    description: "Yengil va qulay yoz libosi",
  },
  {
    id: 4,
    name: "Sport Kurtka",
    category: "Kurtkalar",
    price: "$120",
    stock: 0,
    size: "M, L, XL",
    color: "Qora, Kulrang",
    image: "/placeholder.svg?height=100&width=100",
    status: "Tugagan",
    description: "Sport faoliyati uchun mo'ljallangan kurtka",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: 0,
    size: "",
    color: "",
    description: "",
  })
  const { toast } = useToast()

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  const getStatusFromStock = (stock: number) => {
    if (stock === 0) return "Tugagan"
    if (stock < 10) return "Kam"
    return "Mavjud"
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Xatolik",
        description: "Iltimos, barcha majburiy maydonlarni to'ldiring.",
        variant: "destructive",
      })
      return
    }

    const product: Product = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      ...newProduct,
      image: "/placeholder.svg?height=100&width=100",
      status: getStatusFromStock(newProduct.stock),
    }

    setProducts([...products, product])
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: 0,
      size: "",
      color: "",
      description: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Muvaffaqiyat",
      description: "Yangi mahsulot qo'shildi.",
    })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    const updatedProduct = {
      ...editingProduct,
      status: getStatusFromStock(editingProduct.stock),
    }

    setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)))
    setIsEditDialogOpen(false)
    setEditingProduct(null)

    toast({
      title: "Muvaffaqiyat",
      description: "Mahsulot ma'lumotlari yangilandi.",
    })
  }

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((p) => p.id !== productId))

    toast({
      title: "Muvaffaqiyat",
      description: "Mahsulot o'chirildi.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Mahsulotlar</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yangi Mahsulot
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Yangi Mahsulot Qo'shish</DialogTitle>
              <DialogDescription>Yangi mahsulot ma'lumotlarini kiriting.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="productName" className="text-right">
                  Nomi *
                </Label>
                <Input
                  id="productName"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Kategoriya *
                </Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Kategoriya tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ko'ylaklar">Ko'ylaklar</SelectItem>
                    <SelectItem value="Shimlar">Shimlar</SelectItem>
                    <SelectItem value="Liboslar">Liboslar</SelectItem>
                    <SelectItem value="Kurtkalar">Kurtkalar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Narx *
                </Label>
                <Input
                  id="price"
                  placeholder="$45"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Miqdor
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  O'lchamlar
                </Label>
                <Input
                  id="size"
                  placeholder="S, M, L, XL"
                  value={newProduct.size}
                  onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Ranglar
                </Label>
                <Input
                  id="color"
                  placeholder="Oq, Qora, Ko'k"
                  value={newProduct.color}
                  onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Tavsif
                </Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddProduct}>Saqlash</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mahsulotlar Ro'yxati</CardTitle>
          <CardDescription>Barcha mahsulotlarni boshqaring va inventarni kuzating.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Mahsulotlarni qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategoriya" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha kategoriyalar</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge
                          variant={
                            product.status === "Mavjud"
                              ? "default"
                              : product.status === "Kam"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {product.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">{product.price}</span>
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{product.stock}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>O'lcham: {product.size}</p>
                        <p>Rang: {product.color}</p>
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
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
                              <AlertDialogTitle>Mahsulotni o'chirish</AlertDialogTitle>
                              <AlertDialogDescription>
                                Haqiqatan ham {product.name}ni o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                O'chirish
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Mahsulot Ma'lumotlarini Tahrirlash</DialogTitle>
            <DialogDescription>Mahsulot ma'lumotlarini yangilang.</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nomi *
                </Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Kategoriya *
                </Label>
                <Select
                  value={editingProduct.category}
                  onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ko'ylaklar">Ko'ylaklar</SelectItem>
                    <SelectItem value="Shimlar">Shimlar</SelectItem>
                    <SelectItem value="Liboslar">Liboslar</SelectItem>
                    <SelectItem value="Kurtkalar">Kurtkalar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Narx *
                </Label>
                <Input
                  id="edit-price"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">
                  Miqdor
                </Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, stock: Number.parseInt(e.target.value) || 0 })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-size" className="text-right">
                  O'lchamlar
                </Label>
                <Input
                  id="edit-size"
                  value={editingProduct.size}
                  onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-color" className="text-right">
                  Ranglar
                </Label>
                <Input
                  id="edit-color"
                  value={editingProduct.color}
                  onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Tavsif
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleUpdateProduct}>Yangilash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
