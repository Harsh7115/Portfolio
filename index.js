document.querySelector(".sidebar").addEventListener("wheel", (event) => {
  // Prevent default scrolling behavior on the sidebar
  event.preventDefault();

  // Scroll the content instead
  const content = document.querySelector(".content");
  content.scrollBy({
    top: event.deltaY, // Scroll by the same amount as the wheel event
    // Optional: Smooth scrolling
  });
});
