// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { ITodo } from '../../types'
import { PrismaClient } from "@prisma/client";
import { withJwt } from '../../utilities';

export type CreateTodoData = {
    todo: ITodo
    userId: string
}

async function createtodo(
    req: NextApiRequest,
    res: NextApiResponse<CreateTodoData>
) {
    const prisma = new PrismaClient()

    try {
        const {todo, userId} = req.body as CreateTodoData

        const todoRes = await prisma.todo.create({
            data: {
                userId,
                name: todo.name,
                priority: 0
            }
        })

        console.log({todoRes})

        try {

            const todos = await prisma.todo.findMany({
                where: { userId },
                orderBy: [{priority: 'desc'}, {createdAt: 'asc'}]
            })
        
            return res.status(200).json({ todos })   
    
        } catch (error) {
    
            console.log({error})
    
            return res.status(500).json({message: 'Todo was created, but it is necessary to reload the page'})        
        
        }
 
    } catch (error) {

        console.log({error})

        res.status(500).json({message: 'Creating todo error'})        

    } finally{
        await prisma.$disconnect()
        console.log('finally prisma disconnect.')
    }
}

export default withJwt(createtodo)