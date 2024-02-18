
import argon from 'argon2'

export class HashService {
    async hashPassword(password: string): Promise<string> {
        const hashed = await argon.hash(password)

        return hashed.toString()
    }

    async isValidPassword(hashedPassword: string, password: string): Promise<boolean> {
        return argon.verify(hashedPassword, password)
    }
}
