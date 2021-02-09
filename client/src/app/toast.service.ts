import { Injectable, TemplateRef } from '@angular/core';

interface ToastCfg {
  [index: string]: any;
  textOrTpl: string | TemplateRef<any>;
}

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio básico para manipular mensajes emergentes.
 */
export class ToastService {
  constructor() {}
  /**
   * Mensajes emergentes anidados.
   */
  toasts: ToastCfg[] = [];

  /**
   * Renderiza un mensaje emergente de éxito.
   * @param textOrTpl Contenido del mensaje emergente.
   * @param options Opciones adicionales.
   */
  success(
    textOrTpl: string | TemplateRef<any>,
    options: Record<string, any> = {}
  ) {
    return this.show(
      textOrTpl,
      Object.assign(options, {
        classname: 'bg-success text-light',
      })
    );
  }
  /**
   * Renderiza un mensaje emergente.
   * @param textOrTpl Contenido del mensaje emergente.
   * @param options Opciones adicionales.
   */
  show(
    textOrTpl: string | TemplateRef<any>,
    options: Record<string, any> = {}
  ) {
    if (!options.delay) {
      options.delay = 3000;
    }
    if (!options.classname) {
      options.classname = '';
    }
    this.toasts.push({ textOrTpl, ...options });
  }
  /**
   * Elimina un mensaje emergente.
   * @param toast
   */
  remove(toast: ToastCfg) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
