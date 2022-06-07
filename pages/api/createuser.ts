// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var cookie = require('cookie')

export type CreateUserData = {
    username: String,
    password: String
}

export default async function createuser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient()

    const saltRounds = 10

    try {
        const {username, password} = req.body as CreateUserData

        let hashedPassword
        try {
            hashedPassword = await bcrypt.hash(password, saltRounds)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Password hasn't been hashed.")        
        }
        const user = await prisma.user.create({
            data: {
                username: username.trim(), 
                password: hashedPassword,
                refreshes: {
                    create: {}
                }
            },
            include: {
                refreshes: true,
            }
        })

        console.log({user})
        console.log('REFRESH_SECRET', process.env.REFRESH_SECRET)

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: 10*60})
        const refresh = jwt.sign(
            {session: user.refreshes[0].session, refreshId: user.refreshes[0].id}, 
            process.env.REFRESH_SECRET, 
            {expiresIn: '30d'}
        )
        console.log({refresh})

        console.log(cookie.serialize('refresh', String(refresh),{ httpOnly: true }))

        res.setHeader('Set-Cookie', [
            cookie.serialize('refresh', String(refresh), {httpOnly: true}),
            cookie.serialize('token', String(token), {httpOnly: true})
        ])        

        const _user = {...user}
        delete _user.password
        delete _user.refreshes
        res.status(200).json({ message: 'Creating user success' })
 
    } catch (error) {

        console.log({error})

        res.status(500).json({message: 'Creating user error'})        

    } finally{
        await prisma.$disconnect()
        console.log('finally prisma disconnect.')
    }
}