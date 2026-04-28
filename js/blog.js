// Firebase Configuration (shared)
const firebaseConfig = {
  apiKey: "AIzaSyCEt6uttsBNcOTdmpLzz1eoOXc3Jk-IKfk",
  authDomain: "rockshow-61a77.firebaseapp.com",
  projectId: "rockshow-61a77",
  storageBucket: "rockshow-61a77.firebasestorage.app",
  messagingSenderId: "1052089619676",
  appId: "1:1052089619676:web:eb9cc50b73363ae95d9019",
  measurementId: "G-CTC0Y1KW8E"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const posts = [
  {
    id: "adventure-time",
    title: "Adventure Time 🥸♥️",
    date: "28 Apr 2026",
    dateIso: "2026-04-28",
    tag: "nota",
    body: "Hi! So now that I know that U can read this I think it’s a good way of non direct communication, like u said, sometimes it’s easier to write than to talk, so I think this is good\n\nYou don’t have read it if you don’t want to, and specially you don’t have to write if you don’t want to, maybe you could leave a gif or something, but that’s not idea, my idea is that you read it like it was a blog, like the Taylor one that you like, just like that, I truly believe it can help both :)\n\nSo, I know we are on 0 contact rn, so I won’t disturb you, I’ll be quick\n\nFirst, I know you said I shouldn’t be sorry since the problem it’s you, but that’s not the case, I’m sorry Lau, I shouldn’t pressure you for doing something that was wrong, I assure you I don’t have any other expectations from you than what you are, that funny Lau, that loves Taylor, loves Milan and Mocho, that Lau that gets mad when it’s hot outside, that makes laugh with tickles, the one who is just up to everything.\n\nThings are not complicated Lau, I fucked up, it was my mistake, I should be happy with what we have, you are just as loving or more than me, I never respected your need for space, I never appreciate enough the way you just let me in in your life and maybe abuse it a little bit.\n\nBut I know you are not as avoidant as someone can believe, we have been happy most of the time, since you are so genuine and original\n\nAnd you are the one who really loves me for who I’m, you never tried to change, that’s why I’m sorry Lau, I was wrong, I don’t want you to change, I want you to be happy as always and make fun of stupid things, I want you to be Lau again, I’m really sorry truly, hell I don’t even want kids, marry or whatever, what I truly want in my life, and I know that I’m saying too much I know but pls don’t run from this feeling, let you feel like you used to be.\n\nAnd well that’s pretty much it, we already talk about this so it’s nothing new, I just want to get rid of that feeling you have of not being enough, of being like me, or love me my way, cuz you actually do, you always hold my hand, always kiss me, and that more than enough.\n\nSo at the end, the one who have to change it’s me, and I promise you that’s what I’m doing, I’m prepare to what you need, that’s why I propose you to take this time, it’s challenging for me as you know, but I think I can do it, I been trying to be like you and focus around my independence, so that way I’ll let you breath haahha.\n\nThink I should do rn, and let you in our 0 contact, so sorry, like I promise I wont talk about this anymore, it’s just I wanted to be sure that you are enough, I don’t need anything more from you than what you are, I won’t limit your freedom, I’ve been learning about avoidant and anxious attachment so that’s why I’m talking about this, but yeah that’s it, you don’t need to avoid me, I won’t be a pressure no more, but specially you don’t need to avoid your own feelings, it’s okay if you don’t what love is, nobody does, but I know that you love me, for everything that you have done, just come back to normal and stop running, take your time, to think, to let your feelings sink, and to understand what you really want, and let your fears go, I’ll be here waiting for you, cuz I know you love and I love you 2\n\nAnd that’s it, lets just go back to normal and pretend this never happened, I promise you it will be okay:)\n\nWe just need to work together on each other difficulties, but if you ask me that’s okay, we just need to connect again as it was, but this time I won’t pressure you that’s all:)\n\nSo I know this is a long ass text omg, well enough I’ll let you this here:\n\nI started liking Taylor for you :)\nCome Back...Be Here (Taylor's Version) — Taylor Swift\n\nPls sign here if you read it:\n\n-SZ",
    signatureId: "adventure-time"
  }
];

const postList = document.getElementById("postList");
const scrollTopButton = document.getElementById("scrollTop");
const visitCount = document.getElementById("visitCount");
const audioToggle = document.getElementById("audioToggle");
const blogAudio = document.getElementById("blogAudio");

function renderPosts() {
  posts.forEach((post) => {
    const card = document.createElement("article");
    card.className = `post-card${post.pinned ? " pinned" : ""}`;

    const meta = document.createElement("div");
    meta.className = "post-meta";

    const tag = document.createElement("span");
    tag.className = "post-tag";
    tag.textContent = post.tag;

    const date = document.createElement("time");
    date.setAttribute("datetime", post.dateIso || post.date);
    date.textContent = post.date;

    meta.appendChild(tag);
    meta.appendChild(date);

    const title = document.createElement("h2");
    title.className = "post-title";
    title.textContent = post.title;

    const body = document.createElement("p");
    body.className = "post-body";
    body.textContent = post.body;

    card.appendChild(meta);
    card.appendChild(title);
    card.appendChild(body);

    if (post.body.length > 170) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "read-more";
      button.textContent = "leer mas";
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", () => {
        const expanded = card.classList.toggle("expanded");
        button.textContent = expanded ? "leer menos" : "leer mas";
        button.setAttribute("aria-expanded", expanded ? "true" : "false");
      });
      card.appendChild(button);
    }

    if (post.signatureId) {
      const signatureArea = createSignatureArea(post.signatureId);
      card.appendChild(signatureArea.wrap);
      loadSignature(post.signatureId, signatureArea);
    }

    postList.appendChild(card);
  });
}

