// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { ITodo } from '../../types'
import { PrismaClient } from "@prisma/client";
import { withJwt } from '../../utilities';

export type GetTodosData = {
    todos: Array<ITodo>
}

async function gettodos(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const prisma = new PrismaClient()

    const {userId} = req.body

    try {

        const todos = await prisma.todo.findMany({
            where: {userId},
            orderBy: [{priority: 'desc'}, {createdAt: 'asc'}]
        })
    
        res.status(200).json({ todos })   

    } catch (error) {

        console.log({error})

        res.status(500).json({message: 'Getting todos error'})        
    
    } finally{
        await prisma.$disconnect()
        console.log('finally prisma disconnect.')
    }
}

export default withJwt(gettodos)