
const isTouch = "ontouchstart" in window;

document.querySelectorAll(".card").forEach((card) => {
  const inner = card.querySelector(".card-inner");
  let isAnimating = false;
  let tiltTimeout;

  // Tap/click flip met subtiele scale-bounce
  card.addEventListener("click", (e) => {
    if (isAnimating) return;
    
    isAnimating = true;
    const baseRotate = card.classList.contains("flipped") ? 0 : 180;

    inner.style.transition = "transform 0.15s ease-out";
    inner.style.transform = `rotateY(${baseRotate}deg) scale(1.05)`;

    setTimeout(() => {
      inner.style.transition = "transform 0.7s cubic-bezier(.4,.2,.2,1)";
      inner.style.transform = `rotateY(${baseRotate}deg) scale(1)`;
      card.classList.toggle("flipped");
      
      setTimeout(() => {
        isAnimating = false;
      }, 700);
    }, 150);
  });

  if (!isTouch) {
    card.addEventListener("mousemove", (e) => {
      if (isAnimating || card.classList.contains("flipped")) return;
      
      clearTimeout(tiltTimeout);
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      inner.style.transition = "none";
      inner.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1)`;
    });

    card.addEventListener("mouseleave", () => {
      if (isAnimating || card.classList.contains("flipped")) return;
      
      tiltTimeout = setTimeout(() => {
        inner.style.transition = "transform 0.3s ease-out";
        inner.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
      }, 0);
    });
  }
});
