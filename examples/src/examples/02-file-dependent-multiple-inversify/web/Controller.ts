import { RouteOptions } from "fastify";

export interface Controller  {
    routes(): RouteOptions[]
}

export const TYPE = Symbol('Controller')
