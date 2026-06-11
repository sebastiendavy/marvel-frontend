import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pagination = ({ page, setPage, limit, data }) => {
  const lastPage = Math.ceil(data.count / limit);

  return (
    <div className="flex gap-4 items-center justify-center">
      <Button
        disabled={page === 1}
        variant="outline"
        onClick={() => setPage(page - 1)}
        className="disabled:text-gray-300"
      >
        <ChevronLeft />
      </Button>

      <span>{page}</span>

      <Button
        disabled={page === lastPage}
        variant="outline"
        onClick={() => setPage(page + 1)}
        className="disabled:text-gray-300"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
