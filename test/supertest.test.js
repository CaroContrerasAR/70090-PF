//ahora como voy a realizar una prueba integral en la app no necesito traer ningun DAO en particular

import supertest from 'supertest'
import {expect} from 'chai'

//creamos requester que realiza las peticiones al servidor

const requester = supertest('http://localhost:8080')

//Ahora vamos a trabajar con dos describe. Uno para la app Adoptame y otro para cada entidad interna

describe('Testing de la App Web Adoptme', () => {
    describe('Testing de Mascotas: ',() => {
        it('endpoint POST /api/pets debe crear una mascota correctamente', async () => {
            //voy a crear un mock de una mascota
            const mascotaApiPerrito = {
                name: 'Api',
                specie: 'Pichicho',
                birthDate: '2021-03-10'
            }

            const {statusCode, ok, _body} = await requester.post('/api/pets').send(mascotaApiPerrito)
            
            //Mostramos todo por consola:
            console.log(statusCode);
            console.log(ok);
            console.log(_body);

            //Y ahora evaluamos, si el payload que me envian tiene _id, quiere decir que se pudo crear correctamente:

            expect(_body.payload).to.have.property('_id')
        })

        it('Al crear una mascota solo con los datos elementales, la mascota creada debe tener la propiedad adopted con el valor false', async () => {
            const newPets ={
                name: 'Rex',
                specie: 'Perro',
                birthDate: '2021-01-01'
            }
            const {statusCode, body} = await requester.post('/api/pets').send(newPets)
            expect(statusCode).to.equal(200)
            expect(body.payload).to.have.property('adopted').that.equals(false)
        })
        it('Al obtener las mascotas con el metodo GET, la respuesta debe tener los campos status y payload. Ademas, payload debe ser de tipo arreglo', async ()=> {
            const {statusCode, body} = await requester.get('/api/pets')

            expect(statusCode).to.equal(200)
            expect(body).to.have.property('payload').that.is.an('array')
        })
        it('Si se desea crear una mascota sin el campo  nombre, el módulo debe responder con un status 400', async ()=> {
            const petsWithoutName = {
                specie: 'Gato',
                birthDate: '2020-05-15'
            }
            const {statusCode} = await requester.post('/api/pets').send(petsWithoutName)

            expect(statusCode).to.equal(400)            
        })
        it('El método DELETE debe poder borrar la última mascota agregada, ésto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota  con el DELETE, y luego corroborar si la mascota existe con un GET', async ()=> {

            //Paso 1: agregar mascota nueva
            const petsNew = {
                name: 'Betun',
                specie: 'Perro',
                birthDate: '2023-02-20'
            }

            //Enviamos mascota nueva:
            const {body: {payload: {_id}}} = await requester.post('/api/pets').send(petsNew)

            //Paso 2: Borrar la mascota agregada
            const {statusCode} = (await requester.delete(`/api/pets/${_id}`))

            expect(statusCode).to.equal(200)
            //Verificamos en la base de datos si la mascota se elimino correctamente
        })
    })
    //TEST 2: Registro de Usuarios: 

    describe("Test Avanzado", () => {
        //Declaramos de forma global una variable cookie que vamos a usar en las siguientes pruebas. 

        let cookie; 

        it("Debe registrar correctamente a un usuario", async () => {

            const mockUsuario = {
                first_name: "Pepe", 
                last_name: "Argento", 
                email: "pepe@zapateriagarmendia.com", 
                password: "1234"
            }

            const {_body} = await requester.post("/api/sessions/register").send(mockUsuario); 

            //Validamos que tengamos un payload: 
            expect(_body.payload).to.be.ok; 
        })

        it("Debe loguear correctamente al usuario y recuperar la cookie", async () => {
            //Enviamos los mismos datos que registramos en el paso anterior

            const mockUsuario = {
                email: "pepe@zapateriagarmendia.com", 
                password: "1234"
            }

            const resultado = await requester.post("/api/sessions/login").send(mockUsuario); 

            //Me guardo el header de la peticion: 

            const cookieResultado = resultado.headers["set-cookie"]["0"]; 

            //Verificamos que la cookie recuperada exista
            expect(cookieResultado).to.be.ok; 

            //Se separa el nombre y el valor de la cookie y se guardan en un objeto: 
            cookie = {
                name: cookieResultado.split("=")["0"],
                value: cookieResultado.split("=")["1"]
            }

            //Verificamos que el nombre de la cookie sea igual a "coderCookie"

            expect(cookie.name).to.be.ok.and.equal("coderCookie"); 
            expect(cookie.value).to.be.ok; 
        })

        //Probamos la ruta current: 
        it("Debe enviar la cookie que contiene el usuario", async () => {
            //Enviamos: 
            const {_body} = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]);

            //Verificamos que nos retorne el email: 

            expect(_body.payload.email).to.be.equal("pepe@zapateriagarmendia.com");
        })
    })
})