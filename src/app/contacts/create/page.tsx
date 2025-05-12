import ContactForm from '@/components/ContactForm'
import { sleep } from '@/components/lib/utils';
import { db } from '@/configs/db';
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function CreateContact() {

	async function submitAction(formData: FormData) {
		'use server'

		const data = Object.fromEntries(formData) as { name: string; email: string };

		await sleep();
		await db.contact.create({
			data: {
				name: data.name,
				email: data.email,
			},
		})
	};

	return (
		<div className='flex flex-col space-y-2 w-full'>
			<Link href='/' className='flex items-center gap-2 text-gray-800 hover:text-cyan-700 w-fit
			transition duration-200 ease-in-out'>
				<ArrowLeftIcon className='w-4.5 mt-[-2px]' />
				Voltar para a lista
			</Link>

			<h1 className='text-[2.2em] font-bold mb-[40px]'>Criar contato</h1>

			<ContactForm submitAction={submitAction}/>
		</div>
	)
}