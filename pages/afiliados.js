// afiliados.js
// Lógica do Centro de Afiliados: gera e mostra o link único de referência

import { auth, db, doc, getDoc, setDoc, onAuthStateChanged } from "../firebase-config.js";

function gerarCodigo(uid) {
  // Código curto e legível baseado no uid do utilizador
  return uid.substring(0, 8).toUpperCase();
}

async function iniciarAreaAfiliado(user) {
  const areaLogado = document.getElementById("area-logado");
  const areaVisitante = document.getElementById("area-visitante");
  if (!areaLogado || !areaVisitante) return;

  areaVisitante.style.display = "none";
  areaLogado.style.display = "block";

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  let dados = userSnap.exists() ? userSnap.data() : {};

  let codigo = dados.affiliateCode;

  if (!codigo) {
    codigo = gerarCodigo(user.uid);
    await setDoc(userRef, { affiliateCode: codigo, isAffiliate: true }, { merge: true });
  }

  const link = `https://onesio09.github.io/ascensao_milionaria_perfil/?ref=${codigo}`;
  const linkEl = document.getElementById("link-afiliado");
  if (linkEl) linkEl.innerText = link;

  const btnCopiar = document.getElementById("btn-copiar-link");
  if (btnCopiar) {
    btnCopiar.onclick = () => {
      navigator.clipboard.writeText(link);
      btnCopiar.innerText = "Copiado!";
      setTimeout(() => (btnCopiar.innerText = "Copiar Link"), 2000);
    };
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    iniciarAreaAfiliado(user);
  }
});
