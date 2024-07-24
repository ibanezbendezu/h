"use client";

import {SettingsModal} from "@/components/modals/settings-modal";
import {FileModal} from "../modals/file-modal";
import {PairModal} from "../modals/pair-modal";
import {LoadingModal} from "../modals/loading-modal";
import {useEffect, useState} from "react";
import {AddModal} from "@/components/modals/add-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <SettingsModal/>
            <FileModal/>
            <PairModal/>
            <LoadingModal/>
            <AddModal/>
        </>
    );
};
