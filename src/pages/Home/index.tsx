import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type SearchFormData = {
  username: string;
};

export function Home() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>();

  function handleSearchUser(data: SearchFormData) {
    const username = data.username.trim();

    navigate(`/user/${encodeURIComponent(username)}`);
  }

  return (
    <section className="hero-section">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge text-bg-primary mb-3">GitHub API</span>

          <h1 className="hero-title fw-bold">
            Encontre os repositórios mais populares de um usuário GitHub.
          </h1>

          <p className="lead hero-description mt-3">
            Busque um perfil, veja seus dados principais e explore os projetos ordenados por estrelas.
          </p>

          <form className="mt-4" onSubmit={handleSubmit(handleSearchUser)} noValidate>
            <label htmlFor="username" className="form-label fw-semibold">
              Usuário do GitHub
            </label>

            <div className="input-group input-group-lg">
              <input
                id="username"
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Ex: torvalds"
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'username-error' : 'username-help'}
                {...register('username', {
                  required: 'Informe um usuário do GitHub.',
                  pattern: {
                    value: /^[a-zA-Z0-9-]+$/,
                    message: 'Use apenas letras, números e hífen.',
                  },
                })}
              />

              <button className="btn btn-primary" type="submit">
                Buscar
              </button>
            </div>

            {errors.username ? (
              <div id="username-error" className="invalid-feedback d-block">
                {errors.username.message}
              </div>
            ) : (
              <div id="username-help" className="form-text">
                Tente buscar por: torvalds, facebook, vercel ou microsoft.
              </div>
            )}
          </form>
        </div>

        <div className="col-lg-5">
          <div className="hero-card p-4 p-lg-5">
            <h2 className="h4 mb-4">
              O que você encontrará
            </h2>

            <ul className="list-unstyled mb-0">
              <li className="mb-3">👤 Perfil completo do usuário</li>
              <li className="mb-3">⭐ Repositórios mais populares</li>
              <li className="mb-3">🔎 Ordenação personalizada</li>
              <li>📱 Experiência responsiva</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}