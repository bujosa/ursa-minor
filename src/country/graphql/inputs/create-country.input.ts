import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCountryInput {
  @Field()
  name: string;
}
