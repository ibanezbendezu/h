"use client"

import { CodeViewer } from "@/components/code-viewer";
import { Spinner } from "@/components/spinner";
import {useEffect, useState} from "react";
import {clusterDataRequest, fileContentRequest} from "@/api/server-data";
import {useAuthStore} from "@/store/auth";
import { CalendarClock } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

const code1 = `package cl.tingeso.mueblesstgo.controllers;

import cl.tingeso.mueblesstgo.entities.JustificationEntity;
import cl.tingeso.mueblesstgo.services.JustificationService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("justification")
public class JustificationController {

    private final JustificationService justificationService;

    public JustificationController(JustificationService justificationService) {
        this.justificationService = justificationService;
    }

    @GetMapping
    public String justificationForm(Model model) {
        model.addAttribute("justification", new JustificationEntity());
        return "pages/provide-justification";
    }
}`

const code2 = `package cl.tingeso.mueblesstgo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping
public class EmployeeController {
}`

export default function FilePage({params}: { params: any }) {
    const user = useAuthStore((state) => state.profile);

    const [data, setData] = useState<{ data: any }[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await clusterDataRequest(params.id);
            const data = res.data;
            const fileFound = getFileById(data, params.fileId);

            const fileContent = await fileContentRequest(params.fileId, user.username);

            const pairContents = [];
            for (let i = 0; i < fileFound.links.length; i++) {
                pairContents.push({
                    id: fileFound.links[i],
                    content: await fileContentRequest(fileFound.links[i].pairFileId, user.username)
                });
            }

            const finalData = {
                file: fileContent,
                pairContents
            };
            
            setData(finalData);
            setLoading(false);
        };

        fetchData();
    }, [params.id]);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    return (
        <div className="m-10">
            <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
                <div className="my-6 flex items-baseline justify-between mr-2 font-mono">
                    <h2 className="text-4xl font-bold">
                        <kbd> {data.file.data.filepath} </kbd>
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-sm font-normal text-current">
                        Puedes buscar repositorios clickeando allí.
                    </p>
                </div>

                <div className="my-4 flex items-start justify-center gap-2 w-full h-full">
                    <div className="w-1/2">
                        <p className="mx-1 text-sm font-normal text-muted-foreground">
                            {data.file.data.filepath}
                        </p>
                        <CodeViewer code={data.file.data.content} highlightRange={{start: 2, end: 4}} language="java" color="#792727"/>
                    </div>
                    <div className="w-1/2">
                        <p className="mx-1 text-sm font-normal text-muted-foreground">
                            {data.pairContents[0].content.data.filepath}
                        </p>
                        <CodeViewer code={data.pairContents[0].content.data.content} highlightRange={{start: 3, end: 6}} language="java" color="#792727"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getFileById(data: any, fileId: any) {
    let file = null;
    data.repositories.forEach((repository: any) => {
        repository.children.forEach((folder: any) => {
            folder.children.forEach((child: any) => {
                if (child.id === Number(fileId)) {
                    file = child;
                }
            });
        });
    });
    return file;
  }