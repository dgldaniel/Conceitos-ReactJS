import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const newRepository = {
      title: "ReactJS",
      url: "https://github.com/facebook/react",
      techs: ["Javascript"],
    };

    api.post("repositories", newRepository).then(({ data }) => {
      setRepositories([...repositories, data]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const repositoriesUpdated = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(repositoriesUpdated);
    });
  }

  useEffect(() => {
    api
      .get("repositories")
      .then(({ data }) => {
        setRepositories(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Erro ao acessar a API");
      });
  }, []);

  return (
    <div>
      {loading && <h1>Carregando Repositórios</h1>}
      {!loading && (
        <>
          <ul data-testid="repository-list">
            {repositories.map((repository) => (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <button onClick={handleAddRepository}>Adicionar</button>
        </>
      )}
    </div>
  );
}

export default App;
