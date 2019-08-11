import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BounceLoader } from 'react-spinners';
import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './styles';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Repository({ match }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const repoName = decodeURIComponent(match.params.repository);
  useEffect(() => {
    async function fetchData() {
      const [responseRepository, responseIssues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(responseRepository.data);
      setIssues(responseIssues.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading>
        <BounceLoader  sizeUnit={"px"}
        size={60}
        color={'#fff'}
        loading={true}/>
        </Loading>

      ) : (
        <Container>
          <Owner>
            <Link to="/">Voltar aos repositórios</Link>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <IssueList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url} target="blank">
                      {issue.title}
                    </a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
        </Container>
      )}
    </>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
