import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface Tarefa {
  texto: string;
  concluida: boolean;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent {
  novaTarefa = signal('');
  tarefas = signal<Tarefa[]>([]);
  novaTarefaTexto = signal('');
  mostrarModal = signal(false);

  tarefasPendentes = computed(() => this.tarefas().filter((t) => !t.concluida));

  public submitForm(form: NgForm) {
    if (form.valid) {
      const texto = this.novaTarefaTexto().trim();
      if (texto) {
        const nova = { texto, concluida: false };
        this.tarefas.update((lista) => [...lista, nova]);
        this.novaTarefaTexto.set('');
        form.resetForm();
      }
    }
  }

  itemSelecionado = signal<Tarefa[]>([]);

  alternar(item: Tarefa) {
    const atual = this.itemSelecionado();
    const jaSelecionado = atual.includes(item);

    if (jaSelecionado) {
      this.itemSelecionado.set(atual.filter((t) => t !== item));
    } else {
      this.itemSelecionado.set([...atual, item]);
    }
  }

  tarefaSelecionada = signal<Tarefa | null>(null);
  abrirModal(tarefa: Tarefa) {
    this.tarefaSelecionada.set(tarefa);
    this.mostrarModal.set(true);
  }

  cancelarExclusao() {
    this.tarefaSelecionada.set(null);
    this.mostrarModal.set(false);
  }

  confirmarExclusao() {
    const tarefa = this.tarefaSelecionada();
    if (tarefa) {
      this.tarefas.update((lista) => lista.filter((t) => t !== tarefa));
      this.tarefaSelecionada.set(null);
      this.mostrarModal.set(false);
    }
  }
}
