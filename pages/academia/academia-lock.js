// academia-lock.js
// Verifica se o utilizador é Premium e desbloqueia as lições correspondentes

import { auth, db, doc, getDoc, onAuthStateChanged } from "../../firebase-config.js";

onAuthStateChanged(auth, async (user) => {
  let isPremium = false;

  if (user) {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      isPremium = snap.data().isPremium === true;
    }
  }

  document.querySelectorAll(".licao-premium").forEach((el) => {
    const bloqueio = el.querySelector(".bloqueio");
    const completo = el.querySelector(".conteudo-completo");

    if (isPremium) {
      if (bloqueio) bloqueio.style.display = "none";
      if (completo) completo.style.display = "block";
    }
  });
});
