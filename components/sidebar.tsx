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
		<div className="pb-12 w-64 modern-sidebar flex flex-col justify-between">
			<div className="space-y-4 py-4">
				<div className="px-3 py-2">
					<div className="flex items-center mb-6">
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center gap-2">
								<img src="/image.png" alt="J-Shop CRM" className="h-10 w-10 rounded-full shadow-lg bg-white p-1" />
								<h2 className="text-xl font-bold tracking-wide text-white">
									K-SHOP CRM
								</h2>
							</div>
							<LanguageTranslator />
						</div>
					</div>
					<div className="space-y-1">
						<nav className="grid items-start px-2 text-base font-semibold lg:px-4 gap-1">
							{sidebarNavItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-white/10 hover:scale-[1.03] hover:shadow-md text-white",
										pathname === item.href &&
											"bg-white/20 text-indigo-100 shadow-lg",
									)}
								>
									<item.icon className="h-5 w-5" />
									{item.title}
								</Link>
							))}
						</nav>
					</div>
				</div>
			</div>
			<div className="px-3 pb-4 text-xs text-indigo-100 opacity-70">
				© 2025 J-SHOP CRM
				Founder: Jaloliddin Lapasov
			</div>
		</div>
	)
}
