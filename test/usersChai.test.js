//Chai es una libreria de assertions, la cual nos permitirá realizar comparaciones de test mas claras

//Instalamos como Dependencia de desarrollo: npm i -D chai
// al usar este modificar el script de package.json

import mongoose from 'mongoose'
import User from '../src/dao/Users.dao.js'

import {expect} from 'chai'
//import chai from 'chai'
//const expect = chai.expect

//me conecto a mi Base de datos:
mongoose.connect("mongodb+srv://acccarolina:qSDoqtjEi0cl76v2@cluster0.5cwsly0.mongodb.net/Documentacion?retryWrites=true&w=majority&appName=Cluster0")

//describe un funcion que me permite agrupar un conjunto de  pruebas relacionadas bajo un mismo bloque descriptivo

describe("Testeamos el DAO de Usuarios", function(){
    //asignamos nombre titulo
    //pasamoa funcion callback con pruebas individuales
    
    before(function(){
        this.usersDao = new User()
    })

    //limpiamos la base de datos cada vez que testeamos
    beforeEach(async function(){
        await mongoose.connection.collections.users.drop()
        this.timeout(5000)
        //Ademas le damos un tiempo maximo para completar la operacion en 5 segundos
    })

    //Pruebas:
    
    it("el get de usuarios me debe retornar un array", async function () {
        const result = await this.usersDao.get()
        expect(Array.isArray(result)).to.be.true
    })

    //test 1
    it("el DAO debe poder agregar un usuario nuevo a la Base de Datos", async function(){
        let user = {
            first_name: "Mirtha",
            last_name: "Legrand",
            email: "tengo1000años@eltrece.com.ar",
            password: "1234"
        }
        const result = await this.usersDao.save(user)
        expect(result).to.have.property("_id")
        //verificamos si el valor recibido es "verdadero"
    })

    //test 2
    it("Validamos que el usuario tenga un array de mascotas vacio", async function(){
        let user = {
            first_name: "Mirtha",
            last_name: "Legrand",
            email: "tengo1000años@eltrece.com.ar",
            password: "1234"
        }
        const result = await this.usersDao.save(user)
        expect(result.pets).to.be.deep.equal([])
    })
    
    //test 3
    it("El DAO puede obtener un usuario por email", async function(){
        let user = {
            first_name: "Lia",
            last_name: "Crucet",
            email: "lia@inmortal.com",
            password: "1234"
        }
        await this.usersDao.save(user)
        const users = await this.usersDao.getBy({email: user.email})
        expect(users).to.be.an("object")
        
    })

    after( async function(){
        await mongoose.disconnect()
    })
})