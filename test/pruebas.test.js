const expect = require('chai').expect;

const controller = require('../controllers').products;

describe('Producto', () => {
    describe('El producto es creado con éxito', () => {
        it('Debe controlar el error de creación de producto', async () => {
            const req = {
                body: {
                    code: '0978JJH',
                    description: 'Ejemplo de pruebas',
                    unitPrice: 23000,
                    boxPrice: 46000,
                    quantityPerBox: 2,
                    packagingType: true,
                    numberModels: 5,
                    notes: 'N/A',
                    primaryPhotoURL: null,
                    thumbnailPhotoUrl: null
                }
            };

            try {
                const result = await controller.createProduct2(req);
                expect(result.message).equals("Ocurrió un error al registrar el producto");
            } catch (error) {
                expect(error).equals('Ocurrió un error al registrar el producto');
            }
            
        });
    });
});
