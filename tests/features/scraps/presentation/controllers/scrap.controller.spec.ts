import { CacheRepository } from '../../../../../src/core/infra/repositories';
import { ScrapRepository } from '../../../../../src/features/scraps/infra/repositories';
import { Scrap } from '../../../../../src/core/domain/models/scrap.model';
import {
    notFound,
    ScrapController,
} from '../../../../../src/features/scraps/presentation';

import {
    HttpRequest,
    ok,
    serverError,
} from '../../../../../src/features/scraps/presentation';

jest.mock(
    '../../../../../src/features/scraps/infra/repositories/scrap.repository.ts',
);
jest.mock('../../../../../src/core/infra/repositories/cache.repository.ts');

const makeRequestStore = (): HttpRequest => ({
    body: {
        title: 'any_title',
        description: 'any_description',
        userUID: 'any_userUID',
    },
    params: {},
});

const makeRequestShow = (): HttpRequest => ({
    body: {},
    params: { uid: 'any_uid' },
});

const makeRequest = () => {
    return {
        params: { uid: 'any_uid' },
        body: {
            title: 'any_title',
            description: 'any_description',
            userUid: 'any_user_uid',
        },
    };
};

const makeResult = (): Scrap => ({
    uid: 'any_uid',
    title: 'any_title',
    description: 'any_description',
    userUID: 'any_userUID',
});

// SUT = System under test
const makeSut = (): ScrapController => {
    return new ScrapController(new ScrapRepository(), new CacheRepository());
};

