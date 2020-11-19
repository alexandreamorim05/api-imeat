/*
    Criando um modelo de como vai ficar a base de dados Firebase, devido ao banco ser não relacional,
    é necessário uma organização diferente do relacional.
*/

{
    // representação da tabela usuário
    'usuarios' = [
        {
            'email': '',
            'senha': '',
            'tipoUsuario': '',
        },
    ],

    // representação da tabela cliente
    'cliente' = [
        {
            // DADOS DE CLIENTE

            'usuario' : {
                'id': '',
                'email': ''
            },

            'listaDePedidos' : [
                {
                    'id': '',
                    'dataPedido' : '',
                    'formaPagamento' : '',
                    'valorPedido' : '',
                    'qtdItens' : '',
                }
            ]
        },
    ],

    // representação da tabela estabelecimento
    'estabelecimento' = [
        // DADOS DE ESTABELECIMENTO

        'usuario' = {
            'id': '',
            'email': ''
        },

        'cardapio' = [
            'listaDeCategoria' = [
                'nome' = '',
                'descricao' = '',
                'listaDePrato' = [
                    'prato' = {
                        'nome': '',
                        'ingredientes': '',
                        'valor': ''
                    }
                ]
            ]
        ]
    ],

    // representação da tabela pedidos
    'pedidos' = [
        // Dados pedido
        'dataPedido' = '',
        'formaPagamento' = '',
        'valorPedido' = '',

        'statusPedido' = '1',

        // Cliente
        'cliente' = {

        },

        'estabelecimento' = {

        },

        'qtdItens' = '',
        'listaDeItens' = [
            {
                'categoria': {
                    'nome' : '',
                    'descricao' : '',
                },
                'prato': {
                    'id': '',
                    'nome': '',
                    'ingredientes': '',
                    'valor': ''
                },
            }
        ]
    ]
}