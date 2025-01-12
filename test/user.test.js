import mongoose from 'mongoose'
import assert from 'assert'
//modulo nativo Node JS
import User from '../src/dao/Users.dao.js'

//me conecto a mi Base de datos:
mongoose.connect("mongodb+srv://acccarolina:qSDoqtjEi0cl76v2@cluster0.5cwsly0.mongodb.net/Documentacion?retryWrites=true&w=majority&appName=Cluster0")

//describe un funcion que me permite agrupar un conjunto de  pruebas relacionadas bajo un mismo bloque descriptivo

describe("Testeamos el DAO de Usuarios", function(){
    //asignamos nombre titulo
    //pasamo fcion callback co pruebas individuales
    
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
        assert.strictEqual(Array.isArray(result), true)
    })

    //test 1
    it("el DAO debe poder agregar un usuario nuevo a la Base de Datos", async function(){
        let user = {
            first_name: "Mirtha",
            last_name: "Legrand",
            email: "tengo1000años@eltrece.com",
            password: "1234"
        }
        const result = await this.usersDao.save(user)
        assert.ok(result._id)
        //verificamos si el valor recibido es "verdadero"
    })

    //test 2
    it("Validamos que el usuario tenga un array de mascotas vacio", async function(){
        let user = {
            first_name: "Mirtha",
            last_name: "Legrand",
            email: "tengo1000años@eltrece.com",
            password: "1234"
        }
        const result = await this.usersDao.save(user)
        assert.deepStrictEqual(result.pets, [])    
    })

    after( async function(){
        await mongoose.disconnect()
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
        
        assert.strictEqual(typeof users, "object")
        
    })


})