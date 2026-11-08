import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CreateFilmDto } from './DTO/create-film.dto';
import { UpdateFilmDto } from './DTO/update-film.dto';

export interface Film {
  id: string;
  judul: string;
  genre: string;
  tahun: number;
  rating: number;
  sudahDitonton: boolean;
}

@Injectable()
export class FilmsService {
  private films: Film[] = [];

  constructor() {
    // Membaca file films.json langsung secara aman
    const rawData = readFileSync(
      join(process.cwd(), 'src', 'films.json'),
      'utf-8',
    );
    this.films = JSON.parse(rawData);
    console.log('Data film berhasil dimuat:', this.films);
  }

  // Tampilkan semua film atau filter status tontonan (?ditonton=true/false)
  findAll(ditonton?: string): Film[] {
    if (ditonton !== undefined) {
      const isWatched = ditonton === 'true';
      return this.films.filter((film) => film.sudahDitonton === isWatched);
    }
    return this.films;
  }

  // Cari satu film berdasarkan ID
  findOne(id: string): Film {
    const film = this.films.find((f) => f.id === id);
    if (!film) {
      throw new NotFoundException(`Film dengan ID ${id} tidak ditemukan`);
    }
    return film;
  }

  // Tambah film baru dengan ID unik berbasis timestamp
  create(dto: CreateFilmDto): Film {
    const filmBaru: Film = {
      id: Date.now().toString(),
      judul: dto.judul,
      genre: dto.genre,
      tahun: dto.tahun,
      rating: dto.rating,
      sudahDitonton: dto.sudahDitonton ?? false,
    };
    this.films.push(filmBaru);
    return filmBaru;
  }

  // Ubah status tontonan film
  update(id: string, dto: UpdateFilmDto): Film {
    const film = this.findOne(id);
    if (dto.sudahDitonton !== undefined) {
      film.sudahDitonton = dto.sudahDitonton;
    }
    return film;
  }

  // Hapus film dari memori
  remove(id: string): { message: string } {
    this.findOne(id);
    this.films = this.films.filter((f) => f.id !== id);
    return { message: `Film dengan ID ${id} berhasil dihapus` };
  }
}