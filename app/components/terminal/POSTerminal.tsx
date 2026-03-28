"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  ScanLine,
  Trash2,
  Percent,
  Calculator,
  CreditCard,
  Banknote,
  Smartphone,
  X,
  Plus,
  Minus,
  ShoppingCart,
  Tag,
  User,
  Receipt,
  MoreHorizontal,
  Package,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { THEME } from "@/lib/styles";
import { cn } from "@/lib/utils";

// Mock data
const categories = [
  { id: "all", name: "All", icon: Package, count: 156 },
  { id: "groceries", name: "Groceries", icon: Tag, count: 45 },
  { id: "beverages", name: "Drinks", icon: Tag, count: 32 },
  { id: "electronics", name: "Tech", icon: Tag, count: 28 },
  { id: "clothes", name: "Clothes", icon: Tag, count: 51 },
];

const products = [
  {
    id: 1,
    name: "Coca-Cola 1.5L",
    price: 45,
    category: "beverages",
    image: "/placeholder.png",
    stock: 12,
  },
  {
    id: 2,
    name: "Instant Noodles",
    price: 15,
    category: "groceries",
    image: "/placeholder.png",
    stock: 50,
  },
  {
    id: 3,
    name: "Rice 5kg",
    price: 250,
    category: "groceries",
    image: "/placeholder.png",
    stock: 20,
  },
  {
    id: 4,
    name: "Safeguard Soap",
    price: 35,
    category: "groceries",
    image: "/placeholder.png",
    stock: 8,
  },
  {
    id: 5,
    name: "Tissue Paper",
    price: 25,
    category: "groceries",
    image: "/placeholder.png",
    stock: 15,
  },
  {
    id: 6,
    name: "Coffee 200g",
    price: 120,
    category: "beverages",
    image: "/placeholder.png",
    stock: 10,
  },
  {
    id: 7,
    name: "USB Cable",
    price: 150,
    category: "electronics",
    image: "/placeholder.png",
    stock: 25,
  },
  {
    id: 8,
    name: "T-Shirt",
    price: 299,
    category: "clothes",
    image: "/placeholder.png",
    stock: 30,
  },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function POSTerminal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [recentSales, setRecentSales] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case "s":
            e.preventDefault();
            document.getElementById("search-input")?.focus();
            break;
          case "c":
            e.preventDefault();
            break;
          case "p":
            e.preventDefault();
            if (cart.length > 0) handlePayment();
            break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cart]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
    // Open cart on mobile when adding items
    if (isMobile && cart.length === 0) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  const handlePayment = () => {
    alert(`Processing payment: ₱${total.toFixed(2)}`);
    setRecentSales((prev) => [total, ...prev].slice(0, 5));
    setCart([]);
    setDiscount(0);
    setIsCartOpen(false);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Content Component (reused in sidebar and sheet)
  const CartContent = ({ inSheet = false }: { inSheet?: boolean }) => (
    <div className={cn("flex flex-col h-full", inSheet && "bg-white")}>
      {/* Cart Header */}
      <div
        className="px-4 sm:px-6 py-4 sm:py-5 border-b flex-shrink-0"
        style={{ borderColor: THEME.borderLight }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: THEME.accentLight }}
            >
              <ShoppingCart
                className="h-5 w-5"
                style={{ color: THEME.accent }}
              />
            </div>
            <div>
              <h2
                className="font-bold text-lg"
                style={{ color: THEME.textPrimary }}
              >
                Current Sale
              </h2>
              <p className="text-sm" style={{ color: THEME.textMuted }}>
                {cart.length > 0
                  ? `${cartItemCount} items in cart`
                  : "No items added"}
              </p>
            </div>
          </div>
          {cart.length > 0 && (
            <Badge
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: THEME.accent,
                color: "#ffffff",
              }}
            >
              ₱{total.toFixed(2)}
            </Badge>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: THEME.gray100 }}
            >
              <ShoppingCart
                className="h-8 sm:h-10 w-8 sm:w-10"
                style={{ color: THEME.gray300 }}
              />
            </div>
            <p
              className="font-semibold text-base sm:text-lg"
              style={{ color: THEME.textSecondary }}
            >
              Your cart is empty
            </p>
            <p
              className="text-sm mt-1 max-w-[200px]"
              style={{ color: THEME.textMuted }}
            >
              Click on products to add them to your sale
            </p>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-3 sm:px-4 py-4">
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl transition-all duration-200"
                  style={{ backgroundColor: THEME.gray50 }}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm truncate"
                      style={{ color: THEME.textPrimary }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: THEME.textMuted }}
                    >
                      ₱{item.price} each
                    </p>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95"
                      style={{ backgroundColor: THEME.gray200 }}
                    >
                      <Minus
                        className="h-3 w-3"
                        style={{ color: THEME.textSecondary }}
                      />
                    </button>
                    <span
                      className="w-8 sm:w-10 text-center font-semibold text-sm"
                      style={{ color: THEME.textPrimary }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95"
                      style={{ backgroundColor: THEME.accent }}
                    >
                      <Plus className="h-3 w-3 text-white" />
                    </button>
                  </div>

                  <div className="text-right min-w-[60px] sm:min-w-[80px]">
                    <p
                      className="font-bold text-sm"
                      style={{ color: THEME.accent }}
                    >
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:scale-105"
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                  >
                    <X
                      className="h-3 sm:h-4 w-3 sm:w-4"
                      style={{ color: THEME.error }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Totals Section */}
        <div
          className="px-4 sm:px-6 py-4 sm:py-5 space-y-3 border-t flex-shrink-0"
          style={{
            backgroundColor: THEME.gray50,
            borderColor: THEME.borderLight,
          }}
        >
          <div className="flex justify-between items-center text-sm">
            <span style={{ color: THEME.textSecondary }}>Subtotal</span>
            <span className="font-medium" style={{ color: THEME.textPrimary }}>
              ₱{subtotal.toFixed(2)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span
                className="flex items-center gap-2"
                style={{ color: THEME.success }}
              >
                <Percent className="h-3 w-3" />
                Discount ({discount}%)
              </span>
              <span className="font-medium" style={{ color: THEME.success }}>
                -₱{discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          <Separator style={{ backgroundColor: THEME.borderLight }} />

          <div className="flex justify-between items-end">
            <span
              className="text-base sm:text-lg font-semibold"
              style={{ color: THEME.textPrimary }}
            >
              Total
            </span>
            <span
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: THEME.accent }}
            >
              ₱{total.toFixed(2)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
            <Button
              variant="outline"
              className="gap-2 h-10 sm:h-11 rounded-xl border-0 font-medium text-xs sm:text-sm"
              style={{ backgroundColor: THEME.gray200 }}
              onClick={() => setShowDiscountModal(true)}
              disabled={cart.length === 0}
            >
              <Percent
                className="h-3 sm:h-4 w-3 sm:w-4"
                style={{ color: THEME.accent }}
              />
              Discount
            </Button>
            <Button
              variant="outline"
              className="gap-2 h-10 sm:h-11 rounded-xl border-0 font-medium text-xs sm:text-sm"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: THEME.error,
              }}
              onClick={clearCart}
              disabled={cart.length === 0}
            >
              <Trash2 className="h-3 sm:h-4 w-3 sm:w-4" />
              Clear
            </Button>
          </div>

          <button
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold gap-2 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ backgroundColor: THEME.accent }}
            onClick={handlePayment}
            disabled={cart.length === 0}
          >
            <Receipt className="h-4 sm:h-5 w-4 sm:w-5" />
            <span className="hidden sm:inline">Proceed to Payment</span>
            <span className="sm:hidden">Pay Now</span>
            <kbd className="hidden lg:inline-flex h-6 select-none items-center gap-1 rounded-lg bg-white/20 px-2 font-mono text-xs ml-2">
              Alt+P
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: THEME.bgMain }}
    >
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-3 border-b bg-white">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: THEME.accent }}
          >
            <ShoppingCart className="h-4 w-4 text-white" />
          </div>
          <span
            className="font-bold text-lg"
            style={{ color: THEME.textPrimary }}
          >
            POS Terminal
          </span>
        </div>

        {/* Mobile Cart Button */}
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <button
              className="relative p-2 rounded-lg"
              style={{ backgroundColor: THEME.gray100 }}
            >
              <ShoppingCart
                className="h-5 w-5"
                style={{ color: THEME.textPrimary }}
              />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: THEME.accent }}
                >
                  {cartItemCount}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0">
            <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
            <CartContent inSheet />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden p-2 sm:p-3 lg:p-4 gap-2 sm:gap-3 lg:gap-4">
        {/* Left Panel - Categories & Products */}
        <div
          className="flex-1 flex flex-col min-w-0 rounded-xl sm:rounded-2xl overflow-hidden"
          style={{
            backgroundColor: THEME.bgCard,
            boxShadow: THEME.shadowLg,
          }}
        >
          {/* Category Pills - Responsive */}
          <div
            className="flex items-center gap-2 p-2 sm:p-3 lg:p-4 overflow-x-auto flex-shrink-0 border-b scrollbar-hide"
            style={{ borderColor: THEME.borderLight }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
                style={
                  activeCategory === cat.id
                    ? {
                        backgroundColor: THEME.accent,
                        color: "#ffffff",
                        boxShadow: THEME.shadowMd,
                      }
                    : {
                        backgroundColor: THEME.gray100,
                        color: THEME.textSecondary,
                        border: `1px solid ${THEME.borderLight}`,
                      }
                }
              >
                <cat.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{cat.name}</span>
                <span className="sm:hidden">{cat.name.slice(0, 4)}</span>
                <span
                  className="ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs"
                  style={
                    activeCategory === cat.id
                      ? { backgroundColor: "rgba(255,255,255,0.2)" }
                      : { backgroundColor: THEME.gray200 }
                  }
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Product Grid - Responsive Columns */}
          <ScrollArea className="flex-1 p-2 sm:p-3 lg:p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="transition-all duration-200 hover:-translate-y-1"
                >
                  <Card
                    className="cursor-pointer border-0 overflow-hidden group h-full"
                    style={{
                      backgroundColor: THEME.gray50,
                      boxShadow: THEME.shadowSm,
                    }}
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-0">
                      <div
                        className="aspect-square relative overflow-hidden"
                        style={{ backgroundColor: THEME.gray100 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package
                            className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 transition-transform duration-200 group-hover:scale-110"
                            style={{ color: THEME.gray300 }}
                          />
                        </div>
                        {product.stock < 10 && (
                          <div
                            className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium"
                            style={{
                              backgroundColor: "rgba(239, 68, 68, 0.1)",
                              color: THEME.error,
                            }}
                          >
                            Low
                          </div>
                        )}
                      </div>
                      <div className="p-2 sm:p-3 lg:p-4">
                        <h3
                          className="font-semibold text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2"
                          style={{ color: THEME.textPrimary }}
                        >
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span
                            className="font-bold text-sm sm:text-base lg:text-lg"
                            style={{ color: THEME.accent }}
                          >
                            ₱{product.price}
                          </span>
                          <div
                            className="flex items-center gap-1 text-[10px] sm:text-xs"
                            style={{ color: THEME.textMuted }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  product.stock < 10
                                    ? THEME.error
                                    : THEME.success,
                              }}
                            />
                            <span className="hidden sm:inline">
                              {product.stock} left
                            </span>
                            <span className="sm:hidden">{product.stock}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Search & Scan Bar - Responsive */}
          <div
            className="p-2 sm:p-3 lg:p-4 border-t flex-shrink-0"
            style={{
              borderColor: THEME.borderLight,
              backgroundColor: THEME.gray50,
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1 max-w-full sm:max-w-md">
                <Search
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5"
                  style={{ color: THEME.accent }}
                />
                <Input
                  id="search-input"
                  placeholder="Search or scan..."
                  className="pl-9 sm:pl-12 h-10 sm:h-12 lg:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-0 shadow-sm"
                  style={{
                    backgroundColor: THEME.bgCard,
                    color: THEME.textPrimary,
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <kbd
                  className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex h-6 select-none items-center gap-1 rounded-lg px-2 font-mono text-xs font-medium"
                  style={{
                    backgroundColor: THEME.gray200,
                    color: THEME.textMuted,
                  }}
                >
                  Alt+S
                </kbd>
              </div>
              <Button
                size="sm"
                className="gap-1.5 sm:gap-3 h-10 sm:h-12 lg:h-14 px-3 sm:px-4 lg:px-6 rounded-lg sm:rounded-xl border-0 shadow-sm font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: THEME.accent,
                  color: "#ffffff",
                }}
              >
                <ScanLine className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="hidden sm:inline">Scan</span>
                <kbd className="hidden lg:inline-flex h-6 select-none items-center gap-1 rounded-lg bg-white/20 px-2 font-mono text-xs">
                  Alt+C
                </kbd>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Cart Sidebar - Desktop Only */}
        <div
          className="hidden lg:flex w-[380px] xl:w-[420px] flex-col flex-shrink-0 rounded-2xl overflow-hidden"
          style={{
            backgroundColor: THEME.bgCard,
            boxShadow: THEME.shadowLg,
          }}
        >
          <CartContent />
        </div>
      </div>

      {/* Mobile Floating Cart Button (when cart has items) */}
      {isMobile && cart.length > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white z-40 transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: THEME.accent }}
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white bg-red-500">
              {cartItemCount}
            </span>
          </div>
        </button>
      )}

      {/* Discount Modal - Responsive */}
      {showDiscountModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-200"
          style={{ backgroundColor: THEME.bgOverlay }}
          onClick={() => setShowDiscountModal(false)}
        >
          <div
            className="w-full max-w-sm transition-transform duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Card
              className="border-0"
              style={{
                backgroundColor: THEME.bgCard,
                boxShadow: THEME.shadowLg,
              }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: THEME.accentLight }}
                  >
                    <Percent
                      className="h-5 w-5"
                      style={{ color: THEME.accent }}
                    />
                  </div>
                  <div>
                    <CardTitle
                      className="text-lg"
                      style={{ color: THEME.textPrimary }}
                    >
                      Apply Discount
                    </CardTitle>
                    <p className="text-sm" style={{ color: THEME.textMuted }}>
                      Select a discount percentage
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[5, 10, 15, 20, 25, 50].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setDiscount(pct)}
                      className="py-3 rounded-xl font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
                      style={
                        discount === pct
                          ? {
                              backgroundColor: THEME.accent,
                              color: "#ffffff",
                            }
                          : {
                              backgroundColor: THEME.gray100,
                              color: THEME.textSecondary,
                            }
                      }
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Input
                    placeholder="Custom %"
                    type="number"
                    className="h-12 rounded-xl border-0 text-center font-semibold"
                    style={{ backgroundColor: THEME.gray100 }}
                    onChange={(e) =>
                      setDiscount(
                        Math.min(100, Math.max(0, Number(e.target.value))),
                      )
                    }
                  />
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold"
                    style={{ color: THEME.textMuted }}
                  >
                    %
                  </span>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-0 font-medium"
                    style={{ backgroundColor: THEME.gray200 }}
                    onClick={() => setShowDiscountModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-12 rounded-xl font-medium text-white border-0"
                    style={{ backgroundColor: THEME.accent }}
                    onClick={() => setShowDiscountModal(false)}
                  >
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
