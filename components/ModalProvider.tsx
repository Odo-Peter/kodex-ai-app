"use client";

import { useEffect, useState } from "react"
import { ProModal } from "@/components/ProModal";

export const ModalProvider = () => {
    const [mounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!mounted) return null;

    return (
        <>
        <ProModal />
        </>
    )
}