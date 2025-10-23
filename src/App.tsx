import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    sexe: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // SIMULA envio (depois conectamos com API)
    setTimeout(() => {
      setMessage('✅ Cadastro recebido! Em breve entraremos em contato.');
      setForm({ firstname: '', lastname: '', email: '', sexe: '' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>VALLE E HEBERT SÃO GAYS</h1>
        <p>Preencha seus dados abaixo e comece sua transformação!</p>
        
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Nome"
            value={form.firstname}
            onChange={(e) => setForm({...form, firstname: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Sobrenome"
            value={form.lastname}
            onChange={(e) => setForm({...form, lastname: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />
          <select
            value={form.sexe}
            onChange={(e) => setForm({...form, sexe: e.target.value})}
            required
          >
            <option value="">Selecione o sexo</option>
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
          </select>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Começar Agora'}
          </button>
        </form>

        {message && <div className="message">{message}</div>}
        
        <div className="info">
          <p>🎯 Treinos 100% personalizados</p>
          <p>💪 Acompanhamento profissional</p>
          <p>📱 App exclusivo para alunos</p>
        </div>
      </div>
    </div>
  );
}

export default App;