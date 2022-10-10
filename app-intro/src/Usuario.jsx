import React, { useEffect, useRef, useState } from 'react';
import UsuarioForm from './UsuarioForm';
import UsuarioList from './UsuarioList';
import UsuarioSrv from "./services/UsuarioSrv";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function Usuario() {


    const [usuarios, setUsuarios] = useState([])
    const toastRef = useRef();

    useEffect(() => {
        onClickAtualizar(); // ao inicializar execula método para atualizar
    }, []); // SE COLOCAR O NOME DA TELA NESSE [] VAI SER O ONCLICK DO NEGOCIO



    const onClickAtualizar = () => {
        UsuarioSrv.listar().then(response => {
            setUsuarios(response.data);
            console.log("Usuários atualizados");//Console do navegador 
            toastRef.current.show({ severity: 'success', summary: 'Atualizou Corno', life: 3000 });
        }).catch(e => {
            console.log("Erro: " + e.message);
            toastRef.current.show({ severity: 'error', summary: 'Erro Seu Merda', life: 5000 });

        });
    }

    // controles para inserir salvar cancelar
    const novo = { id: null, nome: '', email: '', celular: '(54) ' }
    const [usuario, setUsuario] = useState(novo)
    const [operacao, setOperacao] = useState('listar')

    const inserir = () => {
        setUsuario(novo);
        setOperacao('inserir');
    }

    const salvar = () => {
        console.log('Salvar ...');

        if (operacao === 'inserir') {
            UsuarioSrv.inserir(usuario).then(response => {
                onClickAtualizar();
                toastRef.current.show({ severity: 'success', summary: 'Usuario inserido', life: 3000 });
            }).catch(e => {
                toastRef.current.show({ severity: 'error', summary: e.message, life: 5000 });

            });
        } else if (operacao === 'editar') {
            onClickAtualizar();
            UsuarioSrv.alterar(usuario).then(response => {
                toastRef.current.show({ severity: 'success', summary: 'Usuario alterado', life: 3000 });
            }).catch(e => {
                toastRef.current.show({ severity: 'error', summary: e.message, life: 5000 });

            });
        }
        
        // setOperacao('listar');
    }
    const cancelar = () => {
        console.log('Cancelou ...');
        setOperacao('listar');
    }

    const editar = (_id) => {
        setUsuario(usuarios.filter((usuario) => usuario._id === _id)[0]);
        setOperacao('editar');
    }
    

    const excluir = (_id) => {
        confirmDialog({
            message: 'Confirma a exclusão?',
            header: 'Confirmação',
            icon: 'pi pi-question',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptClassName: 'p-button-danger',
            accept: () => excluirConfirm(_id)
        });
    }
    const excluirConfirm = (_id) => {
        UsuarioSrv.excluir(_id).then(response => {
            onClickAtualizar();
            toastRef.current.show({
                severity: 'success',
                summary: "Excluído",
                life: 2000
            });
        })
            .catch(e => {
                toastRef.current.show({
                    severity: 'error',
                    summary: e.message,
                    life: 4000
                });
            })
    }

    if (operacao === 'inserir' || operacao === 'editar') {
        return (
            <div>
                <Toast ref={toastRef} />
                <UsuarioForm usuario={usuario} setUsuario={setUsuario}
                    salvar={salvar} cancelar={cancelar} />
            </div>
        )

    } else
        return (
            <div>
                <Toast ref={toastRef} />
                <ConfirmDialog/>
                <UsuarioList usuarios={usuarios} onClickAtualizar={onClickAtualizar}
                    inserir={inserir} editar={editar} excluir={excluir} />
            </div>
        );
}