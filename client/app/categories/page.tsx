"use client";
import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { getAllProducts } from "../redux/Features/product/productAction";
import { fetchAllCategories } from "../redux/Features/category/categoryAction";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.product);
  const { allCategories, isLoading: isCategoriesLoading } = useSelector(
    (state) => state.category
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSelectOpen, setSelectOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newSelectedCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      console.log("Selected Categories:", newSelectedCategories);
      return newSelectedCategories;
    });
  };

  useEffect(() => {
    console.log("All Products:", allProducts);
    console.log("All Categories:", allCategories);
  }, [allProducts, allCategories]);

  const filteredProducts = allProducts.filter((product) => {
    const inSelectedCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    console.log("Product:", product);
    console.log("In Selected Category:", inSelectedCategory);

    return inSelectedCategory;
  });

  console.log("Filtered Products:", filteredProducts); // Log the filtered results

  const CategoryFilter = () => {
    return (
      <div className="space-y-4">
        {isCategoriesLoading ? (
          <p>Loading categories...</p>
        ) : (
          allCategories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={category.name}
                checked={selectedCategories.includes(category.name)}
                onChange={() => toggleCategory(category.name)}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded accent-primary-500 focus:ring-primary-500 dark:focus:ring-primary-600 focus:ring-2"
              />
              <label
                htmlFor={category.name}
                className="flex items-center cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <main className="main-container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block max-w-[300px]">
            <div className="p-6 bg-white rounded-md shadow">
              <h2 className="text-xl font-poppins mb-4 font-semibold">
                Filter By Category
              </h2>
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
                  className={`bg-white transition-all duration-300 ease-in-out ${
                    isSelectOpen
                      ? "animate-fade-in"
                      : "animate-fade-out pointer-events-none"
                  }`}
                >
                  <SelectItem
                    className="cursor-pointer hover:bg-gray-100 rounded-md"
                    value="default"
                  >
                    Default
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-gray-100 rounded-md"
                    value="price-low-high"
                  >
                    Price: Low to High
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-gray-100 rounded-md"
                    value="price-high-low"
                  >
                    Price: High to Low
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-gray-100 rounded-md"
                    value="name-a-z"
                  >
                    Name: A to Z
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-gray-100 rounded-md"
                    value="name-z-a"
                  >
                    Name: Z to A
                  </SelectItem>
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

            {/* Product Cards */}
            <div className="card-container gap-6">
              {isLoading ? (
                <p className="flex items-center justify-center">
                  <ClipLoader />
                </p>
              ) : filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
