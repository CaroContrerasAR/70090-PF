import MockingService from "../services/mocking.js";
import User from '../dao/Users.dao.js'
import Pet from '../dao/Pets.dao.js'

const getMockingPets = async (req, res) => {
    try {
        const limit = Number(req.query.pets) || 100
        const pets = await MockingService.generateMockingPets(limit); 
        res.send({status: "success", payload: pets}); 
        
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

const getMockingUsers = async (req, res) => {
    try {
        const limit = Number(req.query.users) || 50
        const users = await MockingService.generateMockingUsers(limit); 
        res.send({status: "success", payload: users});
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}
//genrar e insertar en base de datos cant de registros indicados
const generateData = async (req, res) => {
    try {
        const { users, pets } = req.body
        
        const usersQtty = parseInt(users) || 0
        const petsQtty = parseInt(pets) || 0
        
        if (isNaN(usersQtty) || isNaN(petsQtty)) return res.status(400).json({status: 'error', message:'The parameters "Users" and "Pets" must be valid numbers'})
             
        await MockingService.generateData(usersQtty, petsQtty);

        res.status(200).send({
            message: `Datos generados correctamente: ${usersQtty} usuarios y ${petsQtty} mascotas.`,
        });
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

export default {
    getMockingPets,
    getMockingUsers,
    generateData
}