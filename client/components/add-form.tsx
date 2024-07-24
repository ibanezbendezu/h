'use client';

import React, { Dispatch, ReactNode, SetStateAction, use, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Select from 'react-select'

import {Input} from '@/components/ui/input';
import useStore from '@/store/clusters';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

const onBlurWorkaround = (event: React.FocusEvent<HTMLButtonElement>) => {
    const element = event.relatedTarget;
    if (element && (element.tagName === 'A' || element.tagName === 'BUTTON' || element.tagName === 'INPUT')) {
        (element as HTMLElement).focus();
    }
};

const formSchema = z.object({
    grupo: z.string()
});

export default function AddForm({
    setIsOpen,
    }: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const clusters = useStore((state) => state.store);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            grupo: '',
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values);
            setIsOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            background: 'hsl(var(--muted))',
            display: 'flex',
            flexWrap: 'nowrap',
            borderColor: 'transparent',
            color: 'hsl(var(--popover-foreground))',
            fontSize: '12px',
            fontFamily: 'monospace',
            boxShadow: 'none',
            '&:hover': { background: 'hsl(var(--primary) / 0.05)' },
            width: '100%',
            height: '36px',
        }),
        menu: (provided: any) => ({
            ...provided,
            background: 'hsl(var(--popover))',
            color: 'hsl(var(--popover-foreground))',
            fontSize: '12px',
            fontFamily: 'monospace',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
        }),
        option: (provided: any, state: { isSelected: boolean }) => ({
            ...provided,
            color: 'hsl(var(--popover-foreground))',
            background: state.isSelected ? 'hsl(var(--primary) / 0.05)' : 'transparent',
            '&:hover': { background: 'hsl(var(--primary) / 0.05)' },
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'hsl(var(--popover-foreground))',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: 'hsl(var(--popover-foreground))',
        }),
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-4 sm:px-0 px-4"
            >
                <FormField
                    control={form.control}
                    name="grupo"
                    render={({ field: { onChange, value } }) => (
                        <FormItem>
                            <FormLabel>Grupos</FormLabel>
                            <Select
                                options={options}
                                styles={customStyles}
                                placeholder="Selecciona un grupo..."
                                value={options.find((option) => option.value === value)}
                                onChange={(option) => onChange(option?.value)}
                            />
                            <FormDescription>
                                Escoge el grupo al que quieres agregar repositorios
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex w-full sm:justify-end mt-4">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                >
                    <>
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Agregando...
                        </>
                    ) : (
                        'Confirmar'
                    )}
                    </>
                </Button>
                </div>
            </form>
        </Form>
    );
}
