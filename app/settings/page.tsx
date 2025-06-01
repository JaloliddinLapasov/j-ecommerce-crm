"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import { Database, Mail, Phone, Save, Upload, Download, Trash2, Key, CreditCard } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    lowStock: true,
    newOrders: true,
    customerUpdates: false,
  })

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@fashioncrm.com",
    phone: "+998901234567",
    role: "Administrator",
  })

  const [business, setBusiness] = useState({
    name: "Fashion Store",
    address: "Toshkent, O'zbekiston",
    phone: "+998712345678",
    email: "info@fashionstore.com",
    website: "www.fashionstore.com",
    currency: "USD",
    timezone: "Asia/Tashkent",
    language: "uz",
  })

  const handleSave = () => {
    // Bu yerda ma'lumotlarni saqlash funksiyasi bo'ladi
    console.log("Settings saved")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sozlamalar</h2>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Saqlash
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="business">Biznes</TabsTrigger>
          <TabsTrigger value="notifications">Bildirishnomalar</TabsTrigger>
          <TabsTrigger value="security">Xavfsizlik</TabsTrigger>
          <TabsTrigger value="appearance">Ko'rinish</TabsTrigger>
          <TabsTrigger value="integrations">Integratsiyalar</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil Ma'lumotlari</CardTitle>
              <CardDescription>Shaxsiy ma'lumotlaringizni boshqaring.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Rasm Yuklash
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG yoki GIF. Maksimal 2MB.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">To'liq Ism</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select value={profile.role} onValueChange={(value) => setProfile({ ...profile, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Salesperson">Sotuvchi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Biznes Ma'lumotlari</CardTitle>
              <CardDescription>Kompaniya ma'lumotlarini sozlang.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Kompaniya Nomi</Label>
                  <Input
                    id="businessName"
                    value={business.name}
                    onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Biznes Email</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={business.email}
                    onChange={(e) => setBusiness({ ...business, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Biznes Telefon</Label>
                  <Input
                    id="businessPhone"
                    value={business.phone}
                    onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Veb-sayt</Label>
                  <Input
                    id="website"
                    value={business.website}
                    onChange={(e) => setBusiness({ ...business, website: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Valyuta</Label>
                  <Select
                    value={business.currency}
                    onValueChange={(value) => setBusiness({ ...business, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - Dollar</SelectItem>
                      <SelectItem value="UZS">UZS - So'm</SelectItem>
                      <SelectItem value="EUR">EUR - Evro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Vaqt Zonasi</Label>
                  <Select
                    value={business.timezone}
                    onValueChange={(value) => setBusiness({ ...business, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Tashkent">Toshkent (UTC+5)</SelectItem>
                      <SelectItem value="Asia/Dubai">Dubai (UTC+4)</SelectItem>
                      <SelectItem value="Europe/Moscow">Moskva (UTC+3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Manzil</Label>
                <Textarea
                  id="address"
                  value={business.address}
                  onChange={(e) => setBusiness({ ...business, address: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bildirishnoma Sozlamalari</CardTitle>
              <CardDescription>Qanday bildirishnomalar olishni tanlang.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Bildirishnomalar</Label>
                    <p className="text-sm text-muted-foreground">Email orqali bildirishnomalar olish</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Bildirishnomalar</Label>
                    <p className="text-sm text-muted-foreground">SMS orqali bildirishnomalar olish</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Bildirishnomalar</Label>
                    <p className="text-sm text-muted-foreground">Brauzer push bildirishnomalari</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Kam Inventar Ogohlantirishi</Label>
                    <p className="text-sm text-muted-foreground">Mahsulot tugaganda xabar berish</p>
                  </div>
                  <Switch
                    checked={notifications.lowStock}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Yangi Buyurtmalar</Label>
                    <p className="text-sm text-muted-foreground">Yangi buyurtma kelganda xabar berish</p>
                  </div>
                  <Switch
                    checked={notifications.newOrders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newOrders: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mijoz Yangilanishlari</Label>
                    <p className="text-sm text-muted-foreground">Mijoz ma'lumotlari o'zgarganda xabar berish</p>
                  </div>
                  <Switch
                    checked={notifications.customerUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, customerUpdates: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Xavfsizlik Sozlamalari</CardTitle>
              <CardDescription>Hisobingiz xavfsizligini boshqaring.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Parolni O'zgartirish</h4>
                    <p className="text-sm text-muted-foreground">Yangi parol o'rnating</p>
                  </div>
                  <Button variant="outline">
                    <Key className="mr-2 h-4 w-4" />
                    Parolni O'zgartirish
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Ikki Bosqichli Autentifikatsiya</h4>
                    <p className="text-sm text-muted-foreground">Qo'shimcha xavfsizlik qatlami</p>
                  </div>
                  <Badge variant="outline">Faol emas</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Faol Sessiyalar</h4>
                    <p className="text-sm text-muted-foreground">Barcha qurilmalardagi faol sessiyalar</p>
                  </div>
                  <Button variant="outline">Ko'rish</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Ma'lumotlarni Eksport Qilish</h4>
                    <p className="text-sm text-muted-foreground">Barcha ma'lumotlaringizni yuklab oling</p>
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Eksport
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-600">Hisobni O'chirish</h4>
                    <p className="text-sm text-muted-foreground">Hisobingizni butunlay o'chirish</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        O'chirish
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hisobni o'chirishni tasdiqlang</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bu amalni bekor qilib bo'lmaydi. Bu sizning hisobingizni va barcha ma'lumotlaringizni butunlay
                          o'chiradi.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">O'chirish</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ko'rinish Sozlamalari</CardTitle>
              <CardDescription>Interfeys ko'rinishini sozlang.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Mavzu</Label>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Yorug'</SelectItem>
                      <SelectItem value="dark">Qorong'u</SelectItem>
                      <SelectItem value="system">Tizim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Til</Label>
                  <Select
                    value={business.language}
                    onValueChange={(value) => setBusiness({ ...business, language: value })}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uz">O'zbek</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Sana Formati</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integratsiyalar</CardTitle>
              <CardDescription>Tashqi xizmatlar bilan bog'lanishni sozlang.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Email Xizmati</h4>
                      <p className="text-sm text-muted-foreground">SMTP email yuborish</p>
                    </div>
                  </div>
                  <Badge variant="outline">Sozlanmagan</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">SMS Xizmati</h4>
                      <p className="text-sm text-muted-foreground">SMS yuborish xizmati</p>
                    </div>
                  </div>
                  <Badge variant="outline">Sozlanmagan</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium">To'lov Tizimi</h4>
                      <p className="text-sm text-muted-foreground">Onlayn to'lovlar</p>
                    </div>
                  </div>
                  <Badge variant="default">Faol</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="h-8 w-8 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Ma'lumotlar Bazasi</h4>
                      <p className="text-sm text-muted-foreground">Tashqi ma'lumotlar bazasi</p>
                    </div>
                  </div>
                  <Badge variant="default">Faol</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
