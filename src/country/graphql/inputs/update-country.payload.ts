import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCountryInput } from './create-country.input';

@InputType()
export class UpdateCountryPayload extends PartialType(CreateCountryInput) {}
