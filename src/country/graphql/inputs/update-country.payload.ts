import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCountryPayload {
  @Field()
  name: string;
}
