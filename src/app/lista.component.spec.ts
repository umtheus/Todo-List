import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaComponent } from './lista.component';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve cancelar a exclusao do item selecionado na lista', () => {
    component.tarefaSelecionada.set({ texto: 'Matheus', concluida: false });
    component.mostrarModal.set(true);
    component.cancelarExclusao();
    expect(component.mostrarModal()).toBe(false);
    expect(component.tarefaSelecionada()).toBe(null);
  });
  it('deve cancelar a exclusao do item selecionado na lista', () => {
    component.tarefaSelecionada.set({ texto: 'Matheus', concluida: false });
    component.mostrarModal.set(true);
    component.cancelarExclusao();
    expect(component.mostrarModal()).toBe(false);
    expect(component.tarefaSelecionada()).toBe(null);
  });
  it('deve abrir modal e se tarefa foi selecionada', () => {
    const tarefa = { texto: 'matheus', concluida: false };
    component.abrirModal(tarefa);
    expect(component.tarefaSelecionada()).toEqual(tarefa);
    expect(component.mostrarModal()).toBe(true);
  });
  it('deve retornar apenas tarefas não concluídas', () => {
    component.tarefas.set([
      { texto: 'Feita', concluida: true },
      { texto: 'Pendente', concluida: false },
    ]);

    const pendentes = component.tarefasPendentes();

    expect(pendentes.length).toBe(1);
    expect(pendentes[0].texto).toBe('Pendente');
  });
  it('deve excluir a tarefa selecionada', () => {
    const tarefa = { texto: 'Excluir', concluida: false };
    component.tarefas.set([tarefa]);
    component.tarefaSelecionada.set(tarefa);
    component.mostrarModal.set(true);

    component.confirmarExclusao();

    expect(component.tarefas()).not.toContain(tarefa);
    expect(component.tarefaSelecionada()).toBe(null);
    expect(component.mostrarModal()).toBe(false);
  });
});
