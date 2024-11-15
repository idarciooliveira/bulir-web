import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Calendar, Store, Menu, Wallet } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function NavItem({ icon, label, onClick }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 text-base font-normal hover:bg-accent"
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar - Always visible */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            {/* Logo/Brand */}
            <h1 className="text-xl font-semibold">Bulir</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Wallet Balance */}
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <Wallet className="h-4 w-4" />
              <span>$1,234.56</span>
            </div>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-screen pt-16">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 flex-col fixed left-0 h-[calc(100vh-4rem)] border-r bg-background p-4">
          <nav className="space-y-2">
            <NavItem icon={<LayoutGrid className="h-5 w-5" />} label="Home" />
            <NavItem icon={<Calendar className="h-5 w-5" />} label="Bookings" />
            <NavItem icon={<Store className="h-5 w-5" />} label="Services" />
          </nav>
        </aside>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden absolute left-4 top-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-2 mt-8">
              <NavItem icon={<LayoutGrid className="h-5 w-5" />} label="Home" />
              <NavItem
                icon={<Calendar className="h-5 w-5" />}
                label="Bookings"
              />
              <NavItem icon={<Store className="h-5 w-5" />} label="Services" />
            </nav>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6">{children}</main>
      </div>
    </div>
  );
}
