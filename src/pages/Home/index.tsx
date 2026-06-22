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
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-8">
          <span className="badge text-bg-primary mb-3">
            GitHub API
          </span>

          <h1 className="hero-title fw-bold">
            Encontre os repositórios mais populares de um usuário GitHub.
          </h1>

          <p className="lead hero-description mt-3">
            Busque um perfil, veja seus dados principais e explore os projetos
            ordenados por estrelas.
          </p>

          <form
            className="mt-4"
            onSubmit={handleSubmit(handleSearchUser)}
            noValidate
          >
            <label htmlFor="username" className="form-label fw-semibold">
              Usuário do GitHub
            </label>

            <div className="input-group input-group-lg">
              <input
                id="username"
                type="text"
                className={`form-control ${
                  errors.username ? 'is-invalid' : ''
                }`}
                placeholder="Ex: torvalds"
                aria-invalid={!!errors.username}
                aria-describedby={
                  errors.username
                    ? 'username-error'
                    : 'username-help'
                }
                {...register('username', {
                  required: 'Informe um usuário do GitHub.',
                  pattern: {
                    value: /^[a-zA-Z0-9-]+$/,
                    message:
                      'Use apenas letras, números e hífen.',
                  },
                })}
              />

              <button
                className="btn btn-primary"
                type="submit"
              >
                Buscar
              </button>
            </div>

            {errors.username ? (
              <div
                id="username-error"
                className="invalid-feedback d-block"
              >
                {errors.username.message}
              </div>
            ) : (
              <div
                id="username-help"
                className="form-text"
              >
                Tente buscar por: torvalds, facebook,
                vercel ou microsoft.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}