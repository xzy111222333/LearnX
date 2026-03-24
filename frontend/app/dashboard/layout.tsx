"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  TrendingUp, 
  Settings,
  Menu
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { href: "/dashboard", label: "概览", icon: LayoutDashboard },
  { href: "/dashboard/materials", label: "我的资料", icon: FileText },
  { href: "/dashboard/orders", label: "我的订单", icon: ShoppingBag },
  { href: "/dashboard/earnings", label: "收益管理", icon: TrendingUp },
  { href: "/dashboard/settings", label: "账户设置", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <div className="flex-1 flex">
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Navigation */}
          <div className="lg:hidden sticky top-16 z-40 bg-background border-b border-border/40 px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">
                {sidebarItems.find((item) => item.href === pathname)?.label || "个人中心"}
              </h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <nav className="flex flex-col p-4 space-y-1">
                    {sidebarItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                            isActive
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      )
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
