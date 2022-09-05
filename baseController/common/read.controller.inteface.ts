import {RequestHandler} from 'express';

export interface IReadController{
    find : RequestHandler;
    findById: RequestHandler;
}