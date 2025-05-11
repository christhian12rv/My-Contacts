'use client'

import ContactForm from '@/components/ContactForm';
import { Contact } from '@/generated/prisma';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface IEditContactForm {
	contact: Contact
}

export default function EditContactForm({ contact }: IEditContactForm) {
	const router = useRouter();

	async function handleSubmit(data: { name: string; email: string; }) {
		await fetch(`/api/contacts/${contact.id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		router.push('/');
	};

	return (
		<div className='flex flex-col space-y-2 w-full'>
			<Link href='/' className='flex items-center gap-2 text-gray-800 hover:text-cyan-700 w-fit
			transition duration-200 ease-in-out'>
				<ArrowLeftIcon className='w-4.5 mt-[-2px]' />
				Voltar para a lista
			</Link>

			<h1 className='text-[2.2em] font-bold mb-[40px]'>Editar contato</h1>

			<ContactForm contact={contact} onSubmit={handleSubmit}/>
		</div>
	)
}