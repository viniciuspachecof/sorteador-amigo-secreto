import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Sorteio from '.'
import { useListaParticipantes } from '../../state/hook/useListaParticipantes'
import { useResultadoSorteio } from '../../state/hook/useResultadoSorteio'

jest.mock('../../state/hook/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

jest.mock('../../state/hook/useResultadoSorteio', () => {
  return {
    useResultadoSorteio: jest.fn()
  }
})

describe('A página de sorteio', () => {
  const participantes = [
    'Ana',
    'catarina',
    'Jorel',
  ]

  const resultado = new Map([
    ['Ana', 'Jorel'],
    ['Jorel', 'Catarina'],
    ['Catarina', 'Ana'],
  ])

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
  })

  test('Todos os participantes podem exibir o seu amigo secreto', () => {
    render(<RecoilRoot>
      <Sorteio />
    </RecoilRoot>)

    const opcoes = screen.queryAllByRole('option');
    expect(opcoes).toHaveLength(participantes.length + 1)
  })

  test('O amigo secreto é exibido quando solicitado', () => {
    render(<RecoilRoot>
      <Sorteio />
    </RecoilRoot>)

    const select = screen.getByPlaceholderText('Selecione o seu nome');

    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    })

    const botao = screen.getByRole('button')

    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole('alert');

    expect(amigoSecreto).toBeInTheDocument();
  })
})