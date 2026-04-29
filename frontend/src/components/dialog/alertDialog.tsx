import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/services/book";
import { Delete } from "lucide-react";
import toast from "react-hot-toast";
import { ButtonLoader } from "../loader/ButtonLoader";

interface Props {
  id: string;
}

interface Ires {
  data?: {
    data?: {};
    message?: string;
    success?: boolean;
  };
}

export function DeleteAlertDialog({ id }: Props) {
  const [deleteHandler, { isLoading }] = useDeleteBookMutation();
  const deleteBook = async () => {
    const res: Ires = await deleteHandler({ id: id });
    if (res.data?.success) {
      toast.success("Successfully deleted book!");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <Delete />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your book
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer w-30"
            onClick={deleteBook}
          >
            {isLoading ? <ButtonLoader /> : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
