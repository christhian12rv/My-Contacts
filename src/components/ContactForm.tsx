'use client'

import { useActionState } from 'react';
import Label from './ui/Label';
import Input from './ui/Input';
import Button from './ui/Button';
import { Loader2Icon } from 'lucide-react';

interface IContactFormProps {
	contact?: {
		id: string,
		name: string;
		email: string;
	};
	submitAction?: (formData: FormData) => void;
}


export default function ContactForm({ contact, submitAction }: IContactFormProps) {
	const [, clientSubmitAction, isPending] = useActionState(
		(_: unknown, formData: FormData) => submitAction?.(formData),
		null
	)

	return (
		<form className='space-y-4 w-full' action={clientSubmitAction}>
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