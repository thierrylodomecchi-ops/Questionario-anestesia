import { useState } from "react";

const questions = [
  { id: 1, text: "É alérgico(a) a algum medicamento?", hasComment: true },
  { id: 2, text: "É alérgico(a) a látex?", hasComment: false },
  { id: 3, text: "Faz uso de algum medicamento diário?", hasComment: true, commentLabel: "Liste os medicamentos e doses:" },
  { id: 4, text: "Faz uso de tranquilizantes ou calmantes?", hasComment: true },
  { id: 5, text: "Tem ou teve recentemente tosse com catarro?", hasComment: false },
  { id: 6, text: "Tem ou teve alguma doença cardíaca?", hasComment: true },
  { id: 7, text: "Tem marcapasso cardíaco?", hasComment: false },
  { id: 8, text: "Tem ou teve algum problema de pressão?", hasComment: true },
  { id: 9, text: "Tem ou teve algum problema de pulmão? (Asma, bronquite, tuberculose, etc.)", hasComment: true },
  { id: 10, text: "Tem problema de sangramento ou coagulação?", hasComment: false },
  { id: 11, text: "Tem diabetes?", hasComment: true },
  { id: 12, text: "É portador(a) de doença infecto-contagiosa?", hasComment: true, commentLabel: "Qual?" },
  { id: 13, text: "Tem dor ou lesão na coluna?", hasComment: true },
  { id: 14, text: "Tem ou teve problema no fígado? (cirrose, hepatite, icterícia)", hasComment: false },
  { id: 15, text: "Tem ou teve problema nos rins? (pedra, infecção, diálise)", hasComment: false },
  { id: 16, text: "Tem ou teve problema no sangue? (anemia, leucemia)", hasComment: false },
  { id: 17, text: "Tem ou teve problema na tireoide?", hasComment: false },
  { id: 18, text: "Tem ou teve problema no estômago? (hérnia de hiato, úlcera, queimação)", hasComment: false },
  { id: 19, text: "Tem dificuldade para abrir a boca? (problemas na ATM, travamento, dor na mandíbula, fratura facial prévia, cirurgia de face ou maxilar)", hasComment: true, commentLabel: "Descreva:" },
  { id: 20, text: "Tem ou teve algum problema dentário? (canal, fratura, gengiva)", hasComment: true },
  { id: 22, text: "Tem ou teve problemas neurológicos? (convulsão, desmaio, epilepsia)", hasComment: true },
  { id: 23, text: "É fumante?", hasComment: true, commentLabel: "Quantos cigarros/maços por dia?" },
  { id: 37, text: "Consome bebidas alcoólicas?", hasComment: true, commentLabel: "Com qual frequência e quais tipos? (ex: vinho nos fins de semana, cerveja diariamente, etc.)" },
  { id: 21, text: "Faz uso de cocaína, maconha ou outra droga?", hasComment: true, commentLabel: "Qual?" },
  { id: 24, text: "Usa dentadura, prótese dentária ou lentes de contato?", hasComment: false },
  { id: 25, text: "Tem prótese capilar, cílios ou unhas sintéticas?", hasComment: false },
  { id: 29, text: "Faz uso de remédio para emagrecer? (Ozempic, Wegovy, Saxenda, Mounjaro ou similar — análogos de GLP-1)", hasComment: true, commentLabel: "Qual medicamento e há quanto tempo usa?" },
  { id: 30, text: "Faz uso de anticoagulantes ou AAS (aspirina)?", hasComment: true, commentLabel: "Qual e qual a dose?" },
  { id: 31, text: "Tem diagnóstico de apneia do sono ou usa CPAP?", hasComment: true, commentLabel: "Usa CPAP? Com que frequência?" },
  { id: 32, text: "Tem refluxo gastroesofágico frequente ou azia?", hasComment: false },
  { id: 33, text: "Faz uso de fitoterápicos ou suplementos? (ginkgo, ômega-3, vitamina E, etc.)", hasComment: true, commentLabel: "Quais?" },
  { id: 34, text: "Tem ansiedade intensa ou claustrofobia?", hasComment: true, commentLabel: "Faz tratamento? Usa medicação?" },
  { id: 35, text: "Tem histórico de trombose (TVP) ou embolia pulmonar?", hasComment: true, commentLabel: "Quando ocorreu? Fez tratamento?" },
  { id: 36, text: "Faz uso de anticoncepcional hormonal ou reposição hormonal?", hasComment: true, commentLabel: "Qual e há quanto tempo?" },
  { id: 26, text: "Você ou algum familiar já teve problema com anestesia?", hasComment: true, commentLabel: "Descreva:" },
];

const pregnancyQuestion = {
  id: 28,
  text: "Existe a possibilidade de estar grávida? (não aplicável se a cirurgia for parto ou curetagem)",
  hasComment: true,
  commentLabel: "Qual a idade gestacional?",
};

