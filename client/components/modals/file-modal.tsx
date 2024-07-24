"use client";

import {File} from "@/app/(main)/(routes)/clusters/[id]/graph/_components/file";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {useFile} from "@/hooks/use-file";

export const FileModal = () => {
    const file = useFile();

    return (
        <Dialog open={file.isOpen} onOpenChange={file.onClose}>
            <DialogContent className="max-w-7xl">
                <DialogHeader className="border-b pb-3 items-center">
                    <h2 className="text-lg font-medium">{file.file.file?.filepath}</h2>
                </DialogHeader>
                <div className="h-[30rem] flex flex-col dark:bg-[#1F1F1F] rounded-md">
                    { file.file.elements && <File data={file.file.elements} clusterId={file.file.cId.id}/> }
                </div>
            </DialogContent>
        </Dialog>
    );
};
