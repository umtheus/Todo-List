import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaComponent } from './lista.component';

@Component({
  standalone: true,
  imports: [RouterModule, ListaComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Todo';
}
