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
import type { IBook, IBookWithoutId } from "@/interfaces/Ibook";
import { Edit3, EyeIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { BookSelection } from "../select/BookSelection";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
} from "@/redux/services/book";
import { useState } from "react";
import toast from "react-hot-toast";
import { IsAvailableRadio } from "@/components/radio/IsAvailable";
import { ButtonLoader } from "../loader/ButtonLoader";
import { useNavigate } from "react-router";

interface Props {
  book?: IBook;
  mode: "create" | "update" | "view";
}

const genereList = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

// interface IBookType {
//   bookData: IBook;
//   id: string;
// }

export function BookMutationDialog({ book, mode }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const defaultvalues = {
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
    available: true,
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<IBookWithoutId>({
    defaultValues:
      mode === "update"
        ? { ...book }
        : mode === "view"
        ? { ...book }
        : defaultvalues,
  });
  // console.log(errors);
  const selectedGenre = watch("genre");
  const selectAvailable = watch("available");
  const [updateBook, { isLoading: updateLoading }] = useUpdateBookMutation();
  const [createBook, { isLoading: createLoading }] = useCreateBookMutation();
  console.log(errors);
  const onSubmit: SubmitHandler<IBookWithoutId> = async (formData) => {
    // console.log("clik");
    // console.log("formData", formData);
    if (selectedGenre === "") {
      setError("genre", { type: "required", message: "Genre is required" });
      alert("Genre is required");
      return;
    }
    try {
      if (mode === "update" && book) {
        const res = await updateBook({
          bookData: formData,
          id: book._id,
        }).unwrap();
        if (res.success) {
          toast.success("Book updated successfully!");
          setOpen(false);
          reset(defaultvalues);
          navigate("/books");
        }
      } else {
        const res = await createBook({
          bookData: formData,
        }).unwrap();
        if (res.success) {
          toast.success(res.message);
          setOpen(false);
          reset(defaultvalues);
          navigate("/books");
        } else {
          toast.error(res.data.message);
          console.log(res);
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error?.data?.error && Array.isArray(error.data.error)) {
        error.data.error.forEach((err: any) => {
          const filedName = err.path[0];
          const message = err.message || "Validation error";
          setError(filedName, { type: "server", message });
        });
      } else {
        toast.error("Something went wrong!");
        if (error?.data.error.name === "MongooseError") {
          setError("isbn", {
            type: "server",
            message: error.data.error.message,
          });
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          {mode === "create" ? (
            "Add Book"
          ) : mode === "update" ? (
            <Edit3 />
          ) : (
            <EyeIcon />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create"
                ? "Add Book"
                : mode === "update"
                ? "Update Book"
                : "Book Details"}
            </DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register("title")}
                disabled={mode === "view"}
                id="title"
                name="title"
                required
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author">Author</Label>
              <Input
                disabled={mode === "view"}
                {...register("author")}
                id="author"
                name="author"
                required
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                id="description"
                name="description"
                disabled={mode === "view"}
                required
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                {...register("isbn")}
                type="string"
                id="isbn"
                name="isbn"
                disabled={mode === "view"}
                required
              />
              {errors.isbn && (
                <p className="text-red-500 text-sm">{errors.isbn.message}</p>
              )}
            </div>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="copies">Copies</Label>
              <Input
                disabled={mode === "view"}
                {...register("copies", { valueAsNumber: true })}
                type="number"
                id="copies"
                name="copies"
                required
              />
              {errors.copies && (
                <p className="text-red-500 text-sm">{errors.copies.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label>Select a genre</Label>
            <BookSelection
              genre={selectedGenre}
              genreList={genereList}
              disabled={mode === "view"}
              onChange={(val) =>
                setValue("genre", val, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre.message}</p>
            )}
          </div>
          <div className="grid gap-3 mt-5 ">
            <IsAvailableRadio
              disabled={mode === "view"}
              isAvailable={selectAvailable}
              onChange={(val: "true" | "false") =>
                setValue("available", val === "true", {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
          </div>
          <Input type="hidden" id="available" {...register("available")} />
          <Input type="hidden" id="genre" {...register("genre")} />
          {mode === "create" || mode === "update" ? (
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button className="cursor-pointer" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="cursor-pointer w-30" type="submit">
                {createLoading || updateLoading ? (
                  <ButtonLoader />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          ) : (
            ""
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
