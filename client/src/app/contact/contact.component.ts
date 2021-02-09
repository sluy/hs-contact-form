import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ContactCategory } from '../contact-category';
import { ContactMessage } from '../contact-message';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  /**
   * Título de la página actual.
   */
  title = 'Contacto de Soporte!';
  /**
   * Formulario de contacto.
   */
  contactForm!: FormGroup;
  /**
   * Categorías posibles.
   */
  categories: ContactCategory[] = [];
  /**
   * Determina si el formulario ha sido enviado.
   */
  sended = false;

  constructor(
    private titleService: Title,
    private formService: FormBuilder,
    private api: ApiService,
    private toast: ToastService
  ) {
    this.setTitle();
    this.makeForm();
  }

  /**
   * Carga las categorías directamente del servidor.
   */
  ngOnInit(): void {
    this.api.getCategories().then((data) => {
      data.unshift({ value: '', label: 'Seleccione una opción' });
      this.categories = data;
    });
  }
  /**
   * Genera el formulario y sus validaciones.
   */
  private makeForm() {
    this.contactForm = this.formService.group({
      name: ['Stefan', Validators.required],
      company: ['esa', Validators.required],
      email: ['sluy1283@gmail.com', [Validators.required, Validators.email]],
      phone: ['55-555-555', Validators.required],
      category: ['billing', Validators.required],
      value: ['Hola Joe', Validators.required],
    });
  }
  /**
   * Establece el título de la página.
   */
  private setTitle() {
    this.titleService.setTitle(this.title);
  }
  /**
   * Determina si un campo es válido.
   * Sólo será inválido si el campo ha sido previamente "tocado"
   * y su validación falló.
   * Método usado para resumir el código en la vista.
   * @param field  Campo a comprobar.
   */
  isValid(field: string) {
    // Si es inválido y este ha sido tocado devolverá false
    if (
      this.contactForm.controls[field].invalid &&
      (this.contactForm.controls[field].dirty ||
        this.contactForm.controls[field].touched)
    ) {
      return false;
    }
    // En otro caso devolverá true
    return true;
  }
  /**
   * Devuelve el mensaje de error de un campo.
   * @param field Nombre del campo.
   */
  getErrorMessage(field: string): string {
    if (!this.contactForm.controls[field]) {
      return 'Campo desconocido.';
    }
    if (this.contactForm.controls[field].errors) {
      const errors = this.contactForm.controls[field].errors as Record<
        string,
        boolean
      >;
      if (errors.required) {
        return 'Campo requerido.';
      } else if (errors.email) {
        return 'Introduzca una dirección de correo electrónico válida.';
      }
      // Aqui se configurarian otras validaciones
    }
    return 'Error desconocido.';
  }
  /**
   * Método ejecutado al enviar el formulario.
   */
  async onSubmit() {
    if (!this.contactForm.invalid) {
      this.sended = true;
      await this.api.storeMessage(this.contactForm.value as ContactMessage);
      this.toast.success('Mensaje enviado!');
    }
  }
}
