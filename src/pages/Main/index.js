import React, { useState } from 'react';

import { Container, Form, SubmitButton } from './styles';
import { FaGithubAlt, FaPlus } from 'react-icons/fa';

export default function Main() {
  const [repository, setRepository] = useState();
  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={() => alert(repository)}>
        <input
          type="text"
          placeholder="adicionar repositório"
          value={repository}
          onChange={e => setRepository(e.target.value)}
        />
        <SubmitButton>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
