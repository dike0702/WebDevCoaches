const form = document.getElementById("categoryForm");
        function pageShitWithCat(event) {
            event.preventDefault();
            const category = document.getElementById("category");
            const selectedCat = category.options[category.selectedIndex].text.toLowerCase();

            document.location.href = "/" + selectedCat;
        } 
        form.addEventListener("submit", pageShitWithCat);