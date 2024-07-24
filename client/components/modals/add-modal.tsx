"use client";

import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {useAdd} from "@/hooks/use-add";
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

export const AddModal = () => {
    const add = useAdd();

    return (
        <Dialog open={add.isOpen} onOpenChange={add.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">Configuración</h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>Apariencia</Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Personaliza como se ve Hound en tu dispositivo
                        </span>
                    </div>
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
                </div>
            </DialogContent>
        </Dialog>
    );
};
