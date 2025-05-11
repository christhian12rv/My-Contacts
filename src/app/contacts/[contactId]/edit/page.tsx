import { db } from '@/configs/db';
import { redirect } from 'next/navigation';
import EditContactForm from './EditContactForm';

interface IEditContactProps {
	params: {
		contactId: string;
	};
}

export default async function EditContact({ params }: IEditContactProps) {
	const { contactId } = await params;

	const contact = await db.contact.findUnique({
		where: { id: contactId },
	});

	if (!contact) {
		redirect('/');
	}
	
	return <EditContactForm contact={contact}/>
}