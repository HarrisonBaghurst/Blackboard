'use client'

import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const page = () => {
    const router = useRouter();

    const createBoard = () => {
        const id = uuidv4();
        router.push(`/board/${id}`)
    }

    return (
        <div className='p-4'>
            <button
                className='card-style px-4 py-2 cursor-pointer'
                onClick={createBoard}
            >
                Create Board
            </button>
        </div>
    )

}

export default page