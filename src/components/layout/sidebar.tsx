"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  ShoppingBag, 
  Plane, 
  CreditCard, 
  Menu, 
  X 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/"
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/dashboard"
    },
    {
      href: "/dashboard/shopping",
      label: "Shopping",
      icon: ShoppingBag,
      active: pathname === "/dashboard/shopping"
    },
    {
      href: "/dashboard/travel",
      label: "Travel",
      icon: Plane,
      active: pathname === "/dashboard/travel"
    },
    {
      href: "/dashboard/subscriptions",
      label: "Subscriptions",
      icon: CreditCard,
      active: pathname === "/dashboard/subscriptions"
    }
  ]

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="ml-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="flex flex-col gap-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="font-bold text-xl">
                Inbox Loops
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    route.active 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col h-full w-[240px] border-r bg-background",
        className
      )}>
        <div className="flex flex-col gap-6 p-4">
          <Link href="/" className="font-bold text-xl">
            Inbox Loops
          </Link>
          <nav className="flex flex-col gap-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  route.active 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
