// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { ITodo } from '../../types'
import { PrismaClient } from '@prisma/client'
import { withJwt } from '../../utilities'

export type UpdateTodoData = {
    id: number
    name: string
}

async function updatetodo(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()

    const { id, name } = req.body as UpdateTodoData

    try {
        const todo = await prisma.todo.update({
            where: { id },
            data: { name },
        })

        res.status(200).json({ todo })
    } catch (error) {
        console.log({ error })

        res.status(500).json({ message: 'Updating todo error' })
    } finally {
        await prisma.$disconnect()
        console.log('finally prisma disconnect.')
    }
}

export default withJwt(updatetodo)
