// premium.js
// Verifica se o utilizador tem acesso premium e mostra o conteúdo certo

import { auth, db, doc, getDoc, onAuthStateChanged } from "../firebase-config.js";

onAuthStateChanged(auth, async (user) => {
  const areaVisitante = document.getElementById("area-visitante");
  const areaBloqueado = document.getElementById("area-bloqueado");
  const areaPremium = document.getElementById("area-premium");

  if (!areaVisitante || !areaBloqueado || !areaPremium) return;

  areaVisitante.style.display = "none";
  areaBloqueado.style.display = "none";
  areaPremium.style.display = "none";

  if (!user) {
    areaVisitante.style.display = "block";
    return;
  }

  const userSnap = await getDoc(doc(db, "users", user.uid));
  const dados = userSnap.exists() ? userSnap.data() : {};

  if (dados.isPremium === true) {
    areaPremium.style.display = "block";
  } else {
    areaBloqueado.style.display = "block";
  }
});
