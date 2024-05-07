import { ShopEntity as Entity } from '@/shop/domain/entities'
import { ShopRepository as Repository } from '@/shop/domain/repositories'
import { ShopMongoose as Mongoose } from '@/shop/infrastructure/driven-adapter/mongoose'

class ImplementationMongoose implements Repository {

    async getAll(): Promise<Entity[]> {
        const result = await Mongoose.find().populate("file");
        const entities: Entity[] = result.map((shop: any) => shop.toJSON() as Entity);
        return entities;
    }   

    async save (data: Entity): Promise<Entity | null> {
        try{
            const newEntity = await Mongoose.create({
                name: data.name,
                description: data.description,
                address: data.address,
                city: data.city,
                country: data.country,
                postal_code: data.postal_code,
                email: data.email,
                phone: data.phone,
                social_media: data.social_media,
            });
            return newEntity.toJSON() as Entity;
        }catch {
            return null
        }
    }   

    async update(data: Entity): Promise<Entity | null> {
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: data.id }, data, { new: true });
            
            if (updatedEntity) {
                return updatedEntity.toJSON() as Entity;
            }        
            return null;
        } catch (error) {
            return null;
        }
    }   
    
    async update_field(id : string, field: string, value : any): Promise<Entity | null> {        
        try {
            const updatedEntity = await Mongoose.findOneAndUpdate({ _id: id }, {[field]: value}, { new: true });            
            if (updatedEntity) {
                return updatedEntity.toJSON() as Entity;
            }        
            return null;
        } catch (error) {
            console.log(error);            
            return null;
        }
    }   

    async delete (id: string) : Promise<void | null > {
        try {
            await Mongoose.deleteOne({ _id: id });
        }catch (e) {
            return null;
        }        
    }

    async getById(id: string): Promise<Entity | null> {
        try {
            const foundEntity = await Mongoose.findOne({ _id: id }).populate("files");
        
            if (!foundEntity) return null;
        
            return foundEntity.toJSON() as Entity;
        }catch(e) {
            return null
        }

    }
    
}

export {
    ImplementationMongoose
}
