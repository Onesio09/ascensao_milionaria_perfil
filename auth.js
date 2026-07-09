// auth.js
// Lógica de registo, login e gestão de sessão para a Ascensão Milionária

import {
  auth, db, googleProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, signOut, onAuthStateChanged,
  doc, setDoc, getDoc
} from "./firebase-config.js";

// 1. REGISTO COM EMAIL E PALAVRA-PASSE
async function registarUtilizador(email, password, nome) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: nome,
      email: email,
      createdAt: new Date(),
      isAdmin: false
    });

    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Erro no registo:", error.message);
    mostrarErro(error.message);
  }
}

// 2. LOGIN COM EMAIL E PALAVRA-PASSE
async function loginUtilizador(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Erro no login:", error.message);
    mostrarErro("Credenciais incorretas.");
  }
}

// 3. LOGIN COM GOOGLE
async function loginComGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
        isAdmin: false
      });
    }

    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Erro com Google Sign-In:", error.message);
    mostrarErro("Não foi possível entrar com o Google.");
  }
}

// 4. LOGOUT
async function terminarSessao() {
  await signOut(auth);
  window.location.href = "login.html";
}

// 5. VERIFICAÇÃO DE SESSÃO ATIVA (corre em todas as páginas protegidas)
onAuthStateChanged(auth, async (user) => {
  const pagina = window.location.pathname;

  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      if (pagina.includes("admin.html") && !userData.isAdmin) {
        alert("Acesso negado. Apenas administradores.");
        window.location.href = "dashboard.html";
        return;
      }

      const nomeEl = document.getElementById("nome-utilizador");
      if (nomeEl) nomeEl.innerText = userData.name;
    }
  } else {
    if (pagina.includes("dashboard.html") || pagina.includes("admin.html")) {
      window.location.href = "login.html";
    }
  }
});

// Utilitário simples para mostrar erros no formulário
function mostrarErro(mensagem) {
  const el = document.getElementById("erro-form");
  if (el) {
    el.innerText = mensagem;
    el.style.display = "block";
  } else {
    alert(mensagem);
  }
}

// Expor funções para os botões do HTML (onclick="...")
window.registarUtilizador = registarUtilizador;
window.loginUtilizador = loginUtilizador;
window.loginComGoogle = loginComGoogle;
window.terminarSessao = terminarSessao;