describe('Scrap Controller', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    describe('Store', () => {
        // deve retornar o código 500 quando lançar qualquer exceção
        test('should return code 500 when throw any exception', async () => {
            jest.spyOn(ScrapRepository.prototype, 'create').mockRejectedValue(
                new Error(),
            );
            const sut = makeSut();
            const result = await sut.store(makeRequestStore());
            expect(result).toEqual(serverError());
        });

        // deve chamar ScrapRepository quando passar os valores corretos
        test('should call ScrapRepository when pass correct values', async () => {
            const createSpy = jest.spyOn(ScrapRepository.prototype, 'create');
            const sut = makeSut();
            await sut.store(makeRequestStore());
            expect(createSpy).toHaveBeenCalledWith(makeRequestStore().body);
        });

        // deve retornar o código 200 quando dados válidos são fornecidos
        test('should return code 200 when valid data is provided', async () => {
            jest.spyOn(ScrapRepository.prototype, 'create').mockResolvedValue(
                makeResult(),
            );
            const sut = makeSut();
            const result = await sut.store(makeRequestStore());
            expect(result).toEqual(ok(makeResult()));
        });

        // deve chamar CacheRepository quando passar os valores corretos
        test('should call CacheRepository when pass correct values', async () => {
            jest.spyOn(ScrapRepository.prototype, 'create').mockResolvedValue(
                makeResult(),
            );
            const setSpy = jest.spyOn(CacheRepository.prototype, 'set');
            const delSpy = jest.spyOn(CacheRepository.prototype, 'del');
            // SUT = System under test = o que está sendo testado
            const sut = makeSut();
            await sut.store(makeRequestStore());
            expect(setSpy).toHaveBeenCalledWith('scrap:any_uid', makeResult());
            expect(delSpy).toHaveBeenCalledWith('scrap:all');
        });
    });

    // describe('Index', () => {
    //     // should return code 500 when throw any exception
    //     test('should return code 500 when throw any exception', async () => {
    //         jest.spyOn(CacheRepository.prototype, 'get').mockRejectedValue(
    //             new Error(),
    //         );

    //         const sut = makeSut();
    //         const result = await sut.index();

    //         expect(result).toEqual(serverError());
    //     });

    //     // deve chamar CacheRepository quando passar os valores corretos
    //     test('should call CacheRepository when pass correct values', async () => {
    //         jest.spyOn(ScrapRepository.prototype, 'getAll').mockResolvedValue([
    //             makeResult(),
    //         ]);

    //         const getSpy = jest
    //             .spyOn(CacheRepository.prototype, 'get')
    //             .mockResolvedValue(null);
    //         const setSpy = jest
    //             .spyOn(CacheRepository.prototype, 'set')
    //             .mockResolvedValue(null);

    //         const sut = makeSut();
    //         await sut.index();

    //         expect(getSpy).toHaveBeenCalledWith('scrap:all');
    //         expect(setSpy).toHaveBeenCalledWith('scrap:all', [makeResult()]);
    //     });
    //     // deve retornar o código 200 quando o cache tem algum recado
    //     test('should return code 200 when cache has any scrap', async () => {
    //         jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue([
    //             makeResult(),
    //         ]);

    //         const sut = makeSut();
    //         const result = await sut.index();

    //         expect(result).toEqual(ok([makeResult()]));
    //     });
    //     // deve retornar o código 404 quando nenhum recado for encontrado
    //     test('should return code 404 when no scrap is found', async () => {
    //         jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(
    //             null,
    //         );
    //         jest.spyOn(ScrapRepository.prototype, 'getAll').mockResolvedValue(
    //             [],
    //         );

    //         const sut = makeSut();
    //         const result = await sut.index();

    //         expect(result).toEqual(notFound());
    //     });
    //     // deve retornar o código 200 quando o repositório tiver algum recado
    //     test('should return code 200 when repository has any scraps', async () => {
    //         jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(
    //             null,
    //         );

    //         jest.spyOn(ScrapRepository.prototype, 'getAll').mockResolvedValue([
    //             makeResult(),
    //         ]);

    //         const sut = makeSut();
    //         const result = await sut.index();

    //         expect(result).toEqual(ok([makeResult()]));
    //     });
    // });

    describe('Show', () => {
        // deve retornar o código 500 quando lançar qualquer exceção
        test('Should return serverError when throw any exception', async () => {
            jest.spyOn(CacheRepository.prototype, 'get').mockRejectedValue(
                new Error(),
            );
            const sut = makeSut();
            const result = await sut.show(makeRequest());

            expect(result).toEqual(serverError());
        });

        // Deve retornar serverError ao lançar qualquer exceção
        test('Should return serverError when throw any exception', async () => {
            jest.spyOn(CacheRepository.prototype, 'get').mockRejectedValue(
                new Error(),
            );
            const sut = makeSut();
            const result = await sut.show(makeRequest());

            expect(result).toEqual(serverError());
        });
    });

    describe('Update', () => {
        // deve retornar o código 500 quando lançar qualquer exceção
        test('should return code 500 when throw any exception', async () => {
            jest.spyOn(ScrapRepository.prototype, 'update').mockRejectedValue(
                new Error(),
            );
            const sut = makeSut();
            const result = await sut.update(makeRequest());
            expect(result).toEqual(serverError());
        });

        // Deve retornar notFound se não encontrar nenhum recado que corresponda aos parâmetros
        test("Should return notFound if doesn't find any scrap that match the params", async () => {
            jest.spyOn(ScrapRepository.prototype, 'update').mockResolvedValue(
                null,
            );
            const sut = makeSut();
            const result = await sut.update(makeRequest());

            expect(result).toEqual(notFound());
        });

        // Deve retornar ok e o recado atualizado se o repositório atualizar o recado
        test('Should return ok and the updated scrap if the repository update the scrap', async () => {
            const request = makeRequest();
            request.body = {
                ...request.body,
                title: 'new_title',
                description: 'new_description',
            };
            jest.spyOn(ScrapRepository.prototype, 'update').mockResolvedValue(
                request as any,
            );
            const sut = makeSut();
            const result = await sut.update(request);

            expect(result).toEqual(ok({ scrap: request }));
        });
    });

    describe('Delete', () => {
        // deve retornar o código 500 quando lançar qualquer exceção
        test('Should return serverError if throw any error', async () => {
            jest.spyOn(ScrapRepository.prototype, 'delete').mockRejectedValue(
                new Error(),
            );
            const sut = makeSut();
            const result = await sut.delete(makeRequest());

            expect(result).toEqual(serverError());
        });

        // Deve deletar o recado se passar dados válidos
        test('Should delete the scrap if pass valid data', async () => {
            const sut = makeSut();
            const scrap = await sut.store(makeRequest());
            await sut.delete({
                params: {
                    uid: scrap.body.uid,
                },
                body: { userUID: scrap.body.userUID },
            });
            const result = await sut.show({
                params: {
                    uid: scrap.body.uid,
                },
                body: { userUID: scrap.body.userUID },
            });

            expect(result).toEqual(notFound());
        });

        // Deve retornar ok sem corpo se o repositório deletar o recado
        test('Should return ok without body if the repository delete the scrap', async () => {
            jest.spyOn(ScrapRepository.prototype, 'delete').mockResolvedValue(
                'any_scrap' as any,
            );
            const sut = makeSut();
            const result = await sut.delete(makeRequest());

            expect(result).toEqual(ok({}));
        });
    });
});
