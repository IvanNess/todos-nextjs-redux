// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { ITodo } from '../../types'
import { PrismaClient } from '@prisma/client'
import { withJwt } from '../../utilities'

export type OnTopData = {
    id: Number
}

export type OnTopResponse = {
    todo: ITodo
}

async function ontop(req: NextApiRequest, res: NextApiResponse<OnTopResponse>) {
    const prisma = new PrismaClient()

    const { id } = req.body as OnTopData

    try {
        const todos = await prisma.todo.findMany({
            where: {},
            orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
        })

        const maxPriority = todos[0].priority + 1

        const todo = await prisma.todo.update({
            where: { id },
            data: { priority: maxPriority },
        })

        res.status(200).json({ todo })
    } catch (error) {
        console.log({ error })

        res.status(500).json({ message: 'Getting todos error' })
    } finally {
        await prisma.$disconnect()
        console.log('finally prisma disconnect.')
    }
}

export default withJwt(ontop)
