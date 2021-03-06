import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        // SELECT * FROM USERS WHERE EMAIL = EMAIL
        const userAlreadyExits = await usersRepository.findOne({
            email
        });

        if (userAlreadyExits) {
            return response.status(400).json({
                error: "User already exists!",
            })
        }

        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController };