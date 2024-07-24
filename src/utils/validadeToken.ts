import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export function validateToken(request: FastifyRequest, reply: FastifyReply, done: Function) {
    const token = request.headers['authorization']?.replace('Bearer ','');
    if(!token) {
        reply.code(401).send({message:'Unauthorized'});
        return;
    }
    try {
        jwt.verify(token,process.env.JWT_KEY);
    } catch (err) {
        reply.code(401).send({message:'Unauthorized'});
        return;
    }
    done();
}