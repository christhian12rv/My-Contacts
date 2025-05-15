import { db } from '@/configs/db';
import { PencilIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DeleteContactDialog } from './_components/DeleteContactDialog';

export default async function Home() {
  const contacts = await db.contact.findMany();

  return (
    <div className='container flex flex-col justify-center space-y-[3em] my-[100px] max-w-lg'>
      <div className='flex items-center flex-wrap justify-between w-full'>
        <div>
          <h1 className='font-bold text-[2em]'>MyContacts</h1>
          <p className='text-gray-600'>Seus contatos em um só lugar</p>
        </div>
        <div>
          <Link href='/contacts/create' className='flex items-center justify-center gap-2 bg-black text-white p-2 rounded-lg font-bold border border-black
          transition duration-200 ease-in-out
          cursor-pointer hover:bg-white hover:text-black'>
            <PlusCircleIcon className='w-7' />
            Criar novo contato
          </Link>
        </div>
      </div>
      <div className='w-full space-y-[.75em]'>
        {contacts.map(contact => (
          <div key={contact.email} className='flex items-center flex-wrap space-x-[1em] border border-gray-200 p-2 w-full rounded-lg'>
            <div className='w-10 h-10 bg-gray-200 rounded-full'>
            </div>
            <div className='flex flex-col justify-center flex-grow-1'>
              <h4 className='font-bold'>{contact.name}</h4>
              <p>{contact.email}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link href={`/contacts/${contact.id}/edit`} className='flex items-center justify-center border border-gray-200 rounded-lg w-10 h-10 cursor-pointer
              transition duration-200 ease-in-out hover:bg-gray-200'>
                <PencilIcon className='w-5' />
              </Link>
              <DeleteContactDialog contactId={contact.id}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
