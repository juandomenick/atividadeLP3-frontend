import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import {
    Container,
    Table,
    TableRow,
    TableCell,
    CircularProgress,
    TableHead,
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Tooltip
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function App() {

    const [ listaPratos, setListaPratos ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ nome, setNome ] = useState('');
    const [ tipo, setTipo ] = useState('');
    const [ idPrato, setIdPrato ] = useState('');
    const [ preco, setPreco ] = useState('');
    const [ botaoEditar, setBotaoEditar ] = useState(false);
    const [ botaoAdicionar, setBotaoAdicionar ] = useState(false);

    function listarPratosCadastrados() {
        api.get('/pratos').then((response) => {
            const pratos = response.data;
            setListaPratos(pratos);
        })
    }

    function adicionarPrato() {
        const name = nome;
        const type = tipo;
        const price = preco;

        api.post('/pratos', { nome: name, tipo: type, preco: price }).then((response) => {
            setNome('');
            setTipo('');
            setPreco('');
            setOpen(false);
            listarPratosCadastrados();
        });
    }

    function editarPrato(){
        api.put(`/pratos/${idPrato}`,{nome:nome,tipo:tipo,preco:preco}).then((response) => {
            setOpen(false);
            setNome('');
            setTipo('');
            setPreco('');
            setIdPrato('');
            listarPratosCadastrados();
        });
    }

    function removerPrato(id){
        api.delete(`/pratos/${id}`).then((response) => {
            listarPratosCadastrados();
        });
    }

    function modalAdicionar() {
        setBotaoAdicionar(true);
        setBotaoEditar(false);
        setOpen(true);
        setNome('');
        setTipo('');
        setPreco('');
        setIdPrato('');
        
    };

    function modalEditar(id,nome,tipo,preco){
        setBotaoAdicionar(false);
        setBotaoEditar(true);
        setOpen(true);
        setNome(nome);
        setTipo(tipo);
        setPreco(preco);
        setIdPrato(id);
    };

    function closeModal() {
        setOpen(false);
    };

    useEffect(() => listarPratosCadastrados(), []);

    return (
        <>
            <Header />
            <Container maxWidth='lg' className='container'>
                <CircularProgress />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant="h3">Código</TableCell>
                            <TableCell variant="h3">Prato</TableCell>
                            <TableCell variant="h3">Tipo</TableCell>
                            <TableCell variant="h3">Preço</TableCell>
                            <TableCell variant="h3" colspan='2'>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    {listaPratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.id}</TableCell>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.tipo}</TableCell>
                            <TableCell>{'R$' + prato.preco.toFixed(2)}</TableCell>
                            <TableCell>
                                <Tooltip title="Editar" aria-label="edit">
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        onClick={() => modalEditar(prato.id, prato.nome, prato.tipo, prato.preco)}
                                        size="small">
                                        <EditIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Remover" aria-label="edit">
                                    <Button
                                        onClick={() => removerPrato(prato.id)}
                                        variant="outlined"
                                        size="small"
                                        color="secondary">
                                        <DeleteForeverIcon />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Container>

            <Button 
                onClick={modalAdicionar}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>

            <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
                    <DialogTitle id="form-dialog-title">{ botaoAdicionar === true ? 'Novo Prato' : 'Editar '+nome}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { botaoAdicionar === true ? 'Digite as informações do novo prato' : 'Alterar informações de '+nome}
                </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Prato"
                        autoComplete="off"
                        type="text"
                        fullWidth
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="tipo"
                        label="Tipo"
                        autoComplete="off"
                        type="text"
                        fullWidth
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}

                    />
                    <TextField
                        margin="dense"
                        id="preco"
                        label="Preço"
                        autoComplete="off"
                        type="text"
                        fullWidth
                        value={preco}
                        onChange={e => setPreco(e.target.value)}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Cancelar
                </Button>
                    <Button color="primary" onClick={botaoEditar ? editarPrato : adicionarPrato}>
                        Salvar
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default App;