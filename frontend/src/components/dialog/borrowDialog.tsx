import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateSelection } from "../select/DateSelection";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IBorrowWithoutId } from "@/interfaces/Iborrow";
import { useBorrowBookMutation } from "@/redux/services/borrow";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ButtonLoader } from "../loader/ButtonLoader";

interface Props {
  id: string;
  refetch: () => void;
  isAvailable: boolean;
}

export function BorrowDialog({ id, refetch, isAvailable }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<IBorrowWithoutId>({
    defaultValues: {
      book: id,
    },
  });
  const selectedDate = watch("dueDate");
  console.log(selectedDate);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const onSubmit: SubmitHandler<IBorrowWithoutId> = async (formData) => {
    try {
      if (!selectedDate) {
        setError("dueDate", {
          type: "required",
          message: "Due date is required",
        });
        alert("Due date is required");
        return;
      }
      console.log("formData", formData);
      const res = await borrowBook({ borrowData: formData }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        setOpen(false);
        refetch();
        navigate("/borrow-summary");
      } else {
        toast.error(res.message);
        setOpen(false);
      }
    } catch (error: any) {
      if (error?.data?.error && Array.isArray(error.data.error)) {
        error.data.error.forEach((err: any) => {
          const fieldName = err.path[0];
          const message = err.message || "Validation error";
          setError(fieldName, { type: "server", message });
        });
      } else {
        toast.error("Something went wrong!");
        console.log(error);
        if (
          error.status === 400 &&
          error.data.message === "Insufficient amount"
        ) {
          console.log(error);
          setError("dueDate", { type: "server", message: error.data.message });
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!isAvailable}
          className="cursor-pointer"
          variant="outline"
        >
          Borrow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                {...register("quantity", { valueAsNumber: true })}
                id="quantity"
                type="number"
                name="quantity"
                required
                min={1}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <DateSelection
                // date={selectedDate}
                onChange={(val: Date | undefined) => {
                  console.log("Selected date:", val);
                  setValue("dueDate", val, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
              )}
            </div>
            <input
              type="date"
              hidden
              {...register("dueDate")}
              name="dueDate"
              id="dueDate"
            />
            <input
              type="text"
              hidden
              {...register("book")}
              id="book"
              name="book"
            />
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button className="cursor-pointer w-30" type="submit">
              {isLoading ? <ButtonLoader /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
