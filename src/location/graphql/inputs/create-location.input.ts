import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  address: string;

  @Field(() => ID)
  country: string;

  @Field()
  zipCode: string;

  @Field(() => ID)
  customer: string;
}
