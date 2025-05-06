import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editNote } from "@/api/patientsApi";
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
import EDITNOTESHEET from "@/constants/EditNoteSheet";
import { EditNoteSheetProps } from "@/types/patients.types";
import { EditNoteFormValues } from "@/types/patients.types";

export default function EditNoteSheet({
  patientId,
  note,
  onClose,
}: EditNoteSheetProps) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<EditNoteFormValues>({
    defaultValues: {
      content: note.content,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: EditNoteFormValues) =>
      editNote(patientId, note.id, data.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", patientId] });
      reset();
      onClose();
    },
  });

  const onSubmit = (data: EditNoteFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SheetHeader>
            <SheetTitle>{EDITNOTESHEET.EDIT_NOTE}</SheetTitle>
            <SheetDescription>{EDITNOTESHEET.UPDATE_NOTE}</SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                {EDITNOTESHEET.CONTENT}
              </Label>
              <textarea
                id="content"
                {...register("content", { required: true })}
                className="col-span-3 border rounded px-3 py-2 resize-y min-h-[100px]"
                placeholder={EDITNOTESHEET.PLACE_HOLDER}
              />
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {EDITNOTESHEET.SAVE_CHANGES}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
