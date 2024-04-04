"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Define the shape of the data
export type Payment = {
  id: string // name -- shows in home
  name: string //id 
  version: string //version
  date: string //date
  repository: string //repository 
  amount: number//-- shows in home
  status: string//-- shows in home
  email: string//-- shows in home
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Add to Cart</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount)

      return (<div><Button className="text-right font-medium">ADD </Button></div>)
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


// export const getColumns = (handleAddToCart, handleRemoveFromCart, cartItems) => {
//   return columns.map((col) => {
//     if (col.accessorKey === 'amount') {
//       return {
//         ...col,
//         cell: ({ row }) => (
//           <div>
//             <Button
//               className="text-right font-medium"
//               onClick={() => handleAddToCart(row.original)}
//             >
//               ADD
//             </Button>
//           </div>
//         ),
//       };
//     }
//     return col;
//   });
// };

export const getColumns = (handleAddToCart, handleRemoveFromCart, cartItems) => {
  return columns.map((col) => {
    if (col.accessorKey === 'amount') {
      return {
        ...col,
        cell: ({ row }) => {
          const item = row.original;
          const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
          return (
            <div>
              {isInCart ? ( // Check if the item is in the cart and display the appropriate button
                <Button
                  className="text-right font-medium"
                  onClick={() => handleRemoveFromCart(item)}  
                >
                  REMOVE
                </Button>
              ) : (
                <Button
                  className="text-right font-medium"
                  onClick={() => handleAddToCart(item)}
                >
                  ADD
                </Button>
              )}
            </div>
          );
        },
      };
    }
    return col;
  }
  );
}





//               {cartItems.find(cartItem => cartItem.id === item.id) ? (
//                 <Button
//                   className="text-right font-medium"
//                   onClick={() => handleRemoveFromCart(item)}
//                 >
//                   REMOVE
//                 </Button>
//               ) : (
//                 <Button
//                   className="text-right font-medium"
//                   onClick={() => handleAddToCart(item)}
//                 >
//                   ADD
//                 </Button>
//               )}
//             </div>
//           );
//         },
//       };
//     }
//     return col;
//   });
// };


export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [cartCount, setCartCount] = useState(0);
  // Add a new state variable to store the items in the cart
  const [cartItems, setCartItems] = useState([]);
  const [fetchedData, setFetchedData] = useState<Payment[]>([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  //initialize cart items from local storage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCartItems);
    setCartCount(storedCartItems.length);
  }, []);
  

  const handleAddToCart = (rowData) => {
    console.log('Add to cart:', rowData);
    //get current cart data from local storage
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    //add new row data to cart data
    cartData.push(rowData);
    //update cart items with name of item
    setCartItems([...cartItems, rowData]);
    //update cart count
    setCartCount(cartItems.length + 1);
    //update local storage with new cart data
    localStorage.setItem('cart', JSON.stringify([...cartItems, rowData]));
    //setCartCount((prevCount) => prevCount + 1);
  };

  const handleRemoveFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
  
    // Remove the item from the cartItems state
    setCartItems(updatedCartItems);
  
    // Update the cart count
    setCartCount(updatedCartItems.length);
  
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };
  
  
  // const handleRemoveFromCart = (rowData) => {
  //   setCartItems(cartItems.filter(cartItem => cartItem.id !== rowData.id));
  // };

  //const columns = getColumns(handleAddToCart);
  const newColumns = getColumns(handleAddToCart, handleRemoveFromCart, cartItems);

  const table = useReactTable({
    data: fetchedData, //using fetched data from state
    columns: newColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const fetchData = async () => {
    console.log('fetching data');
    console.log('inputValue:', inputValue);
    try {
      // will need to be routed to backend to avoid the CORS issue... this is a temporary solution
      // Construct the API URL using the inputValue state
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/http://registry.npmjs.com/-/v1/search?text=${inputValue}&size=20`);
      // Update the firstFivePosts variable to match the expected data structure
      console.log('response:', response);
      setFetchedData(response.data.objects.map((pkg: any) => ({
        id: pkg.package.name, // name -- shows in home
        version: pkg.package.version, //version
        date: pkg.package.date, //date
        repository: pkg.package.links.repository, //repository 
        amount: 0, //-- shows in home
        status: pkg.package.name,//-- shows in home
        email: pkg.package.description,//-- shows in home
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search NPM packages"
          value={ inputValue }
          onChange={(event) => setInputValue(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={fetchData}>Search</Button>
        <Button className="ml-2 h-4 w-400" onClick={() => navigate('/cart')}>Go to Cart</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>{cartCount}</span> {/* Display the cart count */}
            <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
          {cartItems.map((item, index) => (
            <div key={index}>{item.id}</div>
          ))}
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} package(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

