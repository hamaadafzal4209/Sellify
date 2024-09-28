/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];

const recentOrders = [
  {
    id: "ORD001",
    customer: "Alex Johnson",
    product: "Wireless Headphones",
    total: "$129.99",
    status: "Shipped",
  },
  {
    id: "ORD002",
    customer: "Sarah Williams",
    product: "Smartphone X",
    total: "$699.99",
    status: "Processing",
  },
  {
    id: "ORD003",
    customer: "Michael Brown",
    product: "Laptop Pro",
    total: "$1299.99",
    status: "Delivered",
  },
  {
    id: "ORD004",
    customer: "Emily Davis",
    product: "Smartwatch",
    total: "$199.99",
    status: "Shipped",
  },
  {
    id: "ORD005",
    customer: "David Wilson",
    product: "maintooth Speaker",
    total: "$79.99",
    status: "Processing",
  },
];

const topProducts = [
  { name: "Wireless Headphones", sales: 1234, revenue: "$159,999.66" },
  { name: "Smartphone X", sales: 1000, revenue: "$699,990.00" },
  { name: "Laptop Pro", sales: 876, revenue: "$1,138,799.24" },
  { name: "Smartwatch", sales: 765, revenue: "$152,999.35" },
  { name: "maintooth Speaker", sales: 654, revenue: "$52,319.46" },
];

const page = () => {
  const [dateFilter, setDateFilter] = useState("7d");

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    console.log(`Fetching data for last ${value}`);
  };

  return (
    <>
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-4">
          <h2 className="text-3xl font-bold tracking-tight text-main-600">
            Dashboard
          </h2>
          <Select value={dateFilter} onValueChange={handleDateFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-main-600">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-main-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-main-900">$45,231.89</div>
              <p className="text-xs text-main-500">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-main-600">
                Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-main-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-main-900">+2350</div>
              <p className="text-xs text-main-500">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-main-600">
                Products
              </CardTitle>
              <Package className="h-4 w-4 text-main-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-main-900">+12,234</div>
              <p className="text-xs text-main-500">+19% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-main-600">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-main-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-main-900">+573,234</div>
              <p className="text-xs text-main-500">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4 bg-white">
            <CardHeader>
              <CardTitle className="text-main-600">Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <XAxis
                    dataKey="name"
                    stroke="#1e40af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#1e40af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-full lg:col-span-3 bg-white">
            <CardHeader>
              <CardTitle className="text-main-600">Recent Orders</CardTitle>
              <CardDescription className="text-main-500">
                You have {recentOrders.length} orders this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4 bg-white">
            <CardHeader>
              <CardTitle className="text-main-600">
                Top Selling Products
              </CardTitle>
              <CardDescription className="text-main-500">
                Your top 5 products this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>{product.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="col-span-full lg:col-span-3 bg-white">
            <CardHeader>
              <CardTitle className="text-main-600">Recent Customers</CardTitle>
              <CardDescription className="text-main-500">
                You have 265 customers this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentOrders.map((order) => (
                  <div className="flex items-center" key={order.id}>
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32`}
                        alt="Avatar"
                      />
                      <AvatarFallback>
                        {order.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {order.customer}
                      </p>
                      <p className="text-sm text-main-500">{order.product}</p>
                    </div>
                    <div className="ml-auto font-medium">{order.total}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default page;
