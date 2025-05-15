import ContactForm from '@/components/ContactForm';
import { db } from '@/configs/db';
import { Contact } from '@/generated/prisma';
import { sleep } from '@/lib/utils';
import { ActionResponse } from '@/types/ActionResponse';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	email: z.string().email('Informe um email válido')
})

interface IEditContactForm {
	contact: Contact
}

export default function EditContactForm({ contact }: IEditContactForm) {

	async function submitAction(formData: FormData): Promise<ActionResponse> {
		'use server'

		const data = Object.fromEntries(formData);
		const parsedData = schema.safeParse(data);

		if (!parsedData.success) {
			return {
				status: 'error',
				body: {
					message: parsedData.error.issues.map(issue => issue.message),
				}
			};
		}

		const { name, email } = parsedData.data;

		await sleep();
		const contactCreated =await db.contact.update({
			where: {
				id: contact.id
			},
			data: {
				name,
				email,
			},
		})

		return {
			status: 'success',
			body: {
				contactCreated,
			}
		}
	};

	return (
		<div className='container flex flex-col space-y-2 w-full my-[100px] max-w-lg'>
			<Link href='/' className='flex items-center gap-2 text-gray-800 hover:text-cyan-700 w-fit
			transition duration-200 ease-in-out'>
				<ArrowLeftIcon className='w-4.5 mt-[-2px]' />
				Voltar para a lista
			</Link>

			<h1 className='text-[2.2em] font-bold mb-[40px]'>Editar contato</h1>

			<ContactForm contact={contact} submitAction={submitAction}/>
		</div>
	)
}