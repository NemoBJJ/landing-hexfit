import React, { useState, useEffect } from 'react';
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
  const [currentSlide, setCurrentSlide] = useState(0);

  // URLs das suas imagens
  const carouselSlides = [
    "/images/landingpage0.jpg",
    "/images/landingpage1.jpg", 
    "/images/landingpage2.jpg",
    "/images/landingpage3.jpg"
  ];

  // Textos para cada imagem
  const slideTexts = [
    "🥋 Treino de Jiu-Jitsu Profissional",
    "💪 Condicionamento Físico Completo", 
    "🥊 Técnicas de Combate Avançadas",
    "🎯 Metodologia Comprovada"
  ];

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://v2.hexfit.io/User/Create/Client', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlmb3JtIjoxMjEwODgyLCJkcmFuZ28iOjMsInNhbHQiOiIwLjY1NTM0MjAwIDE3NjEzMTE5NDc5NTI4In0.kXRpXDkYIOYa4ejFs0A2FT9w-T29O9TAJjZrHuGRuA4',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          sexe: form.sexe,
          lang: 'PT-BR',
          unit_system: 1
        })
      });

      const result = await response.json();
      
      if (result.status === true) {
        setMessage('✅ Cliente criado com sucesso na plataforma! Acesso liberado.');
        setForm({ firstname: '', lastname: '', email: '', sexe: '' });
      } else {
        setMessage(`❌ Erro: ${result.value || 'Falha no cadastro'}`);
      }
    } catch (error) {
      setMessage('❌ Erro de conexão com a plataforma');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header-title">
          <h1>ELITE TRAINING</h1>
          <div className="belt-badge">
            <span>JIU-JITSU & COMBAT FITNESS</span>
          </div>
        </div>
        
        <p className="subtitle">
          Na Elite Training já treinamos mais de 1.000 atletas, desde iniciantes 
          até profissionais de elite. Preencha seus dados e comece sua transformação!
        </p>

        {/* CARROSSEL COM IMAGENS REAIS */}
        <div className="carousel-container">
          <div 
            className="carousel-slide"
            style={{ backgroundImage: `url(${carouselSlides[currentSlide]})` }}
          >
            <span>{slideTexts[currentSlide]}</span>
          </div>
        </div>
        
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
            {isLoading ? 'Cadastrando...' : 'COMEÇAR TREINO GRATUITO'}
          </button>
        </form>

        {message && <div className="message">{message}</div>}
        
        <div className="info">
          <p>🎯 Treinos 100% personalizados</p>
          <p>💪 Acompanhamento profissional</p>
          <p>📱 App exclusivo para alunos</p>
          <p>⚡ Cadastro automático na plataforma</p>
        </div>
      </div>
    </div>
  );
}

export default App;