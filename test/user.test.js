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

    // it("El DAO no debe permitir agregar un usuario con un email duplicado", async function(){
    //     let user = {
    //         first_name: "Luis",
    //         last_name: "Fernandez",
    //         email: "luis@fernandez.com",
    //         password: "1234"
    //     }
    
    //     await this.usersDao.save(user) // Primer usuario con el email
    
    //     let userDuplicate = {
    //         first_name: "Carlos",
    //         last_name: "Martinez",
    //         email: "luis@fernandez.com", // Mismo email
    //         password: "5678"
    //     }
    
    //     try {
    //         await this.usersDao.save(userDuplicate) // Intentar guardar el usuario con email duplicado
    //         assert.fail("Se permitió crear un usuario con un email duplicado")
    //     } catch (error) {
    //         // El error debería ser lanzado debido a la restricción de email único
    //         assert.strictEqual(error.code, 11000) // Código de error para duplicado en MongoDB
    //     }
    // })

    // it("El DAO debe poder agregar una mascota a un usuario", async function(){
    //     // Creamos un usuario primero
    //     let user = {
    //         first_name: "María",
    //         last_name: "Gomez",
    //         email: "maria@gomez.com",
    //         password: "1234"
    //     }
        
    //     const savedUser = await this.usersDao.save(user)
        
    //     // Creamos una mascota (asumimos que el modelo de 'Pets' tiene un schema con _id generado automáticamente)
    //     let pet = {
    //         name: "Bobby",
    //         type: "dog"
    //     }
        
    //     const savedPet = await this.petsDao.save(pet) // Asegúrate de tener un DAO para "Pets"
        
    //     // Añadimos la mascota al usuario
    //     savedUser.pets.push({ _id: savedPet._id })
    //     const updatedUser = await this.usersDao.update(savedUser._id, savedUser)
        
    //     // Verificamos que el usuario tenga la mascota asociada
    //     assert.strictEqual(updatedUser.pets.length, 1)
    //     assert.strictEqual(updatedUser.pets[0]._id.toString(), savedPet._id.toString())
    // })

    // it("El DAO debe poder actualizar el rol de un usuario", async function(){
    //     let user = {
    //         first_name: "Juan",
    //         last_name: "Perez",
    //         email: "juan@perez.com",
    //         password: "1234"
    //     }
        
    //     const savedUser = await this.usersDao.save(user)
        
    //     // Actualizamos el rol del usuario
    //     savedUser.role = "admin"
    //     const updatedUser = await this.usersDao.update(savedUser._id, savedUser)
        
    //     // Verificamos que el rol haya cambiado
    //     assert.strictEqual(updatedUser.role, "admin")
    // })

    // it("El DAO debe lanzar un error si se intenta crear un usuario sin campos requeridos", async function(){
    //     let invalidUser = {
    //         first_name: "",  // Nombre vacío
    //         last_name: "",   // Apellido vacío
    //         email: "incomplete@user.com",  // Email válido, pero faltan otros campos
    //         password: ""     // Contraseña vacía
    //     }
        
    //     try {
    //         await this.usersDao.save(invalidUser)
    //         assert.fail("Se permitió crear un usuario sin campos requeridos")
    //     } catch (error) {
    //         assert.strictEqual(error.errors.first_name.message, "Path `first_name` is required.")
    //         assert.strictEqual(error.errors.last_name.message, "Path `last_name` is required.")
    //         assert.strictEqual(error.errors.password.message, "Path `password` is required.")
    //     }
    // })
    
})