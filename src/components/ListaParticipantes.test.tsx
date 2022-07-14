import { render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaParticipantes } from '../state/hook/useListaParticipantes';
import ListaParticipantes from './ListaParcipantes';

jest.mock('../state/hook/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

describe('Uma lista vazia de participantes', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  })
  test('deve ser renderizada sem elementos', () => {
    render(<RecoilRoot>
      <ListaParticipantes />
    </RecoilRoot>)

    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(0);
  })
})

describe('Uma lista preenchida de participantes', () => {
  const participantes = ['Ana', 'Catarina']
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('deve ser renderizada sem elementos', () => {
    render(<RecoilRoot>
      <ListaParticipantes />
    </RecoilRoot>)

    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(participantes.length);
  })
})