"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Package, Users, ShoppingCart, Settings, Home, Shirt } from "lucide-react"
import { LanguageTranslator } from "@/components/language-translator"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Mijozlar",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Mahsulotlar",
    href: "/products",
    icon: Shirt,
  },
  {
    title: "Buyurtmalar",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Inventar",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Hisobotlar",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Sozlamalar",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64 border-r bg-background">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shirt className="h-8 w-8 mr-2 text-primary" />
                <h2 className="text-lg font-semibold">Fashion CRM</h2>
              </div>
              <LanguageTranslator />
            </div>
          </div>
          <div className="space-y-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-muted text-primary",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
