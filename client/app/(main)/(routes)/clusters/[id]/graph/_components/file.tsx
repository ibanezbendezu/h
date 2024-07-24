"use client"

import React, {useState, useEffect, useRef} from 'react';
import cytoscape, { Core } from 'cytoscape';
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import fcose from "cytoscape-fcose";
import cola from 'cytoscape-cola';
import undoRedo from "cytoscape-undo-redo";
import expandCollapse from 'cytoscape-expand-collapse';
import popper from 'cytoscape-popper';
import navigator from "cytoscape-navigator";
import "cytoscape-navigator/cytoscape.js-navigator.css";
import "./style.css";

import {fileGraphStyles} from './style';

cytoscape.use(dagre);
cytoscape.use(cola);
cytoscape.use(fcose);
cytoscape.use(undoRedo);
cytoscape.use(expandCollapse);
cytoscape.use(popper);
cytoscape.use(navigator);

type Props = {
    data: any;
    clusterId: number;
};

export const File: React.FC<Props> = ({data, clusterId}) => {
    const config = {
        layout: {
            name: "fcose",
        },
        zoom: 1,
    };

    const [cy, setCy] = useState<Core | null>(null);
    const navigatorRef = useRef(null);
    
    useEffect(() => {
        if (cy) {
            const api = cy.expandCollapse({
                layoutBy: {
                    name: "preset",
                    randomize: false,
                    fit: true,
                    animate: true,
                    undoable: true,
                },
                collapseCueImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><path d="m6 15 6-6 6 6"/></svg>',
                expandCueImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>',
            });
            cy.undoRedo();

            /* const defaults = {
                container: false, viewLiveFramerate: 0 , thumbnailEventFramerate: 30, thumbnailLiveFramerate: false,
                dblClickDelay: 200, removeCustomContainer: false, rerenderDelay: 100
            };
            // @ts-ignore
            const nav = cy.navigator(defaults);

            return () => {
                if (nav) {
                    nav.destroy();
                }
            }; */
        }
    }, [cy]);

    return (
        <>
            <CytoscapeComponent
                cy = {(cy) => {
                    setCy(cy);
                    
                    /* cy.nodes().on("expandcollapse.afterexpand", function (event: any) {
                        event.target.style(expandNodeStyle);
                    });
                    cy.nodes().on("expandcollapse.aftercollapse", function (event: any) {
                        event.target.removeStyle("text-valign");
                        event.target.removeStyle("background-color");
                    }); */
                }}
                layout={config.layout}
                styleEnabled={true}
                stylesheet={fileGraphStyles}
                elements={data}
                //wheelSensitivity={0.1}
                zoomingEnabled={true}
                zoom={config.zoom}
                style={{width: "100%", height: "100%"}}
            />
        </>
    );
};