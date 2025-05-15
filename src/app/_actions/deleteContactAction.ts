'use server';

import { db } from '@/configs/db';
import { sleep } from '@/lib/utils';
import { ActionResponse } from '@/types/ActionResponse';
import { revalidatePath } from 'next/cache';

export async function deleteContactAction(contactId: string): Promise<ActionResponse> {

	try {
		await sleep();
		await db.contact.delete({
			where: {
				id: contactId,
			}
		});
	} catch {
		return {
			status: 'error',
			body: {
				message: 'Erro ao deletar o contato!'
			}
		}
	}

	revalidatePath('/');

	return {
		status: 'success',
		body: {
			contactId
		}
	}
}