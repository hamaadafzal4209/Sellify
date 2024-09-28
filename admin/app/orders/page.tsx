"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for orders
const ordersData = [
  {
    id: "ORD001",
    customer: "Alex Johnson",
    date: "2023-06-01",
    total: "$129.99",
    status: "Shipped",
  },
  {
    id: "ORD002",
    customer: "Sarah Williams",
    date: "2023-06-02",
    total: "$699.99",
    status: "Processing",
  },
  {
    id: "ORD003",
    customer: "Michael Brown",
    date: "2023-06-03",
    total: "$1299.99",
    status: "Delivered",
  },
  {
    id: "ORD004",
    customer: "Emily Davis",
    date: "2023-06-04",
    total: "$199.99",
    status: "Shipped",
  },
  {
    id: "ORD005",
    customer: "David Wilson",
    date: "2023-06-05",
    total: "$79.99",
    status: "Processing",
  },
  {
    id: "ORD006",
    customer: "Emma Taylor",
    date: "2023-06-06",
    total: "$349.99",
    status: "Delivered",
  },
  {
    id: "ORD007",
    customer: "James Anderson",
    date: "2023-06-07",
    total: "$89.99",
    status: "Shipped",
  },
  {
    id: "ORD008",
    customer: "Olivia Martinez",
    date: "2023-06-08",
    total: "$599.99",
    status: "Processing",
  },
  {
    id: "ORD009",
    customer: "Daniel Lee",
    date: "2023-06-09",
    total: "$149.99",
    status: "Delivered",
  },
  {
    id: "ORD010",
    customer: "Sophia Garcia",
    date: "2023-06-10",
    total: "$249.99",
    status: "Shipped",
  },
];

export default function OrderPage() {
  const [orders, setOrders] = React.useState(ordersData);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("date");
  const [sortOrder, setSortOrder] = React.useState("desc");

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const filteredOrders = orders
    .filter(
      (order) =>
        (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" ||
          order.status.toLowerCase() === statusFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex-1 px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-main-500">Orders</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <div className="flex items-center w-full md:w-auto">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2 form-input"
          />
          <Button className="flex items-center font-semibold gap-2 bg-main-500 hover:bg-main-600">
            Search <Search size={16} />
          </Button>
        </div>
        <div className="flex items-center justify-between space-x-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Sort orders</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSortBy("date")}>
                Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("total")}>
                Total
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="whitespace-normal">
                  {order.date}
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell className="">
                  <Select
                    value={order.status.toLowerCase()}
                    onValueChange={(newStatus) =>
                      handleStatusChange(order.id, newStatus)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">View order {order.id}</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="border-main-500 text-main-500 hover:bg-main-500 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center space-x-2">
          {pageNumbers.map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(number)}
              className={`${
                currentPage === number
                  ? "bg-main-500 text-white"
                  : "bg-transparent"
              } hover:bg-main-500 hover:text-white`}
            >
              {number}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))
          }
          disabled={currentPage === pageNumbers.length}
          className="border-main-500 text-main-500 hover:bg-main-500 hover:text-white transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
