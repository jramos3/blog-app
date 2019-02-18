document.querySelector("#delete-btn").addEventListener("click", event => {
  const isConfirmed = confirm("Are you sure you want to delete this blog?");

  if (!isConfirmed) {
    event.preventDefault();
  }
});
