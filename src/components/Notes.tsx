import { useState, Fragment } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditNoteSheet from "./EditNoteSheet";
import { deleteNote } from "@/api/patientsApi";
import { Note } from "@/types/api.types";
import DROPDOWN from "@/constants/Dropdown";
import { NotesProps } from "@/types/patients.types";

export default function Notes({ notes, patientId }: NotesProps) {
  const queryClient = useQueryClient();
  const [openNote, setOpenNote] = useState<Note | null>(null);

  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(patientId, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", patientId] });
    },
  });

  const handleDelete = (noteId: string) => {
    mutation.mutate(noteId);
  };

  return (
    <Fragment>
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id} className="note-list__note">
            <div className="note-list__text-container">
              <p>{note.content}</p>
              <span className="note-list__note-date">
                {new Date(note.createdAt).toLocaleString()}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button asChild variant="outline" size="icon">
                  <span>
                    <Settings />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setOpenNote(note)}
                  className="p-0 focus:bg-transparent cursor-pointer w-full"
                >
                  {DROPDOWN.EDIT}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDelete(note.id)}
                  className="p-0 focus:bg-transparent cursor-pointer w-full text-red-600"
                >
                  {DROPDOWN.DELETE}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>

      {openNote && (
        <EditNoteSheet
          patientId={patientId}
          note={openNote}
          onClose={() => setOpenNote(null)}
        />
      )}
    </Fragment>
  );
}
