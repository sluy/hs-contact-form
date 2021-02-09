import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactCategory } from './contact-category';
import { ContactMessage } from './contact-message';
import config from './config';
@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para capturar los datos de las categorías y enviar
 * el registro del nuevo mensaje.
 * Omitido catchError (para parsear los errores de servidor) ya
 * que el ejercicio es controlado (nunca dará errror en el servidor
 * porque no habrá nadie haciendo peticiones "directas" a la api).
 */
export class ApiService {
  constructor(private http: HttpClient) {}

  getCategories(): Promise<ContactCategory[]> {
    return new Promise((resolve) => {
      this.http
        .get<ContactCategory[]>(`${config.api.url}/categories`)
        .subscribe((data: ContactCategory[]) => {
          resolve(data);
        });
    });
  }

  storeMessage(data: ContactMessage): Promise<void> {
    return new Promise((resolve) => {
      this.http.post(`${config.api.url}/messages`, data).subscribe(() => {
        resolve();
      });
    });
  }
}
