document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addToCartForm");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); 

            const cartId = this.getAttribute("data-cart-id");
            const productId = this.getAttribute("data-product-id");

            // Capturar los datos del formulario con FormData
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            data.quantity = parseInt(data.quantity); // Convertir cantidad a número

            try {
                const response = await fetch(`/cart/${cartId}/products/${productId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.status === "success") {
                    Swal.fire({
                        title: "¡Producto agregado!",
                        text: "El producto se ha agregado al carrito.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: result.message,
                        icon: "error",
                        confirmButtonText: "Cerrar"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al agregar el producto.",
                    icon: "error",
                    confirmButtonText: "Cerrar"
                });
            }
        });
    }
});
