"use client"

import React from 'react';
import { CodeViewer } from '@/components/c-v';

const code = `package cl.tingeso.mueblesstgo.controllers;
import cl.tingeso.mueblesstgo.services.ClockService;
import cl.tingeso.mueblesstgo.services.HRMService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ClockController {

    private final ClockService clockService;
    private final HRMService hrmService;

    public ClockController(ClockService clockService, HRMService hrmService) {
        this.clockService = clockService;
        this.hrmService = hrmService;
    }

    @GetMapping("/upload-clock")
    public String upload() {
        return "pages/upload-clock";
    }

    @PostMapping("/save-clock")
    public String save(@RequestParam("file") MultipartFile file, RedirectAttributes ms){
        if (this.clockService.loadClock(file)) {
            try {
                this.hrmService.generateWages();
                ms.addFlashAttribute("success", "Reloj cargado correctamente.");
                return "redirect:upload-clock";
            } catch (Exception e) {
                ms.addFlashAttribute("error", "Error al guardar el archivo.");
                return "redirect:upload-clock";
            }
        } else {
            ms.addFlashAttribute("error", "El archivo no posee el nombre correcto.");
            return "redirect:upload-clock";
        }
    }
}`;

const highlightedSegments = [
    {
        "start": 0,
        "end": 3
    },
    {
        "start": 0,
        "end": 2
    },
    {
        "start": 0,
        "end": 2
    },
    {
        "start": 0,
        "end": 2
    },
    {
        "start": 0,
        "end": 2
    },
    {
        "start": 2,
        "end": 3
    },
    {
        "start": 2,
        "end": 3
    },
    {
        "start": 2,
        "end": 3
    },
    {
        "start": 2,
        "end": 5
    },
    {
        "start": 4,
        "end": 7
    },
    {
        "start": 4,
        "end": 5
    },
    {
        "start": 5,
        "end": 6
    },
    {
        "start": 5,
        "end": 8
    },
    {
        "start": 6,
        "end": 7
    },
    {
        "start": 6,
        "end": 8
    },
    {
        "start": 7,
        "end": 8
    },
    {
        "start": 7,
        "end": 9
    },
    {
        "start": 8,
        "end": 9
    },
    {
        "start": 8,
        "end": 9
    },
    {
        "start": 8,
        "end": 9
    },
    {
        "start": 8,
        "end": 9
    },
    {
        "start": 9,
        "end": 11
    },
    {
        "start": 11,
        "end": 14
    },
    {
        "start": 15,
        "end": 17
    },
    {
        "start": 17,
        "end": 18
    },
    {
        "start": 19,
        "end": 23
    },
    {
        "start": 27,
        "end": 28
    },
    {
        "start": 34,
        "end": 35
    },
    {
        "start": 30,
        "end": 39
    },
];

export default function Monaco() {
    return (
        <div>
            <h1>Monaco Editor Code Viewer</h1>
            <CodeViewer code={code} language='java' highlightRange={highlightedSegments} />
        </div>
    );
}
