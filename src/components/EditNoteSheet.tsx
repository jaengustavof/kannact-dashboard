import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editNote } from "@/api/patientsApi";
import { Note } from "@/types/api.types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type EditNoteSheetProps = {
  patientId: string;
  note: Note;
  onClose: () => void;
};

type FormValues = {
  content: string;
};

export default function EditNoteSheet({
  patientId,
  note,
  onClose,
}: EditNoteSheetProps) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      content: note.content,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) =>
      editNote(patientId, note.id, data.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", patientId] });
      reset();
      onClose();
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SheetHeader>
            <SheetTitle>Edit Note</SheetTitle>
            <SheetDescription>
              Update the content of this note and save your changes.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <textarea
                id="content"
                {...register("content", { required: true })}
                className="col-span-3 border rounded px-3 py-2 resize-y min-h-[100px]"
                placeholder="Edit note content..."
              />
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={mutation.isPending}>
              Save Changes
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
