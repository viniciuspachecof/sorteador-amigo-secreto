import { realizarSorteio } from './realizarSorteio';

describe('Dado um sorteio de amigo secreto', () => {
  test('Cada participante nao sorteio o próprio nome', () => {
    const participantes = [
      'Ana',
      'Catarina',
      'Juliana',
      'João',
      'Vinicius',
      'Nathália'
    ]

    const sorteio = realizarSorteio(participantes);
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    })
  })
})