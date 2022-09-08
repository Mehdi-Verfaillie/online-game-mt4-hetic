import React, { useMemo } from 'react'
import './input.scss'
import { BaseInputProps } from '@/interfaces/baseInput.interface'

interface Props {
    placeholder: string;
    id: string;
    name: string;
    type: string;
    value: string;
    onKeyPress?: (e:any) => void;
    onChange?: (e: any) => any;
}
