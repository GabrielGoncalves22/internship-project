import React from 'react';
import renderer from 'react-test-renderer';
import Record  from '../src/components/Record';
import Biometric from '../src/screens/Biometric';

it('Componente Record renderizado com sucesso!', () => {
  renderer.create(<Record/>);
});

it('Ecrã Biometric renderizado com sucesso!', () => {
  renderer.create(<Biometric/>);
});

