import React, { useState, useEffect } from 'react';
import Container from '../../components/Container';
import { Form, SubmitButton, Error, List } from './styles';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Main() {
  const [repository, setRepository] = useState('');
  const [repositories, setRepositories] = useState(
    JSON.parse(localStorage.getItem('repositories')) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.get(`/repos/${repository}`);
      const data = {
        name: response.data.full_name,
      };
      setRepositories([...repositories, data]);
      setRepository('');
    } catch (error) {
      setError('Repositório não encontrado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="adicionar repositório"
          value={repository}
          onChange={e => {
            setRepository(e.target.value);
            setError('');
          }}
        />
        <SubmitButton disabled={loading || repository === ''} loading={loading}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
      <Error>{error}</Error>

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
