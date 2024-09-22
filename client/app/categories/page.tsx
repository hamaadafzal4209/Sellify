"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu } from "lucide-react";
import ProductCard from "@/components/Products/ProductCard";

const categoriesData = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Toys",
  "Automotive",
  "Health",
  "Groceries",
  "Furniture",
  "Office Supplies",
];

export default function ProductPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSelectOpen, setSelectOpen] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const CategoryFilter = () => (
    <div className="space-y-4">
      {categoriesData.map((category) => (
        <div key={category} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={category}
            checked={selectedCategories.includes(category)}
            onChange={() => toggleCategory(category)}
            className="w-4 h-4 bg-gray-100 border-gray-300 rounded accent-primary-500 focus:ring-primary-500 dark:focus:ring-primary-600 focus:ring-2"
          />
          <label
            htmlFor={category}
            className="flex items-center cursor-pointer"
          >
            {category}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64">
            <div className="p-6 bg-white rounded-md shadow">
              <CategoryFilter />
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex flex-row gap-4 items-center justify-between md:justify-end">
              <Select onOpenChange={setSelectOpen}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent
                  className={`bg-white transition-transform duration-300 ease-in-out transform ${
                    isSelectOpen ? "scale-y-100" : "scale-y-0"
                  }`}
                >
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                  <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Open category filter</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="animate-sheet-open bg-white pt-10"
                >
                  <SheetHeader>
                    <SheetTitle>Categories</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <CategoryFilter />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="card-container gap-6">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
