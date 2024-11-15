import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Connect with Trusted Service Providers
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Find skilled professionals or offer your services on Bulir - your
            go-to platform for service connections
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="aspect-square relative mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2340&auto=format&fit=crop"
                  alt="Find Work"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Work</h3>
              <p className="text-muted-foreground">
                Showcase your skills and connect with clients looking for your
                expertise
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="aspect-square relative mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2369&auto=format&fit=crop"
                  alt="Hire Talent"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hire Talent</h3>
              <p className="text-muted-foreground">
                Browse through verified professionals and find the perfect match
                for your needs
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="aspect-square relative mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=2340&auto=format&fit=crop"
                  alt="Secure Payments"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">
                Enjoy peace of mind with our secure payment and escrow system
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Service Business?
          </h2>
          <p className="text-lg mb-8 max-w-[600px] mx-auto opacity-90">
            Join thousands of professionals who trust Bulir to grow their
            business and find opportunities
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Join Bulir Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
