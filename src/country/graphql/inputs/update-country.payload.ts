import { InputType } from '@nestjs/graphql';
import { CreateCountryInput } from './create-country.input';

@InputType()
export class UpdateCountryPayload extends CreateCountryInput {}
