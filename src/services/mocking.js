import {faker} from '@faker-js/faker'
import { createHash } from '../utils/index.js'
import User from '../dao/models/User.js'
import Pet from '../dao/models/Pet.js'

class MockingService {
    static async generateMockingPets(num){
        const pets = []; 

        for (let i = 0; i < num; i++) {
            const pet = {
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                adopted: false
            }
            //insertar en Base de datos
            const savedPet = await Pet.create(pet)
            pets.push(savedPet)
        }
        //console.log(pets)
        return pets
    }

    static async generateMockingUsers(num) {
        const users = []
        for(let i = 0; i < num; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash('coder123'),
                role: faker.helpers.arrayElement(['user', 'admin']),
                pets: []
            }
            //insertar en Base de datos
            const savedUser = await User.create(user)
            users.push(savedUser)
        }
        return users
    }

    static async generateData(userQuantity, petQuantity) {
        const users = await this.generateMockingUsers(userQuantity);
        const pets = await this.generateMockingPets(petQuantity);

        return { users, pets };
    }
}

export default MockingService