// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { ITodo } from '../../types'
import { PrismaClient } from '@prisma/client'
import { withJwt } from '../../utilities'

export type DeleteTodoData = {
    id: number
}

async function deletetodo(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()

    const { id } = req.body as DeleteTodoData

    try {
        const todo = await prisma.todo.delete({
            where: { id },
        })

        res.status(200).json({ todo })
    } catch (error) {
        console.log({ error })

        res.status(500).json({ message: 'Deleting todo error' })
    } finally {
        await prisma.$disconnect()
        console.log('finally prisma disconnect.')
    }
}

export default withJwt(deletetodo)
