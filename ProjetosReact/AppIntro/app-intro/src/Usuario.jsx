import React, { useState } from 'react';

export default function Usuario() {
    let usuariosList = [
        { id: 1, nome: 'Fulano', email: 'email1@teste', celular: '54 6565 5454' },
        { id: 2, nome: 'Beltrano', email: 'email2@teste', celular: '54 6565 5454' },
        { id: 3, nome: 'ciclano', email: 'ciclano@teste', celular: '54 6565 5454' }
    ]

    const [usuarios, setUsuarios] = useState(usuariosList)
    const onClickAtualizar = () => {
        usuariosList = [
            { id: 1, nome: 'fulano alterado', email: 'fulano@teste', idade: 30 },
            { id: 2, nome: 'beltrano', email: 'beltrano@teste', idade: 20 },
            { id: 3, nome: 'ciclano', email: 'ciclano@teste', idade: 20 }
        ];
        setUsuarios(usuariosList);
    }

    return (
        <div>
            <h4>Listagem de usuários</h4>
            <button onClick={onClickAtualizar} type="button"
                class="btn btn-primary btn-sm">Atualizar Lista</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Index</th><th>Nome</th><th>Email</th><th>Celular</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (usuarios.map((o, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{o.id}</td>
                            <td>{o.nome}</td>
                            <td>{o.email}</td>
                            <td>{o.celular}</td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan={3}>Nenhum usuário.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
