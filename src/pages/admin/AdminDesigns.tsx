import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Check, X, Star, Flag } from "lucide-react";

const mockDesigns = [
  {
    id: "1",
    title: "Dragon Tribal",
    artist: "David Rodriguez",
    category: "Tribal",
    status: "approved",
    uploadDate: "2024-01-15",
    reports: 0,
    featured: true
  },
  {
    id: "2",
    title: "Rose Geometric",
    artist: "Sarah Chen",
    category: "Geometric",
    status: "pending",
    uploadDate: "2024-01-20",
    reports: 1,
    featured: false
  },
  {
    id: "3",
    title: "Wolf Portrait",
    artist: "Emily Parker",
    category: "Realistic",
    status: "flagged",
    uploadDate: "2024-01-18",
    reports: 3,
    featured: false
  },
];

export default function AdminDesigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [designs] = useState(mockDesigns);

  const filteredDesigns = designs.filter(design =>
    design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>;
      case "rejected":
        return <Badge variant="outline">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Design Management</h1>
          <p className="text-muted-foreground">Review and moderate uploaded designs</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search designs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reports</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDesigns.map((design) => (
              <TableRow key={design.id}>
                <TableCell className="font-medium">{design.title}</TableCell>
                <TableCell>{design.artist}</TableCell>
                <TableCell>{design.category}</TableCell>
                <TableCell>{getStatusBadge(design.status)}</TableCell>
                <TableCell>
                  {design.reports > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {design.reports}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {design.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </TableCell>
                <TableCell>{new Date(design.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        View Design
                      </DropdownMenuItem>
                      {design.status === "pending" && (
                        <>
                          <DropdownMenuItem className="text-green-600">
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        {design.featured ? "Remove from Featured" : "Add to Featured"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Flag className="mr-2 h-4 w-4" />
                        Flag Design
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}