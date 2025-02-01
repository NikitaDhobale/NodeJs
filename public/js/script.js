    document.addEventListener("DOMContentLoaded", () => {
      const editButtons = document.querySelectorAll(".edit-btn");
      editButtons.forEach(button => {
        button.addEventListener("click", () => {
          document.getElementById("editProductId").value = button.getAttribute("data-id");
          document.getElementById("editProductName").value = button.getAttribute("data-name");
          document.getElementById("editCategoryId").value = button.getAttribute("data-category");
          document.getElementById("editProductForm").action = "/products/update/" + button.getAttribute("data-id");
        });
      });
    });