const steps = ["Dados Pessoais", "Histórico Médico", "Histórico e Hábitos"];

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [comments, setComments] = useState({});
  const [personalData, setPersonalData] = useState({ nome: "", nascimento: "", peso: "", altura: "", sexo: "" });
  const [surgeryText, setSurgeryText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));
  const setComment = (id, val) => setComments(prev => ({ ...prev, [id]: val }));
  const setPersonal = (field, val) => setPersonalData(prev => ({ ...prev, [field]: val }));

  const step1Questions = questions.slice(0, 13);
  const step2Questions = questions.slice(13);
  const progress = ((step + 1) / steps.length) * 100;

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 8,
    border: "1.5px solid #dde3ec", background: "#f8fafc",
    fontSize: 15, color: "#1a2332", outline: "none",
    boxSizing: "border-box", fontFamily: "Georgia, serif", marginTop: 4,
  };

  const labelStyle = {
    fontSize: 13, color: "#6b7a8d", fontWeight: 600,
    letterSpacing: "0.04em", textTransform: "uppercase",
    marginBottom: 2, display: "block",
  };

  function QuestionRow({ q }) {
    const ans = answers[q.id];
    return (
      <div style={{
        background: "#fff", borderRadius: 12, padding: "14px 16px",
        marginBottom: 10, border: "1.5px solid #eaeff5",
        boxShadow: "0 1px 4px rgba(60,80,120,0.04)",
      }}>
        <div style={{ fontSize: 15, color: "#1a2332", marginBottom: 10, lineHeight: 1.5 }}>
          {q.text}
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: ans === "sim" && q.hasComment ? 10 : 0 }}>
          {["sim", "nao"].map(opt => (
            <button
              key={opt}
              onClick={() => setAnswer(q.id, opt)}
              style={{
                flex: 1, padding: "8px 0", borderRadius: 8, border: "1.5px solid",
                borderColor: ans === opt ? (opt === "sim" ? "#e05555" : "#2e7d5e") : "#dde3ec",
                background: ans === opt ? (opt === "sim" ? "#fdf0f0" : "#f0faf5") : "#f8fafc",
                color: ans === opt ? (opt === "sim" ? "#c0392b" : "#1e6644") : "#6b7a8d",
                fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Georgia, serif",
              }}
            >
              {opt === "sim" ? "Sim" : "Não"}
            </button>
          ))}
        </div>
        {ans === "sim" && q.hasComment && (
          <input
            style={inputStyle}
            placeholder={q.commentLabel || "Comentários adicionais..."}
            value={comments[q.id] || ""}
            onChange={e => setComment(q.id, e.target.value)}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #eaf2fb 0%, #e4f2ec 100%)",
      fontFamily: "Georgia, serif",
      paddingBottom: 40,
    }}>
      {/* Header */}
      <div style={{ background: "#1a3a5c", padding: "22px 24px 18px", color: "#fff" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#88aac8", marginBottom: 4 }}>
          Dr. Thierry Lodomez Mecchi — Anestesia
        </div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Questionário Pré-Anestésico
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#aac2d8" }}>
          Preencha com calma antes da sua consulta
        </p>
      </div>

      {/* Barra de progresso */}
      {!submitted && (
        <div style={{ background: "#fff", padding: "12px 24px", borderBottom: "1px solid #eaeff5" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            {steps.map((s, i) => (
              <span key={i} style={{
                fontSize: 11, fontWeight: i === step ? 700 : 400,
                color: i === step ? "#1a3a5c" : i < step ? "#2e7d5e" : "#aab4c0",
                letterSpacing: "0.02em",
              }}>
                {i < step ? "✓ " : ""}{s}
              </span>
            ))}
          </div>
          <div style={{ height: 4, background: "#eaeff5", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #1a3a5c, #2e7d5e)",
              borderRadius: 4, transition: "width 0.4s ease",
            }} />
          </div>
        </div>
      )}

      <div style={{ maxWidth: 540, margin: "0 auto", padding: "20px 16px 0" }}>

        {/* STEP 0 — Dados Pessoais */}
        {!submitted && step === 0 && (
          <div>
            <h2 style={{ fontSize: 18, color: "#1a2332", marginBottom: 4 }}>Dados Pessoais</h2>
            <p style={{ fontSize: 14, color: "#6b7a8d", marginBottom: 20 }}>Informações básicas para identificação.</p>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Nome completo</label>
              <input type="text" style={inputStyle} placeholder="Seu nome completo"
                value={personalData.nome} onChange={e => setPersonal("nome", e.target.value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Data de nascimento</label>
              <input type="date" style={inputStyle}
                value={personalData.nascimento} onChange={e => setPersonal("nascimento", e.target.value)} />
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Peso (kg)</label>
                <input type="number" style={inputStyle} placeholder="Ex: 68"
                  value={personalData.peso} onChange={e => setPersonal("peso", e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Altura (cm)</label>
                <input type="number" style={inputStyle} placeholder="Ex: 165" step="1"
                  value={personalData.altura} onChange={e => setPersonal("altura", e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Sexo biológico</label>
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                {["Feminino", "Masculino"].map(opt => (
                  <button key={opt} onClick={() => setPersonal("sexo", opt)} style={{
                    flex: 1, padding: "10px 0", borderRadius: 8, border: "1.5px solid",
                    borderColor: personalData.sexo === opt ? "#1a3a5c" : "#dde3ec",
                    background: personalData.sexo === opt ? "#eaf0f8" : "#f8fafc",
                    color: personalData.sexo === opt ? "#1a3a5c" : "#6b7a8d",
                    fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Georgia, serif",
                  }}>{opt}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1 — Histórico Médico */}
        {!submitted && step === 1 && (
          <div>
            <h2 style={{ fontSize: 18, color: "#1a2332", marginBottom: 4 }}>Histórico Médico</h2>
            <p style={{ fontSize: 14, color: "#6b7a8d", marginBottom: 16 }}>Responda com sinceridade. Todas as informações são confidenciais.</p>
            {step1Questions.map(q => <QuestionRow key={q.id} q={q} />)}
          </div>
        )}

        {/* STEP 2 — Histórico e Hábitos */}
        {!submitted && step === 2 && (
          <div>
            <h2 style={{ fontSize: 18, color: "#1a2332", marginBottom: 4 }}>Histórico e Hábitos</h2>
            <p style={{ fontSize: 14, color: "#6b7a8d", marginBottom: 16 }}>Continue respondendo abaixo.</p>
            {step2Questions.map(q => <QuestionRow key={q.id} q={q} />)}
            {personalData.sexo === "Feminino" && (
              <QuestionRow q={pregnancyQuestion} />
            )}
            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, border: "1.5px solid #eaeff5" }}>
              <div style={{ fontSize: 15, color: "#1a2332", marginBottom: 10 }}>
                Cite as cirurgias e tipos de anestesia que já realizou anteriormente:
              </div>
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                placeholder="Ex: Apendicectomia em 2018 com anestesia geral, sem intercorrências..."
                value={surgeryText}
                onChange={e => setSurgeryText(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Tela de agradecimento */}
        {submitted && (
          <div style={{
            background: "#fff", borderRadius: 20, padding: "40px 28px",
            textAlign: "center", border: "1.5px solid #eaeff5",
            boxShadow: "0 4px 24px rgba(26,58,92,0.08)", marginTop: 8,
          }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🙏</div>
            <h2 style={{ color: "#1a3a5c", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
              {personalData.nome ? `Obrigado, ${personalData.nome.split(" ")[0]}!` : "Obrigado!"}
            </h2>
            <p style={{ color: "#6b7a8d", fontSize: 15, lineHeight: 1.8, margin: "0 0 20px 0" }}>
              Suas respostas foram recebidas com sucesso. Estou ansioso para te conhecer melhor na nossa conversa!
            </p>
            <div style={{
              background: "#f0f6ff", borderRadius: 12, padding: "16px 18px",
              border: "1.5px solid #c8ddf5", textAlign: "left",
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a5c", marginBottom: 6, letterSpacing: "0.03em" }}>
                💡 Dica antes da consulta
              </div>
              <p style={{ fontSize: 14, color: "#4a6080", lineHeight: 1.7, margin: 0 }}>
                Anote qualquer dúvida que tiver sobre a anestesia — sobre o procedimento, o que esperar, a recuperação, ou qualquer coisa que te gere curiosidade ou preocupação. Vamos conversar sobre tudo isso na nossa videochamada!
              </p>
            </div>
          </div>
        )}

        {/* Navegação */}
        {!submitted && (
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                style={{
                  flex: 1, padding: "14px", borderRadius: 12, border: "1.5px solid #dde3ec",
                  background: "#fff", color: "#1a3a5c", fontWeight: 700, fontSize: 15,
                  cursor: "pointer", fontFamily: "Georgia, serif",
                }}
              >
                ← Voltar
              </button>
            )}
            <button
              onClick={() => {
                if (step < steps.length - 1) setStep(s => s + 1);
                else setSubmitted(true);
              }}
              style={{
                flex: 2, padding: "14px", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #1a3a5c, #2e7d5e)",
                color: "#fff", fontWeight: 700, fontSize: 15,
                cursor: "pointer", fontFamily: "Georgia, serif",
                boxShadow: "0 4px 16px rgba(26,58,92,0.18)",
              }}
            >
              {step === steps.length - 1 ? "Enviar Questionário ✓" : "Continuar →"}
            </button>
          </div>
        )}

        <p style={{ textAlign: "center", fontSize: 12, color: "#aab4c0", marginTop: 16 }}>
          Suas informações são confidenciais e utilizadas apenas para fins clínicos.
        </p>
      </div>
    </div>
  );
}
