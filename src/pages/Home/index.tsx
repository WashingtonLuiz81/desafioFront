import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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

  function onSubmit(data: SearchFormData) {
    const username = data.username.trim();

    if (!username) {
      return;
    }

    navigate(`/user/${encodeURIComponent(username)}`);
  }

  return (
    <section className="hero-section">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge text-bg-primary mb-3">GitHub API</span>

          <h1 className="display-5 fw-bold">
            Encontre os repositórios mais populares de qualquer usuário GitHub.
          </h1>

          <p className="lead text-muted mt-3">
            Busque um perfil, veja seus dados principais e explore os projetos ordenados por estrelas.
          </p>

          <form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                Tente buscar por: facebook, vercel, microsoft ou torvalds.
              </div>
            )}
          </form>
        </div>

        <div className="col-lg-5">
          <div className="preview-card shadow-sm">
            <div className="preview-avatar" aria-hidden="true" />
            <h2 className="h5 mt-3">Perfil + Repositórios</h2>
            <p className="text-muted mb-0">
              Uma experiência simples, responsiva e focada nos dados mais importantes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}