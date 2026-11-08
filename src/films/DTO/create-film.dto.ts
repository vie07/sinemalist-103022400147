import { IsNotEmpty, IsString, IsInt, Min, Max, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty()
  @IsString()
  judul: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsInt()
  @Min(1900)
  @Max(2030)
  tahun: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsOptional()
  @IsBoolean()
  sudahDitonton?: boolean = false;
}