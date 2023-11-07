"use client";

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure('e76bd50c-af38-4be5-91b7-4ecd6b46b208');
    }, [])

    return null;
}