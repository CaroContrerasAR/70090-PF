import supertest from 'supertest';
import { expect } from 'chai';

const requester = supertest('http://localhost:8080');


describe('Testing de la App Web Adoptme - Router de Adopciones', () => {
    describe('Testing de Adopciones:', () => {

        it('endpoint GET /api/adoptions debe devolver todas las adopciones', async () => {
            const { statusCode, body } = await requester.get('/api/adoptions');
            
            // Verificamos el código de estado y los campos en la respuesta
            expect(statusCode).to.equal(200);
            expect(body).to.have.property('payload').that.is.an('array');
        });

        it('endpoint GET /api/adoptions/:aid debe devolver una adopción específica', async () => {
            // Mock ID de adopción (asegúrate de reemplazar esto con un ID válido en tu base de datos)
            const mockAdoptionId = '64df12efc0a4f4e3a1234567';

            const { statusCode, body } = await requester.get(`/api/adoptions/${mockAdoptionId}`);

            // Verificamos que el código de estado y que la respuesta tenga el objeto esperado
            expect(statusCode).to.equal(200);
            expect(body).to.have.property('payload').that.is.an('object');
            expect(body.payload).to.have.property('_id').that.equals(mockAdoptionId);
        });

        it('endpoint POST /api/adoptions/:uid/:pid debe crear una adopción correctamente', async () => {
            // Mock de usuario y mascota
            const mockUserId = '64df12efc0a4f4e3a1234568';
            const mockPetId = '64df12efc0a4f4e3a1234569';

            const mockAdoption = {
                adoptionDate: '2025-01-01',
                notes: 'La adopción fue completada exitosamente.',
            };

            const { statusCode, body } = await requester
                .post(`/api/adoptions/${mockUserId}/${mockPetId}`)
                .send(mockAdoption);

            // Validamos que la adopción se haya creado correctamente
            expect(statusCode).to.equal(201);
            expect(body).to.have.property('payload');
            expect(body.payload).to.have.property('_id');
            expect(body.payload).to.have.property('userId').that.equals(mockUserId);
            expect(body.payload).to.have.property('petId').that.equals(mockPetId);
        });

        it('endpoint POST /api/adoptions/:uid/:pid debe devolver un error si falta algún parámetro', async () => {
            const mockUserId = '64df12efc0a4f4e3a1234568';

            const { statusCode, body } = await requester.post(`/api/adoptions/${mockUserId}/`);

            // Verificamos el error
            expect(statusCode).to.equal(400);
            expect(body).to.have.property('error');
        });
    });
});