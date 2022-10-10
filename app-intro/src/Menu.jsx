import React, { useState } from 'react';
export default function Menu(props) {
  return (
    <div>
      <h4>App de Introdução</h4>
      <button onClick={() => { props.setOpcao('Example')}}>Exemplo</button>
      <button onClick={() => { props.setOpcao('Usuario')}}>Usuarios</button>
    </div>
  );
}