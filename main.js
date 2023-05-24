const nCafeViral = () => {
  const setupBottomNavigation = (bottomContainer) => {
    let numLinks = bottomContainer.querySelectorAll(".bottom-d.num");
    let leftArrow = bottomContainer.querySelector(".bottom-d.left-arrow");
    let rightArrow = bottomContainer.querySelector(".bottom-d.right-arrow");

    numLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        numLinks.forEach(function (numLink) {
          numLink.classList.remove("on");
        });
        link.classList.add("on");
      });
    });

    leftArrow.addEventListener("click", function (event) {
      event.preventDefault();
      let currentLink = bottomContainer.querySelector(".bottom-d.num.on");
      let previousLink = currentLink.previousElementSibling;
      if (previousLink && !previousLink.classList.contains("num")) {
        previousLink = numLinks[0];
      }
      numLinks.forEach(function (numLink) {
        numLink.classList.remove("on");
      });
      previousLink.classList.add("on");
    });

    rightArrow.addEventListener("click", function (event) {
      event.preventDefault();
      let currentLink = bottomContainer.querySelector(".bottom-d.num.on");
      let nextLink = currentLink.nextElementSibling;
      if (nextLink && !nextLink.classList.contains("num")) {
        nextLink = numLinks[numLinks.length - 1];
      }
      numLinks.forEach(function (numLink) {
        numLink.classList.remove("on");
      });
      nextLink.classList.add("on");
    });
  };

  const bottomContainers = document.querySelectorAll(".bottom");
  bottomContainers.forEach(function (bottomContainer) {
    setupBottomNavigation(bottomContainer);
  });

  const fileInput = document.getElementById("file");
  const attachmentContainer = document.getElementById("attachment-container");
  let attachmentBox; // attachmentBox는 한 번만 생성되어야 하므로 변수로 선언합니다.

  fileInput.addEventListener("change", handleFileSelect);

  function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
      if (!attachmentBox) {
        attachmentBox = createAttachmentBox();
        attachmentContainer.appendChild(attachmentBox);
        attachmentBox.style.display = "block"; // 첨부 파일이 있으므로 display 값을 block으로 변경
      }

      const attachmentElement = createAttachmentElement(file);
      attachmentBox.appendChild(attachmentElement);
    }
  }

  function createAttachmentBox() {
    const attachmentBox = document.createElement("div");
    attachmentBox.className = "attachment-box";

    return attachmentBox;
  }

  function createAttachmentElement(file) {
    const attachmentElement = document.createElement("span");
    attachmentElement.className = "attachment-element";
    attachmentElement.textContent = `첨부 파일: ${file.name}`;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-attachment-button";
    removeButton.textContent = "✖";
    removeButton.addEventListener("click", () => {
      removeAttachment(attachmentElement);
    });
    attachmentElement.appendChild(removeButton);

    return attachmentElement;
  }

  function removeAttachment(attachmentElement) {
    attachmentElement.remove();

    // attachmentBox 내부에 더 이상 attachment-element가 없으면 attachmentBox 제거
    if (
      attachmentBox &&
      attachmentBox.querySelectorAll(".attachment-element").length === 0
    ) {
      attachmentBox.remove();
      attachmentBox = null; // attachmentBox를 null로 초기화하여 다음 첨부 파일에 새로 생성되도록 합니다.
    }

    // attachment-container 내부에 더 이상 attachmentBox가 없으면 display 값을 none으로 변경
    if (attachmentContainer.querySelectorAll(".attachment-box").length === 0) {
      attachmentContainer.style.display = "none";
    }
  }
};
window.addEventListener("load", nCafeViral);
