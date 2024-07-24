"use client";

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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue
} from "../ui/select";

interface ConfirmAddModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
}

export const ConfirmAddModal = ({children, onConfirm}: ConfirmAddModalProps) => {
    const handleConfirm = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onConfirm();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Selecciona el grupo al que deseas añadir</AlertDialogTitle>
                    <AlertDialogDescription>
                        Se añadirán todos los repositorios seleccionados.
                        <Select>
                            <SelectTrigger aria-label="Pares">
                                <SelectValue placeholder="Selecciona un archivo para comparar…" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectScrollUpButton/>
                                <SelectGroup>
                                    <SelectLabel>Grupo 1</SelectLabel>
                                    <SelectItem value="1">Grupo 1</SelectItem>
                                    <SelectItem value="2">Grupo 2</SelectItem>
                                    <SelectItem value="3">Grupo 3</SelectItem>
                                </SelectGroup>
                                <SelectScrollDownButton/>
                            </SelectContent>
                        </Select>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
