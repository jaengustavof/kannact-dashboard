import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote } from "@/api/patientsApi";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ADDNOTES from "@/constants/AddNotes";
import { AddNoteProps } from "@/types/patients.types";
import { AddNoteFormValue } from "@/types/patients.types";

export default function AddNote({ patientId }: AddNoteProps) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<AddNoteFormValue>({
    defaultValues: {
      content: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: AddNoteFormValue) => addNote(patientId, data.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", patientId] });
      reset();
    },
  });

  const onSubmit = (data: AddNoteFormValue) => {
    mutation.mutate(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="patients-details__add-note-button">
          {ADDNOTES.ADD_NOTES}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SheetHeader>
            <SheetTitle>{ADDNOTES.ADD_NOTE}</SheetTitle>
          </SheetHeader>

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Note
              </Label>
              <textarea
                id="content"
                {...register("content", { required: true })}
                className="col-span-3 border rounded px-3 py-2 resize-y min-h-[100px]"
                placeholder="Write note here..."
              />
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" disabled={mutation.isPending}>
                {ADDNOTES.ADD_NOTE}
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
