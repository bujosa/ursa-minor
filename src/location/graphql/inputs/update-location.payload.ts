import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateLocationInput } from './create-location.input';

@InputType()
export class UpdateLocationPayload extends PartialType(
  OmitType(CreateLocationInput, ['customer'] as const),
) {}
