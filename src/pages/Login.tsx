import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Preencha todos os campos");
      return;
    }

    if (isSignup) {
      const err = signup(username.trim(), password);
      if (err) {
        setError(err);
      } else {
        navigate("/");
      }
    } else {
      const success = login(username.trim(), password);
      if (!success) {
        setError("Usuário ou senha incorretos");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-lg text-foreground">Receitinhas</h1>
          <div className="w-9" />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h2 className="font-heading font-bold text-2xl text-foreground text-center">
            {isSignup ? "Criar Conta" : "Entrar"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mt-2 font-body">
            {isSignup ? "Preencha os dados para se cadastrar" : "Bem-vindo de volta! 👋"}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-body font-medium text-foreground mb-1.5 block">Nome de usuário</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="seu_usuario"
                className="font-body"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="text-xs font-body font-medium text-foreground mb-1.5 block">Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="font-body pr-10"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-destructive font-body text-center">{error}</p>
            )}

            <Button type="submit" className="w-full rounded-xl h-11 font-heading font-bold">
              {isSignup ? "Cadastrar" : "Entrar"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6 font-body">
            {isSignup ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <button
              onClick={() => { setIsSignup(!isSignup); setError(""); }}
              className="text-primary font-medium hover:underline"
            >
              {isSignup ? "Entrar" : "Cadastre-se"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