function createSignatureArea(signatureId) {
  const wrap = document.createElement("div");
  wrap.className = "signature-area";

  const status = document.createElement("span");
  status.className = "signature-meta";
  status.textContent = "pendiente de firma";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "stamp-btn";
  button.textContent = "firmar";

  const mark = document.createElement("span");
  mark.className = "stamp-mark";
  mark.textContent = "LT";
  mark.style.display = "none";

  let holdTimer = null;
  const holdDelayMs = 1200;

  button.addEventListener("click", async () => {
    if (button.classList.contains("signed")) return;
    button.classList.add("stamping");
    try {
      await db.collection("blog_signatures").doc(signatureId).set({
        signed: true,
        initials: "LT",
        signedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      const doc = await db.collection("blog_signatures").doc(signatureId).get();
      applySignatureState(doc, { button, status, mark });
    } catch (err) {
      status.textContent = "no se pudo firmar";
    } finally {
      button.classList.remove("stamping");
    }
  });

  function startHold() {
    if (!button.classList.contains("signed")) return;
    if (holdTimer) return;
    holdTimer = setTimeout(() => {
      holdTimer = null;
      attemptSignatureDelete(signatureId, { button, status, mark });
    }, holdDelayMs);
  }

  function cancelHold() {
    if (!holdTimer) return;
    clearTimeout(holdTimer);
    holdTimer = null;
  }

  button.addEventListener("pointerdown", startHold);
  button.addEventListener("pointerup", cancelHold);
  button.addEventListener("pointerleave", cancelHold);
  button.addEventListener("touchend", cancelHold, { passive: true });

  wrap.appendChild(status);
  wrap.appendChild(button);
  wrap.appendChild(mark);
  return { wrap, button, status, mark };
}

async function attemptSignatureDelete(signatureId, ui) {
  const pass = prompt("Para borrar la firma, ingresá la contraseña:");
  if (pass !== "rock") return;
  try {
    await db.collection("blog_signatures").doc(signatureId).delete();
    resetSignatureState(ui);
  } catch (_) {
    ui.status.textContent = "no se pudo borrar";
  }
}

async function loadSignature(signatureId, ui) {
  try {
    const doc = await db.collection("blog_signatures").doc(signatureId).get();
    applySignatureState(doc, ui);
  } catch (_) {
    ui.status.textContent = "sin conexion";
  }
}

function applySignatureState(doc, ui) {
  if (!doc.exists) return;
  const data = doc.data();
  if (!data || !data.signed) return;
  const initials = data.initials || "LT";
  ui.mark.textContent = initials;
  ui.mark.style.display = "inline";
  ui.button.classList.add("signed");
  ui.button.textContent = "firmado";
  ui.button.disabled = true;
  const dateText = data.signedAt && data.signedAt.toDate
    ? data.signedAt.toDate().toLocaleDateString("es-CR", { day: "2-digit", month: "short", year: "numeric" })
    : null;
  ui.status.textContent = dateText ? `firmado • ${dateText}` : "firmado";
}

function resetSignatureState(ui) {
  ui.mark.style.display = "none";
  ui.button.classList.remove("signed");
  ui.button.textContent = "firmar";
  ui.button.disabled = false;
  ui.status.textContent = "pendiente de firma";
}

function toggleScrollButton() {
  if (window.scrollY > 240) {
    scrollTopButton.classList.add("visible");
  } else {
    scrollTopButton.classList.remove("visible");
  }
}

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", toggleScrollButton);

renderPosts();
trackVisitCount();
setupBlogAudio();

async function trackVisitCount() {
  const docRef = db.collection("blog_stats").doc("adventure-time");
  const sessionKey = "blog_adventure_visit_registered";
  const shouldIncrement = !sessionStorage.getItem(sessionKey);

  try {
    if (shouldIncrement) {
      await docRef.set({
        visits: firebase.firestore.FieldValue.increment(1),
        lastVisitAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      sessionStorage.setItem(sessionKey, "true");
    }

    const snapshot = await docRef.get();
    if (snapshot.exists) {
      const data = snapshot.data();
      const total = data && typeof data.visits === "number" ? data.visits : 0;
      visitCount.textContent = `visitas: ${total}`;
    }
  } catch (_) {
    visitCount.textContent = "visitas: --";
  }
}

function setupBlogAudio() {
  if (!audioToggle || !blogAudio) return;
  blogAudio.volume = 0.35;

  function setAudioState(isOn) {
    if (isOn) {
      audioToggle.classList.add("active");
      audioToggle.textContent = "audio on";
      audioToggle.setAttribute("aria-pressed", "true");
    } else {
      audioToggle.classList.remove("active");
      audioToggle.textContent = "audio";
      audioToggle.setAttribute("aria-pressed", "false");
    }
  }

  async function tryAutoplay() {
    blogAudio.muted = false;
    try {
      await blogAudio.play();
      setAudioState(true);
    } catch (_) {
      blogAudio.muted = true;
      setAudioState(false);
    }
  }

  audioToggle.addEventListener("click", async () => {
    const isMuted = blogAudio.muted || blogAudio.paused;
    if (isMuted) {
      blogAudio.muted = false;
      try {
        await blogAudio.play();
      } catch (_) {}
      setAudioState(true);
    } else {
      blogAudio.pause();
      blogAudio.muted = true;
      setAudioState(false);
    }
  });

  if (document.readyState === "complete") {
    tryAutoplay();
  } else {
    window.addEventListener("load", tryAutoplay);
  }
}
