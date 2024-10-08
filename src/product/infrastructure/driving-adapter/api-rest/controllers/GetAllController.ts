import { NextFunction, Request, Response } from 'express'

import { GetAllUseCase as UseCase } from '@/product/application/use_cases';
import { ImplementationMongoose } from '@/product/infrastructure/implementation/mongoose';

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { shop_id } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = 20;
        const sortBy = req.query.sortby as string || 'price_offer';
        const sortOrder = (req.query.sortorder as 'ASC' | 'DESC') || 'ASC';
        const priceRange = req.query.price as string || '';
        const search = req.query.search as string || '';


        const mongooseRepository = new ImplementationMongoose()
        const useCase = new UseCase(mongooseRepository)
        const result = await useCase.run(shop_id, page, pageSize, sortBy, sortOrder, priceRange, search);

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Registro Recuperados Correctamente',
            data: {
                products: result?.data,
                total: result?.total,
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(result?.total! / pageSize)
            },
        })

    } catch (error) {
        next(error)
    }
}
