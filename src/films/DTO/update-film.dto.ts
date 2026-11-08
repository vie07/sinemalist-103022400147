import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFilmDto {
  @IsOptional()
  @IsBoolean()
  sudahDitonton?: boolean;
}
