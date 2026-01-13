let outfits = [
  "out1.jfif",
  "out2.jfif",
  "out3.jfif",
  "out4.jfif",
  "out5.jfif",
  "out6.jfif",
  "out7.jfif",
  "out8.jfif",
  "out9.jfif",
  "out10.jfif",
  "out11.jfif",
  "out12.jfif",
  "out13.jfif",
  "out14.jfif",
  "out15.jfif"
];

// uploaded images (stored as base64)
let uploadedOutfits = JSON.parse(localStorage.getItem("uploadedOutfits")) || [];

let allOutfits = [...outfits, ...uploadedOutfits];
let currentIndex = 0;

const img = document.getElementById("outfit-img");
const uploadInput = document.getElementById("uploadInput");

function showOutfit() {
  const current = allOutfits[currentIndex];

  if (current.startsWith("data:")) {
    img.src = current; // uploaded image
  } else {
    img.src = `images/outfits/${current}`; // default images
  }
}

/* 🔀 RANDOM ORDER */
function shuffleOutfits() {
  for (let i = allOutfits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOutfits[i], allOutfits[j]] = [allOutfits[j], allOutfits[i]];
  }
}

/* BUTTON CONTROLS */
document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % allOutfits.length;
  showOutfit();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + allOutfits.length) % allOutfits.length;
  showOutfit();
});

document.getElementById("randomBtn").addEventListener("click", () => {
  shuffleOutfits();
  currentIndex = 0;
  showOutfit();
});

/* 📸 UPLOAD HANDLING */
uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    uploadedOutfits.push(reader.result);
    localStorage.setItem("uploadedOutfits", JSON.stringify(uploadedOutfits));

    allOutfits = [...outfits, ...uploadedOutfits];
    currentIndex = allOutfits.length - 1;
    showOutfit();
  };

  reader.readAsDataURL(file);
});

showOutfit();
