'use client'

import { useActionState, useEffect } from 'react';
import Label from './ui/Label';
import Input from './ui/Input';
import Button from './ui/Button';
import { Loader2Icon } from 'lucide-react';
import { ActionResponse } from '@/types/ActionResponse';
import { useRouter } from 'next/navigation';

interface IContactFormProps {
	contact?: {
		id: string,
		name: string;
		email: string;
	};
	submitAction: (formData: FormData) => Promise<ActionResponse>;
}

export default function ContactForm({ contact, submitAction }: IContactFormProps) {
	const router = useRouter();

	const [state, clientSubmitAction, isPending] = useActionState(
		async (_: unknown, formData: FormData) => {
			const response = await submitAction(formData);

			if (response.status === 'success') {
				router.push(`/contacts/${response.body.contact.id}/edit`)
			}
			
			return response;
		},
		null
	)

	useEffect(() => {

	}, [state])

	return (
		<form className='space-y-4 w-full' action={clientSubmitAction}>
			<span className="text-red-700">
			{(state?.status === 'error' && state?.body.message) && (Array.isArray(state.body.message) 
					? state.body.message.join(' / ')
					: state.body.message)}</span>

			<div className="flex flex-col space-y-1.5 w-full">
				<Label>Nome</Label>
				<Input type='text' defaultValue={contact?.name} name='name'/>
			</div>

			<div className="flex flex-col space-y-1.5">
				<Label>E-mail</Label>
				<Input type='email' defaultValue={contact?.email} name='email'/>
			</div>

			<Button type='submit' disabled={isPending}>
				{isPending && <Loader2Icon className="size-4 mr-1 animate-spin"/>}
				{contact ? 'Editar' : 'Criar'}
			</Button>
		</form>
	)
}