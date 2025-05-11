'use client'

import { FormEvent, useState } from 'react';
import Label from './ui/Label';
import Input from './ui/Input';
import Button from './ui/Button';

interface IContactFormProps {
	contact?: {
		id: string,
		name: string;
		email: string;
	};
	onSubmit?: (formData: {
		name: string;
		email: string;
	}) => void;
}

export default function ContactForm({ contact, onSubmit }: IContactFormProps) {
	const [name, setName] = useState(contact?.name ?? '');
	const [email, setEmail] = useState(contact?.email ?? '');

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		
		onSubmit?.({name, email});
	}

	return (
		<form className='space-y-4 w-full' onSubmit={handleSubmit}>
			<div className="flex flex-col space-y-1.5 w-full">
				<Label>Nome</Label>
				<Input type='text' name='name' value={name} onChange={(event) => setName(event.target.value)}/>
			</div>

			<div className="flex flex-col space-y-1.5">
				<Label>E-mail</Label>
				<Input type='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
			</div>

			<Button type='submit'>
				{contact ? 'Editar' : 'Criar'}
			</Button>
		</form>
	)
}