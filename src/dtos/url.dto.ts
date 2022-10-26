import { Length, IsUrl } from 'class-validator';

export class CreatePathDto {
  //not required, but if provided lenght must be 6
  @Length(6, 6)
  public customPath?: string;

  @IsUrl()
  public url: string;
}
