# Plant.as

#### Pensando no público que adota plantas, a solução é um aplicativo onde há um hub onde pode-se adicionar plantas e, ao clicar na sua planta, o aplicativo mostrará uma lista de cuidados que você deve ter com sua planta, um calendário para o usuário inserir o desenvolvimento da planta e uma aba de pesquisa de lojas que vendem plantas.

#

## Documentação da API

#### Cadastra um usuário - Retorna mensagem de sucesso ou erro.

```http
  POST /api/user/signup
```

| Req.body                | Tipo     | Descrição                                      |
| :---------------------- | :------- | :--------------------------------------------- |
| `name`                  | `string` | **Obrigatório**. Nome.                         |
| `email`                 | `string` | **Obrigatório**. Email válido.                 |
| `password`              | `string` | **Obrigatório**. Senha com no mínimo 6 caract. |
| `password_confirmation` | `string` | **Obrigatório**. Igual a senha.                |

#

#### Faz login - Retorna dados de login e TOKEN de autenticação.

```http
  POST /api/user/login
```

| Req.body   | Tipo     | Descrição                                             |
| :--------- | :------- | :---------------------------------------------------- |
| `email`    | `string` | **Obrigatório**. Email cadastrado no sistema.         |
| `password` | `string` | **Obrigatório**. Senha vinculada ao email cadastrado. |

#

#### Rota Usuário autenticada - Retorna dados de login e TOKEN de autenticaçãoRetorna todos principais dados do usuario(Informações e Plantas salvas).

```http
  GET /api/user/me
```

| Auth    | Tipo     | Descrição                               |
| :------ | :------- | :-------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token gerado no login. |

#

#### Rota de cadastrar planta(GPT->BANCO) - Retorna dados da planta salva no banco e vinculada automaticamente ao usuário.

```http
  POST /api/plant/create
```

| Req.body         | Tipo       | Descrição                                           |
| :--------------- | :--------- | :-------------------------------------------------- |
| `namePlant`      | `string`   | **Obrigatório**. Nome da planta para buscar no GPT. |
| `nickName`       | `string`   | **Obrigatório**. Apelido da planta.                 |
| `dateOfPurchase` | `Date ISO` | **Obrigatório**. Data string em formato ISO.        |

| Auth    | Tipo     | Descrição                                 |
| :------ | :------- | :---------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token do usuário logado. |

#

#### Rota aux. de buscar planta(BANCO) - Retorna dados da planta salvas no banco sem vinculo com usuário.

```http
  GET /api/plant/
```

| Auth    | Tipo     | Descrição                                 |
| :------ | :------- | :---------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token do usuário logado. |

#

#### Rota de buscar todas plantas salvas(Usuário) - Retorna dados de todas as planta salvas no banco vinculada ao usuário logado.

```http
  GET /api/save
```

| Auth    | Tipo     | Descrição                                 |
| :------ | :------- | :---------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token do usuário logado. |

#

#### Rota de buscar planta salva(Usuário) pelo ID - Retorna dados da planta pelo ID salva no banco vinculada ao usuário logado.

```http
  GET /api/save/view/:plantId
```

| Req.params | Tipo | Descrição                                               |
| :--------- | :--- | :------------------------------------------------------ |
| `plantId`  | `id` | **Obrigatório**. ID da planta que quer buscar os dados. |

| Auth    | Tipo     | Descrição                                 |
| :------ | :------- | :---------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token do usuário logado. |

#

#### Rota de editar planta salva(Usuário) pelo ID - Retorna dados da planta editada.

```http
  PUT /api/save/edit/:plantId
```

| Req.params | Tipo | Descrição                                               |
| :--------- | :--- | :------------------------------------------------------ |
| `plantId`  | `id` | **Obrigatório**. ID da planta que quer buscar os dados. |

| Req.body         | Tipo     | Descrição                               |
| :--------------- | :------- | :-------------------------------------- |
| `nickName`       | `String` | **Opcional**. Apelido da planta.        |
| `dateOfPurchase` | `String` | **Opcional**. Data da compra da planta. |

| Auth    | Tipo     | Descrição                                 |
| :------ | :------- | :---------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token do usuário logado. |

#

#### Rota de deletar planta salva(Usuário) pelo ID - Retorna mensagem de planta deletada.

```http
  DELETE /api/save/edit/:plantId
```

| Auth    | Tipo     | Descrição                                 |
| :------ | :------- | :---------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token do usuário logado. |

#

#### Rota de buscar diaryEntry pelo ID da planta - Retorna dados do DiaryEntry.

```http
  GET /api/diary/:plantId
```

| Req.params    | Tipo | Descrição                                              |
| :------------ | :--- | :----------------------------------------------------- |
| `plantSaveId` | `id` | **Obrigatório**. ID da planta que quer ver os diários. |

| Auth    | Tipo     | Descrição                                 |
| :------ | :------- | :---------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token do usuário logado. |

#

#### Rota de editar/salvar diaryEntry pelo ID da planta - Retorna dados do DiaryEntry.

```http
  PUT /api/diary/save/:plantId
```

| Req.params    | Tipo | Descrição                                                             |
| :------------ | :--- | :-------------------------------------------------------------------- |
| `plantSaveId` | `id` | **Obrigatório**. ID da planta salva que quer adicionar/editar diário. |

| Req.body | Tipo     | Descrição                          |
| :------- | :------- | :--------------------------------- |
| `title`  | `String` | **Obrigatório**. Titulo do diário. |
| `date`   | `Date`   | **Obrigatório**. Data do diário.   |

| Auth    | Tipo     | Descrição                                 |
| :------ | :------- | :---------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token do usuário logado. |

#

#### Rota de DELETAR diaryEntry pelo ID da planta - Retorna mensagem de planta deletada.

```http
  PUT /api/diary/save/:plantId
```

| Req.params    | Tipo | Descrição                                                             |
| :------------ | :--- | :-------------------------------------------------------------------- |
| `plantSaveId` | `id` | **Obrigatório**. ID da planta salva que quer adicionar/editar diario. |

| Req.body       | Tipo | Descrição                                           |
| :------------- | :--- | :-------------------------------------------------- |
| `diaryEntryId` | `id` | **Obrigatório**. ID do diario que vai ser deletado. |

| Auth    | Tipo     | Descrição                                 |
| :------ | :------- | :---------------------------------------- |
| `token` | `Bearer` | **Obrigatório**. Token do usuário logado. |
