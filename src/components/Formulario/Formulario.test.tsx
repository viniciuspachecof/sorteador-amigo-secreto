import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import Formulario from '.';

describe('O Comportamento do Formulario.tsx', () => {
  test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

    // encontrar o botão
    const botao = screen.getByRole('button');

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();

    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  })

  test('Adicionar um participante caso exista um nome preenchido', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const botao = screen.getByRole('button');

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Robson'
      }
    });

    // clicar no botão de submeter
    fireEvent.click(botao);

    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();

    // garantir  que o input nao tenha um valor
    expect(input).toHaveValue("");
  })

  test('Nomes duplicados não podem ser adicionados na lista', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const botao = screen.getByRole('button');

    fireEvent.change(input, {
      target: {
        value: 'Robson'
      }
    });
    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'Robson'
      }
    });
    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole('alert');

    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
  })

  test('A mensagem de erro deve sumir após os timers', () => {
    jest.useFakeTimers();
    render(<RecoilRoot><Formulario /></RecoilRoot>)

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const botao = screen.getByRole('button');

    fireEvent.change(input, {
      target: {
        value: 'Robson'
      }
    });
    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'Robson'
      }
    });
    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    })


    // espera N segundos
    mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeNull();
  })
})