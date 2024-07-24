"use client";

import React, {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Progress} from "@/components/ui/progress";
import {useEdge} from "@/hooks/use-edge"
import {GitCompareArrows} from 'lucide-react';
import {scaleLinear} from "d3-scale";
import {CodeViewer} from "@/components/code-viewer";
import {Spinner} from "@/components/spinner";

const colorScale = scaleLinear<string>().domain([0, 100]).range(["#2E9335", "#B82318"]);

export const PairModal = () => {
    const edge = useEdge();
    
    return (
        <Dialog open={edge.isOpen} onOpenChange={edge.onClose}>
            <DialogContent className="max-w-7xl">
                {edge.edge ? (                    
                    <React.Fragment>
                        <DialogHeader className="border-b pb-3 items-center">
                            <h2 className="text-lg font-medium">
                                {edge.edge.file1?.filepath.split("/").pop()}
                                <GitCompareArrows size={20} className="inline-block mx-2"/>
                                {edge.edge.file2?.filepath.split("/").pop()}
                            </h2>
                        </DialogHeader>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label>Similitud</Label>
                                    <Label>{Math.round(edge.edge.similarity * 100)}%</Label>
                                </div>
                                { edge.edge.similarity && (
                                    <Progress value={edge.edge.similarity * 100}>
                                    </Progress>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <p className="font-mono text-xs">{edge.edge.file1?.filepath}</p>
                                    </div>
                                    {edge.edge ? (
                                        <div className="space-y-2">
                                            <CodeViewer code={edge.edge.file1Content} language={edge.edge.file1?.language} highlightRange={edge.edge.file1?.fragment} color={"#4d4d4d"} shouldScrollY={true} />
                                        </div>
                                    ) : (
                                        <div className="h-32 flex items-center justify-center">
                                            <Spinner size="lg"/>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <p className="font-mono text-xs">{edge.edge.file2?.filepath}</p>
                                    </div>
                                    {edge.edge ? (
                                        <div className="space-y-2">
                                            <CodeViewer code={edge.edge.file2Content} language={edge.edge.file2?.language} highlightRange={edge.edge.file2?.fragment} color={"#4d4d4d"} shouldScrollY={true} />
                                        </div>
                                        
                                    ) : (
                                        <div className="h-32 flex items-center justify-center">
                                            <Spinner size="lg"/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : ( null )}
            </DialogContent>
        </Dialog>
    );
};
