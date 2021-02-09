import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
/**
 * Componente para la renderización de mensajes emergentes.
 */
export class ToastComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit(): void {}
}
