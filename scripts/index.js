const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Profile Edit Modal Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const addCardModal = document.querySelector("#profile-add-modal");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const modalCloseButtons = document.querySelectorAll(".modal__close-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

// Picture Modal Elements
const pictureModal = document.querySelector("#picture-modal");
const pictureModalCloseButton = document.querySelector(
  "#picture-modal-close-button"
);
const modalImage = document.querySelector("#modal-image");
const modalCaption = document.querySelector("#modal-caption");

// Card Elements
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Functions
function closePopup(modal) {
  modal.classList.remove("modal_open");
}

function openPopup(modal) {
  modal.classList.add("modal_open");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const profileCardDeleteButton = cardElement.querySelector(
    ".card__delete-button"
  );
  const likeButtons = cardElement.querySelectorAll(".card__like-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  
  cardImageEl.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    openPopup(pictureModal);
  });

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });
  });

  profileCardDeleteButton.addEventListener("click", handleDeleteCard);

  return cardElement;
}

function handleDeleteCard(event) {
  event.target.closest(".card").remove();
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
  addCardFormElement.reset();
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileSubtitle.textContent;
  profileEditModal.classList.add("modal_open");
});

addNewCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_open");
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const modal = event.target.closest(".modal");
    closePopup(modal);
  });
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Initial Card Rendering
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

// Close Picture Modal
pictureModalCloseButton.addEventListener("click", () => {
  closePopup(pictureModal);
});
