import { PaymentMethodShopEntity as Entity } from "../entities";
import { PaymentMethodEntity } from "@/payment_method/domain/entities";
import { PaymentMethodDtoMapper } from "@/payment_method/domain/mappers";

export class PaymentMethodShopDtoMapper {

    static toJson(payment_method_shop: Entity): any {
        return {
            id: payment_method_shop._id,
            payment_method: PaymentMethodDtoMapper.toJson((payment_method_shop.payment_method as PaymentMethodEntity)),
            account_number: payment_method_shop.account_number,
            interbank_account_number: payment_method_shop.interbank_account_number,
            currency_type: payment_method_shop.currency_type,        
        };
    }
}