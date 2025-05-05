import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "@/api/patientsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  age: number;
  condition: string;
};

export default function AddPatient({
  onPatientAdded,
}: {
  onPatientAdded: () => void;
}) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: 0,
      condition: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => createPatient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      reset();
      onPatientAdded();
      toast.success("Patient added", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-green-600 bg-green-600 text-white hover:bg-white hover:text-green-600"
        >
          + Add Patient
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SheetHeader>
            <SheetTitle>Add Patient</SheetTitle>
          </SheetHeader>

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                className="col-span-3"
                placeholder="Enter patient name..."
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                {...register("age", { valueAsNumber: true, required: true })}
                className="col-span-3"
                placeholder="Enter patient age..."
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="condition" className="text-right">
                Condition
              </Label>
              <Input
                id="condition"
                {...register("condition", { required: true })}
                className="col-span-3"
                placeholder="Enter condition..."
              />
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" disabled={mutation.isPending}>
                Add new patient
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
